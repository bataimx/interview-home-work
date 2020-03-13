import { put, call, fork, delay, takeLatest, select } from 'redux-saga/effects';
// import fetch from 'isomorphic-fetch';
import comments from '../db/comments.json';
import users from '../db/users.json';
import posts from '../db/posts.json';

export function fetchApi(name) {
  switch (name) {
    case 'posts':
      return posts;
    case 'comments':
      return comments;
    default:
      return users;
  }
}

export function* verifyAccount(params) {
  const { account } = params;
  yield put({
    type: 'QUERY_ACCOUNT',
    state: true
  });
  yield delay(1000);
  const users = yield call(fetchApi, 'users');
  const filterResults = users.filter(item => item.password === account.pwd && item.username === account.usn);
  if(!!filterResults[0]) {
    yield put({
      type: 'RECEIVE_ACCOUNT',
      id: filterResults[0].id
    });
    yield put({
      type: 'ACTION_ACCOUNT',
      status: 'logged'
    });
  } else {
    yield put({
      type: 'ACTION_ACCOUNT',
      status: 'wrong_password'
    });
    yield put({
      type: 'RECEIVE_MESSAGE',
      message: 'Wrong User Name or Password!!',
    });
  }
  yield put({
    type: 'QUERY_ACCOUNT',
    state: false
  });
}

export function* selectAllQueryPost() {
  yield put({
    type: 'QUERY_POSTS'
  });
  yield delay(1000);
  const posts = yield select(state => state.postData.items);
  yield put({
    type: 'RECEIVE_QUERY_POSTS',
    results: posts
  });
  yield put({
    type: 'DONE_QUERY_POSTS'
  });
}

export function* queryNewPost(params) {
  const { post } = params;
  yield put({
    type: 'QUERY_POSTS'
  });
  yield delay(500);
  yield put({
    type: 'CREATE_NEW_POST',
    post
  });
  yield put({
    type: 'RECEIVE_MESSAGE',
    message: 'Create new post success!',
  });
  yield put({
    type: 'DONE_QUERY_POSTS'
  });
}

export function* selectQueryPost(params) {
  const { keywords } = params;
  yield put({
    type: 'QUERY_POSTS'
  });
  yield delay(1000);
  const posts = yield select(state => state.postData.items);

  const testReg = new RegExp(`(${keywords.trim().replace(/\s/g, '|')})`, 'ig');
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
  yield put({
    type: 'RECEIVE_QUERY_POSTS',
    results: results
  });
  yield put({
    type: 'DONE_QUERY_POSTS'
  });
}

export function* startup() {
  yield delay(500);
  const posts = yield call(fetchApi, 'posts');
  const users = yield call(fetchApi, 'users');
  const comments = yield call(fetchApi, 'comments');
  yield put({
    type: 'RECEIVE_POSTS',
    posts
  });
  yield put({
    type: 'RECEIVE_USERS',
    users
  });
  yield put({
    type: 'RECEIVE_COMMENTS',
    comments
  });
  yield put({
    type: 'QUERY_ACCOUNT',
    state: false
  });
  yield put({
    type: 'ACTION_ACCOUNT',
    status: 'unlogged'
  });
  yield put({
    type: 'HIDE_MESSAGE',
  });
}

export default function* root() {
  yield fork(startup);
  yield takeLatest('VERIFY_ACCOUNT', verifyAccount);
  yield takeLatest('SELECT_ALL_QUERY_POSTS', selectAllQueryPost);
  yield takeLatest('SELECT_QUERY_POSTS', selectQueryPost);
  yield takeLatest('QUERY_NEW_POST', queryNewPost);
}
