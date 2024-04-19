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

const DaoTrangTable = ({
  findinput,
  setLatestId,
  setTotalPage,
  count,
  setCount,
}) => {
  const userDataJSON = localStorage.getItem('userData');
  var token =  JSON.parse(userDataJSON)
  const [data, setData] = useState([])
  const [openEditModal, setOpenEditModal] = useState(false)
  const [pagination, setPagination] = useState(1)
  const [totalCount, setTotalCount] = useState()
  const [currentId, setCurrentId] = useState()
  const [currentDaoTrang, setCurrentDaoTrang] = useState({})
  const pageSize = 3
  useEffect(() => {
    if (findinput != null && findinput.length > 0) {
      axios
        .get(
          `https://localhost:44334/api/DaoTrang/getdanhsachdaotrang?keyword=${findinput}&pageNumb=${pagination}&pageSize=3`
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
          `https://localhost:44334/api/DaoTrang/getdanhsachdaotrang?pageNumb=${pagination}&pageSize=3`
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
        axios.delete("https://localhost:44334/api/DaoTrang/xoadaotrang", {
              headers: {
                Accept: "*/*",
                "Content-Type": "application/json",
                Authorization: `bearer ${token}`
              },
              data: id,
            })
            .then(res => {
              message.success('Xóa đạo tràng thành công')
              setCount(prev => prev + 1)
            })
            .catch(er => console.log(er));
    }
}

  const columns = [
    {
      title: 'ID',
      dataIndex: 'daotrangid',
      key: 'daotrangid',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'daketthuc',
      key: 'daketthuc',
      render: (daketthuc) => (
        daketthuc ? 'Đã kết thúc' : 'Chưa kết thúc'
      ),
    },
    {
      title: 'Nội dung',
      dataIndex: 'noidung',
      key: 'noidung',
    },
    {
      title: 'Nơi tổ chức',
      dataIndex: 'noitochuc',
      key: 'noitochuc',
    },
    {
      title: 'Số thành viên',
      dataIndex: 'sothanhvienthamgia',
      key: 'sothanhvienthamgia',
    },
    {
      title: 'Thời gian tổ chức',
      dataIndex: 'thoigiantochuc',
      key: 'thoigiantochuc',
      render: (thoigiantochuc) => {
        const [datePart, timePart] = thoigiantochuc.split('T');
        const [year, month, day] = datePart.split('-');
        const formattedDate = `${day}-${month}-${year}`;
        return `${formattedDate} || "${timePart}"`;
      }
    },
    {
      title: 'Người trụ trì',
      dataIndex: 'nguoitrutri',
      key: 'nguoitrutri',
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
              setCurrentId(text.daotrangid)
              setCurrentDaoTrang(text)
            }}
          />
          {openEditModal && (
            <EditModal
              closeModal={setOpenEditModal}
              id={currentId != null && currentId}
              user={currentDaoTrang}
              setCount={setCount}
              />
          )}
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={
              () => handleDelete(text.daotrangid)
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
export default DaoTrangTable
