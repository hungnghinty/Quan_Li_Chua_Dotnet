import { useState } from 'react';
import AddModal from './Components/AddModal';
import Table from './Components/Table';
import logo from './logo.svg';
import './CSS/style.css'
import LoginModal from './Components/LoginModal';

function App() {
  const [openLoginModal, setOpenLoginModal] = useState(true)
  const [openAddModal, setOpenAddModal] = useState(false)

  const [token, setToken] = useState('')

  const [findinput, setFindInput] = useState('')

  const handleToken = (loginToken) => {
    setToken(loginToken)
  }


  return (
    <div className="container">


      <div>
        <div className="header">
          <button className="navbar-toggler" data-toggle="collapse" data-target="#sidebar-content">
            <i className="fa-solid fa-bars"></i>
          </button>
          <img className="lts_logo" src="https://lotusacademy.edu.vn/assets/images/lotusacademy/Logo%20LTS%20Edu-01.png" alt="anhcongty" />
          <div className="more" >
            <h2 className="more self-name">User</h2>
            <button className="more self-inform" data-toggle="collapse" data-target="#">
              <i className="fa-solid fa-desktop"></i>
            </button>
            <button className="more self-message" data-toggle="collapse" data-target="#">
              <i className="fa-solid fa-message"></i>
            </button>
            <button className="more self-dropdown" data-toggle="collapse" data-target="#">
              <i className="fa-solid fa-circle-chevron-down"></i>
            </button>

          </div>
        </div>

        <div id="main">
          <ul className="sidebar" id="sidebar-content">
            <li className="part">
              <a href="#"><i className="fa-solid fa-house"></i>Phật Tử</a>
            </li>
            <li className="part">
              <a href="#"><i className="fa-regular fa-user"></i>Đạo Tràng</a>
            </li>
            <li className="part">
              <a href="#"><i className="fa-solid fa-circle-user"></i>Chùa</a>
            </li>
            <li className="part">
              <a href="#"><i className="fa-regular fa-user"></i>Đơn Đăng kí</a>
            </li>
            <li className="part">
              <a href="#"><i className="fa-solid fa-list"></i>Thông tin cá nhân</a>
            </li>
          </ul>


          <div className="content">
            <div className="path">
              <a href="#">Home</a>
            </div>

            <div className="find">
              <div className="find-bar">
                <h3 >Tim kiem phat tu</h3>
                <button className="find-bar find-now" >
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </div>
              <div className="find-input">
                <form className="row">
                  <div className="input-group col-sm-3">
                    <input type="text" placeholder="Tìm kiếm" onChange={e => setFindInput(e.target.value)} className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" />
                  </div>

                </form>
              </div>
            </div>

            <div className="list">
              <div className="list-nav" >
                <select className="custom-select col-sm-3">
                  <option selected>hien thi 1-5 of 6</option>
                </select>
                <button className="them" onClick={() => { setOpenAddModal(true) }}>
                  Thêm
                  <i className="fa-solid fa-plus"></i>
                </button>


                <div className="dropdown show" >
                  <a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Sap xep
                  </a>

                  <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <a className="dropdown-item" href="#">Action</a>
                    <a className="dropdown-item" href="#">Another action</a>
                    <a className="dropdown-item" href="#">Something else here</a>
                  </div>
                </div>
                <div className='datatable'>
                  <Table findinput = {findinput} />
                </div>


              </div>
            </div>
          </div>

        </div>

      </div>
      {openAddModal && <AddModal closeModal={setOpenAddModal} token = {token}/>}
      {openLoginModal && <LoginModal closeModal={setOpenLoginModal} handleToken={handleToken} />}


    </div>
  );
}

export default App;
