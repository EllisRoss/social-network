import React from "react";
import styles from './Preloader.module.css'

type Props = {
    src: string
}

const Preloader: React.FC<Props> = (props) => {
    return (
        <div className={styles.preloader}>
            <img src={props.src}  alt="preloader"/>
        </div>
    );
}

export default Preloader;
