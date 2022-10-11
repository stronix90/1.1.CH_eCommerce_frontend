export default function validation(values) {
    const errors = {};
    if (!values.name) errors.name = "Required";
    if (!values.address) errors.address = "Required";
    if (!values.birthDate) errors.birthDate = "Required";
    if (!values.phone) errors.phone = "Required";
    if (!values.email) errors.email = "Required";
    if (!values.password) errors.password = "Required";
    if (values.password !== values.checkPassword) errors.password = "Passwords must match";

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = "Invalid email address";
    }
    return errors;
}