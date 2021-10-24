import React from 'react';
import {Field, reduxForm} from "redux-form";

const LoginForm = (props) =>{
return (
    <form onSubmit={props.handleSubmit}>
        <div>
            <Field placeholder={"Login"} name={"login"} component={"input"} />
        </div>
        <div>
            <Field placeholder={"Password"} name={"password"} component={"input"} />
        </div>
        <div>
            <Field type={"checkbox"} name={"rememberMe"} component={"input"} /> remember me
        </div>
        {/*Field - компонента которая пришла из redux-form. Эта компонента получает на вход placeholder и передает дальше своей детской компоненте - inout.
        Билиотека redux-form реагирует на эти name, указанные здесь.
        onSubmit - это стандартное свойство, которое есть в props от redux-form*/}
        <div>
            <button>Login</button>
        </div>
    </form>
)
}

/**
 * Это как-бы Hoc. Это не совсем Hoc, если придираться, но мы будем называть это Hoc.
 * имя для формы должно быть уникальное, его даем чтобы redux-form знал какую именно форму тащить.
 * Вытащить все формы нельзя, только те которые нужны. Настройка здесь происходит по аналогии с mapStateToProps.
 * В redux-store эта штука так же заимпортирована.

 * Сюда передана простая форма, которую мы определили
 */
const LoginReduxForm = reduxForm({form: 'login'}) (LoginForm)

const Login = (props) =>{
    const onSubmit = (formData) => {
        console.log(formData);
    }
    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} />
    </div>
}

export default Login;