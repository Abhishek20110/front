import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
//import 'bootstrap/dist/css/bootstrap.min.css';

const View = () => {
    const [data, setData] = useState([]); // Initialize as an empty array
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/v1/user/action/view');
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                const result = await response.json();

                if (Array.isArray(result.data)) {
                    setData(result.data);
                } else if (Array.isArray(result)) {
                    setData(result);
                } else {
                    console.error('Unexpected data format:', result);
                    setError('Unexpected data format');
                }
            } catch (error) {
                setError(`Error fetching data: ${error.message}`);
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleEdit = (id) => {
        navigate(`/edit/${id}`); // Navigate to the edit page with the item ID
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            try {
                const response = await fetch(`http://localhost:8080/api/v1/user/action/delete/${id}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }

                const result = await response.json();
                if (result.success) {
                    // Remove the deleted item from the state
                    setData(data.filter(item => item._id !== id));
                    alert('Item deleted successfully');
                } else {
                    setError('Failed to delete the item');
                }
            } catch (error) {
                setError(`Error deleting item: ${error.message}`);
                console.error('Error:', error);
            }
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
            <h2>Data View</h2>
            {data.length === 0 ? (
                <p>No data available</p>
            ) : (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Gender</th>
                            <th>Age</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Address</th>
                            <th>Country</th>
                            <th>Company</th>
                            <th>Post</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr key={item._id}>
                                <td>{item.firstname}</td>
                                <td>{item.lastname}</td>
                                <td>{item.gender}</td>
                                <td>{item.age}</td>
                                <td>{item.email}</td>
                                <td>{item.number}</td>
                                <td>{item.address}</td>
                                <td>{item.country}</td>
                                <td>{item.company}</td>
                                <td>{item.post}</td>
                                <td>
                                    <button
                                        className="btn btn-info btn-sm"
                                        onClick={() => handleEdit(item._id)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm ms-2"
                                        onClick={() => handleDelete(item._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default View;
