import React, { useState } from 'react'
import './EncryptForm.css'
import axios from 'axios'


const DecryptForm = () => {

    const [decryptImg, setdecryptImg] = useState({
        share1: {},
        share1fileName: "",
        share2: {},
        share2fileName: ""
    });

    const [decrypted, setdecrypted] = useState({
        decrypteddata: "",
        finalImage: "https://via.placeholder.com/500x500?text=Your+uploaded+image+final+image+appears+here",
    });

    const sendDecryptionData = async (share1, share2) => {
        const formData = new FormData();
        formData.append("share1", share1);
        formData.append("share2", share2);
        console.log(formData);
        const responseData = await axios.post("http://localhost:5000/showanddecrypt", formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        const { decrypteddata, finalImage } = responseData.data
        setdecrypted({ decrypteddata, finalImage });
        console.log(decrypted);
    }
    const handlefilechange1 = (event) => {
        setdecryptImg({ ...decryptImg, share1: event.target.files[0], share1fileName: event.target.files[0].name });
    }
    const handlefilechange2 = (event) => {
        setdecryptImg({ ...decryptImg, share2: event.target.files[0], share2fileName: event.target.files[0].name });
    }

    const handlesubmit = (event) => {
        event.preventDefault();
        sendDecryptionData(decryptImg.share1, decryptImg.share1);
    }
    return (
        <div style={{ width: "100%" }}>
            <form onSubmit={handlesubmit}>
                <br />
                <div>
                    <label>Upload Share 1</label>
                </div>
                <div className="custom-file mb-5" style={{ width: "20%" }}>
                    <input type="file" className="custom-file-input" id="customFile" onChange={handlefilechange1} />
                    <label className="text-left custom-file-label" htmlFor="customFile">{decryptImg.share1fileName}</label>
                </div>
                <br />
                <div>
                    <label>Upload Share 2</label>
                </div>
                <div className="custom-file mb-5" style={{ width: "20%" }}>
                    <input type="file" className="custom-file-input" id="customFile" onChange={handlefilechange2} />
                    <label className="text-left custom-file-label" htmlFor="customFile">{decryptImg.share2fileName}</label>
                </div>
                <br />
                <button className='submitbutton' type='submit'>Decrypt</button>
            </form>
        </div>
    )

}
export default DecryptForm