import React from 'react';
import { useSelector } from 'react-redux';
import { getPosts } from '../actions';
import BlogItem from './BlogItem';

export default function BlogList() {
  const posts = useSelector(getPosts);
  const results = Object.keys(posts).map(key => posts[key]);

  return (
    <div>
      {
        results.map((item, idx) => {
          return (
            <BlogItem key={idx} {...item} />
          );
        })
      }
    </div>
  );
}
