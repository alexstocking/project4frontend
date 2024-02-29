import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios'

export default function RequestPage({ user }) {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        date: '',
        price_range: '',
        tags: [],
        user: user.id
    });

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
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/newrequest/`, formData)
            console.log("Request submitted successfully!");
            window.location.href = '/account'
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
                Submit
            </Button>
        </Form>
    );
};
