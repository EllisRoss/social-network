import React from "react";
import styles from './Navbar.module.css';
import {NavLink} from "react-router-dom";
import FriendListContainer from "./FriendList/FriendListContainer";

const Navbar = () => {
    return (
        <nav className={styles.nav}>
            <div className={styles.navBarMenu}>
                <div className={styles.item}>
                    <NavLink to='/profile' activeClassName={styles.active}>
                        Profile</NavLink>
                </div>
                <div className={styles.item}>
                    <NavLink to='/dialogs' activeClassName={styles.active}>
                        Messages</NavLink>
                </div>
                <div className={styles.item}>
                    <NavLink to='/news' activeClassName={styles.active}>
                        News</NavLink>
                </div>
                <div className={styles.item}>
                    <NavLink to='/music' activeClassName={styles.active}>
                        Music</NavLink>
                </div>

                <br/>

                <div className={styles.item}>
                    <NavLink to='/users' activeClassName={styles.active}>
                        Users</NavLink>
                </div>

                <br/>

                <div className={styles.item}>
                    <NavLink to='/settings' activeClassName={styles.active}>
                        Settings</NavLink>
                </div>

                <br/>

                <FriendListContainer/>
            </div>
        </nav>
    );
}

export default Navbar;
