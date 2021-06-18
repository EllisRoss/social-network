import React from "react";
import style from './Post.module.css';

type Props = {
    likeCount: number
    message: string
}

const Post: React.FC<Props> = (props) => {
    return (
        <div>
            <div className={style.item}>
                <div className={style.avatar}>
                    <img alt="user\'s avatar" src='https://i1.wp.com/sova.ponominalu.ru/wp-content/uploads/2019/08/ava-max.jpg?fit=2000%2C1333&ssl=1' />
                </div>
                {props.message}
                <div>
                    <span className={style.itemLike}>{props.likeCount} like </span>
                </div>
            </div>
        </div>
    );
}

export default Post;
