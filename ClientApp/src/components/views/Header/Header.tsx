import React, { Component } from 'react';
import { IUser } from '../../../@Types/types';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { logout } from '../../../actions/UserActions';

import Navbar from './Navbar/index';

import './Header.scss';

interface headerProps {
    user: IUser;
    showLoginForm: boolean;
    changeShowLoginFormStatus: () => void;
    changeShowRegFormStatus: () => void;
    logout: () => void;
}

class Header extends Component<headerProps, {}>{
    constructor(props: headerProps) {
        super(props);
    }
    render() {
        return (
            <div className='header'>
                <Navbar />
                <div className="account-controls">
                    {!this.props.user ?
                        <div>
                            <button className="btn login"
                                onClick={() => this.props.changeShowLoginFormStatus()}>
                                Войти
                            </button>
                            <button
                                className="btn registrate"
                                onClick={() => this.props.changeShowRegFormStatus()}>
                                Зарегистрироваться
                            </button>
                        </div>
                        :
                        <button className="btn logout"
                            onClick={() => {
                                if (window.confirm("Вы уверены?")) {
                                    this.props.logout()
                                }
                            }}>
                            Выйти
                        </button>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => {
    return { user: state.user.user }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
    logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);