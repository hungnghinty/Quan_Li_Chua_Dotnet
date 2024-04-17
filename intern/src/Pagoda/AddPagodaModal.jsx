import React, { useEffect, useState } from 'react'
import '../CSS/AddModal.css'
import axios from 'axios'
import { Button, Input, Modal, message } from 'antd'

const AddPagodaModal = ({ closeModal, token, latestId, totalPage, setCount }) => {
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
      .get(`https://localhost:44334/api/Chua/laydanhsachchua?pageSize=4&pageNumb=${totalPage}`)
      .then((res) => {
        handleAddPagoda(res.data.data)
      })
      .catch((er) => console.log(er))
  }, [])

  const handleAddPagoda = (data) => {
    const lastItem = data[data.length - 1].chuaid
    if (latestId != null) {
      if (lastItem + 1 === latestId) {
        setPagodaId(latestId + 1)
      } else if (latestId < lastItem) {
        setPagodaId(lastItem + 1)
      }
    } else {
      setPagodaId(lastItem + 1)
    }
  }

  const postData = {
    // chuaid: pagodaId,
    capnhat: pagodaInfo.updatedTime,
    diachi: pagodaInfo.address,
    ngaythanhlap: pagodaInfo.foundingDay,
    tenchua: pagodaInfo.pagodaName,
    trutri: pagodaInfo.abbot,
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
        .post('https://localhost:44334/api/Chua/themchua', postData, {
          headers: {
            accept: '*/*',
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          message.success('Thêm chùa thành công')
          setCount((prev) => prev + 1)
        })
        .catch((er) => {
          console.log(er)
          message.error('Thêm chùa thất bại')
        })

      closeModal(false)
    }
  }

  return (
    <Modal
      title="THÊM CHÙA"
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
            onChange={(e) =>
              setPagodaInfo({ ...pagodaInfo, pagodaName: e.target.value })
            }
          />
        </div>

        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">Địa chỉ</span>
          </div>
          <Input
            required
            placeholder="Địa chỉ"
            onChange={(e) =>
              setPagodaInfo({ ...pagodaInfo, address: e.target.value })
            }
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
            onChange={(e) =>
              setPagodaInfo({ ...pagodaInfo, abbot: e.target.value })
            }
          />
        </div>

        <div className="input-group mb-3 date-container">
          <div className="input-group-prepend">
            <span className="input-group-text">Ngày cập nhật</span>
          </div>
          <input
            required
            type="datetime-local"
            style={{ width: '100%' }}
            className="form-control"
            onChange={(e) =>
              setPagodaInfo({ ...pagodaInfo, updatedTime: e.target.value })
            }
          />
        </div>

        <div className="input-group mb-3 date-container">
          <div className="input-group-prepend">
            <span className="input-group-text">Ngày thành lập</span>
          </div>
          <input
            required
            type="datetime-local"
            style={{ width: '100%' }}
            className="form-control"
            onChange={(e) =>
              setPagodaInfo({ ...pagodaInfo, foundingDay: e.target.value })
            }
          />
        </div>
      </div>
    </Modal>
  )
}

export default AddPagodaModal
