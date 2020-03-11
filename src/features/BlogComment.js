import React from 'react';
import { connect, useSelector } from 'react-redux';
import {
  Accordion,
  Button,
 } from 'react-bootstrap';
import BlogReply from './BlogReply';
import {
  getComments,
 } from '../actions';

export function BlogComment({...props}) {
  const {id} = props;
  const comments = useSelector(getComments);
  const replies = Object.values(comments).filter((item) => item.post === id);
  return (
    <Accordion>
      <Accordion.Toggle as={Button} variant="link" eventKey="0" className='text-muted p-0 border-0'>
        {`${replies.length} replies`}
      </Accordion.Toggle>
      <hr/>
      <Accordion.Collapse eventKey="0">
        <>
          {replies.map((item, idx) => {
            return (
              <BlogReply key={idx} {...item} />
            );
          })}
        </>
      </Accordion.Collapse>
    </Accordion>
  );
}

function mapStateToProps(state) {
  return {}
}

export default connect(mapStateToProps)(BlogComment);
