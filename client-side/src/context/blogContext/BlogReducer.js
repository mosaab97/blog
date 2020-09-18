import {
    SAVE_STATE,
  } from '../types';
  
  const BlogReducer = (state, action) => {
    switch (action.type) {
    case SAVE_STATE: {
      return {
        ...state,
        [action.payload.id]: action.payload.value,
      };
    }
    default: return state;
    }
  };
  
  export default BlogReducer;
  