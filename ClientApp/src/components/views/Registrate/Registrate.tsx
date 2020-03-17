import React, { Component } from 'react';

import './Registrate.scss';

interface registrateProps {
    close: () => void;
}

class Registrate extends Component<registrateProps>{
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
                            className="inp-base" />
                        <p>Фамилия</p>
                        <input type="text"
                            className="inp-base" />
                        <p>Электронная поча</p>
                        <input type="text"
                            className="inp-base" />
                        <p>Логин</p>
                        <input type="text"
                            className="inp-base" />
                        <p>Пароль</p>
                        <input type="text"
                            className="inp-base" />
                        <p>Подтвердите пароль</p>
                        <input type="text"
                            className="inp-base" />
                    </div>
                    <button className="btn registrate">Зарегистрироваться</button>
                </div>
            </div>
        )
    }
}

export default Registrate;