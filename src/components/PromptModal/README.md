# 如何使用

在页面表单发生更改时，调用 dva/redux 中方法
|参数|描述|传入数据类型|默认值|
|---|:--:|---:|---:|
|allowRedirect|是否添加验证|boolean| false(必填)|
|content|提示框文案|String| 系统可能不会保存您所做的更改。(可选)|
|cancelText|取消文案|String| 取消(可选)|
|leaveText|确认文案|String| 离开(可选)|

``` javascript
    dispatch({
      type: 'global/changeAllowRedirect',
      payload: { 
        allowRedirect: false,
        content: '是否离开',
        cancelText: '取消',
        leaveText: '离开'
      },
    })

    //针对表单任一项验证调用方法

    @Form.create({
      onValuesChange: (props, changedValues, allValues) => {
        const { dispatch } = props;
        dispatch({
          type: 'global/changeAllowRedirect',
          payload: { 
            allowRedirect: false,
            content: '是否离开',
            cancelText: '取消',
            leaveText: '离开'
          },
        })
      }
    })
```
