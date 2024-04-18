import React, { useState } from 'react'
import '../CSS/AddModal.css'
import axios from 'axios'


export default function EditModal({ closeModal , id, user, setCount}) {
    
    const [data, setData] = useState([])
    let formdata = new FormData()

    const userDataJSON = localStorage.getItem('userData');
    var token =  JSON.parse(userDataJSON)


    const [ho, setHo] = useState(user.ho)
    const [tendem, setTendem] = useState(user.tendem)
    const [ten, setTen] = useState(user.ten)
    const [anh, setAnh] = useState(user.anh)
    const [phapdanh, setPhapdanh] = useState(user.phapdanh)
    const [gioitinh, setGioitinh] = useState(user.gioitinh)
    const [email, setEmail] = useState(user.email)
    const [sdt, setSDT] = useState(user.sodienthoai)
    const [dahoantuc, setDahoantuc] = useState(user.dahoantuc)
    const [chuaid, setChuaid] = useState(user.chuaid)
    const [kieuthanhvienid, setKieuthanhvienid] = useState(user.kieuthanhvienid)
    const [password, setPassword] = useState(user.password)
    const [ngaysinh, setNgaysinh] = useState(user.ngaysinh)
    const [ngaycapnhat, setNgaycapnhat] = useState(user.ngaycapnhat)
    const [ngayhoantuc, setNgayhoantuc] = useState(user.ngayhoantuc)
    const [ngayxuatgia, setNgayxuatgia] = useState(user.ngayxuatgia)

    const handleDaHoanTuc = e => {
        setDahoantuc(!dahoantuc)
    }

    const hanldeAnhChup = (e) => {
        setAnh(e.target.files[0])
    }

    const handleSubmit = (e) => {
        
        e.preventDefault();
        // if(e.target && e.target.files[0]){
            
            formdata.append('Phattuid',id)
            formdata.append('Anhchup',anh)
            formdata.append('Dahoantuc',dahoantuc)
            formdata.append('Email',email)
            formdata.append('Gioitinh',gioitinh)
            formdata.append('Ho',ho)
            formdata.append('Ngaycapnhat',ngaycapnhat)
            formdata.append('Ngayhoantuc',ngayhoantuc)
            formdata.append('Ngaysinh',ngaysinh)
            formdata.append('Ngayxuatgia',ngayxuatgia)
            formdata.append('Password',password)
            formdata.append('Phapdanh',phapdanh)
            formdata.append('Sodienthoai',sdt)
            formdata.append('Ten',ten)
            formdata.append('Tendem',tendem)
            formdata.append('Chuaid',chuaid)
            formdata.append('Kieuthanhvienid',kieuthanhvienid)
            formdata.append('IsActive',true)
            console.log(ngaycapnhat);
        // }
        axios.post("https://localhost:44334/api/PhatTu/capnhatphattu", formdata,{
            headers: {
              "Content-Type": "multipart/form-data",
              "Authorization": `bearer ${token}`
            },
          })
          .then((res) => {
            setCount(prev => prev + 1)
          })
          .catch((er) => {
            alert(er);
          });
        closeModal(false)
    }
     

    return (
        <div className='modal-background'>

            <div className='modal-container'>
                <div className="modal-btnclose">
                    <button onClick={() => { closeModal(false) }}><i className="fa-solid fa-circle-xmark"></i></button>
                </div>
                <div className="modal-title">
                    <h1>Sửa Phật Tử</h1>
                </div>

                <div className="modal-body" onSubmit={handleSubmit}>

                    <div className="input-group mb-3">
                        <div></div>
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="">Họ | Tên đệm | Tên</span>
                        </div>
                        <input type="text" className="form-control" onChange={e => setHo(e.target.value)} value={ho} />
                        <input type="text" className="form-control" onChange={e => setTendem(e.target.value)} value={tendem} />
                        <input type="text" className="form-control" onChange={e => setTen(e.target.value)} value={ten}/>
                    </div>

                    <div>
                        <div className="custom-file mb-3 col-4">
                            <label className="custom-file-label" for="inputGroupFile01">Ảnh đại diện</label>
                            <input type="file" className="custom-file-input" id="inputGroupFile01" onChange={hanldeAnhChup} value={anh} />
                        </div>
                    </div>

                    <div className="input-group mb-3">
                        <div className="input-group-md">
                            <span className="input-group-text" id="basic-addon1">Pháp danh</span>
                        </div>
                        <input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" onChange={e => setPhapdanh(e.target.value)} value={phapdanh} />

                        <select className="custom-select mb-3" id="mydropdown" onChange={e => setGioitinh( +e.target.value)} value={gioitinh}>
                            <option defaultValue={2} >Gioi tinh</option>
                            <option value={0}>Nam</option>
                            <option value={1}>Nữ</option>
                            <option value={2}>Khác</option>
                        </select>
                    </div>

                    <div className="input-group mb-4">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">Email</span>
                        </div>
                        <input type="text" className="form-control" placeholder="Email" aria-label="Username" aria-describedby="basic-addon1" onChange={e => setEmail(e.target.value)} value={email} />

                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">Số điện thoại</span>
                        </div>
                        <input type="text" className="form-control" placeholder="Số điện thoại" aria-label="Username" aria-describedby="basic-addon1" onChange={e => setSDT(e.target.value)} value={sdt} />
                    </div>

                    <div className="input-group mb-3">
                        <div className="input-group-md">
                            <div className="input-group-text">
                                <input type="checkbox" aria-label="Checkbox for following text input" onChange={handleDaHoanTuc} value={dahoantuc}/>
                                <span>Đã hoàn tục</span>
                            </div>
                        </div>

                        <select className="custom-select mb-3" id="mydropdown" onChange={e => setChuaid( +e.target.value)} value={chuaid}>
                            <option defaultValue={0} >Chùa id</option>
                            <option value= {0} >0</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                        </select>

                        <select className="custom-select mb-3" id="mydropdown" onChange={e => setKieuthanhvienid( +e.target.value)} value={kieuthanhvienid}>
                            <option defaultValue={0} >Kiểu thành viên id</option>
                            <option value={0}>0</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                        </select>
                    </div>

                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">Ngày sinh</span>
                        </div>
                        <input type="date" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" onChange={e => setNgaysinh(e.target.value)} value={ngaysinh} />

                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">Ngày Cập Nhật</span>
                        </div>
                        <input type="date" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" onChange={e => setNgaycapnhat(e.target.value)} value={ngaycapnhat} />
                    </div>

                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">Ngày hoàn tục</span>
                        </div>
                        <input type="date" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" onChange={e => setNgayhoantuc(e.target.value)} value={ngayhoantuc}/>

                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">Ngày xuất gia</span>
                        </div>
                        <input type="date" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" onChange={e => setNgayxuatgia(e.target.value)} value={ngayxuatgia}/>
                    </div>

                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">Password</span>
                        <input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" onChange={e => setPassword(e.target.value)} value={password}/>
                    </div>
                </div>

                <div className="modal-footer">
                    <button className="cancel" onClick={() => { closeModal(false) }} >Cancel</button>
                    <button onClick={handleSubmit}>Submit</button>
                </div>
            </div>

        </div>
    )
}
