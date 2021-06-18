import React from "react";
import styles from "./FormControls.module.css";
import {WrappedFieldProps} from "redux-form";

type PropsType = {
    props: {
        placeholder: string
    }
}

export const TextArea: React.FC<PropsType & WrappedFieldProps> = ({input, meta: {touched, error}, ...props}) => {
    const hasError = touched && error;
    return (
        <div className={styles.form_control + " " + (hasError ? styles.error : "")}>
            <textarea {...input} {...props}/>
            {hasError && <label>{error}</label>}
        </div>
    );
}

export const Input: React.FC<PropsType & WrappedFieldProps> = ({input, meta, ...props}) => {
    const hasError = meta.touched && meta.error;
    return (
        <div className={styles.form_control + " " + (hasError ? styles.error : "")}>
            <input {...input} {...props}/>
            {hasError && <label>{meta.error}</label>}
        </div>
    );
}