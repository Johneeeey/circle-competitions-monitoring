import React, { Component } from 'react';

import loader from '../../../content/img/Loader/loader.svg';

import './Loader.scss';

class Loader extends Component{
    render() {
        return (
            <div className="loader-container">
                <img src={loader} alt="loader"/>
            </div>
        )
    }
}

export default Loader;