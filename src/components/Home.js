import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
    const navigate = useNavigate();

    // State for form data
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        gender: '',
        age: '',
        email: '',
        number: '',
        address: '',
        country: '',
        company: '',
        post: ''
    });

    // State for alert visibility and message
    const [showAlert, setShowAlert] = useState(false);
    const [message, setMessage] = useState('');

    const handleLogout = () => {
        console.log('Logging out...');
        // Remove the token from localStorage
        localStorage.removeItem('token');

        // Redirect to the login page
        navigate('/login');
    };

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/api/v1/user/action/insert', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log('Success:', result);
            setMessage('Registration successful!');
            setShowAlert(true);

            // Reset the form fields
            setFormData({
                firstname: '',
                lastname: '',
                gender: '',
                age: '',
                email: '',
                number: '',
                address: '',
                country: '',
                company: '',
                post: ''
            });
        } catch (error) {
            console.error('Error:', error);
            setMessage('Error submitting form');
            setShowAlert(true);
        }
    };

    return (
        <div>
            <div className="container mt-4">
                <h2>Home Page</h2>
                <p>Welcome to the home page!</p>
                <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
            </div>
            <div className="container mt-4">
                {showAlert && (
                    <div className="alert alert-info alert-dismissible fade show" role="alert">
                        {message}
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                )}
                <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                    {/* firstname, lastname, gender, age, email, number, address, country, company, post */}
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="firstname" className="form-label">First Name</label>
                            <input
                                type="text"
                                id="firstname"
                                name="firstname"
                                className="form-control"
                                value={formData.firstname}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="lastname" className="form-label">Last Name</label>
                            <input
                                type="text"
                                id="lastname"
                                name="lastname"
                                className="form-control"
                                value={formData.lastname}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="gender" className="form-label">Gender</label>
                            <select
                                className="form-select"
                                id="gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="age" className="form-label">Age</label>
                            <input
                                type="number"
                                id="age"
                                name="age"
                                className="form-control"
                                value={formData.age}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="form-control"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="number" className="form-label">Phone Number</label>
                            <input
                                type="text"
                                id="number"
                                name="number"
                                className="form-control"
                                value={formData.number}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-md-12 mb-3">
                            <label htmlFor="address" className="form-label">Address</label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                className="form-control"
                                value={formData.address}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="country" className="form-label">Country</label>
                            <select
                                className="form-select"
                                id="country"
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select</option>
                                <option value="usa">USA</option>
                                <option value="uk">UK</option>
                                <option value="canada">Canada</option>
                                <option value="australia">Australia</option>
                                <option value="india">India</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="company" className="form-label">Company</label>
                            <input
                                type="text"
                                id="company"
                                name="company"
                                className="form-control"
                                value={formData.company}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="post" className="form-label">Post</label>
                            <input
                                type="text"
                                id="post"
                                name="post"
                                className="form-control"
                                value={formData.post}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default Home;
