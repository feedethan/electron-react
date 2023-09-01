import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import Theme from '../components/theme';

import icon from '../../../assets/icon.svg';
import styles from './wrap.module.css';

function Wrap() {
  return (
    <div className={styles.wrap}>
      <div className={styles.head}>
        <img width="200" alt="icon" src={icon} />
        <Theme />
      </div>
      <h1>electron-react-boilerplate</h1>
      <div className={styles.nav}>
        <NavLink to="/home">通信</NavLink>
        <NavLink to="/store">Store</NavLink>
        <NavLink to="/timer">番茄钟</NavLink>
        <NavLink to="/remote-control">远程控制</NavLink>
      </div>
      <Outlet />
    </div>
  );
}

export default Wrap;
