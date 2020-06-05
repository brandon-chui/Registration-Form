export default function validateForm(values) {
    let errors = {};
    
    if (!values.firstName) {
        errors.firstName = "First name is required";
    } else if (!/^[a-zA-Z]+(?:-[a-zA-Z]+)*$/.test(values.firstName)) {
        errors.firstName = "First name can only include letters and dashes"
    }
    if (!values.lastName) {
        errors.lastName = "Last name is required";
    } else if (!/^[a-zA-Z]+(?:-[a-zA-Z]+)*$/.test(values.lastName)) {
        errors.lastName = "Last name can only include letters and dashes"
    }

    let today = new Date();
    if (!values.dob) {
        errors.dob = "Date of birth is required";
    } else if (today < new Date(values.dob)) {
        errors.dob = "Invalid date of birth"
    }
    if (!values.mobile) {
        errors.mobile = "Please enter your phone number";
    } else if (!/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(values.mobile)) {
        errors.mobile = "Please enter invalid phone number"
    }
    if (!values.email) {
        errors.email = "Please enter an email address";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = "Please enter a valid email address"
    }
    if (!values.password) {
        errors.password = "Please enter a password";
    } else if (values.password.length < 7) {
        errors.password = "Password must be at least 7 characters";
        // can add separate object errors.passwordOBject = {} for other checks
    }

    return errors;
}