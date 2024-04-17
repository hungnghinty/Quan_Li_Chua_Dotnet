import { useEffect, useState } from 'react'
import axios from 'axios'
import '../CSS/table.css'
import '../CSS/Pagoda.css'
import EditPagodaModal from './EditPagodaModal'
import { Table, Button, Space, Pagination, message } from 'antd'
import {
  EditOutlined,
  DeleteOutlined,
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons'

const PagodaList = ({
  findinput,
  setLatestId,
  setTotalPage,
  count,
  setCount,
}) => {
  const [data, setData] = useState([])
  const [openEditModal, setOpenEditModal] = useState(false)
  const [pagination, setPagination] = useState(1)
  const [totalCount, setTotalCount] = useState()
  const [currentId, setCurrentId] = useState()
  const [currentPagoda, setCurrentPagoda] = useState({})
  const pageSize = 4
  useEffect(() => {
    if (findinput != null && findinput.length > 0) {
      axios
        .get(
          `https://localhost:44334/api/Chua/laydanhsachchua?keyword=${findinput}&pageSize=4`
        )
        .then((res) => {
          setData(res.data.data)
          setTotalPage(res.data.pagination.totalPage)
          setTotalCount(res.data.data.length)
        })
        .catch((er) => console.log(er))
    } else {
      axios
        .get(
          `https://localhost:44334/api/Chua/laydanhsachchua?pageNumb=${pagination}&pageSize=${pageSize}`
        )
        .then((res) => {
          setData(res.data.data)
          setTotalPage(res.data.pagination.totalPage)
          setTotalCount(res.data.pagination.totalCount)
        })
        .catch((er) => console.log(er))
    }
  }, [pagination, findinput, count])

  const handleDelete = (id) => {
    const confirm = window.confirm('Bạn có muốn xóa chùa này không?')
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
          message.success('Xóa chùa thành công')
          setCount((prev) => prev + 1)
        })
        .catch((err) => {
          console.log(err)
          message.error('Chua dang co phat tu ')
        })
    }
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'chuaid',
      key: 'chuaid',
    },
    {
      title: 'Tên chùa',
      dataIndex: 'tenchua',
      key: 'tenchua',
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'diachi',
      key: 'diachi',
    },
    {
      title: 'Ngày cập nhật',
      dataIndex: 'capnhat',
      key: 'capnhat',
      render: (text) => {
        return (
          text &&
          `${new Date(text).getDate()}-${
            new Date(text).getMonth() + 1
          }-${new Date(text).getFullYear()}`
        )
      },
    },
    {
      title: 'Ngày thành lập',
      dataIndex: 'ngaythanhlap',
      key: 'ngaythanhlap',
      render: (text) => {
        return (
          text &&
          `${new Date(text).getDate()}-${
            new Date(text).getMonth() + 1
          }-${new Date(text).getFullYear()}`
        )
      },
    },
    {
      title: 'Người trụ trì',
      dataIndex: 'trutri',
      key: 'trutri',
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (text, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => {
              setOpenEditModal(true)
              setCurrentId(text.chuaid)
              setCurrentPagoda(text)
            }}
          />
          {openEditModal && (
            <EditPagodaModal
              closeModal={setOpenEditModal}
              id={currentId != null && currentId}
              user={currentPagoda}
              setCount={setCount}
            />
          )}
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={() => {
              handleDelete(record.chuaid)
              setLatestId(record.chuaid)
            }}
          />
        </Space>
      ),
    },
  ]

  return (
    <div className="table">
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        align="center"
      />
      <Pagination
        className="pagination"
        defaultCurrent={1}
        total={totalCount}
        pageSize={pageSize}
        prevIcon={<LeftOutlined />}
        nextIcon={<RightOutlined />}
        onChange={(page) => setPagination(page)}
      />
    </div>
  )
}
export default PagodaList
