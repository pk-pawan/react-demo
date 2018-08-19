import React from 'react';
import Constants from '../common/constants';
import { Link } from 'react-router-dom'

const UserDetail = (props) => {
    const { user , users } = props;
    let userName = user.first_name + ' ' + user.last_name;
    let userDOB = Constants.renderUserDOB(user.dob);
    let userAge = Constants.calculateUserAge(user.dob);
    let userActive = Constants.renderUserActive(user.active);
    let userActiveClass = Constants.renderUserActiveClass(user.active);
    return <tr>
        <td>
            <Link to={{ pathname: `user/${user.email}`, state: { users: users } }}>{userName}</Link>
        </td>
        <td>{userDOB}</td>
        <td>{userAge > 1 ? userAge + ' years' : userAge + ' year'}</td>
        <td>{user.email}</td>
        <td>{user.phone}</td>
        <td style={{ color: userActiveClass }}>{userActive}</td>
        <td>
            <button className="btn btn-primary" onClick={() => props.handleViewClick(user.email)} >View</button>
            <button className="btn btn-primary" onClick={() => props.handleEditClick(user.email)} >Edit</button>
            <button className="btn btn-primary" onClick={() => props.activateUser(user.active, user.email)}>Activate</button>
            <button className="btn btn-primary" onClick={() => props.deactivateUser(user.active, user.email)}>Deactivate</button>
        </td>
    </tr>
}

export default UserDetail;