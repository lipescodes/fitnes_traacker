import { Exercise } from './exercise.model';
import { Action, createFeatureSelector, createSelector } from '@ngrx/store';
import { TrainingActions, SET_AVAILABLE_TRAININGS, SET_FINISHED_TRAININGS, START_TRAINING, STOP_TRAINING } from './training.actions';
import * as fromRoot from '../app.reducer';

export interface TrainingState {
  availableExercises: Exercise[];
  finishedExercise: Exercise[];
  activeTraining: Exercise;

}

export interface State extends fromRoot.State {
  tarining: TrainingState;
}

const initialState: TrainingState = {
  availableExercises: [],
  finishedExercise: [],
  activeTraining: null
};

export function trainingReducer(state = initialState, action: TrainingActions) {
  switch (action.type) {
    case SET_AVAILABLE_TRAININGS:
      return {
        ...state,
        availableExercises: action.payload
      };
    case SET_FINISHED_TRAININGS:
      return {
        ...state,
        finishedExercise: action.payload
      };
    case START_TRAINING:
      return {
        ...state,
        activeTraining: { ...state.availableExercises.find(ex => ex.id === action.payload) },
      };
    case STOP_TRAINING:
      return {
        ...state,
        activeTraining: null
      };
    default: {
      return state;
    }
  }
}
export const getTrainingState = createFeatureSelector<TrainingState>('training');

export const getAvailableExercises = createSelector(getTrainingState, (state: TrainingState) => state.availableExercises);
export const getFinishedExercises = createSelector(getTrainingState, (state: TrainingState) => state.finishedExercise);
export const getActiveTraining = createSelector(getTrainingState, (state: TrainingState) => state.activeTraining);
export const getIsTraining = createSelector(getTrainingState, (state: TrainingState) => state.activeTraining != null);

