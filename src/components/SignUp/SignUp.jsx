import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useRef } from "react";

export default function Signup() {
    const userRef = useRef()
    const emailRef = useRef()
    const firstRef = useRef()
    const lastRef = useRef()
    const pwdRef = useRef()
    async function handleSubmit(e) {
        e.preventDefault();
        const user = {
          username: userRef.current.value,
          email: emailRef.current.value,
          first_name: firstRef.current.value,
          last_name: lastRef.current.value,
          password: pwdRef.current.value,
        };
    
        // eslint-disable-next-line no-unused-vars
        const { data } = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/signup/`,
          user,
          {
            headers: { "Content-Type": "application/json" },
          },
          {
            withCredentials: true,
          }
        );
        window.location.href = "/login"
      }
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" ref={userRef} required />
      </Form.Group>
      <Form.Group>
        <Form.Label>First Name</Form.Label>
        <Form.Control type="text" ref={firstRef} required />
      </Form.Group>
      <Form.Group>
        <Form.Label>Last Name</Form.Label>
        <Form.Control type="text" ref={lastRef} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" ref={emailRef} required />
      </Form.Group>
      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" ref={pwdRef} required />
      </Form.Group>
      <div className="mt-2">
        <Button type="submit" variant="primary">
          Login
        </Button>
      </div>
    </Form>
  )
}