import React, { useState } from "react";
import EditModal from "./EditModal";
import axios from "axios";

export default function Tabletr({ user, index }) {
  const [openEditModal, setOpenEditModal] = useState(false);

  const handleDelete = (id) => {
    const confirm = window.confirm("u sure that u want to delete?");
    if (confirm) {
      axios
        .delete("https://localhost:44334/api/DaoTrang/xoadaotrang", {
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
          },
          data: id,
        })
        .then((res) => {
          window.location.reload();
        })
        .catch((err) => console.log(err));
    }
  };

  console.log(user);

  return (
    <tr key={index}>
      <td>{user.daotrangid}</td>
      <td>{user.daketthuc === true ? "Đã kết thúc" : "Chưa kết thúc"}</td>
      <td>{user.noidung}</td>
      <td>{user.noitochuc}</td>
      <td>{user.sothanhvienthamgia}</td>
      <td>
        {user.thoigiantochuc && (
          <>
            {new Date(user.thoigiantochuc).getDate()}-
            {new Date(user.thoigiantochuc).getMonth() + 1}-
            {new Date(user.thoigiantochuc).getFullYear()} || " 
            {new Date(user.thoigiantochuc).toLocaleTimeString()}"
          </>
        )}
      </td>
      <td>{user.nguoitrutri}</td>
      <td>
        <button className="btn edit" onClick={() => setOpenEditModal(true)}>
          <i className="fa-solid fa-pencil"></i>
        </button>
      </td>
      <td>
        <button
          className="delete"
          onClick={() => handleDelete(user.daotrangid)}
        >
          <i className="fa-solid fa-trash"></i>
        </button>
      </td>
      {openEditModal && (
        <EditModal closeModal={setOpenEditModal} id={user.daotrangid} user = {user} />
      )}
    </tr>
  );
}
