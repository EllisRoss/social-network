import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, requiredField} from "../../../../utils/validators/validators";
import {TextArea} from "../../../common/FormsControls/FormsControls";


const maxLength100 = maxLengthCreator(100);

type PropsType = {

}

export type AddNewPostFormValues = {
    newPostBody: string
}

const AddNewPostForm: React.FC<InjectedFormProps<AddNewPostFormValues, PropsType> & PropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name={'newPostBody'}
                       component={TextArea}
                       placeholder={'Enter post message'} validate={[requiredField, maxLength100]}/>
            </div>
            <button>Add post</button>
        </form>
    );
}

export const MyPostsReduxForm = reduxForm<AddNewPostFormValues, PropsType>({form: 'ProfileAddNewPostsForm'})(AddNewPostForm);
