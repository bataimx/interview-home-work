import React, { useRef } from "react";
import { connect, useSelector } from 'react-redux';
import { Alert, Row, Col, Form, Button } from 'react-bootstrap';
import { verifyAccount, queryAccount } from '../actions';

export function SignIn({...props}) {
  const { dispatch, wrongPassword } = props;
  const loading = useSelector(queryAccount);
  const userNameEl = useRef(null),
  passWordEl = useRef(null);

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
        {wrongPassword ? (
          <Alert variant='warning' className='mt-2' >
            Wrong User Name or Password!
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
  const wrongPassword = state.accountData.status === "wrong_password";
  return {
    wrongPassword
  }
}

export default connect(mapStateToProps)(SignIn);

