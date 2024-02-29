import { Container, Button } from "react-bootstrap"
import { useProducts } from '../../contexts/ProductContext'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'


export default function AccountPage({user}) {
  const { requests, getRequests } = useProducts()

  useEffect(() => {
    getRequests();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const userRequests = requests.filter(request => request.user === user.id);

  return (
    <Container>
        <h1>{user.first_name}'s Account</h1> <Link to='/account/edit/'><Button variant='secondary'>Edit Account Details</Button></Link>
        <p>Username: {user.username}</p>
        <p>Name: {user.first_name} {user.last_name}</p>
        <p>Email Address: {user.email}</p>
        <h2>My Requests:</h2>
        <ul>
          {userRequests.map(request => (
            <li key={request.id}>
              <strong>{request.name}</strong>: {request.description}
              <Link to={`/request/edit/${request.id}`}><Button variant='secondary'>Edit Request</Button></Link>
            </li>
          ))}
        </ul>
    </Container>
  )
}
