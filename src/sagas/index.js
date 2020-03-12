import { take, put, call, fork, delay } from 'redux-saga/effects';
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

export function* verifyAccount() {
  while(true) {
    const { account } = yield take('VERIFY_ACCOUNT');
    const users = yield call(fetchApi, 'users');
    yield put({
      type: 'QUERY_ACCOUNT',
      state: true
    });
    yield delay(1000);
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
    }
    yield put({
      type: 'QUERY_ACCOUNT',
      state: false
    });
  }
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
}

export default function* root() {
  yield fork(startup);
  yield fork(verifyAccount);
}
