import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Form, Button, Alert } from 'react-bootstrap';
import {
  createNewPost,
  hideMessage
} from '../actions';

export function BlogCreate({...props}) {
  const {
    dispatch,
    accountOwner,
    showLoading,
    haveMessage,
    textMessage
  } = props;
  const titleEl = useRef(null),
  tagEl = useRef(null),
  contentEl = useRef(null);

  useEffect(() => {
    dispatch(hideMessage());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = event => {
    const $form = event.target;
    if($form.checkValidity() && titleEl.current.value.trim().length > 0) {
      const submitData = {
        "owner": accountOwner,
        "created_at": new Date().setMilliseconds(0),
        "title": titleEl.current.value,
        "content": contentEl.current.value,
        "tags": tagEl.current.value.split(',').map(item => item.trim()).filter(item => item.length > 0)
      };
      dispatch(createNewPost(submitData));
    }
    event.preventDefault();
  };

  return (
    <Row className="justify-content-center">
      <Col xs='8'>
        { (haveMessage) ? (
          <Alert variant='success' className='mt-2' onClose={() => dispatch(hideMessage())} dismissible>
            {textMessage}
          </Alert>
        ) : '' }
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Enter Title" required ref={titleEl}/>
          </Form.Group>

          <Form.Group controlId="formBasicTags">
            <Form.Label>Tags</Form.Label>
            <Form.Control type="text" placeholder="Enter Tags: tag1, tag2,.." ref={tagEl}/>
            <Form.Text className="text-muted">
              Entering tags should always be comma-separated. ex: tag1, tag2,..
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicContent">
            <Form.Label>Content</Form.Label>
            <Form.Control as="textarea" rows="3" placeholder="Enter Content" ref={contentEl}/>
          </Form.Group>

          <Button variant="primary" type="submit">
            { showLoading ? 'Loading' : 'Submit' }
          </Button>
        </Form>
      </Col>
    </Row>
  );
}

function mapStateToProps(state) {
  return {
    haveMessage: state.messagesData.show,
    textMessage: state.messagesData.message,
    accountOwner: state.accountData.loggedID,
    showLoading: state.postData.query,
  }
}

export default connect(mapStateToProps)(BlogCreate);
