import {Field, reduxForm} from "redux-form";
import React from "react";
import styles from './Dialogs.module.css';
import {Textarea} from "../common/FormsControls/FormsControls";
import {required, maxLengthCreator} from "../utils/validators/validators";

const maxLength50 = maxLengthCreator(50);

/**
 * Field нельзя использовать за пределами redux-form,
 * поэтому для этого мы обернем компоненту AddMessageForm в redux-form.
 * Она импортируется в Content.jsx, но она возвращает только .jsx разметку и импортирована
 * она внутри другой .jsx разметки. Исходя из этого - не обязано писать export const AddMessageForm,
 * потому что просто AddMessageForm и так достаточно. И оно нормально импортируется целым файлом.
 */
const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}> {/*Выполняет отправку месседжей на сервер. Все баттоны которые были в предыдущей версии без формы(которую я сам писал)
        я убрал так как они либо не нужны уже либо нереализованы*/}
            <div className={styles.DialogPageNewMessage}>
                {/** какого-то хера необходимо обернуть все эти элементы в один div - иначе будет ошибка. То есть эти text-area и тд не могут быть не внутри div.*/}
                <p>Here are your messages?</p>
                <Field className={styles.textarea} component={Textarea} name="newMessageBody"
                       placeholder="Enter your message" validate={[required, maxLength50]}/>
            </div>
        </form>
    )
}

export default reduxForm({form: 'dialog-add-message-form'})(AddMessageForm);
//не уверен что это вообще нужно, потому что