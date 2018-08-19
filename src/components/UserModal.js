import React, { Component } from 'react';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import moment from 'moment';
import Constants from '../common/constants';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        minWidth: '500px',
        marginRight: '-50%',
        padding: '0',
        transform: 'translate(-50%, -50%)'
    }
};

class UserModal extends Component {
    constructor() {
        super();
        this.state = {
            firstName: '',
            firstNameError: '',
            lastName: '',
            lastNameError: '',
            email: '',
            emailError: '',
            phone: '',
            phoneError: '',
            dob: '',
            dobError: ''
        }
    }

    componentWillMount() {
        Modal.setAppElement('body');
    }

    componentDidMount() {
        const { isEdit, isView, selectedEmail, usersData } = this.props;
        let selectedUser = usersData.find((user) => {
            return user.email === selectedEmail
        })
        if (isEdit || isView) {
            this.setState({
                firstName: selectedUser.first_name,
                lastName: selectedUser.last_name,
                email: selectedUser.email,
                phone: selectedUser.phone,
                dob: selectedUser.dob
            })
        }
    }

    render() {
        const { isView, isAdd, isEdit } = this.props;
        let date = this.state.dob ? this.state.dob : moment(),
            viewDate = moment(date).format('DD MMM YYYY');
        return <div>
            <Modal
                isOpen={this.props.isOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.props.toggleModal()}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className="modalHeader">{this.renderTitle()}</div>
                <button className="closeButton" onClick={this.props.toggleModal()}>x</button>
                <div>
                    <form className="userForm" autoComplete="off">
                        <div className="row">
                            <label className="col-md-6" htmlFor="first-name">First Name</label>
                            <input
                                name="firstName"
                                value={this.state.firstName}
                                onChange={e => this.handleChange(e)}
                                type="text"
                                className={isView ? 'hidden' : 'show col-md-6'}
                            />
                            <span className={isView ? 'show col-md-6' : 'hidden'}>{this.state.firstName}</span>
                        </div>
                        <p className="formError">{this.state.firstNameError}</p>
                        <div className="row">
                            <label className="col-md-6" htmlFor="last-name">Last Name</label>
                            <input
                                name="lastName"
                                value={this.state.lastName}
                                onChange={e => this.handleChange(e)}
                                type="text"
                                className={isView ? 'hidden' : 'show col-md-6'}
                            />
                            <span className={isView ? 'show col-md-6' : 'hidden'}>{this.state.lastName}</span>
                        </div>
                        <p className="formError">{this.state.lastNameError}</p>
                        <div className="row">
                            <label className="col-md-6" htmlFor="email">Email</label>
                            <input
                                name="email"
                                value={this.state.email}
                                onChange={e => this.handleChange(e)}
                                type="email"
                                className={isView ? 'hidden' : 'show col-md-6'}
                            />
                            <span className={isView ? 'show col-md-6' : 'hidden'}>{this.state.email}</span>
                        </div>
                        <p className="formError">{this.state.emailError}</p>
                        <div className="row">
                            <label className="col-md-6" htmlFor="mobile">Mobile</label>
                            <input
                                name="phone"
                                value={this.state.phone}
                                maxLength={10}
                                onChange={e => this.handleChange(e)}
                                type="number"
                                className={isView ? 'hidden' : 'show col-md-6'}
                            />
                            <span className={isView ? 'show col-md-6' : 'hidden'}>{this.state.phone}</span>
                        </div>
                        <p className="formError">{this.state.phoneError}</p>
                        <div className="row">
                            <label className="col-md-6" htmlFor="dob">Date of Birth</label>
                            <DatePicker
                                selected={moment(date)}
                                name="dob"
                                onChange={e => this.handleDateChange(e)}
                                className={isView ? 'hidden' : 'show col-md-6'}
                            />
                            <span className={isView ? 'show col-md-6' : 'hidden'}>{viewDate}</span>
                        </div>
                        <p className="formError">{this.state.dobError}</p>
                        <div className="row modalButton">
                            <button type="button" className={isAdd ? 'btn btn-primary show' : 'hidden'} onClick={e => this.onAdd(e)}>
                                Add </button>
                            <button type="button" className={isEdit ? 'btn btn-primary show' : 'hidden'} onClick={e => this.onEdit(e)}>
                                Update </button>
                            <button type="button" className='btn btn-basic' onClick={e => this.onCancel(e)}>
                                Cancel </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    }
    renderTitle() {
        const { isView, isAdd, isEdit } = this.props;
        if (isView) {
            return "View User"
        } else if (isEdit) {
            return "Edit User"
        } else if (isAdd) {
            return "Add User"
        }
    }
    handleChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
        this.setState({ [name + 'Error']: '' });
    }
    handleDateChange(date) {
        this.setState({
            dob: moment(date).format('MM/DD/YYYY'),
            dobError: ''
        });
    }
    onAdd(e) {
        e.preventDefault();
        let isValid = this.validate();
        if (!isValid) {
            this.props.onAdd(this.state);
        }
    }
    onEdit(e) {
        e.preventDefault();
        let isValid = this.validate();
        if (!isValid) {
            this.props.onEdit(this.state);
        }
    }
    onCancel(e) {
        e.preventDefault();
        this.props.onCancel();
    }
    validate() {
        var isError = false;
        if (!this.state.firstName) {
            this.setState({ firstNameError: Constants.Errors.FirstName });
            isError = true;
        }
        if (this.state.firstName) {
            let _firstName = this.state.firstName
            let regex = /^[a-zA-Z]+$/i;
            if (!regex.test(_firstName)) {
                this.setState({ firstNameError: Constants.Errors.InValidFirstName });
                isError = true;
            }
        }
        if (!this.state.lastName) {
            this.setState({ lastNameError: Constants.Errors.LastName });
            isError = true;
        }
        if (this.state.lastName) {
            let _lastName = this.state.LastName
            let regex = /^[a-zA-Z]+$/i;
            if (!regex.test(_lastName)) {
                this.setState({ lastNameError: Constants.Errors.InValidLastName });
                isError = true;
            }
        }
        if (!(this.state.phone.length === 10)) {
            this.setState({ phoneError: Constants.Errors.Phone10Digit });
            isError = true;
        }
        if (!this.state.phone) {
            this.setState({ phoneError: Constants.Errors.Phone });
            isError = true;
        }

        if (!this.state.email) {
            this.setState({ emailError: Constants.Errors.Email });
            isError = true;
        }
        if (this.state.email) {
            let _email = this.state.email
            let regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i;
            if (!regex.test(_email)) {
                this.setState({ emailError: Constants.Errors.InValidEmail });
                isError = true;
            }
        }
        if (!this.state.dob) {
            this.setState({ dobError: Constants.Errors.DOB });
            isError = true;
        }
        if (this.state.dob) {
            let _dob = this.state.dob;
            if (moment(_dob).diff(moment(), 'days') > 0) {
                this.setState({ dobError: Constants.Errors.InValidDOB });
                isError = true;
            }
        }
        return isError;
    }
}

export default UserModal;