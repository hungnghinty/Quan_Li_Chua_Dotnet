import React, { useState } from 'react'
import EditModal from './EditModal';
import axios from 'axios';

export default function Tabletr({user,index}) {
    const [openEditModal, setOpenEditModal] = useState(false)

    const handleDelete = (id) => {
        const confirm = window.confirm("u sure that u want to delete?");
        if (confirm) {
            axios.delete(`https://localhost:44334/api/PhatTu/xoaphattu?phatTuID=${id}`)
                .then(res => {
                    window.location.reload();
                })
                .catch(er => console.log(er));
        }
    }

    return (
            <tr key={index}>
                <td>{user.phattuid}</td>
                <td>{user.ho}</td>
                <td>{user.ten}</td>
                <td>{user.gioitinh}</td>
                <td>{user.email}</td>
                <td>{user.sodienthoai}</td>
                <td>{user.chuaid}</td>
                <td>{user.kieuthanhvienid}</td>

                <td><button className="btn edit" onClick={() => setOpenEditModal(true)}><i className="fa-solid fa-pencil"></i></button></td>
                <td><button className="delete" onClick={() => handleDelete(user.phattuid)}><i className="fa-solid fa-trash"></i></button></td>
                {openEditModal && <EditModal closeModal={setOpenEditModal} id={user.phattuid} />}
            </tr>
    )
}
