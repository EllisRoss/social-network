import React from 'react';
import styles from './FriendList.module.css';
import defaultAva from "../../../assets/images/defaultAva.png";
import {NavLink} from "react-router-dom";
import {PhotosType} from '../../../types/types';

type FriendProps = {
    id: number,
    photos: PhotosType
    name: string,
}

const Friend: React.FC<FriendProps> = (props) => {

    let decreaseName = (str: string): string => {
        if (str.length > 7) {
            let newStr = str.slice(0, 7) + '...';
            return newStr;
        } else {
            return str;
        }
    }

    return (
        <div className={styles.item}>
            <NavLink to={'/profile/' + props.id}>
                <img alt={'user\'s avatar'}
                     src={props.photos.small != null ? props.photos.small : defaultAva}/>
                <div>{decreaseName(props.name)}</div>
            </NavLink>
        </div>
    );
};

export default Friend;