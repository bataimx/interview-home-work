import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import BlogList from '../features/BlogList';

export function BlogSearchResult({...props}) {
  const { dispatch, queryPost, showLoading } = props;
  const posts = queryPost;
  const query = getURLParams(window.location);
  const numberResultsFound = Object.keys(posts).length;

  useEffect(() => {
    dispatch({
      type: 'SELECT_QUERY_POSTS',
      keywords: query.query,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.query]);

  return (
    <Row className="justify-content-center">
      <Col xs='8'>
        <p>{`Search keyword: ${query.query}(${numberResultsFound})`}</p>
        {
          !showLoading ? numberResultsFound > 0 ? (
            <BlogList
              posts={posts}
              styling={{
                overflow: 'auto',
                'overflowX': 'hidden',
                height: 'calc(100vh - 220px)'
              }}
            />
          ) : (
            <p className='text-muted'>No Result Found</p>
          ) : (
            <p className='text-muted'>Loading</p>
          )
        }
      </Col>
    </Row>
  );
}

function mapStateToProps(state) {
  return {
    queryPost: state.postData.results || [],
    showLoading: state.postData.query,
  }
}

export default connect(mapStateToProps)(BlogSearchResult);

export function getURLParams(location) {
  const searchParams = new URLSearchParams(location.search);
  return {
    query: searchParams.get('query') || '',
  };
}
