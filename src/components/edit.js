import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Edit = () => {
    const { id } = useParams(); // Get the item ID from the URL
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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/v1/user/action/view/${id}`);
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                const result = await response.json();

                if (result.success && result.data) {
                    setFormData(result.data);
                } else {
                    console.error('Unexpected data format:', result);
                    setError('Unexpected data format');
                }
            } catch (error) {
                setError(`Error fetching item: ${error.message}`);
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchItem();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/api/v1/user/action/edit/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }

            const result = await response.json();
            console.log('Success:', result);
            navigate('/view'); // Redirect to view page after successful edit
        } catch (error) {
            setError(`Error submitting form: ${error.message}`);
            console.error('Error:', error);
        }
    };


    if (loading) {
        return <div className="container mt-4">Loading...</div>;
    }

    if (error) {
        return <div className="container mt-4 alert alert-danger">{error}</div>;
    }

    return (
        <div className="container mt-4">
            <h2>Edit Item</h2>
            <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                <div className='row'>
                    <div className="mb-3">
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
                    <div className="mb-3">
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
                    <div className="mb-3">
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
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className="mb-3">
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
                <div className='row'>
                    <div className="mb-3">
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
                    <div className="mb-3">
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
                    <div className="mb-3">
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
                    <div className="mb-3">
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
                            <option value="USA">USA</option>
                            <option value="UK">UK</option>
                            <option value="Canada">Canada</option>
                            <option value="Australia">Australia</option>
                            <option value="India">India</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                </div>
                <div className="mb-3">
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
                <div className="mb-3">
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
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
        </div>
    );
};

export default Edit;
