import React, { Component } from 'react';
import { IUser } from '../../../@Types/types';
import { connect } from 'react-redux';


import './Header.scss';

interface headerProps {
    user: IUser;
    showLoginForm: boolean;
    changeShowLoginFormStatus: () => void;
    changeShowRegFormStatus: () => void;
}

class Header extends Component<headerProps, {}>{
    constructor(props: headerProps) {
        super(props);
    }
    render() {
        return (
            <div className='header'>
                {!this.props.user ?
                    <div className="account-controls">
                        <button className="btn login"
                            onClick={() => this.props.changeShowLoginFormStatus()}>
                            Войти
                        </button>
                        <button
                            className="btn registrate"
                            onClick={()=>this.props.changeShowRegFormStatus()}>
                            Зарегистрироваться
                        </button>
                    </div>
                    : null
                }
            </div>
        )
    }
}

const mapStateToProps = (state: any) => {
    return { user: state.user.user }
}

export default connect(mapStateToProps)(Header);