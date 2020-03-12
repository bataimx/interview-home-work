import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'react-bootstrap';
import BlogItem from './BlogItem';
import PropTypes from 'prop-types';

const NumberItemsOnPage = 4;

export default function BlogList({...props}) {
  const { posts, styling } = props;
  const [itemIndex, setItemIndex] = useState(1);
  const [loading, setLoading] = useState(false);
  const postItems = Object.keys(posts).map(key => posts[key]);
  const scrollEl = useRef(null);

  const handleScroll = (event) => {
    const $scroll = event.target;
    if (
      $scroll.scrollTop + $scroll.clientHeight >=
      $scroll.scrollHeight
    ) {
      loadMore();
    }
  };

  const loadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setItemIndex(itemIndex + 1);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    const $scroll = scrollEl.current;
    if( (itemIndex * NumberItemsOnPage) <= postItems.length) {
      $scroll.addEventListener('scroll', handleScroll, true);
    }

    return(() => {
      $scroll.removeEventListener("scroll", handleScroll, true);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemIndex, posts]);

  return (
    <>
      <div
        ref={scrollEl}
        style={styling}
      >
        {
          postItems.slice(0, itemIndex * NumberItemsOnPage).map((item, idx) => {
            return (
              <BlogItem key={idx} {...item} />
            );
          })
        }
      </div>
      {
        loading ? (
          <Button variant='outline-secondary'>Loading...</Button>
        ) : ''
      }
    </>
  );
}

BlogList.defaultProps = {
  posts: {},
  styling: {
    overflow: 'auto',
    'overflowX': 'hidden',
    height: '80vh'
  },
}

BlogList.propTypes = {
  posts: PropTypes.object,
  styling: PropTypes.object,
};

