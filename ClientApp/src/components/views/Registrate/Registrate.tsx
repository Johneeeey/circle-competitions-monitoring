import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { IUser } from '../../../@Types/types';
import { registrateUser } from '../../../actions/user.action';

import './Registrate.scss';

interface registrateProps {
    close: () => void;
    registrate: (user: IUser) => void;
}
interface registrateState {
    user: IUser,
    isSecondPasswordCorrect: boolean,
    isFormValid: boolean
}

class Registrate extends Component<registrateProps, registrateState>{
    constructor(props: registrateProps) {
        super(props);
        this.state = {
            user: {
                id: 0,
                name: "",
                surname: "",
                e_mail: "",
                login: "",
                password: "",
                role: 1
            },
            isFormValid: false,
            isSecondPasswordCorrect: true
        }
        this.submitPassword = this.submitPassword.bind(this);
        this.validation = this.validation.bind(this);
    }
    submitPassword(event: React.ChangeEvent<HTMLInputElement>) {
        event.persist();
        if (event.target.value === this.state.user.password) {
            this.setState({ isSecondPasswordCorrect: true }, () => {
                this.validation()
            });
        } else {
            this.setState({ isSecondPasswordCorrect: false }, () => {
                this.validation()
            });
        }
    }
    registrateHandler() {
        this.props.registrate(this.state.user);
        this.props.close();
    }
    validation() {
        if (this.state.user.name
            && this.state.user.surname
            && this.state.user.e_mail
            && this.state.user.login
            && this.state.user.password
            && this.state.isSecondPasswordCorrect) {
            this.setState({
                isFormValid: true
            });
        } else {
            this.setState({
                isFormValid: false
            });
        }
    }
    render() {
        return (
            <div className="registrate-container">
                <div className="registrate-form">
                    <button className="btn btn-close"
                        onClick={() => this.props.close()}>
                    </button>
                    <div className="registrate-controls">
                        <p>Имя</p>
                        <input type="text"
                            className="inp-base form-control"
                            maxLength={50}
                            onChange={e => {
                                e.persist();
                                this.setState(prevState => {
                                    let user = Object.assign({}, prevState.user);
                                    user.name = e.target.value;
                                    return { user };
                                }, () => {
                                    this.validation()
                                })
                            }} />
                        <p>Фамилия</p>
                        <input type="text"
                            className="inp-base form-control"
                            maxLength={50}
                            onChange={e => {
                                e.persist()
                                this.setState(prevState => {
                                    let user = Object.assign({}, prevState.user);
                                    user.surname = e.target.value;
                                    return { user };
                                }, () => {
                                    this.validation()
                                })
                            }} />
                        <p>Электронная поча</p>
                        <input type="text"
                            className="inp-base form-control"
                            maxLength={50}
                            onChange={e => {
                                e.persist()
                                this.setState(prevState => {
                                    let user = Object.assign({}, prevState.user);
                                    user.e_mail = e.target.value;
                                    return { user };
                                }, () => {
                                    this.validation()
                                })
                            }} />
                        <p>Логин</p>
                        <input type="text"
                            className="inp-base form-control"
                            maxLength={50}
                            onChange={e => {
                                e.persist()
                                this.setState(prevState => {
                                    let user = Object.assign({}, prevState.user);
                                    user.login = e.target.value;
                                    return { user };
                                }, () => {
                                    this.validation()
                                })
                            }} />
                        <p>Пароль</p>
                        <input type="password"
                            className="inp-base form-control"
                            maxLength={50}
                            onChange={e => {
                                e.persist()
                                this.setState(prevState => {
                                    let user = Object.assign({}, prevState.user);
                                    user.password = e.target.value;
                                    return {
                                        user,
                                        isSecondPasswordCorrect: false
                                    };
                                }, () => {
                                    this.validation()
                                })
                            }} />
                        <p>Подтвердите пароль</p>
                        <input type="password"
                            className={this.state.isSecondPasswordCorrect ?
                                'inp-base form-control'
                                : 'inp-base form-control error'}
                            onChange={this.submitPassword} />
                    </div>
                    <button className="btn registrate"
                        disabled={!this.state.isFormValid}
                        onClick={() => this.registrateHandler()}>
                        Зарегистрироваться
                    </button>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
    registrate: (user: IUser) => dispatch(registrateUser(user) as any)
})

export default connect(null, mapDispatchToProps)(Registrate);