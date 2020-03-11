import React from 'react';
import { connect, useSelector } from 'react-redux';
import {
  getPosts,
  getUsers,
 } from '../actions';
import BlogItem from './BlogItem';

export function BlogList() {
  const posts = useSelector(getPosts);

  return (
    <div>
      {
        Object.keys(posts).map((key, idx) => {
          return (
            <BlogItem key={idx} {...posts[key]} />
          );
        })
      }
    </div>
  );
}

function mapStateToProps(state) {
  return {}
}

export default connect(mapStateToProps)(BlogList)

