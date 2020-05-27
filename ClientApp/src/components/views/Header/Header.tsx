import React, { Component } from 'react';
import { IUser } from '../../../@Types/types';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { logout } from '../../../actions/user.action';
import { Link } from "react-router-dom";
import { Navbar, Nav } from 'react-bootstrap';

import './Header.scss';

interface headerProps {
    user: IUser;
    showLoginForm: boolean;
    changeShowLoginFormStatus: () => void;
    changeShowRegFormStatus: () => void;
    changeShowUserRequestsFormStatus: () => void;
    logout: () => void;
}

class Header extends Component<headerProps, {}>{
    render() {
        return (
            <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Link to="/"
                            className="nav-link">Соревнования</Link>
                        <Link to="/results"
                            className="nav-link">Результаты</Link>
                    </Nav>
                    <Nav>
                        {!this.props.user ?
                            <div>
                                <button
                                    className="btn"
                                    onClick={() => this.props.changeShowLoginFormStatus()}>
                                    Войти
                                </button>
                                <button
                                    className="btn"
                                    onClick={() => this.props.changeShowRegFormStatus()}>
                                    Зарегистрироваться
                                </button>
                            </div>
                            :
                            <div>
                                <button
                                    className="btn"
                                    onClick={() => this.props.changeShowUserRequestsFormStatus()}>
                                    Мои заявки
                                </button>
                                <button
                                    className="btn"
                                    onClick={() => {
                                        if (window.confirm("Вы уверены?")) {
                                            this.props.logout()
                                        }
                                    }}>
                                    Выйти
                            </button>
                            </div>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
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