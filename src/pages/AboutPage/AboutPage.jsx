import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../../App.css';
import Amanda from '../../assets/Amanda.jpg'


export default function About() {
  return (
    <Container className='font'>
      <Row>
        <Col xs={12} md={6}>
          <img src={Amanda} alt="Sage and Whistle" className="img-fluid mb-4" />
        </Col>
        <Col xs={12} md={6}>
          <h1>About Sage and Whistle</h1>
          <p>Welcome to Sage and Whistle, where heartfelt memories meet timeless craftsmanship. I'm Amanda, the creative force behind this endeavor, and I am thrilled to share my passion for crafting bespoke gifts and keepsakes with you.</p>
      
          <p>At Sage and Whistle, we understand the importance of meaningful gestures and the impact they have on our lives. Whether it's a milestone celebration, a cherished memory, or a token of appreciation, every moment deserves to be commemorated in a unique and personalised way.</p>
      
          <p>Our philosophy revolves around the belief that every gift should be as unique as the recipient themselves. That's why we offer a range of customisable options, allowing you to tailor your gift to perfectly suit the occasion and the person you're celebrating.</p>
      
          <p>Whether you're looking for a heartfelt wedding present, a sentimental anniversary gift, or a thoughtful token of appreciation, Sage and Whistle has something for every occasion.</p>
      
          <p>Thank you for choosing Sage and Whistle to be a part of your special moments.</p>
      
          <p>Warmest wishes,</p>
          <p>Amanda</p>
          <p>Founder, Sage and Whistle</p>
        </Col>
      </Row>
    </Container>
  );
}