import { queryCurrent, register } from '@/services/user';

export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {},
  },

  effects: {
    // *fetch(_, { call, put }) {
    //   const response = yield call(queryUsers);
    //   yield put({
    //     type: 'save',
    //     payload: response,
    //   });
    // },
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
    *userLogin({ payload, callback }, { put }) {
      const { userName, password } = payload;
      let flag = true;
      if (userName === 'admin' && password === 'admin') {
        yield put({
          type: 'saveCurrentUser',
          payload
        })
      } else {
        flag = false;
      }
      setTimeout(() => {
        if (callback) callback(flag)
      }, 1000)
    },
    *register({ payload, callback, _ }, { call, put }) {
      const response = yield call(register, payload)
      let flag = response ? true : false;
      setTimeout(() => {
        if (callback) callback(flag)
      }, 1000)
    }
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload,
        },
      };
    },
  },
};
