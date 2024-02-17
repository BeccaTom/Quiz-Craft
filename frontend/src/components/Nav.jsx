import React, { useEffect, useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { Button, Avatar } from 'antd';
import { ShareAltOutlined } from '@ant-design/icons';
import { BASE_URL } from '../common/fetchData';
import sty from './Nav.module.css';

/* Nav: The nav bar displays three options: Home (homepage), Rank (rankings page),
and Manage Questions (question manager page). */

export default function Nav() {
  const navigate = useNavigate();
  const navList = [
    {
      title: 'Home',
      path: '/',
    },
    {
      title: 'Ranking',
      path: '/rank',
    },
    {
      title: 'Manage Questions',
      path: '/question',
    },
  ];
  const [userinfo, setUserinfo] = useState(null);
  const logoutHandler = async () => {
    window.localStorage.removeItem('userinfo');
    navigate('/login');
  };
  useEffect(() => {
    if (!window.localStorage.userinfo) {
      navigate('/login');
    } else {
      setUserinfo(JSON.parse(window.localStorage.userinfo));
    }
  }, []);

  return (
    <header className={sty.box}>
      <div className={sty.nav}>
        <nav className={sty.navBox}>
          <div className={sty.navLeft}>
            <ShareAltOutlined
              onClick={() => {
                navigate('/');
              }}
              className={sty.logo}
            />
            <div className={sty.navTit}>QuizCraft</div>
            {navList.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  navigate(item.path);
                }}
                className={sty.navLink}
              >
                {item.title}
              </div>
            ))}
          </div>
          <div className={sty.navRight}>
            {userinfo?.name}
            <Avatar
              style={{
                margin: '0 20px',
                background: 'orange',
              }}
              src={BASE_URL + userinfo?.headpic}
            />
            <Button onClick={logoutHandler} size="small" type="primary" danger>
              Logout
            </Button>
          </div>
        </nav>
      </div>

      <main className={sty.mainBox}>
        <Outlet />
      </main>
    </header>
  );
}
