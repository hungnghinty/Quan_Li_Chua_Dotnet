import { message } from 'antd'
import React, { useState } from 'react'
import {useNavigate} from "react-router-dom"
import '../CSS/AddModal.css'
import axios from 'axios'

export default function LoginModal() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [token, setToken] = useState('')
    const navigate = useNavigate()

    let formdata = new FormData()

    const handleSubmit = (e) => {
        e.preventDefault();
        formdata.append('Email', email)
        formdata.append('Password', password)
        axios.post("https://localhost:44334/api/Auth/login", formdata, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then(res => {
                if (res.status == 200) {
                    const userDataJSON = JSON.stringify(res.data);
                    localStorage.setItem('userData', userDataJSON);
                    navigate("/phattu");
                    alert("Đăng nhập thành công");
                }
            })
            .catch(err => {
                console.log(err.response.data);
                alert(err.response.data);
                })


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
