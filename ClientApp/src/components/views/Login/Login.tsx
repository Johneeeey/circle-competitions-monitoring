import React, { Component } from 'react';

import './Login.scss';

interface loginProps {
    close: () => void;
}

class Login extends Component<loginProps, {}>{
    render() {
        return (
            <div className="login-container">
                <div className="login-form">
                    <button className="btn"
                        onClick={() => this.props.close()}>
                        close
                    </button>
                </div>
            </div>
        )
    }
}

export default Login;