import React, { Component } from 'react';
import { Link } from "react-router-dom";

import './Navbar.scss'

class Navbar extends Component {
    render() {
        return (
            <div className="navbar">
                <Link to="/">
                    <button className="nav-btn">
                        <p>Соревнования</p>
                    </button>
                </Link>
                <Link to="/results">
                    <button className="nav-btn">
                        <p>Результаты</p>
                    </button>
                </Link>
            </div>
        )
    }
}

export default Navbar;