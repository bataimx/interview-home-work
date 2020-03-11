import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Row, Col, Button } from 'react-bootstrap';

export default function BlogDetail({...props}) {

  console.log(props);
  return (
    <Row>
      <Col>
        <LinkContainer to='/' >
          <span>Logo</span>
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
      <Col xs='12' className='text-right'>
        <LinkContainer to='/blog/create' >
          <Button variant='outline-primary' size='sm'>Create Post</Button>
        </LinkContainer>
      </Col>
    </Row>
  );
}
