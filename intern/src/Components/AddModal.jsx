import React, { useEffect, useState } from 'react'
import '../CSS/AddModal.css'
import axios from 'axios'


export default function AddModal({ closeModal,token}) {
    //lay count
    const [data, setData] = useState([])
    const [totalcount, setTotalCount] = useState()

    useEffect(() => {
            axios.get(`https://localhost:44334/api/PhatTu/laydanhsachphattu?pageNumb=1&pageSize=2`)
                .then(res => {
                    setTotalCount(res.data.pagination.totalCount)
                })
                .catch(er => console.log(er))
        // }
    }, [])
    //them du lieu
    let formdata = new FormData()

    const [ho, setHo] = useState('')
    const [tendem, setTendem] = useState('')
    const [ten, setTen] = useState('')
    const [anh, setAnh] = useState()
    const [phapdanh, setPhapdanh] = useState('')
    const [gioitinh, setGioitinh] = useState()
    const [email, setEmail] = useState('')
    const [sdt, setSDT] = useState('')
    const [dahoantuc, setDahoantuc] = useState(false)
    const [chuaid, setChuaid] = useState()
    const [kieuthanhvienid, setKieuthanhvienid] = useState()
    const [password, setPassword] = useState('')
    const [ngaysinh, setNgaysinh] = useState()
    const [ngaycapnhat, setNgaycapnhat] = useState()
    const [ngayhoantuc, setNgayhoantuc] = useState()
    const [ngayxuatgia, setNgayxuatgia] = useState()

    const handleDaHoanTuc = e => {
        setDahoantuc(!dahoantuc)
    }

    const hanldeAnhChup = (e) => {
        setAnh(e.target.files[0])
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // if(e.target && e.target.files[0]){
            formdata.append('Phattuid',totalcount)
            formdata.append('Anhchup',anh)
            formdata.append('Dahoantuc',true)
            formdata.append('Email','nguyenhungpv201203@gmail.com')
            formdata.append('Gioitinh','0')
            formdata.append('Ho','ho')
            formdata.append('Ngaycapnhat','2023/08/04')
            formdata.append('Ngayhoantuc','2023/08/04')
            formdata.append('Ngaysinh','2023/08/04')
            formdata.append('Ngayxuatgia','2023/08/04')
            formdata.append('Password',"123")
            formdata.append('Phapdanh','phapdanh')
            formdata.append('Sodienthoai','0123456879')
            formdata.append('Ten','ten')
            formdata.append('Tendem','tendem')
            formdata.append('Chuaid','1')
            formdata.append('Kieuthanhvienid','1')
            formdata.append('IsActive',true)
            
        // }
        const id = data[data.length] - 1
        axios.post("https://localhost:44334/api/PhatTu/themphattu", formdata,{
            headers: {
              "Content-Type": "multipart/form-data",
              "Authorization": `bearer ${token}`,
            },
          })
        .then(res => console.log(res))
        .catch(er => console.log(er))

        closeModal(false)
    }
     

    return (
        <div className='modal-background'>

            <div className='modal-container'>
                <div className="modal-btnclose">
                    <button onClick={() => { closeModal(false) }}><i className="fa-solid fa-circle-xmark"></i></button>
                </div>
                <div className="modal-title">
                    <h1>Thêm Phật Tử</h1>
                </div>

                <div className="modal-body" onSubmit={handleSubmit}>

                    <div className="input-group mb-3">
                        <div></div>
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="">Họ | Tên đệm | Tên</span>
                        </div>
                        <input type="text" className="form-control" onChange={e => setHo(e.target.value)} />
                        <input type="text" className="form-control" onChange={e => setTendem(e.target.value)} />
                        <input type="text" className="form-control" onChange={e => setTen(e.target.value)} />
                    </div>

                    <div>
                        <div className="custom-file mb-3 col-4">
                            <label className="custom-file-label" for="inputGroupFile01">Ảnh đại diện</label>
                            <input type="file" className="custom-file-input" id="inputGroupFile01" onChange={hanldeAnhChup} />
                        </div>
                    </div>

                    <div className="input-group mb-3">
                        <div className="input-group-md">
                            <span className="input-group-text" id="basic-addon1">Pháp danh</span>
                        </div>
                        <input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" onChange={e => setPhapdanh(e.target.value)} />

                        <select className="custom-select mb-3" id="mydropdown" onChange={e => setGioitinh( +e.target.value)}>
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
                        <input type="text" className="form-control" placeholder="Email" aria-label="Username" aria-describedby="basic-addon1" onChange={e => setEmail(e.target.value)} />

                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">Số điện thoại</span>
                        </div>
                        <input type="text" className="form-control" placeholder="Số điện thoại" aria-label="Username" aria-describedby="basic-addon1" onChange={e => setSDT(e.target.value)} />
                    </div>

                    <div className="input-group mb-3">
                        <div className="input-group-md">
                            <div className="input-group-text">
                                <input type="checkbox" aria-label="Checkbox for following text input" onChange={handleDaHoanTuc} />
                                <span>Đã hoàn tục</span>
                            </div>
                        </div>

                        <select className="custom-select mb-3" id="mydropdown" onChange={e => setChuaid( +e.target.value)}>
                            <option defaultValue={0} >Chùa id</option>
                            <option value= {0} >0</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                        </select>

                        <select className="custom-select mb-3" id="mydropdown" onChange={e => setKieuthanhvienid( +e.target.value)}>
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
                        <input type="date" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" onChange={e => setNgaysinh(e.target.value)} />

                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">Ngày Cập Nhật</span>
                        </div>
                        <input type="date" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" onChange={e => setNgaycapnhat(e.target.value)} />
                    </div>

                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">Ngày hoàn tục</span>
                        </div>
                        <input type="date" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" onChange={e => setNgayhoantuc(e.target.value)} />

                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">Ngày xuất gia</span>
                        </div>
                        <input type="date" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" onChange={e => setNgayxuatgia(e.target.value)}/>
                    </div>

                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">Password</span>
                        <input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" onChange={e => setPassword(e.target.value)} />
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
