import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import {
  getUsers,
 } from '../actions';
import BlogTag from './BlogTag';
import BlogComment from './BlogComment';

export default function BlogItem({...props}) {
  const {id, title, owner, content, tags, created_at, blogDetail} = props;
  const users = useSelector(getUsers);

  return (
    <Row >
      <Col xs='12' className='text-center'>
        <LinkContainer to={`/blog/${id}`}>
          <Button variant='link' className='text-dark' >
            <h3>{title}</h3>
          </Button>
        </LinkContainer>
      </Col>
      <Col xs='8'>
        <p>Author: {( !!users[owner] && users[owner].name ) || 'Anonymous'}</p>
        <p>Created at: {new Date(created_at).toDateString()}</p>
      </Col>
      <Col className='text-right' xs='4'>
        {!!tags && tags.map((item, idx) => {
          return (
            <BlogTag key={idx}>{item}</BlogTag>
          );
        })}
      </Col>
      <Col xs='12'>
        {!!blogDetail ? (
          <p>{content}</p>
        ) : (
          <p>{!!content && content.substr(0, 100)}{content.length > 100 ? '...' : ''}</p>
        )}
      </Col>
      <Col xs='12'>
        <BlogComment id={id} />
      </Col>
    </Row>
  );
}

