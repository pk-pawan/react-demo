import React, { Component } from 'react';
import Constants from '../common/constants';

class UserInfo extends Component {
    render() {
        const { match } = this.props;
        //const { users } = this.props.location.state;
        let users = JSON.parse(localStorage.getItem('users'));
        let params = match.params;
        let userInfo = users.find((user) => {
            return user.email === params.email
        })
        if (userInfo) {
            let age = Constants.calculateUserAge(userInfo.dob),
                userActiveClass = Constants.renderUserActiveClass(userInfo.active);
            return (
                <div>
                    <div className="userInfoTitle">Welcome
                    <span className="name">{` ${userInfo.first_name}  ${userInfo.last_name}`}</span></div>
                    <div className="card mx-auto">
                        <div className="card-body">
                            <div className="row">
                                <span className="col-md-6">Name</span>
                                <span className="col-md-6">{userInfo.first_name + ' ' + userInfo.last_name}</span>
                            </div>
                            <div className="row">
                                <span className="col-md-6">Email</span>
                                <span className="col-md-6">{userInfo.email}</span>
                            </div>
                            <div className="row">
                                <span className="col-md-6">Mobile</span>
                                <span className="col-md-6">{userInfo.phone}</span>
                            </div>
                            <div className="row">
                                <span className="col-md-6">Date of Birth</span>
                                <span className="col-md-6">{Constants.renderUserDOB(userInfo.dob)}</span>
                            </div>
                            <div className="row">
                                <span className="col-md-6">Age</span>
                                <span className="col-md-6">{age > 1 ? age + ' years' : age + ' year'}</span>
                            </div>
                            <div className="row">
                                <span className="col-md-6">Active</span>
                                <span className="col-md-6" style={{ color: userActiveClass }}>
                                    {Constants.renderUserActive(userInfo.active)}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="text-center">
                        <button className="btn btn-basic" onClick={() => this.goBack()}>Back</button>
                    </div>
                </div>
            )
        }
    }
    goBack() {
        this.props.history.push('/');
    }
}

export default UserInfo;