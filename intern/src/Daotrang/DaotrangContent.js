import AddModal from "../Components_daotrang/AddModal";
import Table from "../Components_daotrang/Table";
import LoginModal from "../Components_daotrang/LoginModal";
import DaoTrangTable from "../Components_daotrang/DaoTrangTable"
import { useState } from "react";
import "../CSS/style.css";
import { Input, Select, Button, Dropdown, Menu } from "antd";
const { Option } = Select;

export default function DaotrangContent({ token }) {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [findinput, setFindInput] = useState("");
  const [count, setCount] = useState(0)
  const [totalPage, setTotalPage] = useState()

  return (
    <div className="container">
      <div>
        <div id="main">
          <div className="content">
            <div className="path">
              <a href="#">Đạo tràng</a>
            </div>

            <div className="find">
              <div className="find-bar">
                <h3>Tìm kiếm Đạo tràng</h3>
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
                  style={{ marginLeft: "16px" }}
                  onClick={() => {
                    setOpenAddModal(true);
                  }}
                >
                  Thêm
                  <span>
                    <i className="fa-solid fa-plus"></i>
                  </span>
                </Button>

                <div className="datatable" style={{ marginTop: "8px" }}>
                  <DaoTrangTable
                    findinput={findinput}
                    // setLatestId={setLatestId}
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

      {openAddModal && <AddModal closeModal={setOpenAddModal} token = {token} setCount = {setCount}/>}
    </div>
  );
}