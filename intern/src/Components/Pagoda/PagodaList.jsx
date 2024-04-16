import { useEffect, useState } from 'react'
import axios from 'axios'
import EditModal from './EditPagodaModal'
import '../../CSS/table.css'
import PagodaItem from './PagodaItem'

const PagodaList = ({ findinput, setLatestId }) => {
  const [data, setData] = useState([])
  const [openEditModal, setOpenEditModal] = useState(false)
  const [pagination, setPagination] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  useEffect(() => {
    if (findinput != null) {
      console.log(findinput)
      axios
        .get(
          `https://localhost:44334/api/Chua/laydanhsachchua?keyword=${findinput}&pageNumb=${pagination}&pageSize=2`
        )
        .then((res) => {
          setData(res.data.data)  
          setTotalPage(res.data.pagination.totalPage)
        })
        .catch((er) => console.log(er))
    } else {
      axios
        .get(
          `https://localhost:44334/api/Chua/laydanhsachchua?pageNumb=${pagination}&pageSize=2`
        )
        .then((res) => {
          setTotalPage(res.data.pagination.totalPage)
          setData(res.data.data)
        })
        .catch((er) => console.log(er))
    }
  }, [pagination])

  const handlePrev = () => {
    if (pagination > 1) {
      setPagination(pagination - 1)
    }
  }
  const handleNext = () => {
    if (pagination < totalPage) {
      setPagination(pagination + 1)
    }
  }

  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên chùa</th>
            <th>Địa chỉ</th>
            <th>Ngày cập nhật</th>
            <th>Ngày thành lập</th>
            <th>Người trụ trì</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user, index) => (
            <PagodaItem user={user} index={index} setLatestId={setLatestId} />
          ))}
        </tbody>
      </table>
      <button className="prev" onClick={() => handlePrev()}>
        Prev
      </button>
      <button className="next" onClick={() => handleNext()}>
        Next
      </button>
    </div>
  )
}
export default PagodaList
