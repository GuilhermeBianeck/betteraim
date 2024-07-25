import { topRandomPosition, leftRandomPosition } from 'utils';
import { State, Actions, ActionTypes } from './types';

export const initialState: State = {
  windowDimensions: { x: 0, y: 0, width: 0, height: 0 },
  barGoalDimensions: { x: 0, y: 0, width: 0, height: 0 },
  barOptionsDimensions: { x: 0, y: 0, width: 0, height: 0 },
  isWindowFetched: false,
  resetWindows: false,
  isTourOpen: false,
  isResizing: false,
  isDragable: false,
  isDraging: false,
  isGaming: false,
  isPaused: false,
  isFullScreen: false,
  phase: 0,
  points: 0,
  meta: 55,
  clickQuantity: 0,
  timer: 0,
  click: false,
  bubbles: [],
  bubbleSize: 40,
  bubblesQuantity: 5,
  situation: '',
};

export const gameReducer = (state: State, { type, payload }: Actions) => {
  switch (type) {
    case ActionTypes.setWindowData:
      const { content, type: contentType } = payload as {
        type: 'barGoalDimensions' | 'barOptionsDimensions' | 'windowDimensions';
        content: unknown[];
      };
      return {
        ...state,
        [contentType]: { ...state[contentType], ...content },
      };
    case ActionTypes.setTour:
      return {
        ...state,
        isTourOpen: payload,
      };
    case ActionTypes.setIsDraging:
      return {
        ...state,
        isDraging: payload,
      };
    case ActionTypes.setClick:
      return {
        ...state,
        points: state.points <= 0 ? 0 : state.points - 3,
      };
    case ActionTypes.setIsResizing:
      return {
        ...state,
        isResizing: payload,
      };
    case ActionTypes.setIsFullScreen:
      return {
        ...state,
        isFullScreen: payload ?? !state.isFullScreen,
      };
    case ActionTypes.setIsGaming:
      if (payload === 'rejected' || payload === 'passed') {
        return {
          ...state,
          isGaming: payload,
          bubbles: [],
          points: 0,
          clickQuantity: 0,
        };
      }
      return {
        ...state,
        isGaming: payload,
      };
    case ActionTypes.setTimer:
      return {
        ...state,
        timer: payload,
      };
    case ActionTypes.setClickQuantity:
      if (payload === 'increase') {
        return {
          ...state,
          clickQuantity: state.clickQuantity + 1,
          points: state.points + 1,
        };
      }
      if (payload === 'decrease') {
        return {
          ...state,
          clickQuantity: state.clickQuantity - 1,
          points: state.points - 1,
        };
      }
      return {
        ...state,
        clickQuantity: payload,
      };
    case ActionTypes.setBubbles:
      if (payload.type === 'add') {
        return {
          ...state,
          bubbles: [...state.bubbles, payload.content],
        };
      }
      if (payload.type === 'update-position') {
        return {
          ...state,
          bubbles: state.bubbles.map((bubble) => {
            return {
              ...bubble,
              left: leftRandomPosition({
                gameWidth: payload.content.width,
                bubbleSize: payload.content.bubbleSize,
              }),
              top: topRandomPosition({
                gameHeight: payload.content.height,
                bubbleSize: payload.content.bubbleSize,
              }),
            };
          }),
        };
      }
      if (payload.type === 'reset') {
        return {
          ...state,
          bubbles: [],
        };
      }
      if (payload.type === 'delete') {
        return {
          ...state,
          bubbles: state.bubbles.filter((bubble) => bubble.id !== payload.content),
        };
      }
      return {
        ...state,
        bubbles: state.bubbles.filter((bubble) => bubble.id !== payload),
      };
    case ActionTypes.setPhase:
      if (payload === 'increase') {
        return {
          ...state,
          phase: state.phase + 1,
          meta: state.meta + 20,
        };
      }
      return {
        ...state,
        phase: payload,
      };
    case ActionTypes.setIsDragable:
      return {
        ...state,
        isDragable: payload ?? !state.isDragable,
      };
    case ActionTypes.setIsPaused:
      return {
        ...state,
        isPaused: payload ?? !state.isPaused,
      };
    case ActionTypes.setSituation:
      return {
        ...state,
        situation: payload,
      };
    case ActionTypes.setIsWindowFetched:
      return {
        ...state,
        isWindowFetched: payload,
      };
    case ActionTypes.setResetWindows:
      return {
        ...state,
        resetWindows: payload,
      };
    default:
      throw new Error(`The action ${type} isn't supported`);
  }
};
