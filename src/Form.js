import React from 'react';
// custom react hook
import useForm from './useForm';
import MaskedInput from 'react-text-mask';
import validateForm from './validateForm';
import './Form.css';

const Form = () => {

    const { handleChange, handleSubmit, values, errors } = useForm(submit, validateForm);

    // used to prevent 5 number year date in date of birth field
    const today = new Date().toISOString().split('T')[0];

    // you can go to webhook.site and change the fetch url to post to a new api to see the posted data
    async function submit() {
        console.log("submitted");
        try {
            let result = await fetch('https://webhook.site/f750bb61-987a-41e4-bb2b-a68c2fff586d', {
                method: 'post',
                mode: 'no-cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    ...values
                })
            });
            console.log(result)
        } catch(e) {
            console.log(e)
        }
    }

    return (
        <div>
            <h2 className="title">Registration Form</h2>
            <form 
                noValidate 
                onChange={handleChange}
                onSubmit={handleSubmit}
            >
                <section>
                    <label>Name</label>
                    <div className='name'>
                        <div>
                            <input 
                                name="firstName" 
                                type="text" 
                                placeholder="First"
                                value={values.firstName} 
                                onChange={handleChange}>
                            </input>
                            {errors.firstName && <p className='error'>{errors.firstName}</p>}
                        </div>
                        <div>
                            <input 
                                name="lastName" 
                                type="text" 
                                placeholder="Last"
                                value={values.lastName} 
                                onChange={handleChange}>
                            </input>
                            {errors.lastName && <p className='error'>{errors.lastName}</p>}
                        </div>
                    </div>
                </section>
                <section className='twoSection'>
                    <div>
                        <label>Date of Birth</label>
                        <div>
                            <input 
                                name="dob" 
                                type="date" 
                                className="dob"
                                max={today}
                                value={values.dob} 
                                onChange={handleChange}>
                            </input>
                            {errors.dob && <p className='error'>{errors.dob}</p>}
                        </div>
                    </div>
                    <div>
                        <label>Gender</label>
                        <div>
                            <select name="gender" type="text" value={values.gender} onChange={handleChange}>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                            {errors.gender && <p className='error'>{errors.gender}</p>}
                        </div>
                    </div>
                </section>
                <section className='twoSection'>
                    <div>
                        <label>Mobile</label>
                        <div>
                            <MaskedInput
                                mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                name="mobile"
                                placeholder="(xxx) xxx-xxxx"
                                guide={true}
                                value={values.mobile}
                                onChange={handleChange}
                            />
                            {errors.mobile && <p className='error'>{errors.mobile}</p>}
                        </div>
                    </div>
                    <div>
                        <label>Email</label>
                        <div>
                            <input
                                name="email"
                                type="email"
                                placeholder="test@example.com"
                                value={values.email}
                                onChange={handleChange}>
                            </input>
                            {errors.email && <p className='error'>{errors.email}</p>}
                        </div>
                    </div>
                </section>
                <section className='password'>
                    <label>Password</label>
                    <input
                        name="password" 
                        type="password" 
                        placeholder="••••••••"
                        value={values.password} 
                        onChange={handleChange}>
                    </input>
                    {errors.password && <p className='error'>{errors.password}</p>}
                </section>
                <button type="submit">Submit</button>
                <p className="tos">By clicking "Submit" you post to an API <br /> that doesn't really do anything with the data.</p>
            </form>
        </div>
    );
}

export default Form;
