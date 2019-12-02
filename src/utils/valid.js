
/**
 * @description 验证正数(保留两位小数)
 * @use rules:[{validator:validNumber,min:0,max:100000000}]  || rules:[{validator:validNumber}]
 * Number("aa") => NaN => 判断为"number"
*/
export const validNumber = (rule, value, callback) => {
  //let num = Number(value);
  console.log(rule, 'rule')
  if (!rule.max) { rule.max = 100000000 }
  if (!rule.min) { rule.min = 0 }
  if (!value || /^\d+$/.test(value) || /(^\d+\.\d{1}$)/.test(value) || /(^\d+\.\d{2}$)/.test(value)) {
    if (value > rule.max) {
      callback(new Error(`输入数值过大, 不能大于${rule.max || '100000000'}`));
    } if (value <= rule.min) {
      callback(new Error(`输入数值过小, 不能小于等于${rule.min || '0'}`));
    } else {
      callback();
    }
  } else {
    callback(new Error('请输入非0正数,最多保留两位小数！'));
  }
}

/**
 * @description 验证正整数
 * @param {Number} val 
 */
export const IsPosInt = (value) => {

  if (/^\d+$/.test(value) || value === 0 || value === "") {
    return true
  } else {
    return false
  }
}

export const validPositiveNumber = (rule, value, callback) => {
  if (/^\d+$/.test(value) || value === 0) {
    callback();
  } else {
    callback(new Error(rule.message || ''));
  }
}

// 限制数字区间
/**
 * 
 * @param {Object} rule 
 * @param {Number} value 
 * @param {function} callback 
 * @description rules:[{validator:validNumber,min:0,max:100000000}]
 */
/**
 * min :最小值
 * max :最大值
 * toFixed: 保留小数位数 true 4为小数
 * positive: 正整数 true 默认false
 */
export const LimitNum = (rule, value, callback) => {
  const { min, max, toFixed, positive } = rule;
  if (isNaN(Number(value))) {
    callback(new Error(`请输入数字`))
  }
  if (max && value > (max || 100000000)) {
    callback(`输入数值过大, 不能大于${max || '100000000'}`);
  }
  if (min && value < min) {
    callback(new Error(`输入数值过小, 不能小于${min || '0'}`));
  }
  if (positive && !toFixed) {//正整数正则
    if (value && !/^\d+$/.test(value)) {
      callback(new Error(`请输入正整数`));
    }
  }
  if (toFixed && positive) {//保留小数
    if (!value || /(^\d+\.\d{0,4}$)/.test(value) || /^\d+$/.test(value)) {
      callback()
    } else {
      callback(new Error(`请输入正数，最多保留0-4位小数`));
    }
  }
  callback();
}

// 请求正则表达式
const reqReq = "(http|ftp|https):\\/\\/([\\w.]+\\/?)\\S*";
/**
 * @description 判断是否为 http/https/ftp 请求
 * @param {string} url 
 */
export const validRequest = url => new RegExp(reqReq).test(url);

//日期正则
const dateReq = /((19|20|21|18)[0-9]{2})-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])/;
//判断字符串是否为YYYY-MM-DD格式的时间
export const validDate = dateStr => dateReq.test(dateStr);

//身份证正则
const idCardReq = /^[1-9]\d{5}((((19|[2-9][0-9])\d{2})(0?[13578]|1[02])(0?[1-9]|[12][0-9]|3[01]))|(((19|[2-9][0-9])\d{2})(0?[13456789]|1[012])(0?[1-9]|[12][0-9]|30))|(((19|[2-9][0-9])\d{2})0?2(0?[1-9]|1[0-9]|2[0-8]))|(((1[6-9]|[2-9][0-9])(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))0?229))\d{3}[0-9X]$/;
/**
 * @description 判断身份证是否满足 闰年 月份 长度等
 * @param {string} idCardValue
 */
export const validIdCard = idCardValue => idCardReq.test(idCardValue);
