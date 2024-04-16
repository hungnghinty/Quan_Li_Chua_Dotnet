
import React, { useState } from 'react'
import '../CSS/AddModal.css'
import axios from 'axios'

export default function LoginModal({ closeModal , handleToken }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [token,setToken] = useState('')

    let formdata = new FormData()

    const handleSubmit = (e) => {
        e.preventDefault();
        // if(e.target && e.target.files[0]){
        formdata.append('Email', email)
        formdata.append('Password', password)
        // }
        axios.post("https://localhost:44334/api/Auth/login", formdata, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then(res => {
                console.log(res.data)
                handleToken(res.data.toString())
            })
            .catch(er => console.log(er))

        closeModal(false)
    }


    return (
        <div className='modal-background'>

            <div className='modal-container'>
                <div className="modal-title">
                    <h1>Đăng nhập</h1>
                </div>

                <div className="modal-body" onSubmit={handleSubmit}>

                    <div className="input-group mb-4">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">Email</span>
                        </div>
                        <input type="text" className="form-control" placeholder="Email" aria-label="Username" aria-describedby="basic-addon1" onChange={e => setEmail(e.target.value)} />

                    </div>

                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">Password</span>
                        <input type="text" className="form-control" placeholder="Password" aria-label="Username" aria-describedby="basic-addon1" onChange={e => setPassword(e.target.value)} />
                    </div>

                </div>

                <div className="modal-footer">
                    <button onClick={handleSubmit}>Đăng nhập</button>
                </div>
            </div>

        </div>
    )
}
