import React, { useRef, useEffect } from "react";
import { connect, useSelector } from 'react-redux';
import { Alert, Row, Col, Form, Button } from 'react-bootstrap';
import {
  verifyAccount,
  queryAccount,
  hideMessage,
} from '../actions';

export function SignIn({...props}) {
  const { dispatch, haveMessage, textMessage } = props;
  const loading = useSelector(queryAccount);
  const userNameEl = useRef(null),
  passWordEl = useRef(null);

  useEffect(() => {
    dispatch(hideMessage());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = event => {
    event.preventDefault();
    if(
      userNameEl.current.value.length > 0 &&
      passWordEl.current.value.length > 0
    ) {
      dispatch(verifyAccount({
        usn: userNameEl.current.value,
        pwd: passWordEl.current.value,
      }));
    }
  };

  return (
    <Row className="justify-content-center mt-5">
      <Col xs='8'>
        <h3>Sign In</h3>
        {haveMessage ? (
          <Alert
            variant='warning'
            className='mt-2'
            onClose={() => dispatch(hideMessage())} dismissible
          >
            {textMessage}
          </Alert>
        ) : ''}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicUserName">
            <Form.Label>User Name</Form.Label>
            <Form.Control ref={userNameEl} type="text" placeholder="Enter User Name" />
            <Form.Text className="text-muted">
              "username": "meowmeow"
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control ref={passWordEl} type="password" placeholder="Password" />
            <Form.Text className="text-muted">
              "password": "1234567890",
            </Form.Text>
          </Form.Group>
          <Button variant="primary" type="submit">
            {loading ? 'Loading...' : 'Login'}
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
  }
}

export default connect(mapStateToProps)(SignIn);

