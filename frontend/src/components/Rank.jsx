import React, { useEffect, useState } from "react";
import fetchData, { BASE_URL } from "../common/fetchData";
import { Table, Avatar } from "antd";
import order1 from "../img/order1.png";
import order2 from "../img/order2.png";
import order3 from "../img/order3.png";
import pic1 from "../img/pic1.png";
import jb from "../img/jb.png";
import sty from "./Rank.module.css";

const columns = [
  {
    title: "Ranking",
    dataIndex: "Ranking",
    key: "Ranking",
    align: "center",
    render: (text, record, order) => {
      if (order == 0) {
        return (
          <img
            style={{
              width: 40,
            }}
            src={order1}
          />
        );
      }
      if (order == 1) {
        return (
          <img
            style={{
              width: 40,
            }}
            src={order2}
          />
        );
      }
      if (order == 2) {
        return (
          <img
            style={{
              width: 40,
            }}
            src={order3}
          />
        );
      }
      return (
        <span
          style={{
            color: "#888",
          }}
        >
          {order + 1}
        </span>
      );
    },
  },
  {
    title: "Avatar",
    dataIndex: "avatar",
    align: "center",
    key: "avatar",
    render: (t, record) => {
      return (
        <Avatar
          style={{
            backgroundColor: "#f56a00",
          }}
          src={BASE_URL + record.user.headpic}
        />
      );
    },
  },
  {
    title: "Name",
    dataIndex: "name",
    align: "center",
    key: "name",
    render: (text, record) => {
      return record.user.name;
    },
  },
  {
    title: "Number",
    dataIndex: "number",
    align: "center",
    key: "number",
    render: (text, record) => {
      return record.totalRightNum;
    },
  },
];
export default function Rank() {
  const [tableData, setTableData] = useState([

  ]);

  const getData = async () => {
    const res = await fetchData({
      url: `/record/rank`,
      method: "get",
    });
    console.log("res111 = ", res);
    setTableData(res.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={sty.box}>
      <div className={sty.rankHead}>
        <div className={sty.rankTit}>Ranking Based on Correct Answers</div>
        <img src={jb} className={sty.jb} />
      </div>

      <Table
        className={sty.table}
        dataSource={tableData}
        pagination={false}
        columns={columns}
      />
    </div>
  );
}
