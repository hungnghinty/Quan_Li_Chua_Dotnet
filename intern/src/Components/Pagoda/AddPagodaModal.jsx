import React, { useEffect, useState } from 'react'
import './../../CSS/AddModal.css'
import axios from 'axios'

const AddPagodaModal = ({ closeModal, token, latestId }) => {
  const [data, setData] = useState([])
  const [totalCount, setTotalCount] = useState(0)
  const [pagodaInfo, setPagodaInfo] = useState({
    updatedTime: '',
    address: '',
    foundingDay: '',
    pagodaName: '',
    abbot: 0,
  })
  const [pagodaId, setPagodaId] = useState(0)

  useEffect(() => {
    axios
      .get(
        `https://localhost:44334/api/Chua/laydanhsachchua?pageSize=2&pageNumb=1`
      )
      .then((res) => {
        setTotalCount(res.data.pagination.totalCount)
        handleAddPagoda(res.data.pagination.totalCount)
      })
      .catch((er) => console.log(er))
  }, [])

  const handleAddPagoda = (totalCount) => {
    if (latestId == null) {
      setPagodaId(totalCount)
    } else if (latestId === totalCount + 1) {
      setPagodaId((prev) => prev + 1)
    } else if (totalCount === 0) {
      setPagodaId(0)
    } else {
      setPagodaId(totalCount)
    }
  }

  const postData = {
    chuaid: pagodaId,
    capnhat: pagodaInfo.updatedTime,
    diachi: pagodaInfo.address,
    ngaythanhlap: pagodaInfo.foundingDay,
    tenchua: pagodaInfo.pagodaName,
    trutri: pagodaInfo.abbot,
  }

  // const dataRequired = () => {
  //   const fields = {
  //     capnhat: 'cập nhật',
  //     diachi: 'địa chỉ',
  //     ngaythanhlap: 'ngày thành lập',
  //     tenchua: 'tên chùa',
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
    e.preventDefault()
    // if (dataRequired()) {
    axios
      .post('https://localhost:44334/api/Chua/themchua', postData, {
        headers: {
          accept: '*/*',
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        alert('Thêm thành công')
        window.location.reload()
      })
      .catch((er) => {
        alert(er)
      })

    closeModal(false)
    // }
  }

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
          <h1>THÊM CHÙA</h1>
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

export default AddPagodaModal
