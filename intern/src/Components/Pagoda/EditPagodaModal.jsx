import React, { useState } from 'react'
import "./../../CSS/AddModal.css";
import axios from "axios";

const EditPagodaModal = ({ closeModal, id, user }) => {
  const [pagodaInfo, setPagodaInfo] = useState({
    updatedTime: user.capnhat,
    address: user.diachi,
    foundingDay: user.ngaythanhlap,
    pagodaName: user.tenchua,
    abbot: user.trutri,
  })

  const postData = {
    chuaid: id,
    tenchua: pagodaInfo.pagodaName,
    diachi: pagodaInfo.address,
    trutri: pagodaInfo.abbot,
    capnhat: pagodaInfo.updatedTime,
    ngaythanhlap: pagodaInfo.foundingDay,
  };

  // const dataRequired = () => {
  //   const fields = {
  //     pagodaName: 'tên chùa',
  //     address: 'địa chỉ',
  //     updatedTime: 'cập nhật',
  //     foundingDay: 'ngày thành lập',
  //   }

  //   for (const field in fields) {
  //     if (!eval(field)) {
  //       alert(`Vui lòng điền ${fields[field]}`)
  //       return false
  //     }
  //   }
  //   return true
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (dataRequired()) {
      axios
        .post(
          "https://localhost:44334/api/Chua/capnhatchua",
          postData,
          {
            headers: {
              accept: "*/*",
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          alert("Sửa thành công");
          window.location.reload();
        })
        .catch((er) => {
          alert(er);
        });

      closeModal(false);
    // }
  };

  return (
    <div className="modal-background">
      <div className="modal-container">
        <div className="modal-btnclose">
          <button
            onClick={() => {
              closeModal(false)
            }}
          >
            <i className="fa-solid fa-circle-xmark"></i>
          </button>
        </div>
        <div className="modal-title">
          <h1>CẬP NHẬT CHÙA</h1>
        </div>

        <div className="modal-body" onSubmit={handleSubmit}>
          <div className="input-group mb-3">
            <div></div>
            <div className="input-group-prepend">
              <span className="input-group-text" id="">
                Tên chùa
              </span>
            </div>
            <input
              required
              type="text"
              className="form-control"
              placeholder="Tên chùa"
              onChange={(e) =>
                setPagodaInfo((prev) => ({
                  ...prev,
                  pagodaName: e.target.value,
                }))
              }
              value={pagodaInfo.pagodaName}
            />
          </div>

          <div className="input-group mb-3">
            <div></div>
            <div className="input-group-prepend">
              <span className="input-group-text" id="">
                Địa chỉ
              </span>
            </div>
            <input
              required
              type="text"
              className="form-control"
              placeholder="Địa chỉ"
              onChange={(e) =>
                setPagodaInfo((prev) => ({ ...prev, address: e.target.value }))
              }
              value={pagodaInfo.address}
            />
          </div>

          <div className="input-group-prepend mb-3">
            <span className="input-group-text" id="basic-addon1">
              Người trụ trì
            </span>
            <input
              required
              type="number"
              min="0"
              className="form-control"
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={(e) =>
                setPagodaInfo((prev) => ({ ...prev, abbot: e.target.value }))
              }
              value={pagodaInfo.abbot}
            />
          </div>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
                Ngày cập nhật
              </span>
            </div>
            <input
              required
              type="datetime-local"
              className="form-control"
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={(e) =>
                setPagodaInfo((prev) => ({
                  ...prev,
                  updatedTime: e.target.value,
                }))
              }
              value={pagodaInfo.updatedTime}
            />
          </div>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
                Ngày thành lập
              </span>
            </div>
            <input
              required
              type="datetime-local"
              className="form-control"
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={(e) =>
                setPagodaInfo((prev) => ({
                  ...prev,
                  foundingDay: e.target.value,
                }))
              }
              value={pagodaInfo.foundingDay}
            />
          </div>
        </div>

        <div className="modal-footer">
          <button
            className="cancel"
            onClick={() => {
              closeModal(false)
            }}
          >
            Cancel
          </button>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  )
}

export default EditPagodaModal