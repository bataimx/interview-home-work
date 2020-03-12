import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { getPosts } from '../actions';
import BlogItem from '../features/BlogItem';

export default function BlogDetail() {
  const { id } = useParams();
  const posts = useSelector(getPosts);
  const blogData = ( !!posts[id] && posts[id] ) || {};

  return (
    <div className='mb-5'>
      {
        Object.keys(blogData).length > 0 ? (<BlogItem { ...blogData } blogDetail />) : ''
      }
    </div>
  );
}
