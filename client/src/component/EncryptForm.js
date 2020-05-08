import React, { useState } from 'react'
import './EncryptForm.css'
import axios from 'axios'

const EncryptForm = () => {

    const [form, setForm] = useState({
        file: {},
        text: "",
        fileName: ""
    });

    const [encryptedImg, setencryptedImg] = useState({
        share1: "https://via.placeholder.com/500x500?text=Your+uploaded+image+share+1+appears+here",
        share2: "https://via.placeholder.com/500x500?text=Your+uploaded+image+share+2+appears+here"
    });

    const handletexttohidechange = (event) => {
        setForm({ file: form.file, text: event.target.value, fileName: form.fileName });
    }

    const handlefilechange = (event) => {
        setForm({ file: event.target.files[0], fileName: event.target.files[0].name, text: form.text });
    }

    const sendEncryptionData = async (text, file) => {
        const formData = new FormData();
        formData.append("text", text);
        formData.append("file", file);
        const responseData = await axios.post("http://localhost:5000/hideandencrypt", formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        const { share1, share2 } = responseData.data
        setencryptedImg({ share1, share2 });
    }

    const handlesubmit = (event) => {
        event.preventDefault();
        console.log(form);
        sendEncryptionData(form.text, form.file);
    }

    return (
        <div style={{ width: "100%" }}>
            <form onSubmit={handlesubmit}>
                <br />
                <div>
                    <label>Enter The text to be hidden here</label>
                </div>
                <div>
                    <input className='textbox'
                        type='text'
                        value={form.text}
                        onChange={handletexttohidechange} />
                </div>
                <br />
                <div>
                    <label>Upload image file to hide text</label>
                </div>
                <div className="custom-file mb-5" style={{ width: "20%" }}>
                    <input type="file" className="custom-file-input" id="customFile" onChange={handlefilechange} />
                    <label className="text-left custom-file-label" htmlFor="customFile">{form.fileName}</label>
                </div>
                <br />
                <button className='submitbutton' type='submit'>Encrypt</button>
                <div>
                    <img className="position-relative" src={encryptedImg.share1} alt="" />
                    <a href={encryptedImg.share1} target="_blank" rel="noopener noreferrer">Download share 1</a>
                    <img className="position-relative" src={encryptedImg.share2} alt="" />
                    <a href={encryptedImg.share2} target="_blank" rel="noopener noreferrer">Download share 2</a>
                </div>
            </form>
        </div>
    )

}
export default EncryptForm