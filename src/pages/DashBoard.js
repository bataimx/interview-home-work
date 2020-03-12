import React from 'react';
import BlogList from '../features/BlogList';
import { useSelector } from 'react-redux';
import { getPosts } from '../actions';

export default function Dashboard() {
  const posts = useSelector(getPosts);
  return (
    <div>
      <BlogList posts={posts} />
    </div>
  );
}
