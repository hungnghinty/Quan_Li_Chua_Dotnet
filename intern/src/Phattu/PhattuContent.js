import AddModal from '../Components/AddModal';
import Table from '../Components/Table';
import LoginModal from '../Components/LoginModal';
import { useState } from 'react';

export default function PhattuContent({token}) {
    const [openAddModal, setOpenAddModal] = useState(false)
    const [findinput, setFindInput] = useState('')


    return (
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

                        </div>
                    </div>
                    <div className='datatable'>
                        <Table findinput={findinput} />
                    </div>


                </div>
            </div>
            {openAddModal && <AddModal closeModal={setOpenAddModal} token = {token}/>}
        </div>
        
    )
}
