import React, { useState } from 'react'
import '../CSS/AddModal.css'
import axios from 'axios'
import { Button, Input, Modal, message } from 'antd'

const EditPagodaModal = ({ closeModal, id, user, setCount }) => {
  const [pagodaInfo, setPagodaInfo] = useState({
    updatedTime: user.capnhat,
    address: user.diachi,
    foundingDay: user.ngaythanhlap,
    pagodaName: user.tenchua,
    abbot: user.trutri,
  })

  const userDataJSON = localStorage.getItem('userData');
  var token =  JSON.parse(userDataJSON)

  const postData = {
    chuaid: id,
    tenchua: pagodaInfo.pagodaName,
    diachi: pagodaInfo.address,
    trutri: pagodaInfo.abbot,
    capnhat: pagodaInfo.updatedTime,
    ngaythanhlap: pagodaInfo.foundingDay,
  }

  const validate = () => {
    const requiredFields = [
      'pagodaName',
      'address',
      'abbot',
      'updatedTime',
      'foundingDay',
    ]
    for (const field of requiredFields) {
      if (!pagodaInfo[field]) {
        message.error(
          `Vui lòng nhập ${field}`
        )
        return false
      }
    }
    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      axios
        .post('https://localhost:44334/api/Chua/capnhatchua', postData, {
          headers: {
            accept: '*/*',
            'Content-Type': 'application/json',
            Authorization: `bearer ${token}`
          },
        })
        .then((res) => {
          setCount((prev) => prev + 1)
          message.success('Cập nhật thành công')
        })
        .catch((er) => {
          message.error('Cập nhật thất bại')
        })

      closeModal(false)
    }
  }

  return (
    <Modal
      title="CẬP NHẬT CHÙA"
      visible={true}
      onCancel={() => closeModal(false)}
      footer={[
        <Button key="cancel" onClick={() => closeModal(false)}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          Submit
        </Button>,
      ]}
      centered
    >
      <div className="modal-body">
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">Tên chùa</span>
          </div>
          <Input
            required
            placeholder="Tên chùa"
            value={pagodaInfo.pagodaName}
            onChange={(e) => setPagodaInfo({ ...pagodaInfo, pagodaName: e.target.value })}
          />
        </div>

        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">Địa chỉ</span>
          </div>
          <Input
            required
            placeholder="Địa chỉ"
            value={pagodaInfo.address}
            onChange={(e) => setPagodaInfo({ ...pagodaInfo, address: e.target.value })}
          />
        </div>

        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">Số người trụ trì</span>
          </div>
          <Input
            required
            type="number"
            min="0"
            placeholder="Số người trụ trì"
            value={pagodaInfo.abbot}
            onChange={(e) => setPagodaInfo({ ...pagodaInfo, abbot: e.target.value })}
          />
        </div>

        <div className="input-group mb-3 date-container">
          <div className="input-group-prepend">
            <span className="input-group-text">Ngày cập nhật</span>
          </div>
          <input
            required
            type="datetime-local"
            style={{width: '100%'}}
            className="form-control"
            value={pagodaInfo.updatedTime}
            onChange={(e) => setPagodaInfo({ ...pagodaInfo, updatedTime: e.target.value })}
          />
        </div>

        <div className="input-group mb-3 date-container">
          <div className="input-group-prepend">
            <span className="input-group-text">Ngày thành lập</span>
          </div>
          <input
            required
            type="datetime-local"
            style={{width: '100%'}}
            className="form-control"
            value={pagodaInfo.foundingDay}
            onChange={(e) => setPagodaInfo({ ...pagodaInfo, foundingDay: e.target.value })}
          />
        </div>
      </div>
    </Modal>
  )
}

export default EditPagodaModal
