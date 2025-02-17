import { PayloadAction } from '@reduxjs/toolkit';
import { SagaIterator } from 'redux-saga';
import { takeLatest, call, put, select } from 'redux-saga/effects';
import { fetchRepositories } from '../api/github';
import { RootState, RepositoryResponse } from '../types';
import {
  fetchRepositoriesRequest,
  fetchRepositoriesSuccess,
  fetchRepositoriesFailure,
} from './reposSlice';

function* fetchRepositoriesSaga(): SagaIterator {
  try {
    const state: RootState = yield select();
    const { currentPage, searchQuery } = state.repos;
    const response: RepositoryResponse = yield call(fetchRepositories, currentPage, searchQuery);
    yield put(fetchRepositoriesSuccess(response));
  } catch (error) {
    yield put(fetchRepositoriesFailure(error instanceof Error ? error.message : 'An error occurred'));
  }
}

export default function* rootSaga(): SagaIterator {
  yield takeLatest(fetchRepositoriesRequest.type, fetchRepositoriesSaga);
}