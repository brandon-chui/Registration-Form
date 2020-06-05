import { useState, useEffect } from 'react';
import axios from 'axios';

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

    useEffect(() => {
        async function fetchData() {
            const result = await axios('https://24qjl573xh.execute-api.us-west-2.amazonaws.com/default/MockUserData');

            let newObj = {};
            let newValues = Object.keys(values);

            for (let key in result.data) {
                if (newValues.includes(key)) {
                    newObj[key] = result.data[key]
                }
            }

            setValues({
                ...values,
                ...newObj
            })
        }

        fetchData();
    }, [])

    // useEffect(async () => {
    //     fetchData();
    //     let obj = {
    //         "firstName": "Donald",
    //         "lastName": "Duck",
    //         "email": "thedonaldduckplushcare.co",
    //         "phone": "5555555555",
    //         "gender": "male",
    //         "dob": "09-09-1970",
    //         "address": {
    //             "street": "500 5th St",
    //             "unit": "301",
    //             "city": "San Francisco",
    //             "state": "CA",
    //             "zipCode": "94101"
    //         },
    //         "coverage": {
    //             "firstName": "Donald",
    //             "lastName": "Duck",
    //             "payerName": "Blue Shield of California",
    //             "price": "20.00",
    //             "member_id": "DLU61815520D",
    //             "date": "09-09-1970"
    //         }
    //     }

    //     let newObj = {};
        
    //     let newValues = Object.keys(values);

    //     for (let key in obj) {
            
    //         if  (newValues.indexOf(key) > -1) {
    //             newObj[key] = obj[key];
    //         }
    //     }
    //     console.log(newObj);
    //     setValues(newObj);

    // }, []);
    
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

    // put errors values into an object {length: true, capitoal: true, special character: true} 
    // if any false set class to red and add message, else green and add message
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