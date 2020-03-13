import { combineReducers } from 'redux';

export function postData(state = {
  query: false
}, action) {
  switch (action.type) {
    case 'CREATE_NEW_POST':
      let newPost = { ...action.post };
      newPost.id = new Date().setMilliseconds(0);
      return {
        ...state,
        items: {
          ...state.items,
          [newPost.id]: newPost,
        }
      };
      case 'RECEIVE_POSTS':
        const assignPosts = {};
        action.posts.map((item) => {
          assignPosts[item.id] = item;
          return item;
        });
        return {
          ...state,
          items: {
            ...state.items,
            ...assignPosts,
          }
        }
      case 'QUERY_POSTS':
        return {
          ...state,
          query: true
        }
      case 'RECEIVE_QUERY_POSTS':
        return {
          ...state,
          results: action.results
        }
      case 'DONE_QUERY_POSTS':
        return {
          ...state,
          query: false
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
      return {
        ...state,
        loggedID: typeof action.id === 'number' ? action.id : -1
      };
    case 'QUERY_ACCOUNT':
      return {
        ...state,
        query: action.state
      };
    case 'ACTION_ACCOUNT':
      return {
        ...state,
        status: action.status
      };
    default:
      return state;
  }
}

export function messagesData(state = {
  message: '',
  show: false
}, action) {
  switch (action.type) {
    case 'RECEIVE_MESSAGE':
      return {
        ...state,
        message: action.message,
        show: true
      };
    case 'HIDE_MESSAGE':
      return {
        ...state,
        message: '',
        show: false,
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
  messagesData,
});

export default rootReducer;
