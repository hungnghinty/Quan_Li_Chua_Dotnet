import React, { useEffect, useState } from 'react'
import axios from 'axios'
import EditModal from './EditModal'
import '../CSS/table.css'
import Tabletr from './Tabletr'

export default function Table({ findinput }) {
    const [data, setData] = useState([])
    const [openEditModal, setOpenEditModal] = useState(false)
    const [pagination, setPagination] = useState(1)
    useEffect(() => {
        if (findinput != null) {
            console.log(findinput)
            axios.get(`https://localhost:44334/api/PhatTu/laydanhsachphattu?keyword=${findinput}&pageNumb=${pagination}&pageSize=2`)
                .then(res => {
                    console.log(res.data.data)
                    setData(res.data.data)
                })
                .catch(er => console.log(er))

        } else {
            console.log('khongcoinput')
            axios.get(`https://localhost:44334/api/PhatTu/laydanhsachphattu?pageNumb=${pagination}&pageSize=2`)
                .then(res => {
                    
                    setData(res.data.data)
                })
                .catch(er => console.log(er))
        }
    }, [pagination])



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

    const handlePrev = () => {
        if (pagination > 1) {
            setPagination(pagination - 1)
        }
    }
    const handleNext = () => {
        if (pagination < 10) {
            setPagination(pagination + 1)
        }

    }
    return (
        <div className='table'>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Ho</th>
                        <th>Ten</th>
                        <th>GioiTinh</th>
                        <th>Email</th>
                        <th>SDT</th>
                        <th>Chuaid</th>
                        <th>KieuThanhVienID</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((user, index) => (
                            <Tabletr user={user} index={index} />
                        ))
                    }


                </tbody>
            </table>
            <button className="prev" onClick={() => handlePrev()}>Prev</button>
            <button className="next" onClick={() => handleNext()}>Next</button>

        </div>
    )
}
