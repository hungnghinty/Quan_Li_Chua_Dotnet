import AddModal from '../Components/AddModal';
import Table from '../Components/Table';
import LoginModal from '../Components/LoginModal';
import { useState } from 'react';
import '../CSS/style.css'
import React from 'react'
import { Input, Select, Button, Dropdown, Menu } from 'antd'
import PhattuTable from '../Components/PhattuTable';


export default function PhattuContent() {
    const [openAddModal, setOpenAddModal] = useState(false)
    const [findinput, setFindInput] = useState('')
    const [latestId, setLatestId] = useState(null)
    const [token, setToken] = useState('')
    const [count, setCount] = useState(0)
    const [totalPage, setTotalPage] = useState()

    return (
        <div className="container">
          <div>
            <div id="main">
              <div className="content">
                <div className="path">
                  <a href="#">Phật tử</a>
                </div>
    
                <div className="find">
                  <div className="find-bar">
                    <h3>Tìm kiếm Phật tử</h3>
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
                      <PhattuTable
                        findinput={findinput}
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
    
          {openAddModal && <AddModal closeModal={setOpenAddModal} token = {token}/>}
        
        </div>
      )
}
