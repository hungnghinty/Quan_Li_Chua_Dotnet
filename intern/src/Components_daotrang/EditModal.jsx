import React, { useState } from "react";
import "../CSS/AddModal.css";
import axios from "axios";

export default function EditModal({ closeModal, id, user }) {
  const [noitochuc, setNoiToChuc] = useState(user.noitochuc);
  const [noidung, setNoiDung] = useState(user.noidung);
  const [sothanhvienthamgia, setSoLuongThanhVien] = useState(
    user.sothanhvienthamgia
  );
  const [thoigiantochuc, setthoigiantochuc] = useState(user.thoigiantochuc);
  const [nguoitrutri, setNguoiTruTri] = useState(user.nguoitrutri);
  const [daketthuc, setDaKetThuc] = useState(user.daketthuc);

  const postData = {
    daotrangid: id,
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
      axios
        .post(
          "https://localhost:44334/api/DaoTrang/capnhatdaotrang",
          postData,
          {
            headers: {
              accept: "*/*",
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          alert("Sửa thành công");
          window.location.reload();
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
          <h1>Cập nhật Đạo Tràng</h1>
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
              value={noitochuc}
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
            value={noidung}
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
              value={sothanhvienthamgia}
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
              value={nguoitrutri}
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
              value={thoigiantochuc}
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
