/*
 * @Author: xiangxue 
 * @Date: 2019-02-28 15:53:56 
 * @Last Modified by: xiangxue
 * @Last Modified time: 2019-03-29 10:22:34
 */
 
export const ColumnsChangeRecord = [
    {
      title:"变更类型",
      dataIndex:"changeTypeName",
      width: 200
    },
    {
      title:"变更前内容",
      dataIndex:"oldValue",
      width: 200
    },//采购单位(后)
    {
      title:"变更后内容",
      dataIndex:"newValue",
      width: 200
    },
    {
      title:"操作员",
      dataIndex:"createUserName",
      width: 200
    },
    {
      title:"变更时间",
      dataIndex:"createTime",
      width: 200
    }
  ]

 
export const ColumnsModifyPrice = [
  {
    title:"调价(前)",
    dataIndex:"oldValue",
    width: 200
  },
  {
    title:"调价(后)",
    dataIndex:"newValue",
    width: 200
  },//采购单位(后)
  {
    title:"供应商",
    dataIndex:"forgName",
    width: 200
  },
  {
    title:"操作员",
    dataIndex:"createUserName",
    width: 200
  },
  {
    title:"操作时间",
    dataIndex:"createTime",
    width: 200
  }
]

   
export const ColumnsChangeCert = [
  {
    title:"证件号(变更前)",
    dataIndex:"oldValue",
    width: 200
  },
  {
    title:"有效期",
    dataIndex:"oldLastTime",
    width: 200
  },//采购单位(后)
  {
    title:"证件号(变更后)",
    dataIndex:"newValue",
    width: 200
  },
  {
    title:"有效期",
    dataIndex:"newLastTime",
    width: 200
  },
  {
    title:"变更类型",
    dataIndex:"changeTypeName",
    width: 200
  },
  {
    title:"操作员",
    dataIndex:"createUserName",
    width: 200
  },
  {
    title:"操作时间",
    dataIndex:"createTime",
    width: 200
  }
]

 
export const ColumnsSupply = [
  {
    title:"供应商",
    dataIndex:"forgName",
    width: 200
  },//采购单位(后)
  {
    title:"变更类型",
    dataIndex:"changeTypeName",
    width: 200
  },
  {
    title:"操作员",
    dataIndex:"createUserName",
    width: 200
  },
  {
    title:"变更时间",
    dataIndex:"createTime",
    width: 200
  }
]

 
export const ColumnsCompany = [
  {
    title:"采购单位(前)",
    dataIndex:"oldValue",
    width: 200
  },
  {
    title:"单位换算(前)",
    dataIndex:"oldValue2",
    width: 200
  },//采购单位(后)
  {
    title:"采购单位(后)",
    dataIndex:"newValue",
    width: 200
  },
  {
    title:"单位换算(后)",
    dataIndex:"newValue2",
    width: 200
  },//采购单位(后)
  {
    title:"操作员",
    dataIndex:"createUserName",
    width: 200
  },
  {
    title:"变更时间",
    dataIndex:"createTime",
    width: 200
  }
]

export const ColumnsUserGrant = [
  {
    title:"业务员",
    dataIndex:"userName",
    width: 200
  },
  {
    title:"授权身份",
    dataIndex:"userIdentityName",
    width: 200
  },//采购单位(后)
  {
    title:"授权效期",
    dataIndex:"grantLastTime",
    width: 200
  },
  {
    title:"联系电话",
    dataIndex:"mobile",
    width: 200
  }
]

export const ColumnsProduct = [
  {
    title: '产品名称',
    dataIndex: 'materialName',
  },
  {
    title: '型号',
    dataIndex: 'fmodel',
  },
  {
    title: '规格',
    dataIndex: 'spec',
  },
  {
    title: '数量',
    dataIndex: 'amount',
  },
  {
    title: '单位',
    dataIndex: 'leastUnitCode',
  },
  {
    title: '组件名称',
    dataIndex: 'suitName',
  },
  {
    title: '证件号',
    dataIndex: 'registerNo',
  }
];

export const ColumnsGw = [
  {
    title: '集采平台',
    dataIndex: 'gwsiteName',
  },
  {
    title: '挂网编码',
    dataIndex: 'gwCode',
  },
  {
    title: '挂网限价',
    dataIndex: 'gwPrice',
  }
];

export const ColumnsSalesman = [
  {
    title: '业务员',
    dataIndex: 'userName',
  },
  {
    title: '授权身份',
    dataIndex: 'userIdentityName',
  },
  {
    title: '授权效期',
    dataIndex: 'grantLastTime',
  },
  {
    title: '联系电话',
    dataIndex: 'mobile',
  }
]
