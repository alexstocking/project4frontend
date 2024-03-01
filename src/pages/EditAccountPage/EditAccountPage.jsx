import { Form, Button, Container } from "react-bootstrap";
import axios from "axios";
import { useRef } from "react";
import '../../App.css'


export default function EditAccountPage({user}) {
    const userRef = useRef()
    const emailRef = useRef()
    const firstRef = useRef()
    const lastRef = useRef()
    async function handleSubmit(e) {
        e.preventDefault();
        const updatedUser = {
          username: userRef.current.value,
          email: emailRef.current.value,
          first_name: firstRef.current.value,
          last_name: lastRef.current.value,
        };
    
        // eslint-disable-next-line no-unused-vars
        const { data } = await axios.put(
          `${process.env.REACT_APP_BACKEND_URL}/account/edit/`, updatedUser, {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            },
          }

        );
        window.location.href = "/account"
      }
  return (
    <Container className="font">
        <Form onSubmit={handleSubmit}>
        <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" ref={userRef} defaultValue={user.username} required />
        </Form.Group>
        <Form.Group>
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" ref={firstRef} defaultValue={user.first_name} required />
        </Form.Group>
        <Form.Group>
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" ref={lastRef} defaultValue={user.last_name}  />
        </Form.Group>
        <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" ref={emailRef} defaultValue={user.email}  required />
        </Form.Group>
        <div className="mt-2">
            <Button type="submit" variant="primary">
            Edit Account
            </Button>
        </div>
        </Form>
    </Container>
  )
}