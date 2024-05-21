import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginRegister from '../src/pages/LoginRegister';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function Register() {
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const name = event.target.registerName.value;
        const email = event.target.registerEmail.value;
        const password = event.target.registerPassword.value;
        const repeatPassword = event.target.registerRepeatPassword.value;

        if (password !== repeatPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const response = await axios.post('https://localhost:7043/api/user/register', {
            name: name,
            email: email,
            password: password
          });
          const userRoles = response.data.roles;
          Cookies.set('UserRoles', userRoles, { expires: 1 }); 
        } catch (error) {
          console.error(error);
        }
    };
    return (
        <>
            <LoginRegister />
            <form onSubmit={handleSubmit}>
                <div className="form-outline mb-4">
                    <input type="text" id="registerName" className="form-control" />
                    <label className="form-label" htmlFor="registerName">Name</label>
                </div>
                <div className="form-outline mb-4">
                    <input type="email" id="registerEmail" className="form-control" />
                    <label className="form-label" htmlFor="registerEmail">Email</label>
                </div>
                <div className="form-outline mb-4">
                    <input type="password" id="registerPassword" className="form-control" />
                    <label className="form-label" htmlFor="registerPassword">Password</label>
                </div>
                <div className="form-outline mb-4">
                    <input type="password" id="registerRepeatPassword" className="form-control" />
                    <label className="form-label" htmlFor="registerRepeatPassword">Repeat password</label>
                </div>
                <button type="submit" className="btn btn-primary btn-block mb-3">Sign up</button>
            </form>
        </>
    );
}
