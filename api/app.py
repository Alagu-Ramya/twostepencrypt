import uuid
from flask import Flask, jsonify, request,send_from_directory
from pathlib import Path
import lsb_stegno
import n_share
from flask_cors import CORS

# Config
UPLOAD_FOLDER = Path.joinpath(Path(__file__).absolute().parents[1], "uploads")
CRYPTO_FOLDER = Path.joinpath(Path(__file__).absolute().parents[1], "crypto_images")
DECRYPTED_FOLDER = Path.joinpath(Path(__file__).absolute().parents[1], "decrypted_images")

app = Flask(__name__)
CORS(app)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['CRYPTO_FOLDER'] = CRYPTO_FOLDER
app.config['DECRYPTED_FOLDER'] = DECRYPTED_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024
ALLOWED_IMAGE_EXTENSIONS = set(['png', 'jpg', 'jpeg'])


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_IMAGE_EXTENSIONS


@app.route("/hideandencrypt", methods=['POST'])
def initHideAndEncrypt():
    if(request.method != "POST"):
        return jsonify({"message": "Only POST request is supported."}), 400
    if "file" not in request.files:
        return jsonify({"message": "Please upload an image."}), 400
    file = request.files["file"]
    text = request.form["text"].strip()
    if file.filename == '':
        return jsonify({"message": "No file selected for upload."}), 400
    if text == '':
        return jsonify({"message": "Text field is empty."}), 400
    if file and allowed_file(file.filename):
        fileid = str(uuid.uuid4())
        file.save(Path.joinpath(
            app.config["UPLOAD_FOLDER"], fileid+".png"))
        data = lsb_stegno.lsb_encode(fileid, text)
        filename = n_share.generate_shares(data, fileid)
        return jsonify({
            "share1": "http://127.0.0.1:5000/cryptoimg/"+filename[0],
            "share2": "http://127.0.0.1:5000/cryptoimg/"+filename[1],
            }), 201
    else:
        return jsonify({"message": "Allowed image types are png, jpg, jpeg."}), 400


@app.route("/showanddecrypt", methods=['POST'])
def initShowAndDecrypt():
    if(request.method != "POST"):
        return jsonify({"message": "Only POST request is supported."}), 400
    if "share1" not in request.files or "share2" not in request.files:
        return jsonify({"message": "Please upload both SHARE 1 and SHARE 2 to decrypt."}), 400
    share1 = request.files["share1"]
    share2 = request.files["share2"]
    if share1.filename == '' and share2.filename == ''  :
        return jsonify({"message": "No file selected for upload."}), 400
    if share1 and share2 and allowed_file(share1.filename) and allowed_file(share1.filename):
        share1id = str(uuid.uuid4())
        share1.save(Path.joinpath(
            app.config["UPLOAD_FOLDER"], share1id+".png"))
        share2id = str(uuid.uuid4())
        share2.save(Path.joinpath(
            app.config["UPLOAD_FOLDER"], share2id+".png"))
        finalImgName = n_share.compress_shares(share1id+".png", share2id+".png")
        decrypteddata = lsb_stegno.lsb_decode("../decrypted_images/"+finalImgName)
        return jsonify({
            "finalImage": "http://127.0.0.1:5000/decryptedimg/"+finalImgName,
            "decrypteddata": decrypteddata
        }), 201
    else:
        return jsonify({"message": "Allowed image types are png, jpg, jpeg."}), 400


@app.route("/cryptoimg/<string:filename>", methods=['GET'])
def send_crypt_img(filename):
    return send_from_directory(app.config['CRYPTO_FOLDER'], filename)


@app.route("/decryptedimg/<string:filename>", methods=['GET'])
def send_decrypt_img(filename):
    return send_from_directory(app.config['DECRYPTED_FOLDER'], filename)

if __name__ == "__main__":
    app.run(debug=True)