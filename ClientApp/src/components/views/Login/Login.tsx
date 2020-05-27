import React, { Component } from 'react';
import { loginUser } from '../../../actions/user.action';
import { Dispatch } from 'redux';

import './Login.scss';
import '../../../styles/_inputs.scss';
import { connect } from 'react-redux';
import { IUser } from '../../../@Types/types';

interface loginProps {
    user: IUser;
    loginError: boolean;
    close: () => void;
    login: (login: string, password: string) => any
}
interface loginState {
    login: string;
    password: string;
    didTry: boolean;
}

const mapStateToProps = (state: any) => {
    return {
        user: state.user.user,
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
            password: "",
            didTry: false
        }
    }
    componentDidUpdate(prevProps: loginProps, prevState: loginState) {
        if (!this.props.loginError && this.state.didTry && this.props.user) {
            this.props.close();
        }
    }


    login() {
        this.props.login(this.state.login, this.state.password);
        this.setState({ didTry: true })
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
                            className="inp-base form-control"
                            autoComplete="on"
                            onChange={e => {
                                this.setState({
                                    login: e.target.value
                                })
                            }} />
                        <p>Пароль</p>
                        <input type="password"
                            name="password"
                            className="inp-base form-control"
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