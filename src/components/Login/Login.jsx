import { Form, Button, Container } from "react-bootstrap"
import axios from 'axios'
import { useRef } from 'react'
import '../../App.css'

export default function Login() {
    const userRef = useRef()
    const pwdRef = useRef()

    async function handleSubmit(e) {
        e.preventDefault()
        const user = {
            username: userRef.current.value,
            password: pwdRef.current.value
        }

        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/token/`, 
        user, 
        {
            headers: { "Content-Type": "application/json" }
        }, 
        {
            withCredentials: true
        }
        )
        localStorage.clear()
        localStorage.setItem('access_token', data.access)
        localStorage.setItem('refresh_token', data.refresh)
        axios.defaults.headers.common["Authorization"] = `Bearer ${data['access']}`
        window.location.href = '/'
    }

  return (
    <Container className='font'>
        <h1>Log in to your account</h1>
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" ref={userRef} required />
            </Form.Group>
            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={pwdRef} required />
            </Form.Group>
            <div className='mt-2'>
                <Button type="submit" variant="dark">Login</Button>
            </div>
        </Form>

    </Container>
  )
}