import { Container, Row, Col, Button } from "react-bootstrap";
import { useProducts } from '../../contexts/ProductContext';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import './AccountPage.css'

export default function AccountPage({ user }) {
  const { requests, getRequests } = useProducts();

  useEffect(() => {
    getRequests();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const userRequests = requests.filter(request => request.user === user.id);

  return (
    <Container className='font'>
      <h1>{user.first_name}'s Account</h1>
      <Row>
        <Col md={6}>
          <div className="user-details">
            <h2>Account Details</h2>
            <p><strong>Username: </strong>{user.username}</p>
            <p><strong>Name:</strong> {user.first_name} {user.last_name}</p>
            <p><strong>Email Address:</strong> {user.email}</p>
            <Link to='/account/edit/'><Button variant='secondary' size='sm'>Edit Account Details</Button></Link>
          </div>
        </Col>
        <Col md={6}>
          <div className="user-requests">
            <h2>My Requests</h2>
            <ul>
              {userRequests.map(request => (
                <li key={request.id} className="request-list">
                  <strong>{request.name}</strong>: {request.description} &nbsp;
                  <Link to={`/request/edit/${request.id}`}><Button variant='secondary' size='sm'>Edit Request</Button></Link>
                </li>
              ))}
            </ul>
          </div>
        </Col>
      </Row>
    </Container>
  )
}