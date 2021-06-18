import React from 'react';
import styles from './FriendList.module.css';

import Friend from "./Friend";
import {UserType} from "../../../types/types";

type FriendListProps = {
    friends: Array<UserType>
}

const FriendList: React.FC<FriendListProps> = (props) => {

    let getFriendList = props.friends.map(
        friend => <Friend key={friend.id}
                          id={friend.id}
                          photos={friend.photos}
                          name={friend.name}/>
    );

    let shuffleFriends = (arr: JSX.Element[]): JSX.Element[] => {
        let j: number;
        let temp: JSX.Element;
        for(let i = arr.length - 1; i > 0; i--){
            j = Math.floor(Math.random()*(i + 1));
            temp = arr[j];
            arr[j] = arr[i];
            arr[i] = temp;
        }
        return arr;
    }

    let shuffleFriendList: JSX.Element[] = shuffleFriends([...getFriendList]);

    let cutFriendList = shuffleFriendList.slice(0, 6);

    return (
        <div className={styles.friends}>
            <h3>Friends</h3>
            <div className={styles.items}>
                {cutFriendList}
            </div>
        </div>
    );
};

export default FriendList;