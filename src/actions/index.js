export function decrement() {
  return {
    type: 'DECREMENT',
  };
}

export function increment() {
  return {
    type: 'INCREMENT',
  };
}

export function incrementAsync(reddit) {
  return {
    type: 'INCREMENT_ASYNC',
    reddit
  };
}

export function incrementByAmount(reddit) {
  return {
    type: 'INCREMENT_BY_AMOUNT',
    reddit,
  };
}

export function selectCount(reddit) {
  return reddit.counter;
}

export function getPosts(state) {
  return state.postData;
}

export function getUsers(state) {
  return state.userData;
}

export function getComments(state) {
  return state.commentData;
}

export function createNewPost(post) {
  return {
    type: 'CREATE_NEW_POST',
    post
  };
}
