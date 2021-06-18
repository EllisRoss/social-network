import React from "react";
import defaultAva from '../../assets/images/defaultAva.png'
import styles from './Users.module.css';
import {NavLink} from "react-router-dom";
import {UserType} from "../../types/types";
import ToggleFollow from "./ToggleFollow/ToggleFollow";


type PropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    followingInProgress: Array<number>
    user: UserType
}

const User: React.FC<PropsType> = ({user, followingInProgress, unfollow, follow}) => {
    return (
        <div>
            <div className={styles.userItem}>
                <NavLink to={'/profile/' + user.id}>
                    <div className={styles.userInfo}>
                        <div>{user.name}</div>
                        <div>{user.status}</div>
                        <div>{'user.location.country'}</div>
                        <div>{'user.location.city'}</div>
                    </div>
                    <div>
                        <img alt={'user\'s avatar'} src={user.photos.small != null ? user.photos.small : defaultAva}
                             className={styles.userPhoto}/>
                    </div>
                </NavLink>
            </div>
            <div className={styles.followButton}>
                <ToggleFollow follow={follow} unfollow={unfollow} followingInProgress={followingInProgress} user={user} />
            </div>
        </div>
    );
}

export default User;