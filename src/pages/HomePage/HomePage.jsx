import "./HomePage.css"
import {Button, Container} from 'react-bootstrap'
import {Link} from 'react-router-dom'

export default function HomePage() {
    return (
        <Container className="d-flex justify-content-center align-items-center">
            <Button as={Link} to='/request'>Make a new Request</Button>
        </Container>
    )
  }
  