import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IUser } from '../../../@Types/types';

import Filter from '../Filter';

interface CompetitionsProps {
    user: IUser
}

class Competitions extends Component<CompetitionsProps, {}>{
    render() {
        return (
            <div className="competitions-container">
                <Filter />
                Соревнования!!!
            </div>
        )
    }
}

const mapStateToProps = (state: any) => {
    return { user: state.user }
}

export default connect(mapStateToProps)(Competitions);