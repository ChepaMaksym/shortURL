// LoginRegister.js
import React from 'react';
import { Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

export default function LoginRegister() {
    return (
        <div>
            <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
                <li className="nav-item" role="presentation">
                    <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item" role="presentation">
                    <Link className="nav-link" to="/register">Register</Link>
                </li>
            </ul>
        </div>
    );
}
