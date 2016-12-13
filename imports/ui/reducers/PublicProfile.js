import {
  USERPROFILE,
  USERPROFILE_ERROR,
  USERPROFILE_SUCCESS
} from '../constants/constants';

const initialState = {
  _id: '',
  username: '',
};

export default function publicProfile(state = initialState, action) {
  switch (action.type) {
    case USERPROFILE_SUCCESS:
    console.log({ ...state, ...action })
      return { ...state, ...action };
    default:
      return state;
  }
}
