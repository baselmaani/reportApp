import { StateContext } from './StateContext';

export const initialState = {
  user: null,
};

// dashboard
export const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};
