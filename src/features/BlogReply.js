import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Image } from 'react-bootstrap';
import {
  getUsers,
 } from '../actions';

export default function BlogReply({...props}) {
  const {owner, content, created_at} = props;
  const users = useSelector(getUsers);

  return (
    <Row>
      <Col xs='1'>
        <Image src="https://via.placeholder.com/50" roundedCircle />
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
