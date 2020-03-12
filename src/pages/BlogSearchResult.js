import React from 'react';
import { useSelector } from 'react-redux';
import { getPosts } from '../actions';
import { Row, Col } from 'react-bootstrap';
import BlogList from '../features/BlogList';

export default function BlogSearchResult() {
  const posts = useSelector(getPosts);
  const query = getURLParams(window.location);
  const testReg = new RegExp(`(${query.query.trim().replace(/\s/g, '|')})`, 'ig');
  let results = {};
  Object.keys(posts).map(key => {
    const item = posts[key];
    if(
      item.title.match(testReg) ||
      item.content.match(testReg) ||
      item.tags.join(' ').match(testReg)
    ) {
      results[item.id] = {...item};
    }
    return item;
  });
  const numberResultsFound = Object.keys(results).length;

  return (
    <Row className="justify-content-center">
      <Col xs='8'>
        <p>{`Search keyword: ${query.query}(${numberResultsFound})`}</p>
        {
          numberResultsFound > 0 ? (
            <BlogList posts={results} />
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
