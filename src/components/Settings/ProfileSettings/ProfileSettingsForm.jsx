import React from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';


const ProfileSettingsForm = (props) => {
    return (
        <Formik
            initialValues={{
                fullName: props.profile.fullName,
                aboutMe: props.profile.aboutMe,
                lookingForAJob: props.profile.lookingForAJob,
                lookingForAJobDescription: props.profile.lookingForAJobDescription,
                contacts: props.profile.contacts,
            }}

            onSubmit={(values, {setSubmitting}) => {
                console.log(values);
                props.saveProfile(values);
                setSubmitting(false);
            }}
        >
            {({isSubmitting, values}) => (
                <Form>
                    {props.profileErrors.length > 0 && props.profileErrors.map((err) => {
                        return <div key={err}>{err}</div>
                    })}
                    <div>
                        <b>Full name: </b>
                        <Field type="text" name="fullName"/>
                        <ErrorMessage name="fullName" component="div"/>
                    </div>

                    <div>
                        <b>About me: </b>
                        <Field type="text" name="aboutMe"/>
                        {/*<ErrorMessage name="email" component="div" />*/}
                    </div>

                    <div>
                        <b>Looking for a job: </b>
                        <Field type="checkbox" name="lookingForAJob"/>
                        {/*<ErrorMessage name="email" component="div" />*/}
                    </div>

                    <div>
                        <b>My professional skills: </b>
                        <Field component='textarea' name="lookingForAJobDescription"/>
                        {/*<ErrorMessage name="email" component="div" />*/}
                    </div>
                    <div>
                        <b>Contacts:</b>
                        {Object.keys(props.profile.contacts).map((key) => {
                            if (!values.contacts[key]) {
                                values.contacts[key] = '';
                            }
                            return <div key={key}>
                                {key}: <Field type="text" name={"contacts." + key}/>
                            </div>
                        })}
                    </div>
                    <br/>
                    <button type="submit" disabled={isSubmitting}>
                        Save
                    </button>
                </Form>
            )}
        </Formik>
    );
}

export default ProfileSettingsForm;