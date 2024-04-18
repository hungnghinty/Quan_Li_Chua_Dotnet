import { useState, useEffect, useRef } from 'react';
import { Radio, Space, Table, Tag, Button, Modal, Cascader, DatePicker, Form, Input, InputNumber, Select, Switch, TreeSelect, } from 'antd';
import { SearchOutlined, EditOutlined, DeleteOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios'
import logo from './logo.svg';

function DondangkiContent() {
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [phattu, setPhattu] = useState({})
  const [dondk, setDondk] = useState({})
  const [search, setSearch] = useState("")
  const [dsphattu, setDsphattu] = useState([])
  const [dsDaotrang, setDsdaotrang] = useState([])
  const [token, setToken] = useState("")
  const [form] = Form.useForm();

  const getDsphattu = ()=>{
    const userDataJSON = localStorage.getItem('userData');
    var tk =  JSON.parse(userDataJSON)

    axios.get(`https://localhost:44334/api/PhatTu/laydanhsachphattu?pageSize=100`,  {headers: {
      Authorization: `bearer ${tk}`
    }})
          .then(res => {
              var result = res.data.data
              result = Array.from(result)
              console.log(result)
              setDsphattu(result)
          })
          .catch(er => console.log(er))
  }

  const getDsdaotrang = ()=>{
    axios.get(`https://localhost:44334/api/DaoTrang/getdanhsachdaotrang?pageSize=100`)
          .then(res => {
              var result = res.data.data
              result = Array.from(result)
              console.log(result)
              setDsdaotrang(result)
          })
          .catch(er => console.log(er))
  }

  const getDatas = ()=>{
    console.log(search)
    axios.get(`https://localhost:44334/api/DonDangKy/getdanhsachdondangki?pageSize=10&keyword=${search}`)
          .then(res => {
              var result = res.data.data
              result = Array.from(result)
              console.log(result)
              console.log(data)
              setData(result)
          })
          .catch(er => console.log(er))
  }

  const [isModalCheckOpen, setIsModalCheckOpen] = useState(false);
  const showModalCheck = () => {
    setIsModalCheckOpen(true);
  };
  const handleOkCheck = () => {
    axios.post(`https://localhost:44334/api/DonDangKy/duyetdondangky/${dondk.dondangkyid}`, null, {headers: {
      Authorization: `bearer ${token}`
    }})
      .then(res => {
        getDatas()
        setIsModalCheckOpen(false);
      })
      .catch(error => {
        console.error('Có lỗi xảy ra:', error);
      });
  };
  const handleCancelCheck = () => {
    setIsModalCheckOpen(false);
  };

  const [isModalViewOpen, setIsModalViewOpen] = useState(false);
  const showModalView = () => {
    setIsModalViewOpen(true);
  };
  const handleOkView = () => {
    setIsModalViewOpen(false);
  };
  const handleCancelView = () => {
    setIsModalViewOpen(false);
  };

  console.log(token)

  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [ngaytaoSua, setNgaytaoSua] = useState(null);
  const [ngayduyetSua, setNgayduyetSua] = useState(null);
  const [selectStatusSua, setSelectStatusSua] = useState('0');
  const showModalEdit = () => {
    setIsModalEditOpen(true);
  };
  const handleOkEdit = () => {
    let ngaytao = ngaytaoSua ? ngaytaoSua.format("YYYY-MM-DD") : ""
    let ngayduyet = ngayduyetSua ? ngayduyetSua.format("YYYY-MM-DD") : ""
    let selectStatus = parseInt(selectStatusSua)

    let update_data = {
      ngayguidon: ngaytao ? ngaytao : dondk.ngayguidon,
      ngayxuly: ngayduyet ? ngayduyet : dondk.ngayxuly,
      nguoixuly: dondk.nguoixuly,
      phattuid: dondk.phattuid,
      trangthaidon: selectStatus,
      daotrangid: dondk.daotrangid,
      dondangkyid: dondk.dondangkyid,
    }

    axios.post(`https://localhost:44334/api/DonDangKy/capnhatdondangky/`, update_data, {headers: {
      Authorization: `bearer ${token}`
    }})
      .then(res => {
        getDatas()
        setIsModalEditOpen(false);
      })
      .catch(error => {
        console.error('Có lỗi xảy ra:', error);
      });
  };
  const handleCancelEdit = () => {
    setIsModalEditOpen(false);
  };

  const formatDate = (date) => {
      const year = date.getFullYear();
      let month = date.getMonth() + 1;
      if (month < 10) {
          month = '0' + month;
      }
      let day = date.getDate();
      if (day < 10) {
          day = '0' + day;
      }
      return `${year}-${month}-${day}`;
  };
  

  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const showModalAdd = () => {
    getDsphattu();
    getDsdaotrang();
    setIsModalAddOpen(true);
  };
  const handleOkAdd = () => {
    form
      .validateFields()
      .then(values => {
        console.log('Form values:', values)
        let add_data = {
          dondangkyid: Math.floor(Math.random() * 100),
          ngayguidon: formatDate(new Date(values.ngaytao)),
          ngayxuly: formatDate(new Date(values.ngayxuly)),
          nguoixuly: 1,
          phattuid: values.phattu,
          trangthaidon: 0,
          daotrangid: values.daotrang,
        }
    
        axios.post(`https://localhost:44334/api/DonDangKy/themdondangky`, add_data, {headers: {
          Authorization: `bearer ${token}`
        }})
          .then(res => {
            getDatas()
            setIsModalAddOpen(false);
          })
          .catch(error => {
            console.error('Có lỗi xảy ra:', error);
          });
      })
      .catch(errorInfo => {
        console.error('Validation failed:', errorInfo); // Xử lý lỗi nếu có
      });
    
  };
  const handleCancelAdd = () => {
    setIsModalAddOpen(false);
  };


  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const showModalDelete = () => {
    setIsModalDeleteOpen(true);
  };
  const handleOkDelete = () => {
    axios.delete(`https://localhost:44334/api/DonDangKy/xoadondangky/${dondk.dondangkyid}`, {headers: {
      Authorization: `bearer ${token}`
    }})
      .then(res => {
        getDatas()
        setIsModalDeleteOpen(false);
      })
      .catch(error => {
        console.error('Có lỗi xảy ra:', error);
      }); 
  };
  const handleCancelDelete = () => {
    setIsModalDeleteOpen(false);
  };

  

  useEffect(() =>{
    getDatas();
    const userDataJSON = localStorage.getItem('userData');
    setToken(JSON.parse(userDataJSON))
  }, [page, search]);

  console.log(token)


  const handleClickView = (record) =>{
    setPhattu(record.phattu)
    showModalView()
  }

  const handleClickCheck = (record) =>{
    setDondk(record)
    setPhattu(record.phattu)
    showModalCheck()
  }

  const handleClickEdit = (record) =>{
    setDondk(record)
    showModalEdit()
  }

  const handleClickDelete = (record) =>{
    setDondk(record)
    showModalDelete()
  }

  const handleClickAdd = () =>{
    setDondk({})
    showModalAdd()
  }
  
  const columns = [
    {
      title: 'ID',
      dataIndex: 'dondangkyid',
      key: 'dondangkyid',
      render: (text) => <a>MSDDK{text}</a>,
    },
    {
      title: 'Ngày gửi đơn',
      dataIndex: 'ngayguidon',
      key: 'ngayguidon',
      render: (ngayguidon) => {
        const formattedDate = new Date(ngayguidon).toLocaleDateString('vi-VN');
        return <span>{formattedDate}</span>;
      }
    },
    {
      title: 'Ngày xử lý',
      dataIndex: 'ngayxuly',
      key: 'ngayxuly',
      render: (ngayxuly) => {
        const formattedDate = new Date(ngayxuly).toLocaleDateString('vi-VN');
        return <span>{formattedDate}</span>;
      }
    },
    {
      title: 'Phật tử',
      dataIndex: 'phattu',
      key: 'phattu',
      render: (phattu) => {
        return <span>{phattu.ho} {phattu.tendem} {phattu.ten}</span>;
      }
    },
    {
      title: 'Trạng thái',
      key: 'trangthaidon',
      dataIndex: 'trangthaidon',
      render: (trangthaidon) => {
        if (trangthaidon == 0) {
          return (
            <Tag color="#2db7f5">Chưa xử lý</Tag>
          )
        } else if (trangthaidon == 1) {
          return (
            <Tag color="#87d068">Đã xử lý</Tag>
          )
        } else if (trangthaidon == 2) {
          return (
            <Tag color="#f50">Đã hủy</Tag>
          )
        }
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: (text,record) => (
        <Space >
          <Button size='small' onClick={() =>handleClickView(record)}  icon={<EyeOutlined />} style={{ color: '#0958d9', borderColor:"#0958d9" }}></Button>
          <Button size='small' onClick={() =>handleClickEdit(record)} icon={<EditOutlined />}></Button>
          <Button size='small' onClick={() =>handleClickDelete(record)} icon={<DeleteOutlined />} danger></Button>
          {record.trangthaidon == 0 ? <Button size='small' type="primary" onClick={() =>handleClickCheck(record)}>Duyệt</Button> : <Button size='small' disabled >Duyệt</Button>}
        </Space>
      ),
    },
  ];


  return (
    <div className="container">
      

      <div>


          <div className="content">
            <div className="find">
              <div style={{display:"flex", justifyContent: "space-between"}}> 
                <Input value={search} onChange={e => setSearch(e.target.value)} style={{width: 500}} placeholder="Tìm kiếm..." />
                <Button  onClick={() =>handleClickAdd()} icon={<PlusOutlined />} type="primary">Thêm mới</Button>
              </div>
            </div>

            <div className="list">
              <div className="list-nav" >
                <div className='datatable'>
                  <Table
                    columns={columns}
                    // pagination={{
                    //   position: [top, bottom],
                    // }}
                    dataSource={data}
                  />
                </div>


              </div>
            </div>
          </div>

        </div>
      <Modal title="Duyệt đơn đăng ký" open={isModalCheckOpen} onOk={handleOkCheck} onCancel={handleCancelCheck} centered>
        <div>Họ tên: {phattu.ho} {phattu.tendem} {phattu.ten}</div>
        <div>Pháp danh: {phattu.phapdanh}</div>
      </Modal>

      <Modal title="Chi tiết phật tử" open={isModalViewOpen} onOk={handleOkView} onCancel={handleCancelView} centered>
        <div>Họ tên: {phattu.ho} {phattu.tendem} {phattu.ten}</div>
        <div>Pháp danh: {phattu.phapdanh}</div>
        <div>Ngày sinh: {new Date(phattu.ngaysinh).toLocaleDateString('vi-VN')}</div>
        <div>Sđt: {phattu.sodienthoai}</div>
        <div>Email: {phattu.email}</div>
      </Modal>

      <Modal title="Xóa đơn đăng ký" open={isModalDeleteOpen} onOk={handleOkDelete} onCancel={handleCancelDelete} centered>
      </Modal>

      <Modal title="Sửa đơn đăng ký" open={isModalEditOpen} onOk={handleOkEdit} onCancel={handleCancelEdit} centered>
        <div style={{ margin: "8px 0"}}>
          <span>Ngày gửi đơn: </span>
          <DatePicker value = {ngaytaoSua} onChange={date => setNgaytaoSua(date)}/>
        </div>
        <div style={{ margin: "8px 0"}}>
          <span>Ngày xử lý: </span>
          <DatePicker value = {ngayduyetSua} onChange={date => setNgayduyetSua(date)}/>
        </div>
        <div style={{ margin: "8px 0"}}>
          <span>Trạng thái: </span>
          <Select value = {selectStatusSua} onChange={value => setSelectStatusSua(value)}>
            <Select.Option value="0">Chờ xử lý</Select.Option>
            <Select.Option value="1">Đã duyệt</Select.Option>
            <Select.Option value="2">Đã hủy</Select.Option>
          </Select>

        </div>
      </Modal>

      <Modal title="Tạo mới đơn đăng ký" open={isModalAddOpen} onOk={handleOkAdd} onCancel={handleCancelAdd} centered>
        <Form
          form={form}
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          // initialValues={{
          //   size: componentSize,
          // }}
          // onValuesChange={onFormLayoutChange}
          // size={componentSize}
          style={{
            maxWidth: 600,
          }}
        >
          <Form.Item label="Phật tử" name="phattu">
            <Select>
              {dsphattu && dsphattu.map(value=><Select.Option value={value.phattuid}>{value.email}</Select.Option>)}
            </Select>
          </Form.Item>
          <Form.Item label="Đạo tràng" name="daotrang">
            <Select>
              {dsDaotrang && dsDaotrang.map(value=><Select.Option value={value.daotrangid}>{value.noidung}</Select.Option>)}
            </Select>
          </Form.Item>
          <Form.Item label="Ngày tạo đơn" name="ngaytao">
            <DatePicker />
          </Form.Item>
          <Form.Item label="Ngày xử lý" name="ngayxuly">
            <DatePicker />
          </Form.Item>
        </Form>
      </Modal>

    </div>
  );
}

export default DondangkiContent;
