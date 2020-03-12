import { combineReducers } from 'redux';

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

export function accountData(state = {
  loggedID: -1,
  query: false,
  status: 'unlogged'
}, action) {
  switch (action.type) {
    case 'RECEIVE_ACCOUNT':
      const logged = {
        loggedID: typeof action.id === 'number' ? action.id : -1
      };
      return {
        ...state,
        ...logged
      };
    case 'QUERY_ACCOUNT':
      const query = {
        query: action.state
      };
      return {
        ...state,
        ...query
      };
    case 'ACTION_ACCOUNT':
      const status = {
        status: action.status
      };
      return {
        ...state,
        ...status
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  postData,
  userData,
  commentData,
  accountData,
});

export default rootReducer;
