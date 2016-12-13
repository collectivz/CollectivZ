import * as TYPES from '../constants/constants';

export const read = (userId) => ({ userId, type: TYPES.USERPROFILE })
export const startRead = (userId) => ({ userId, type: TYPES.SUBSCRIBE })
export const readSuccess = (user) => ({ ...user, type: TYPES.USERPROFILE_SUCCESS })
export const readError = (err) => ({ err, type: TYPES.USERPROFILE_ERROR })



export const ddpAction = (actionType, packet) => ({
  type: actionType,
  payload: packet,
});
