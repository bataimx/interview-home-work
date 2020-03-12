import React from 'react';
import { useSelector } from 'react-redux';
import { getPosts } from '../actions';
import BlogItem from '../features/BlogItem';
import { Row, Col } from 'react-bootstrap';

export default function BlogSearchResult() {
  const posts = useSelector(getPosts);
  const query = getURLParams(window.location);
  var testReg = new RegExp(`(${query.query.trim().replace(/\s/g, '|')})`, 'ig');
  const result = Object.keys(posts).map(key => posts[key]).filter(item => {
    return item.title.match(testReg) || item.content.match(testReg) || item.tags.join(' ').match(testReg);
  });

  return (
    <Row className="justify-content-center">
      <Col xs='8'>
        <p>{`Search keyword: ${query.query}`}</p>
        {
          result.length > 0 ? (
            result.map((item, idx) => {
              return (
                <BlogItem key={idx} {...item} />
              );
            })
          ) : (
            <p className='text-muted'>No Result Found</p>
          )
        }
      </Col>
    </Row>
  );
}

export function getURLParams(location) {
  const searchParams = new URLSearchParams(location.search);
  return {
    query: searchParams.get('query') || '',
  };
}
