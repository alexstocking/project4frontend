import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom'

export default function EditRequestPage({user}) {
    const { requestId } = useParams()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        date: '',
        price_range: '',
        user: user.id
    });

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/requests/${requestId}/`);
                const requestData = response.data;
                setFormData({
                    name: requestData.name || '',
                    description: requestData.description || '',
                    date: requestData.date || '',
                    price_range: requestData.price_range || ''
                });
                console.log(formData)
            } catch (error) {
                console.error("Error fetching request data:", error);
            }
        }
        if (requestId) { // Check if requestId exists before making the request
            fetchData();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [requestId]); // Add requestId as a dependency

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    async function handleSubmit(e) {
        e.preventDefault();
        try {      
            const requestData = { id: requestId, ...formData };
            await axios.put(`${process.env.REACT_APP_BACKEND_URL}/request/edit/${requestId}/`, requestData)
            console.log("Request submitted successfully!");
            navigate('/account')
        } catch (error) {
            console.error("Error submitting request:", error);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleChange} placeholder='A description of what you would like me to make, more detail the better!' />
            </Form.Group>

            <Form.Group controlId="date">
                <Form.Label>Date Needed</Form.Label>
                <Form.Control type="date" name="date" value={formData.date} onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="price_range">
                <Form.Label>Price Range</Form.Label>
                <Form.Control type="text" name="price_range" value={formData.price_range} onChange={handleChange} placeholder='What you are able to pay for the product'/>
            </Form.Group>
            <br />
            <Button variant="primary" type="submit">
                Edit Request
            </Button>
        </Form>
    );
};