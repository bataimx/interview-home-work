import React from 'react';
import { connect, useSelector } from 'react-redux';
import { Row, Col, Image } from 'react-bootstrap';
import {
  getUsers,
 } from '../actions';

export function BlogReply({...props}) {
  const {owner, content, created_at} = props;
  const users = useSelector(getUsers);

  return (
    <Row>
      <Col xs='1'>
        <Image src="holder.js/65x65" roundedCircle />
      </Col>
      <Col xs='11'>
        <p>
          <span>{( !!users[owner] && users[owner].name ) || 'Anonymous'}</span>{' '}
          <span className='text-muted'>{new Date(created_at).toDateString()}</span>
        </p>
        <p>{content}</p>
      </Col>
    </Row>
  );
}

function mapStateToProps(state) {
  return {}
}

export default connect(mapStateToProps)(BlogReply);