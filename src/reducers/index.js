import { combineReducers } from 'redux';

export function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'INCREMENT_BY_AMOUNT':
      return state += action.reddit;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

export function postData(state = {}, action) {
  switch (action.type) {
    case 'CREATE_NEW_POST':
      let newPost = { ...action.post };
      newPost.id = new Date().setMilliseconds(0);
      return {
        ...state,
        [newPost.id]: newPost
      };
    case 'RECEIVE_POSTS':
      const assignPosts = {};
      action.posts.map((item) => {
        assignPosts[item.id] = item;
        return item;
      });
      return {
        ...state,
        ...assignPosts
      }
    default:
      return state;
  }
}

export function userData(state = {}, action) {
  switch (action.type) {
    case 'RECEIVE_USERS':
      const assignUsers = {};
      action.users.map((item) => {
        assignUsers[item.id] = item;
        return item;
      });
      return {
        ...state,
        ...assignUsers
      }
    default:
      return state;
  }
}

export function commentData(state = {}, action) {
  switch (action.type) {
    case 'RECEIVE_COMMENTS':
      const assignComments = {};
      action.comments.map((item) => {
        assignComments[item.id] = item;
        return item;
      });
      return {
        ...state,
        ...assignComments
      }
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  counter,
  postData,
  userData,
  commentData,
});

export default rootReducer;
