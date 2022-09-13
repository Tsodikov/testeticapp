import { configureStore } from '@reduxjs/toolkit';
import chapters from './chapterSlice.js';
import questions from './questionsSlice.js';
import tests from './testsSlice.js';
import answers from './answersSlice';
import mediafiles from './mediaFilesSlice.js';
import users from './usersSlice.js';
import organization from './organizationSlice';
import testSession from './testSessionSlice';
import department from './departmentsSlice';
import questionSession from './questionSessionSlice';

const stringMidleware = () => (next) => (action) => {
  if (typeof action === 'string') {
      return next({
          type: action
      })
  }
  return next(action);
}

export const store = configureStore({
  reducer: { chapters, questions, answers, tests, mediafiles, users, organization, testSession, department, questionSession },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMidleware),
  devTools: process.env.NODE_ENV !== 'production',   
});