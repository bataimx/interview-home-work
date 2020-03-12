import React from 'react';
import { useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Row, Col, Button } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import { getPosts } from '../actions';
import BlogItem from '../features/BlogItem';

export default function BlogDetail() {
  const { id } = useParams();
  const posts = useSelector(getPosts);
  const blogData = ( !!posts[id] && posts[id] ) || {};

  return (
    <>
      {
        Object.keys(blogData).length === 0 ? '' : (<BlogItem { ...blogData } />)
      }
    </>
  );
}
