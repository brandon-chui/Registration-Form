import { useState, useEffect } from 'react';

const useForm = (submit, validate) => {

    const [values, setValues] = useState({
        firstName: "",
        lastName: "",
        dob: "",
        gender: "male",
        mobile: "",
        email: "",
        password: "",
    })
    const [errors, setErrors] = useState({});
    const [submitted, setSumbitted] = useState(false);

    const handleChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        setErrors(validate(values));
        setSumbitted(true);
    }

    useEffect(() => {
        if (Object.keys(errors).length === 0 && submitted) {
            submit();
        }
    }, [errors]);

    return {
        handleChange,
        handleSubmit,
        values,
        errors
    }
}

export default useForm;