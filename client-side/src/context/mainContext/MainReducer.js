import {
    SET_LOADING, SAVE_STATE, SET_LOADING_FALSE,
  } from '../types';
  
  const MainReducer = (state, action) => {
    switch (action.type) {
    case SAVE_STATE: {
      return {
        ...state,
        [action.payload.id]: action.payload.value,
      };
    }
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
  
    case SET_LOADING_FALSE:
      return {
        ...state,
        loading: false,
      };
    default: return state;
    }
  };
  
  export default MainReducer;
  