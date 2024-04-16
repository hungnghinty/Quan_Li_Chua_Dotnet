import React, { useState } from 'react'
import EditPagodaModal from './EditPagodaModal'
import axios from 'axios'

const PagodaItem = ({ user, index, setLatestId }) => {
  const [openEditModal, setOpenEditModal] = useState(false)

  const handleDelete = (id) => {
    const confirm = window.confirm('u sure that u want to delete?')
    if (confirm) {
      axios
        .delete('https://localhost:44334/api/Chua/xoachua', {
          headers: {
            Accept: '*/*',
            'Content-Type': 'application/json',
          },
          data: id,
        })
        .then((res) => {
          window.location.reload()
        })
        .catch((err) => console.log(err))
    }
  }

  return (
    <tr key={index}>
      <td>{user.chuaid}</td>
      <td>{user.tenchua}</td>
      <td>{user.diachi}</td>
      <td>
        {user.capnhat && (
          <>
            {new Date(user.capnhat).getDate()}-
            {new Date(user.capnhat).getMonth() + 1}-
            {new Date(user.capnhat).getFullYear()}
            {/* || " 
            {new Date(user.capnhat).toLocaleTimeString()}" */}
          </>
        )}
      </td>
      <td>
        {user.ngaythanhlap && (
          <>
            {new Date(user.ngaythanhlap).getDate()}-
            {new Date(user.ngaythanhlap).getMonth() + 1}-
            {new Date(user.ngaythanhlap).getFullYear()}
            {/* || " 
            {new Date(user.ngaythanhlap).toLocaleTimeString()}" */}
          </>
        )}
      </td>
      <td>{user.trutri}</td>
      <td>
        <button className="btn edit" onClick={() => setOpenEditModal(true)}>
          <i className="fa-solid fa-pencil"></i>
        </button>
      </td>
      <td>
        <button
          className="delete"
          onClick={() => {
            handleDelete(user.chuaid)
            setLatestId(user.chuaid)
            console.log('id: ', user.chuaid)
          }}
        >
          <i className="fa-solid fa-trash"></i>
        </button>
      </td>
      {openEditModal && (
        <EditPagodaModal
          closeModal={setOpenEditModal}
          id={user.chuaid}
          user={user}
        />
      )}
    </tr>
  )
}

export default PagodaItem
