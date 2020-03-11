import React from 'react';
import PropTypes from 'prop-types';
import BlogHeader from '../../../features/BlogHeader';
import { Container } from 'react-bootstrap';

export default function AuthLayout({ children, ...rest }) {
  return (
    <Container>
      <BlogHeader />
      {children}
    </Container>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.element.isRequired
};
