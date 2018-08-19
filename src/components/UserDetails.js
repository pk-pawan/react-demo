import React, { Component } from 'react';
import SearchBar from './SearchBar';
import UserModal from './UserModal';
import UserDetail from './UserDetail';

class UserDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: props.users,
            searchTerm: '',
            isEdit: false,
            openModal: false,
            selectedEmail: '',
            isAdd: false,
            isView: false
        }
        this.handleSearch = this.handleSearch.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleAddUser = this.handleAddUser.bind(this);
        this.handleEditUser = this.handleEditUser.bind(this);
        this.handleCancelUser = this.handleCancelUser.bind(this);
        this.handleViewClick = this.handleViewClick.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.activateUser = this.activateUser.bind(this);
        this.deactivateUser = this.deactivateUser.bind(this);
    }
    render() {
        return (
            <div>
                <div className="headerTitle">React.js Project</div>
                <div className="width100">
                    <button className="btn btn-primary floatRight addUser" onClick={() => this.addUser()}>Add User</button>
                    <SearchBar handleSearch={this.handleSearch} isRefresh={this.state.searchTerm} />
                </div>
                {this.renderTable()}
                {this.showModal()}
            </div>
        )
    }
    renderTable() {
        return (
            <table className="table table-striped margin10">
                <thead>
                    {this.renderTableHeader()}
                </thead>
                <tbody>
                    {this.renderTableBody()}
                </tbody>
            </table>
        )
    }
    renderTableHeader() {
        return <tr>
            <td>Name</td>
            <td>Date of Birth</td>
            <td>Age</td>
            <td>Email</td>
            <td>Mobile</td>
            <td>Active</td>
            <td>Actions</td>
        </tr>
    }
    renderTableBody() {
        const { users, searchTerm } = this.state;
        let usersFromStorage = JSON.parse(localStorage.getItem('users'));
        /* Filter table rows */
        let filteredUsers = usersFromStorage.filter((user) => {
            let userFirstName = user.first_name ? user.first_name.toLowerCase() : '',
                userLastName = user.last_name ? user.last_name.toLowerCase() : '',
                userEmail = user.email ? user.email.toLowerCase() : '',
                filterTerm = searchTerm.toLowerCase();
            return (userFirstName.indexOf(filterTerm) > -1 || userEmail.indexOf(filterTerm) > -1 || userLastName.indexOf(filterTerm) > -1)
        })
        localStorage.setItem('users', JSON.stringify(filteredUsers));
        let tableRows = filteredUsers.map((user, index) => {
            return <UserDetail key={index} user={user} users={this.state.users}
                handleViewClick={this.handleViewClick}
                handleEditClick={this.handleEditClick}
                activateUser={this.activateUser}
                deactivateUser={this.deactivateUser} />
        });
        return tableRows;
    }
    showModal() {
        if (this.state.openModal) {
            return <UserModal isOpen={this.state.openModal}
                toggleModal={() => this.toggleModal}
                selectedEmail={this.state.selectedEmail}
                usersData={this.state.users}
                isEdit={this.state.isEdit}
                isView={this.state.isView}
                isAdd={this.state.isAdd}
                onAdd={this.handleAddUser}
                onEdit={this.handleEditUser}
                onCancel={this.handleCancelUser} />
        }
    }
    toggleModal() {
        this.setState({ openModal: !this.state.openModal })
    }
    activateUser(isActive, email) {
        const { users } = this.state;
        users.forEach((user) => {
            if (user.email === email) {
                user.active = true;
            }
            this.setState({ users: this.state.users })
            localStorage.setItem('users',JSON.stringify(this.state.users));
        })
    }
    deactivateUser(isActive, email) {
        const { users } = this.props;
        users.forEach((user) => {
            if (user.email === email) {
                user.active = false
            }
            this.setState({ users: this.state.users });
            localStorage.setItem('users', JSON.stringify(this.state.users));
        })
    }
    handleSearch = (searchTerm) => {
        this.setState({ searchTerm: searchTerm });
    }
    handleEditClick(email) {
        this.setState({
            isEdit: true,
            openModal: true,
            isView: false,
            selectedEmail: email,
            isAdd: false
        })
    }
    handleViewClick(email) {
        this.setState({
            isView: true,
            openModal: true,
            isEdit: false,
            isAdd: false,
            selectedEmail: email,
        })
    }
    addUser() {
        this.setState({
            isView: false,
            openModal: true,
            isEdit: false,
            isAdd: true
        })
    }
    handleAddUser(state) {
        const { users } = this.state;
        users.push({
            first_name: state.firstName,
            last_name: state.lastName,
            email: state.email,
            phone: state.phone,
            dob: state.dob,
            active: true
        })
        this.setState({ users: this.state.users, openModal: false })
        localStorage.setItem('users',JSON.stringify(this.state.users));
    }
    handleEditUser(edittedState) {
        const { selectedEmail, users } = this.state;
        users.map((user) => {
            if (user.email === selectedEmail) {
                user.first_name = edittedState.firstName;
                user.last_name = edittedState.lastName;
                user.phone = edittedState.phone;
                user.dob = edittedState.dob;
                user.email = edittedState.email;
            }
        })
        this.setState({ users: this.state.users, openModal: false })
        localStorage.setItem('users',JSON.stringify(this.state.users));
    }
    handleCancelUser() {
        this.toggleModal();
    }
}

export default UserDetails;
