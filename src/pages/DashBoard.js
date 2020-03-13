import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import BlogList from '../features/BlogList';

export function Dashboard({...props}) {
  const { dispatch, queryPost, showLoading } = props;

  useEffect(() => {
    dispatch({ type: 'SELECT_ALL_QUERY_POSTS' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      { showLoading ? 'Loading' : (<BlogList posts={queryPost} />) }
    </div>
  );
}

function mapStateToProps(state) {
  return {
    queryPost: state.postData.results || {},
    showLoading: state.postData.query,
  }
}

export default connect(mapStateToProps)(Dashboard);