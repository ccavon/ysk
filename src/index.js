import dva from 'dva';
// import createLoading from 'dva-loading';
import './app.less';
// import './fixed.css'
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

// 1. Initialize
const app = dva();

// 2. Plugins
// app.use(createLoading());

// 3. Model
app.model(require('@/models/global').default);
app.model(require('@/models/setting').default);
app.model(require('@/models/user').default);

// 4. Router
app.router(require('@/router').default);

// 5. Start
app.start('#root');
