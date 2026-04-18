import { ThunkMiddleware } from '@reduxjs/toolkit';

export const actionFuncMiddleware: ThunkMiddleware = ({
  dispatch,
  getState,
}) => (next) => (action) => {
  if (typeof action === 'function') {
    return action(dispatch, getState);
  }

  return next(action);
};
