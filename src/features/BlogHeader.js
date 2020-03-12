import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Row, Col, Button, Image } from 'react-bootstrap';
import BlogSearchForm from '../features/BlogSearchForm';

export default function BlogHeader() {
  return (
    <>
      <Row className='mb-3'>
        <Col>
          <LinkContainer to='/' >
            <Button variant='link' className='p-0 border-0'>
              <Image src="https://via.placeholder.com/50" rounded />
            </Button>
          </LinkContainer>
        </Col>
        <Col>
          <LinkContainer to='/counter' >
            <Button variant='primary' block>Blogs</Button>
          </LinkContainer>
        </Col>
        <Col className='text-right'>
          Username
        </Col>
      </Row>
      <Row className='mb-3'>
        <Col xs='6'>
          <BlogSearchForm />
        </Col>
        <Col xs='6' className='text-right'>
          <LinkContainer to='/blog/create' >
            <Button variant='outline-primary' size='sm'>Create Post</Button>
          </LinkContainer>
        </Col>
      </Row>
    </>
  );
}
