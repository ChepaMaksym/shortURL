import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginRegister from '../src/pages/LoginRegister';
import { Link } from 'react-router-dom'; 
import axios from 'axios';
import Cookies from 'js-cookie';

export default function Login() {
    const handleSubmit = async (event) => {
        event.preventDefault();
        const email = event.target.loginName.value;
        const password = event.target.loginPassword.value;
        try {
            const response = await axios.post('https://localhost:7043/api/user/login', {
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
            <div className="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="tab-login">
                <form onSubmit={handleSubmit}>
                    <p className="text-center">Login</p>
                    <div data-mdb-input-init className="form-outline mb-4">
                        <input type="email" id="loginName" className="form-control" />
                        <label className="form-label" htmlFor="loginName">Email or username</label>
                    </div>
                    <div data-mdb-input-init className="form-outline mb-4">
                        <input type="password" id="loginPassword" className="form-control" />
                        <label className="form-label" htmlFor="loginPassword">Password</label>
                    </div>
                    <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-block mb-4">Sign in</button>
                    <div className="text-center">
                        <p>Not a member? <Link to="/register">Register</Link></p>
                    </div>
                </form>
            </div>
        </>
    );
}
