import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
//import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false); // Define loading state
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true); // Set loading to true when starting login request

        try {
            const response = await axios.post('http://localhost:8080/api/v1/user/login', {
                email,
                password
            });

            if (response && response.data) {
                const { success, token, redirectTo } = response.data;

                if (success) {
                    localStorage.setItem('token', token);
                    navigate(redirectTo || '/home');
                } else {
                    setError('Login failed');
                }
            } else {
                setError('Unexpected response format');
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false); // Set loading to false when request is complete
        }
    };

    return (
        <div className="container mt-4">
            <h2>Login</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {loading && <div className="spinner-border" role="status"><span className="sr-only">Loading...</span></div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group mt-3">
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                    <a href="/register" className="btn btn-link ms-2">Register</a>
                </div>
            </form>
        </div>
    );
};

export default Login;
