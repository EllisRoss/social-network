import React from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {FilterType} from "../../redux/usersReducer";
import {useSelector} from "react-redux";
import {getFilter} from "../../redux/usersSelectors";

const usersSearchFormValidate = (values: FormValues) => {
    const errors = {};
    return errors;
}

type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}

type FriendFormType = "null" | "true" | "false";
type FormValues = {
    term: string;
    friend: FriendFormType;
}

export const UsersSearchForm: React.FC<PropsType> = React.memo((props) => {
    const filter = useSelector(getFilter);
    const submit = (values: FormValues, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
        const filter: FilterType = {
            term: values.term,
            friend: values.friend === "null" ? null : values.friend === "true" ? true : false,
        };
        props.onFilterChanged(filter);
        setTimeout(() => {
            setSubmitting(false);
        }, 600);
    }

    return (
        <div>
            <Formik
                enableReinitialize={true}
                initialValues={{term: filter.term, friend: String(filter.friend) as FriendFormType}}
                validate={usersSearchFormValidate}
                onSubmit={submit}
            >
                {({isSubmitting}) => (
                    <Form>
                        <ErrorMessage name="term" component="div"/>
                        <Field type="text" name="term"/>
                        <Field name="friend" as="select">
                            <option value="null">All</option>
                            <option value="true">Only followed</option>
                            <option value="false">Only unfollowed</option>
                        </Field>
                        <button type="submit" disabled={isSubmitting}>
                            Find
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
})
