import { useState } from 'react';
import AddModal from './Components/AddModal';
import Table from './Components/Table';
import logo from './logo.svg';
import './CSS/style.css'
import LoginModal from './Components/LoginModal';
import PhattuContent from './Phattu/PhattuContent'
import DaotrangContent from './Daotrang/DaotrangContent';
import {Router, Route, Routes} from 'react-router-dom'
import ChuaContent from './Chua/ChuaContent';
import DondangkiContent from './Dondangky/DondangkyContent';

function App() {
  const [openLoginModal, setOpenLoginModal] = useState(true)
  

  const [token, setToken] = useState('')

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
              <a href="/phattu"><i className="fa-solid fa-house"></i>Phật Tử</a>
            </li>
            <li className="part">
              <a href="/daotrang"><i className="fa-regular fa-user"></i>Đạo Tràng</a>
            </li>
            <li className="part">
              <a href="/chua"><i className="fa-solid fa-circle-user"></i>Chùa</a>
            </li>
            <li className="part">
              <a href="/dondangki"><i className="fa-regular fa-user"></i>Đơn Đăng kí</a>
            </li>
          </ul>

          <Routes>
            <Route path='/phattu' element ={<PhattuContent token={token} />} />
            <Route path='/daotrang' element ={<DaotrangContent token={token} />}/>
            <Route path='/chua' element ={<ChuaContent token={token} />}/>
            <Route path='/dondangki' element ={<DondangkiContent token={token} />}/>
          </Routes>
        </div>

      </div>
      
      {/* {openLoginModal && <LoginModal closeModal={setOpenLoginModal} handleToken={handleToken} />} */}


    </div>
  );
}

export default App;
