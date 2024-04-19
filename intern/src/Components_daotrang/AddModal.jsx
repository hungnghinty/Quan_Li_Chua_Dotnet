import React, { useEffect, useState } from "react";
import "../CSS/AddModal.css";
import axios from "axios";
import { message } from 'antd'


export default function AddModal({ closeModal, token, setCount }) {
  //lay count
  const [data, setData] = useState([]);
  const [totalcount, setTotalCount] = useState();
  const userDataJSON = localStorage.getItem('userData');
  token =  JSON.parse(userDataJSON)

  useEffect(() => {
    axios
      .get(
        `https://localhost:44334/api/DaoTrang/getdanhsachdaotrang?pageNumb=1&pageSize=2`
      )
      .then((res) => {
        setTotalCount(res.data.pagination.totalCount);
      })
      .catch((er) => console.log(er));
    // }
  }, []);
  const [noitochuc, setNoiToChuc] = useState("");
  const [noidung, setNoiDung] = useState("");
  const [sothanhvienthamgia, setSoLuongThanhVien] = useState("");
  const [thoigiantochuc, setthoigiantochuc] = useState("");
  const [nguoitrutri, setNguoiTruTri] = useState("");
  const [daketthuc, setDaKetThuc] = useState(false);

  const postData = {
    daotrangid: totalcount,
    daketthuc,
    noidung,
    noitochuc,
    sothanhvienthamgia,
    thoigiantochuc,
    nguoitrutri,
  };

  const dataRequired = () => {
    const fields = {
      noitochuc: "nơi tổ chức",
      noidung: "nội dung",
      sothanhvienthamgia: "số thành viên tham gia",
      nguoitrutri: "số người chủ trì",
      thoigiantochuc: "thời gian tổ chức",
    };

    for (const field in fields) {
      if (!eval(field)) {
        alert(`Vui lòng điền ${fields[field]}`);
        return false;
      }
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (dataRequired()) {
      axios.post("https://localhost:44334/api/DaoTrang/themdaotrang", postData, {
          headers: {
            accept: "*/*",
            "Content-Type": "application/json",
            Authorization: `bearer ${token}`
          },
        })
        .then((res) => {
          message.success('Thêm đạo tràng thành công')
          setCount((prev) => prev + 1)
        })
        .catch((er) => {
          alert(er);
        });

      closeModal(false);
    }
  };

  return (
    <div className="modal-background">
      <div className="modal-container">
        <div className="modal-btnclose">
          <button
            onClick={() => {
              closeModal(false);
            }}
          >
            <i className="fa-solid fa-circle-xmark"></i>
          </button>
        </div>
        <div className="modal-title">
          <h1>Thêm Đạo Tràng</h1>
        </div>

        <div className="modal-body" onSubmit={handleSubmit}>
          <div className="input-group mb-3">
            <div></div>
            <div className="input-group-prepend">
              <span className="input-group-text" id="">
                Nơi tổ chức đạo tràng
              </span>
            </div>
            <input
              required
              type="text"
              className="form-control"
              placeholder="Nơi tổ chức"
              onChange={(e) => setNoiToChuc(e.target.value)}
            />
          </div>

          <div className="input-group">
            <div className="input-group-md">
              <span className="input-group-text" id="basic-addon1">
                Nội dung đạo tràng
              </span>
            </div>
          </div>
          <textarea
            required
            className="form-control mb-3"
            placeholder="Nội dung"
            aria-label="Nội dung"
            aria-describedby="basic-addon1"
            onChange={(e) => setNoiDung(e.target.value)}
            rows={4}
            style={{ resize: "none" }}
          ></textarea>

          <div className="input-group-prepend mb-3">
            <span className="input-group-text" id="basic-addon1">
              Số thành viên tham gia
            </span>
            <input
              required
              type="number"
              min="1"
              className="form-control"
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={(e) => setSoLuongThanhVien(e.target.value)}
            />
          </div>

          <div className="input-group-prepend mb-3">
            <span className="input-group-text" id="basic-addon1">
              Số người trụ trì
            </span>
            <input
              required
              type="number"
              min="1"
              className="form-control"
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={(e) => setNguoiTruTri(e.target.value)}
            />
          </div>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
                Thời gian tổ chức
              </span>
            </div>
            <input
              required
              type="datetime-local"
              className="form-control"
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={(e) => {
                setthoigiantochuc(e.target.value);
              }}
            />
          </div>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
                Đã kết thúc?
              </span>
            </div>
            <select
              className="custom-select"
              id="mydropdown"
              onChange={(e) => setDaKetThuc(e.target.value === "true")}
              value={daketthuc}
            >
              <option value="false">Chưa kết thúc</option>
              <option value="true">Đã kết thúc</option>
            </select>
          </div>
        </div>

        <div className="modal-footer">
          <button
            className="cancel"
            onClick={() => {
              closeModal(false);
            }}
          >
            Cancel
          </button>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
}