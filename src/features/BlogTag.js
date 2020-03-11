import React from 'react';
import { Button } from 'react-bootstrap';

export default function BlogTag({...props}) {
  const {children} = props;
  return (
    <>
      <Button variant="outline-info" size="sm">{children}</Button>{' '}
    </>
  );
}
