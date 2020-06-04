import { useState, useEffect } from 'react';

const useForm = (submit, validate) => {
    
    const [values, setValues] = useState({
        firstName: "",
        lastName: "",
        dob: "",
        gender: "female",
        mobile: "",
        email: "",
        password: "",
    })
    const [errors, setErrors] = useState({});
    const [submitted, setSumbitted] = useState(false);
    // const [home, setHome] = useState(false);
    // return (
    //     {home ? <Redirect to="/" /> : null}
    // )

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
        // setHome(true);
    }

    useEffect(() => {
        if (Object.keys(errors).length === 0 && submitted) {
            submit();
        }
    }, [errors, submit, submitted]);

    return {
        handleChange,
        handleSubmit,
        values,
        errors
    }
}

export default useForm;