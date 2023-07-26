import  React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export const Register = (props) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [group, setGroup] = useState('');
    const [validationErrors, setValidationErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

   // const handleSubmit = (e) => {
   //     e.preventDefault();
   //     console.log(email);
   // }

    useEffect(()=>{
        if(localStorage.getItem('token') != "" && localStorage.getItem('token') != null){
            navigate("/event");
        }
    },[])

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true)
        let payload = {
            name: name,
            email:email,
            password:pass, 
        }
        axios.post('http://localhost:3001/users/register', payload)
        .then((r) => {
            setIsSubmitting(false)
            //localStorage.setItem('token', r.data.token)
           navigate(-1);
        })
        .catch((e) => {
            setIsSubmitting(false)
            if (e.response.data.errors != undefined) {
                setValidationErrors(e.response.data.errors);
            }
        });
    }

    

    return (
        <div className="auth-form-container">
            <h2>Register</h2>
        <form className="register-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Full name</label>
            <input value={name} name="name" onChange={(e) => setName(e.target.value)} id="name" placeholder="Full Name" />
            <label htmlFor="email">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@provider.com" id="email" name="email" />
            <label htmlFor="password">Password</label>
            <input value={pass} onChange={(e) => setPass(e.target.value)} type="password"  id="password" name="password" />
            <button class="btn btn-default btn-lg" type="submit" >Register</button>
        </form>
        <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button>
    </div>
    )
}