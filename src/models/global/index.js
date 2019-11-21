import * as Global from '@/services/global';

export default {
  namespace: 'global',
  state: {
    collapsed: true,
    notices: [],
    menuData: [],
    openMenu: [],
    searchForm: {}
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {
        if (typeof window.ga !== 'undefined') {
          window.ga('send', 'pageview', pathname + search);
        }
      });
    },
  },
  effects: {
    *changeLayoutCollapsed({ payload, callback }, { put, call }) {
      yield put({ type: 'changeCollasped', payload });
    },
    *menuChange({ payload, callback }, { put, call }) {
      yield put({ type: 'openMenuChange', payload });
    },
    *fetchMenu({ payload, callback }, { put, call }) {
      const response = yield call(Global.queryMenu, payload);
      yield put({ type: 'saveMenu', payload: response });
      // yield put({ type: 'onAuthenticate', payload: response });
    },
    checkAuthority: [
      function* ({ payload, callback }, { put, call }) {
        yield put({ type: 'onAuthenticate', payload });
      },
      { type: 'throttle', ms: 1000 }
    ],
  },
  reducers: {
    changeCollasped(state, action) {
      return {
        ...state, collapsed: action.payload
      }
    },
    openMenuChange(state, action) {
      return {
        ...state, openMenu: action.payload
      }
    },
    saveMenu(state, action) {
      console.log('saveMenu：', state, action);
      return {
        ...state, menuData: action.payload
      }
    },
    onAuthenticate(state, action) {
      console.log('用户权限校验: ', state, action);
      return {
        ...state
      }
    },
    setSearchForm(state, action) {
      return {
        ...state, searchForm: action.payload
      }
    }
  },

};
