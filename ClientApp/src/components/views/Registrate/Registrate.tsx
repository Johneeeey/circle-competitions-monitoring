import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { IUser } from '../../../@Types/types';
import { registrateUser } from '../../../actions/UserActions';

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
                role: 2
            },
            isFormValid: false,
            isSecondPasswordCorrect: true
        }
        this.submitPassword = this.submitPassword.bind(this);
    }
    submitPassword(event: React.ChangeEvent<HTMLInputElement>) {
        event.persist();
        if (event.target.value === this.state.user.password) {
            this.setState({ isSecondPasswordCorrect: true });
        } else {
            this.setState({ isSecondPasswordCorrect: false });
        }
    }
    registrateHandler() {
        this.props.registrate(this.state.user);
        this.props.close();
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
                            className="inp-base"
                            onChange={e => {
                                e.persist();
                                this.setState(prevState => {
                                    let user = Object.assign({}, prevState.user);
                                    user.name = e.target.value;
                                    return { user };
                                })
                            }} />
                        <p>Фамилия</p>
                        <input type="text"
                            className="inp-base"
                            onChange={e => {
                                e.persist()
                                this.setState(prevState => {
                                    let user = Object.assign({}, prevState.user);
                                    user.surname = e.target.value;
                                    return { user };
                                })
                            }} />
                        <p>Электронная поча</p>
                        <input type="text"
                            className="inp-base"
                            onChange={e => {
                                e.persist()
                                this.setState(prevState => {
                                    let user = Object.assign({}, prevState.user);
                                    user.e_mail = e.target.value;
                                    return { user };
                                })
                            }} />
                        <p>Логин</p>
                        <input type="text"
                            className="inp-base"
                            onChange={e => {
                                e.persist()
                                this.setState(prevState => {
                                    let user = Object.assign({}, prevState.user);
                                    user.login = e.target.value;
                                    return { user };
                                })
                            }} />
                        <p>Пароль</p>
                        <input type="text"
                            className="inp-base"
                            onChange={e => {
                                e.persist()
                                this.setState(prevState => {
                                    let user = Object.assign({}, prevState.user);
                                    user.password = e.target.value;
                                    return {
                                        user,
                                        isSecondPasswordCorrect: false
                                    };
                                })
                            }} />
                        <p>Подтвердите пароль</p>
                        <input type="text"
                            className="inp-base"
                            onChange={this.submitPassword} />
                    </div>
                    <button className="btn registrate"
                        onClick={()=>this.registrateHandler()}>
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