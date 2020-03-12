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

export function* fetchPosts(reddit) {
  const resp = yield call(fetchApi, reddit);
  console.log('data', resp);
}

export function* delayIncrement(reddit) {
  yield delay(1000);
  yield put({
    type: 'INCREMENT_BY_AMOUNT',
    reddit
  });
}

export function* incrementAsync() {
  while(true) {
    const { reddit } = yield take('INCREMENT_ASYNC');
    yield call(delayIncrement, reddit);
    yield call(fetchPosts, 'posts');
  }
}

export function* startup() {
  yield delay(1000);
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
  // const selectedReddit = yield select(selectedRedditSelector);
  // yield fork(fetchPosts, selectedReddit);
}

export default function* root() {
  yield fork(startup);
  yield fork(incrementAsync);
}
