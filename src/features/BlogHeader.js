import React from 'react';
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Row, Col, Button, Image } from 'react-bootstrap';
import BlogSearchForm from '../features/BlogSearchForm';
import { logoutAccount } from '../actions';

export function BlogHeader({...props}) {
  const { dispatch } = props;

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
        <Col className='text-right'>
          <Button
            variant='outline-primary'
            onClick={() => {
              dispatch(logoutAccount())
            }}
          >
            Logout
          </Button>
        </Col>
      </Row>
      <Row className='mb-3'>
        <Col xs='6'>
          <LinkContainer to='/blog/create' >
            <Button variant='outline-primary' size='sm'>Create Post</Button>
          </LinkContainer>
        </Col>
        <Col xs='6' className='text-right'>
          <BlogSearchForm />
        </Col>
      </Row>
    </>
  );
}

function mapStateToProps(state) {
  return {}
}

export default connect(mapStateToProps)(BlogHeader);
