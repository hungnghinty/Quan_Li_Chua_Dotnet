import { useEffect, useState } from 'react'
import axios from 'axios'
import '../CSS/table.css'
import '../CSS/Pagoda.css'
import EditModal from './EditModal';
import { Table, Button, Space, Pagination, message } from 'antd'
import {
  EditOutlined,
  DeleteOutlined,
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons'

const PhattuTable = ({
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
  const [currentPhattu, setCurrentPhattu] = useState({})

  const userDataJSON = localStorage.getItem('userData');
  var token =  JSON.parse(userDataJSON)
  // const [currentId, setCurrentId] = useState()
  // const [currentPagoda, setCurrentPagoda] = useState({})
  const pageSize = 3
  useEffect(() => {

    if (findinput != null && findinput.length > 0) {
      axios
        .get(
          `https://localhost:44334/api/PhatTu/laydanhsachphattu?keyword=${findinput}&pageNumb=${pagination}&pageSize=3` , {headers: {
            Authorization: `bearer ${token}`
          }}
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
          `https://localhost:44334/api/PhatTu/laydanhsachphattu?pageNumb=${pagination}&pageSize=3`, {headers: {
            Authorization: `bearer ${token}`
          }}
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
    const confirm = window.confirm("u sure that u want to delete?");
    if (confirm) {
        axios.delete(`https://localhost:44334/api/PhatTu/xoaphattu?phatTuID=${id}`, {headers: {
          Authorization: `bearer ${token}`
        }})
            .then(res => {
              message.success('Xóa Phật tử thành công')
              setCount((prev) => prev + 1)
            })
            .catch(er => console.log(er));
    }
}

  const columns = [
    {
      title: 'ID',
      dataIndex: 'phattuid',
      key: 'phattuid',
    },
    {
      title: 'Ho',
      dataIndex: 'ho',
      key: 'ho',
    },
    {
      title: 'Ten',
      dataIndex: 'ten',
      key: 'ten',
    },
    {
      title: 'GioiTinh',
      dataIndex: 'gioitinh',
      key: 'gioitinh',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'SDT',
      dataIndex: 'sodienthoai',
      key: 'sodienthoai',
    },
    {
      title: 'Chuaid',
      dataIndex: 'chuaid',
      key: 'chuaid',
    },
    {
      title: 'KieuThanhVienID',
      dataIndex: 'kieuthanhvienid',
      key: 'kieuthanhvienid',
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (text, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={
              () => {
                setOpenEditModal(true)
                setCurrentId(text.phattuid)
                setCurrentPhattu(text)
            }
            }
          />
          {openEditModal && (
            <EditModal
              closeModal={setOpenEditModal}
              id = {currentId != null && currentId}
              user={currentPhattu}
              setCount={setCount}
            />
          )}
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={
              () => handleDelete(text.phattuid)
            }
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
export default PhattuTable
