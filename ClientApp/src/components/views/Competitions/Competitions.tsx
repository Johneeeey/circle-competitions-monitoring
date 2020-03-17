import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IUser } from '../../../@Types/types';

interface CompetitionsProps {
    user: IUser
}

class Competitions extends Component<CompetitionsProps, {}>{
    render() {
        return (
            <div>
                Соревнования!!!
            </div>
        )
    }
}

const mapStateToProps = (state: any) => {
    return { user: state.user }
}

export default connect(mapStateToProps)(Competitions);