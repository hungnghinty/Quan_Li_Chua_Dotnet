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
import DondangkiContent from './don_dang_ky';

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
          
        </div>

        <div id="main"> 
          <div className='sidebar-wrapper'>
            <button className="navbar-toggler" data-toggle="collapse" data-target="#sidebar-content">
                  <i className="fa-solid fa-bars"></i>
            </button>
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
          </div>

          <Routes>
            <Route path='/phattu' element ={<PhattuContent token={token} />} />
            <Route path='/daotrang' element ={<DaotrangContent token={token} />}/>
            <Route path='/chua' element ={<ChuaContent token={token} />}/>
            <Route path='/dondangki' element = {<DondangkiContent/>}/>
            <Route path='/' element ={<LoginModal />} />
          </Routes>
        </div>

      </div>
      
      {/* {openLoginModal && <LoginModal closeModal={setOpenLoginModal} handleToken={handleToken} />} */}
    </div>

  );
}

export default App;