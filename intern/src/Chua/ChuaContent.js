import { useState } from 'react'
import '../CSS/style.css'
import AddPagodaModal from '../Pagoda/AddPagodaModal'
import PagodaList from '../Pagoda/PagodaList'
import React from 'react'
import { Input, Select, Button, Dropdown, Menu } from 'antd'
import LoginModal from '../Pagoda/LoginModal'


const { Option } = Select

const ChuaContent = () => {
  const [openLoginModal, setOpenLoginModal] = useState(true)
  const [openAddModal, setOpenAddModal] = useState(false)
  const [latestId, setLatestId] = useState(null)
  const [token, setToken] = useState('')
  const [findInput, setFindInput] = useState('')
  const [count, setCount] = useState(0)
  const [totalPage, setTotalPage] = useState()

  const handleToken = (loginToken) => {
    setToken(loginToken)
  }

  return (
    <div className="container">
      <div>
        <div id="main">
          <div className="content">
            <div className="path">
              <a href="#">Chùa</a>
            </div>

            <div className="find">
              <div className="find-bar">
                <h3>Tìm kiếm chùa</h3>
              </div>
              <div className="find-input search">
                <Input
                  className="search-input"
                  placeholder="Tìm kiếm"
                  onChange={(e) => setFindInput(e.target.value)}
                  allowClear
                />
                <Button className="find-bar find-now search-btn">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </Button>
              </div>
            </div>

            <div className="list">
              <div className="list-nav">
                <Button
                  className="them"
                  style={{ marginLeft: '16px' }}
                  onClick={() => {
                    setOpenAddModal(true)
                  }}
                >
                  Thêm
                  <span>
                    <i className="fa-solid fa-plus"></i>
                  </span>
                </Button>

                <div className="datatable" style={{ marginTop: '8px' }}>
                  <PagodaList
                    findinput={findInput}
                    setLatestId={setLatestId}
                    count={count}
                    setCount={setCount}
                    setTotalPage={setTotalPage}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {openAddModal && (
        <AddPagodaModal
          closeModal={setOpenAddModal}
          token={token}
          latestId={latestId}
          setCount={setCount}
          totalPage={totalPage}
        />
      )}
    </div>
  )
}

export default ChuaContent