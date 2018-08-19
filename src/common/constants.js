import moment from 'moment';

const constants = {
    "DOBFormat": "DD MMM YYYY",
    "Errors": {
        "FirstName": "Please enter first name.",
        "InValidFirstName" : "Please enter valid first name.",
        "LastName": "Please enter last name.",
        "InValidLastName" : "Please enter valid last name.",
        "Email" : "Please enter email id.",
        "InValidEmail" : "Please enter valid email.",
        "DOB": "Please enter date of birth.",
        "InValidDOB": "Please enter valid date of birth.",
        "Phone10Digit": "Please enter 10 digit phone number.",
        "Phone": "Please enter phone number.",
    },

    renderUserDOB : (dob) => {
        return moment(dob).format(constants.DOBFormat);
    },
    calculateUserAge : (dob) => {
        return moment().diff(dob, 'years');
    },
    renderUserActive : (active) => {
        return active ? 'Active' : 'InActive';
    },
    renderUserActiveClass : (active) => {
        return active ? 'green' : 'red';
    }
}

export default constants;