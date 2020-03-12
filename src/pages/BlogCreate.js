import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Alert } from 'react-bootstrap';
import { createNewPost } from '../actions';

export function BlogCreate({...props}) {
  const { dispatch } = props;
  const [showAlert, setShowAlert] = useState(false);
  const titleEl = useRef(null),
  tagEl = useRef(null),
  contentEl = useRef(null);

  const handleSubmit = event => {
    const $form = event.target;
    if($form.checkValidity()) {
      const submitData = {
        "owner": 3, //TODO
        "created_at": new Date().setMilliseconds(0),
        "title": titleEl.current.value,
        "content": contentEl.current.value,
        "tags": tagEl.current.value.split(',').map(item => item.trim()).filter(item => item.length > 0)
      };
      dispatch(createNewPost(submitData));
      setShowAlert(true);
      $form.reset();
    }
    event.preventDefault();
  };

  return (
    <div>
      { showAlert ? (
        <Alert variant='success' className='mt-2' onClose={() => setShowAlert(false)} dismissible>
          Create new post success!
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
          Submit
        </Button>
      </Form>
    </div>
  );
}

function mapStateToProps(state) {
  return {}
}

export default connect(mapStateToProps)(BlogCreate);
