import React, { Component } from 'react';

import Filter from '../Filter';

class Results extends Component {
    render() {
        return (
            <div className="results">
                <Filter />
                Результаты
            </div>
        )
    }
}

export default Results;