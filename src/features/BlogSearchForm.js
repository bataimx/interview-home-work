import React, { useState, useRef } from 'react';
import { Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import { Redirect } from "react-router-dom";

export default function BlogSearchForm() {
  const [formAction, setFormAction] = useState(false);
  const searchEl = useRef(null);
  const handleSubmit = event => {
    event.preventDefault();
    if(searchEl.current.value.length > 0) {
      setFormAction(true);
    }
  };

  return (
    <>
      {
        formAction ? (
          <Redirect to={`/search?query=${searchEl.current.value}`} />
        ): ''
      }
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <FormControl
            placeholder="Enter Search Keyword"
            aria-label="Enter Search Keyword"
            aria-describedby="basic-addon2"
            size='sm'
            ref={searchEl}
            onChange={() => {
              setFormAction(false);
            }}
          />
          <InputGroup.Append>
            <Button
              type="submit"
              variant="outline-secondary"
              size='sm'
              onClick={() => {
                setFormAction(false);
              }}
            >
              Search
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Form>
    </>
  );
}
