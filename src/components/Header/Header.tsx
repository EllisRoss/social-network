import React from "react";
import styles from './Header.module.css'
import {Avatar, Button} from "antd";
import {Header} from "antd/lib/layout/layout";
import {UserOutlined} from '@ant-design/icons';
import {useDispatch, useSelector} from "react-redux";
import {selectIsAuth, selectLogin} from "../../redux/authSelectors";
import {selectProfile} from "../../redux/profileSelectors";
import {logoutThunkCreator} from "../../redux/authReducer";

export const AppHeader: React.FC = () => {
    const isAuth = useSelector(selectIsAuth);
    const login = useSelector(selectLogin);
    const dispatch = useDispatch();
    const onClickLogout = () => {
        dispatch(logoutThunkCreator());
    }

    return (
        <Header className="site-layout-background" style={{padding: 0}}>
            <div className={styles.loginBlock}>
                {isAuth &&
                <div>
                    {/*{profile?.photos && <Avatar src={profile.photos.small}/>}*/}
                    {/*{!profile?.photos && <Avatar icon={<UserOutlined/>}/>}*/}
                    <span className={styles.fullName}>{login}</span>
                    <Button onClick={onClickLogout}>Log out</Button>
                </div>
                }
            </div>
        </Header>
    );
}
