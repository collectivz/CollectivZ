import * as TYPES from '../constants/constants';

export const read = () => ({ type: TYPES.USERPROFILE })
export const readSuccess = (user) => ({ user, type: TYPES.USERPROFILE_SUCCESS })
export const readError = (err) => ({ err, type: TYPES.USERPROFILE_ERROR })
