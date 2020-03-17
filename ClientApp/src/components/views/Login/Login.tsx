import React, { Component } from 'react';
import { loginUser } from '../../../actions/UserActions';
import { Dispatch } from 'redux';

import './Login.scss';
import '../../../styles/_inputs.scss';
import { connect } from 'react-redux';

interface loginProps {
    loginError: boolean;
    close: () => void;
    login: (login: string, password: string) => any
}
interface loginState {
    login: string;
    password: string;
}

const mapStateToProps = (state: any) => {
    return {
        loginError: state.user.loginError
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
    login: (login: string, password: string) => dispatch(loginUser(login, password) as any)
})

class Login extends Component<loginProps, loginState>{
    constructor(props: loginProps) {
        super(props);
        this.state = {
            login: "",
            password: ""
        }
    }

    login() {
        this.props.login(this.state.login, this.state.password);
    }

    render() {
        return (
            <div className="login-container">
                <div className="login-form">
                    <button className="btn btn-close"
                        onClick={() => this.props.close()}>
                    </button>
                    <div className="login-controls">
                        <p>Логин</p>
                        <input type="text"
                            name="login"
                            className="inp-base"
                            autoComplete="on"
                            onChange={e => {
                                this.setState({
                                    login: e.target.value
                                })
                            }} />
                        <p>Пароль</p>
                        <input type="password"
                            name="password"
                            className="inp-base"
                            autoComplete="off"
                            onChange={e => {
                                this.setState({
                                    password: e.target.value
                                })
                            }} />
                        {this.props.loginError ?
                            <span className="error">Неверный логин или пароль</span>
                            : null
                        }
                    </div>
                    <button
                        className="btn login"
                        onClick={e => this.login()}
                    >
                        Войти
                    </button>
                </div>
            </div>
        )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);