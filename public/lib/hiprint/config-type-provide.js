// 配置左侧操作菜单栏
// const hiprint = window.hiprint;
var configElementTypeProviderQRCODE = (function () {
  console.log('configElementTypeProviderQRCODE',window.hiprint)
  return function (options) {
      var addElementTypes = function (context) {
          context.addPrintElementTypes(
              "testModule",
              [
                  new hiprint.PrintElementTypeGroup("二维码打印", [
                      { tid: 'configModule.assetsRecord', title: '资产编号', field: 'assetsRecord', data: 'assetsRecord', type: 'text' },
                      { tid: 'configModule.assetsRecordName', title: '资产名称', field: 'assetsRecordName', data: 'assetsRecordName', type: 'text' },
                      { tid: 'configModule.useDeptName', title: '使用科室', field: 'useDeptName', data: 'useDeptName', type: 'text' },
                      { tid: 'configModule.rorgName', title: '医院名称', field: 'rorgName', data: 'rorgName', type: 'text',
                      "fontSize":18,"textAlign":"center","lineHeight":18 },
                      { tid: 'configModule.spec', title: '规格', field: 'spec', data: 'spec', type: 'text' },
                      { tid: 'configModule.fmodel', title: '型号', field: 'fmodel', data: 'fmodel', type: 'text' },
                      { tid: 'configModule.specfmodel', title: '规格型号', field: 'specfmodel', data: 'specfmodel', type: 'text' },
                      { tid: 'configModule.fmodelspec', title: '型号规格', field: 'fmodelspec', data: 'fmodelspec', type: 'text' },
                      { tid: 'configModule.tfBrand', title: '品牌', field: 'tfBrand', data: 'tfBrand', type: 'text' },
                      { tid: 'configModule.buyDate', title: '购买日期', field: 'buyDate', data: 'buyDate', type: 'text' },
                      { tid: 'configModule.eqProductNo', title: '出厂编号', field: 'eqProductNo', data: 'eqProductNo', type: 'text' },
                      { tid: 'configModule.produceName', title: '生产厂家', field: 'produceName', data: 'produceName', type: 'text' },
                      { tid: 'configModule.forgName', title: '供应商名称', field: 'forgName', data: 'forgName', type: 'text' },
                      { tid: 'configModule.buyPrice', title: '购买金额', field: 'buyPrice', data: 'buyPrice', type: 'text' },
                      { tid: 'configModule.originalValue', title: '原值', field: 'originalValue', data: 'originalValue', type: 'text' },
                      { tid: 'configModule.customText', title: '自定义文本', customText: '自定义文本', custom: true, type: 'text' },
                      { tid: 'configModule.qrImage', title: '二维码', data: '/images/qrImage.png', field: 'qrImage', type: 'image'},
                      // { tid: 'configModule.customText', title: '自定义文本', customText: '自定义文本', custom: true, type: 'text' }
                    
                  ]),
                  new hiprint.PrintElementTypeGroup("辅助", [
                      {
                          tid: 'configModule.hline',
                          title: '横线',
                          type: 'hline'
                      },
                      {
                          tid: 'configModule.vline',
                          title: '竖线',
                          type: 'vline'
                      },
                      {
                          tid: 'configModule.rect',
                          title: '矩形',
                          type: 'rect'
                      },
                      { tid: 'configModule.image', 
                        title: '图片', 
                        data: '/images/logo.min.jpg',// require('@/assets/logo.min.jgp'), 
                        type: 'image' 
                      },
                      
                  ])
              ]
          );
      };

      return {
          addElementTypes: addElementTypes
      };

  };
})();