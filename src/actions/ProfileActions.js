import {
  PROFILE_UPDATE
} from './types';

export const profileUpdate = ({ prop, value }) => {
  return {
    type: PROFILE_UPDATE,
    payload: { prop, value }
  };
};
