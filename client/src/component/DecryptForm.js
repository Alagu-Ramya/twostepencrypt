import React from 'react'
import './EncryptForm.css'


const DecryptForm = ()=>{

    return(
        <div style={{width:"100%"}}>
        <form >
            <br/>
            <div>
                <label>
                Upload Share 1   
                </label>
            </div>
                

            <div className="custom-file mb-5" style={{width:"20%"}}>
                    <input type="file" className="custom-file-input" id="customFile"  />
                    <label className="text-left custom-file-label" htmlFor="customFile"></label>
            </div>
                <br/> 

            <div>
                <label>
                Upload Share 2    
                </label>
            </div>
                

            <div className="custom-file mb-5" style={{width:"20%"}}>
                    <input type="file" className="custom-file-input" id="customFile"  />
                    <label className="text-left custom-file-label" htmlFor="customFile"></label>
            </div>
                
                <br/>
            
            
            <button className='submitbutton' type='submit'>Decrypt</button>
        </form>
        </div>
    )

}
export default DecryptForm