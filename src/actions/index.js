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

export function getSignInAccount(state) {
  return state.accountData.loggedID !== -1;
}

export function verifyAccount(account) {
  return {
    type: 'VERIFY_ACCOUNT',
    account,
  };
}

export function logoutAccount() {
  return {
    type: 'RECEIVE_ACCOUNT',
    id: -1,
  };
}

export function queryAccount(state) {
  return state.accountData.query;
}

export function createNewPost(post) {
  return {
    type: 'CREATE_NEW_POST',
    post
  };
}
