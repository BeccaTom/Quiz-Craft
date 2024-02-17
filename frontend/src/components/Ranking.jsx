import React, { useEffect, useState } from 'react';
import { Table, Avatar } from 'antd';
import fetchData, { BASE_URL } from '../common/fetchData';
import order1 from '../img/order1.png';
import order2 from '../img/order2.png';
import order3 from '../img/order3.png';
import jb from '../img/jb.png';
import sty from './Ranking.module.css';

/* Rank: The rankings page displays a leaderboard
of all users in the database and their all-time
scores (the more correct answers they have, the higher
their ranking will be). The top three users have a
gold, silver, or bronze crown by their name. */

const columns = [
  {
    title: 'Ranking',
    dataIndex: 'Ranking',
    key: 'Ranking',
    align: 'center',
    render: (text, record, order) => {
      if (order === 0) {
        return (
          <img
            style={{
              width: 40,
            }}
            src={order1}
            alt="First Place Crown"
          />
        );
      }
      if (order === 1) {
        return (
          <img
            style={{
              width: 40,
            }}
            alt="Second Place Crown"
            src={order2}
          />
        );
      }
      if (order === 2) {
        return (
          <img
            style={{
              width: 40,
            }}
            src={order3}
            alt="Third Place Crown"
          />
        );
      }
      return (
        <span
          style={{
            color: '#888',
          }}
        >
          {order + 1}
        </span>
      );
    },
  },
  {
    title: 'Avatar',
    dataIndex: 'avatar',
    align: 'center',
    key: 'avatar',
    render: (t, record) => (
      <Avatar
        style={{
          backgroundColor: '#f56a00',
        }}
        src={BASE_URL + record.user.headpic}
      />
    ),
  },
  {
    title: 'Name',
    dataIndex: 'name',
    align: 'center',
    key: 'name',
    render: (text, record) => record.user.name,
  },
  {
    title: 'Number',
    dataIndex: 'number',
    align: 'center',
    key: 'number',
    render: (text, record) => record.totalRightNum,
  },
];
export default function Ranking() {
  const [tableData, setTableData] = useState([

  ]);

  const getData = async () => {
    const res = await fetchData({
      url: '/record/rank',
      method: 'get',
    });
    setTableData(res.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={sty.box}>
      <div className={sty.rankHead}>
        <div className={sty.rank}>Ranking Based on Correct Answers</div>
        <img src={jb} className={sty.jb} alt="Trophy" />
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
