import { delay } from 'redux-saga';
import { call, take, put, select } from 'redux-saga/effects';

// ------------------------------------
// Constants
// ------------------------------------
export const UPDATE_TITLE = '<%= pascalEntityName %>/UPDATE_TITLE';
export const GET_QUOTE = '<%= pascalEntityName %>/GET_QUOTE';
export const RECEIVE_QUOTE = '<%= pascalEntityName %>/RECEIVE_QUOTE';

// ------------------------------------
// Actions
// ------------------------------------
export const updateTitle = (value) => ({
  type: UPDATE_TITLE,
  payload: value,
});

export const getQuote = () => ({
  type: GET_QUOTE,
});

export const receiveQuote = (quote) => ({
  type: RECEIVE_QUOTE,
  payload: quote,
});

export const actions = {
  updateTitle,
  getQuote,
  receiveQuote,
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [UPDATE_TITLE]: (state, action) => ({
    ...state,
    title: action.payload,
  }),
  [RECEIVE_QUOTE]: (state, action) => ({
    ...state,
    quote: action.payload,
  }),
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  title: 'A Title Stored in global state.',
};
export const <%= pascalEntityName %>Reducer = (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
};
export default <%= pascalEntityName %>Reducer;

// ------------------------------------
// Sagas
// ------------------------------------

const fetchQuote = () =>
  fetch('http://quotes.rest/qod.json?category=inspire')
    .then(response => response.json())
    .then(json => json.contents.quotes[0].quote);

export function *watchGetQuote() {
  while (true) {
    yield take(GET_QUOTE);
    const state = yield select();
    if (!state.<%= camelEntityName %>.quote) {
      yield put(actions.updateTitle('You dispatched an action!'));
      yield put(actions.receiveQuote('Fetching Quote...'));
      const quote = yield call(fetchQuote);
      yield delay(1000); // simulate a long load time since this call is pretty quick.
      yield put(actions.receiveQuote(quote));
    }
    else {
      yield put(actions.updateTitle('You already have a quote.'));
    }
  }
}

export const sagas = [
  watchGetQuote,
];
