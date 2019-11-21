export const orgType = {
  "1": '医院',
  "2": '企业（供应商、厂商）',//企业（供应商、厂商）
  "3": '监管部门',
  "9": '其他'
}

export const orgTypeSelect = [
  { text: '医院', value: '1' },
  // { text: '企业（供应商、厂商）' , value: '2'},
  // { text: '监管部门' , value: '3'},
  { text: '其他', value: '9' },
]

export const hospitalLevel = {
  '1': '三甲医院'
}

export const hospitalLevelSelect = [
  { text: '三甲医院', value: '1' }
]
export const dictsortSelect = [
  { text: '标准字典', value: '00' },
  { text: '公有字典', value: '01' },
  { text: '私有字典', value: '02' }
]

export const SuitOption = {
  '1': '套装',
  '0': '单品'
}

export const ProductFstateSelect = [
  { text: '启用', value: '1' },
  { text: '停用', value: '0' },
]
export const ProductFstateOption = {
  '1': '启用',
  '0': '停用'
}

export const isClinicalFeesSelect = [
  { text: '是', value: '1' },
  { text: '否', value: '0' },
]
export const isClinicalFeesOption = {
  '1': '是',
  '0': '否'
}

export const TAFSelect = [
  { text: '是', value: '1' },
  { text: '否', value: '2' },
]
export const HONSelect = [
  { text: '有', value: '1' },
  { text: '无', value: '2' },
]
export const TAFOption = {
  1: '是',
  2: '否',
  null: '无'
}
export const HONOption = {
  1: '有',
  2: '无',
  null: '无'
}
// 采购管理 订单状态
// 0草稿；20待发送；26发送失败；29已撤销；30待供应商确认；40备货中；70关闭；80订单完成；90拒绝订单
export const OrderFstate = {
  "0": "草稿",
  "20": "待发送",
  "26": "发送失败",
  "29": "已撤销",
  "30": "待供应商确认",
  "40": "备货中",
  "70": "关闭",
  "80": "订单完成",
  "90": "拒绝订单",
}

export const OrderFstateSelect = [
  { text: "待发送", value: "20" },
  { text: "待确认", value: "30" },
  { text: "备货中", value: "40" },
  { text: "待发送", value: "20" },
  { text: "待发送", value: "20" },
]

// 精细化 - 库房管理 - 拣货管理 - 状态
export const warehouseMgtPickFstateSelect = [
  { text: "全部", value: "" },
  { text: "待出库", value: "10" },
  { text: "完结", value: "80" },
  { text: "异常结束", value: "79" }
]

export const warehouseMgtPickFstate = {
  "10": "待出库",
  "40": "采购中",
  "80": "完结",
  "79": "异常结束"
}
// 精细化 - 科室工作站 - 拣货管理 - 类型
export const warehouseMgtSendModeSelect = [
  { text: "全部", value: "" },
  { text: "普耗申请", value: "APPLY" },
  { text: "手术申请", value: "HIGH_APPLY" },
  { text: "借用申请", value: "USE_APPLY" },
]
export const warehouseMgtSendMode = {
  "APPLY": "普耗申领",
  "HIGH_APPLY": "手术申请",
  "USE_APPLY": "借用申请"
}
// 精细化 - 库房管理 - 拣货管理 - 类型
export const warehouseMgtSendModeSelectBIG = [
  { text: "全部", value: "" },
  { text: "普耗申领", value: "01" },
  { text: "普耗调拨申领", value: "02" }
]
export const warehouseMgtSendModeBIG = {
  "01": "普耗申领",
  "02": "普耗调拨申领"
}

//精细化 - 科室工作站 - 库房申领入库 - 入库记录 - 入库分类
//入库方式  - 01、采购入库 04、盘盈 05、初始化 06、退货
// case when ti.inmode  = 01 then '采购'
//             when ti.inmode  = 04 then '盘盈'
//             when ti.inmode  = 05 then '初始化'
//             when ti.inmode  = 06 then '退货'
//             when ti.inmode  = 07 then '调拨'
//             when ti.inmode  = 08 then '备货'
//             when ti.inmode  = 09 then '赠送'
export const InModeSelect = [
  { text: "全部", value: "" },
  { text: "备货入库", value: "08" },
  { text: "初始化入库", value: "05" },
  { text: "备货退货", value: "06" },
  { text: "调拨入库", value: "07" },
  { text: "赠送入库", value: "09" },
]

// 普耗申领
//状态状态 
//0草稿,10已提交（高值耗材申请HIGH_APPLY(手术申请)：15待出库）,20待确认,34库管驳回,
//37采购驳回,40采购中,42已撤销,47已作废,60完结,79异常结束
export const PHfstate = {
  "0": "草稿",
  "10": "已提交",
  "15": "待出库",
  "20": "待确认",
  "34": "库管驳回",
  "37": "采购驳回",
  "40": "采购中",
  "42": "已撤销",
  "47": "已作废",
  "60": "完结",
  "79": "异常结束"
}

// 库房出库退库 --申请受理 状态
export const ApplyTypeNames = {
  'APPLY': '科室申请',
  'OPER_APPLY': '手术备货申请',
  'HIGH_APPLY': '手术备货申请',
  'ALLOT_APPLY': '调拨申请'
}

export const FstateNames = {
  '0': '草稿',
  '10': '已提交',
  '20': '待确认',
  '34': '库管驳回',
  '37': '采购驳回',
  '40': '采购中',
  '42': '已撤销',
  '47': '已作废',
  '60': '完结',
  '79': '异常结束'
}
/**
 * 申请管理 - 申领管理 --> 状态
 * 状态 0草稿,10已提交,20待确认,34库管驳回,37采购驳回,40采购中,42已撤销,47已作废,60完结,79异常结束
 */
export const GetClaimFstate = [
  { value: '', text: '全部' },
  { value: '0', text: '草稿' },
  { value: '10', text: '已提交' },
  { value: '20', text: '待确认' },
  { value: '34', text: '库管驳回' },
  { value: '37', text: '采购驳回' },
  { value: '40', text: '采购中' },
  { value: '42', text: '已撤销' },
  { value: '47', text: '已作废' },
  { value: '60', text: '完结' },
  { value: '79', text: '异常结束' }
];

export const PHFstateSelect = [
  { text: "全部", value: "" },
  { text: "草稿", value: "0" },
  { text: "待确认", value: "20" },
  { text: "采购中", value: "40" },
  { text: "库房驳回", value: "34" },
  { text: "采购驳回", value: "37" },
  { text: "已撤销", value: "42" },
  { text: "已作废", value: "47" },
  { text: "异常结束", value: "79" },
  { text: "完结", value: "60" }
]

/**
 * 出库分类-->出库查询--出库管理
 */
export const LargeStoreroomOutMode = [      // 大库房
  { value: '', text: '全部' },
  { value: '01', text: '拣货单出库' },
  { value: '02', text: '领用出库' },
  { value: '03', text: '申购出库' },
  // { value: '04', text: '盘亏出库' },
  { value: '05', text: '退库出库' },
  { value: '06', text: '结算出库' },
  { value: '07', text: '调拨出库' }
];
export const SecondaryStoreroomDoutMode = [ // 二级库房
  { value: '', text: '全部' },
  { value: '01', text: '拣货单出库' },
  { value: '02', text: '领用出库' },
  { value: '05', text: '退库出库' },
  // { value: '06', text: '结算出库' },
  // { value: '07', text: '调拨出库' },
  // { value: '08', text: '骨科产品出库' }
];
export const GetClaimMgtFstate = [
  { value: '', text: '全部' },
  // { value: '10', text: '已提交' },
  { value: '20', text: '待确认' },
  { value: '34', text: '库管驳回' },
  { value: '37', text: '采购驳回' },
  { value: '40', text: '采购中' },
  { value: '42', text: '已撤销' },
  { value: '47', text: '已作废' },
  { value: '60', text: '完结' },
  { value: '79', text: '异常结束' }
];
export const GetClaimMgtApplyTypeNames = {
  'APPLY': '普耗申领',
  // 'OPER_APPLY': '手术备货申请',
  // 'HIGH_APPLY': '手术备货申请',
  'ALLOT_APPLY': '普耗调拨申领'
}

export const testBatchSelect = [
  { text: '日常检查', value: '1' },
  { text: '荆州市中心医院(2016-01至2016-12)', value: '2' },
  { text: '荆州市中心医院(2017-01至2017-12)', value: '3' },
  { text: '荆州市中心医院(2018-01至2018-12)', value: '4' },
  { text: '河北省遵化市人民医院(2017-01至2017-12)', value: '5' },
  { text: '石家庄市第五医院(2018-01至2018-12)', value: '6' },
  { text: '唐县人民医院(2018-01至2018-09)', value: '7' },
  { text: '河北医科大学第三医院(2018-01至2018-03)', value: '8' },
  { text: '河北医科大学第三医院(2018-04至2018-06)', value: '9' },
  { text: '河北医科大学第三医院(2018-07至2018-09)', value: '10' },
  { text: '河北医科大学第三医院(2018-10至2018-12)', value: '11' },
  { text: '济宁医学附属医院(2019-04至2019-06)', value: '12' },
  { text: '秭归县人民医院-2019', value: '13' },
  { text: '20191009-20191009', value: '14' },
  { text: '秭归县人民医院-2019', value: '15' },
  { text: '荆州市中心医院(2019-09至2019-09)', value: '16' }
];

export const statusSelect = [
  { text: '错误', value: '1' },
  { text: '待检查', value: '2' },
  { text: '检查中', value: '3' },
  { text: '正确', value: '4' },
  { text: '待审查', value: '5' },
  { text: '已更改', value: '6' },
  { text: '待删除', value: '7' },
];

export const attributesSelect = [
  { text: '归档日期', value: '1' },
  { text: '药物过敏', value: '2' },
  { text: '入院前多少天(颅脑损伤患者昏迷时间)', value: '3' },
  { text: '入院后多少天(颅脑损伤患者昏迷时间)', value: '4' },
  { text: '籍贯省份', value: '5' },
  { text: '籍贯市', value: '6' },
  { text: '病案源状态', value: '7' },
  { text: '医疗付费方式', value: '8' },
  { text: '出生地省份', value: '9' },
  { text: '出生地市', value: '10' },
  { text: '出生地县', value: '11' },
  { text: '民族', value: '12' },
  { text: '国籍', value: '13' },
  { text: '身份证号', value: '14' },
  { text: '工作单位及地址', value: '15' },
  { text: '单位电话', value: '16' },
  { text: '联系人姓名', value: '17' }
];

export const verificationRuleSelect = [
  { text: '不能为空', value: '1' },
  { text: '必须大于0', value: '2' },
  { text: '取值应在机构名称表范围内', value: '3' },
  { text: '不能大于入院时间', value: '4' },
  { text: '不能小于出生日期', value: '5' },
  { text: '不能小于入院时间', value: '6' },
  { text: '位数应等于18位或15位', value: '7' },
  { text: '位数应等于6位', value: '8' },
  { text: '取值应等于入院日期减出生日期(误差范围1岁)', value: '9' },
  { text: '如有药物过敏不能为空', value: '10' }
];

export const caseSourceStatusSelect = [
  { text: '已提交', value: '1' },
  { text: '已编目', value: '2' },
  { text: '已归档', value: '3' },
  { text: '已出院', value: '4' },
];

export const orgIdSelect = [
  { text: '荆州市中心医院', value: '1' },
  { text: '衡水市第二人民医院', value: '2' },
  { text: '唐山南湖医院', value: '3' },
  { text: '巨鹿县医院', value: '4' },
  { text: '河北省遵化市人民医院', value: '5' },
  { text: '故城县医院', value: '6' },
  { text: '河北省胸科医院', value: '7' },
  { text: '石家庄市第五医院', value: '8' },
  { text: '河北医科大学口腔医院', value: '9' },
  { text: '河北省第六人民医院', value: '10' },
  { text: '唐县人民医院', value: '11' },
  { text: '河北医科大学第三医院', value: '12' },
  { text: '济宁医学院附属医院', value: '13' },
  { text: '湖北省咸宁市咸安区人民医院', value: '14' },
  { text: '海南现代妇女儿童医院', value: '15' },
  { text: '黄石有色医院', value: '16' },
  { text: '秭归县人民医院', value: '17' }
];

export const getMZFS = [
  { text: '全身麻醉', value: '1' },
  { text: '吸入麻醉', value: '11' },
  { text: '静脉麻醉', value: '12' },
  { text: '基础麻醉', value: '13' },
  { text: '椎管内麻醉', value: '2' },
  { text: '蛛网膜下腔阻滞麻醉', value: '21' },
  { text: '硬脊膜外腔阻滞麻醉', value: '22' },
  { text: '局部麻醉', value: '3' },
  { text: '神经丛阻滞麻醉', value: '31' },
  { text: '神经节阻滞麻醉', value: '32' },
  { text: '神经阻滞麻醉', value: '33' },
  { text: '区域阻滞麻醉', value: '34' },
  { text: '局部浸润麻醉', value: '35' },
  { text: '表面麻醉', value: '36' },
  { text: '复合麻醉', value: '4' },
  { text: '静吸复合全麻', value: '41' },
  { text: '针药复合麻醉', value: '42' },
  { text: '神经丛与硬膜外阻滞复合麻醉', value: '43' },
  { text: '全麻复合全身降温', value: '44' },
  { text: '全麻复合控制性降压', value: '45' },
  { text: '其他麻醉方法', value: '9' },
];

// 医院类型
export const forgType = [
  { "value": "1", "text": "综合医院", "code": "zhyy" },
  { "value": "2", "text": "中医医院", "code": "zyyy" },
  { "value": "3", "text": "中西医结合医院", "code": "zxyjhyy" },
  { "value": "4", "text": "民族医院", "code": "mzyy" },
  { "value": "5", "text": "口腔医院", "code": "kqyy" },
  { "value": "6", "text": "眼科医院", "code": "ykyy" },
  { "value": "7", "text": "耳鼻喉科医院", "code": "ebhkyy" },
  { "value": "8", "text": "肿瘤医院", "code": "zlyy" },
  { "value": "9", "text": "心血管医院", "code": "xxgyy" },
  { "value": "10", "text": "胸科医院", "code": "xkyy" },
  { "value": "11", "text": "血液病医院", "code": "xybyy" },
  { "value": "12", "text": "妇产医院", "code": "fcyy" },
  { "value": "13", "text": "儿童医院", "code": "etyy" },
  { "value": "14", "text": "精神病医院", "code": "jsbyy" },
  { "value": "15", "text": "传染病院", "code": "crby" },
  { "value": "16", "text": "皮肤病医院", "code": "pfbyy" },
  { "value": "17", "text": "结核病医院", "code": "jhbyy" },
  { "value": "18", "text": "麻风病医院", "code": "mfbyy" },
  { "value": "19", "text": "职业病医院", "code": "zybyy" },
  { "value": "20", "text": "骨科医院", "code": "gkyy" },
  { "value": "21", "text": "康复医院", "code": "kfyy" },
  { "value": "22", "text": "整形外科医院", "code": "zxwkyy" },
  { "value": "23", "text": "美容医院", "code": "mryy" },
  { "value": "24", "text": "妇产儿童", "code": "fcet" }
];

// 科室科别
export const Department = [
  { "value": "1", "text": "预防保健科", "code": "yfbjk" },
  { "value": "2", "text": "全科医疗科", "code": "qkylk" },
  { "value": "3", "text": "内科", "code": "nk" },
  { "value": "301", "text": "呼吸内科专业", "code": "hxnkzy" },
  { "value": "302", "text": "消化内科专业", "code": "xhnkzy" },
  { "value": "303", "text": "神经内科专业", "code": "sjnkzy" },
  { "value": "304", "text": "心血管内科专业", "code": "xxgnkzy" },
  { "value": "305", "text": "血液内科专业", "code": "xynkzy" },
  { "value": "306", "text": "肾病学专业", "code": "sbxzy" },
  { "value": "307", "text": "内分泌专业", "code": "nfmzy" },
  { "value": "308", "text": "免疫学专业", "code": "myxzy" },
  { "value": "309", "text": "变态反应专业", "code": "btfyzy" },
  { "value": "310", "text": "老年病专业", "code": "lnbzy" },
  { "value": "311", "text": "其他", "code": "qt" },
  { "value": "4", "text": "外科", "code": "wk" },
  { "value": "401", "text": "普通外科专业", "code": "ptwkzy" },
  { "value": "40101", "text": "肝脏移植项目", "code": "gzyzxm" },
  { "value": "40102", "text": "胰腺移植项目", "code": "yxyzxm" },
  { "value": "40103", "text": "小肠移植项目", "code": "xcyzxm" },
  { "value": "402", "text": "神经外科专业", "code": "sjwkzy" },
  { "value": "403", "text": "骨科专业", "code": "gkzy" },
  { "value": "404", "text": "泌尿外科专业", "code": "mnwkzy" },
  { "value": "40401", "text": "肾脏移植项目", "code": "szyzxm" },
  { "value": "405", "text": "胸外科专业", "code": "xwkzy" },
  { "value": "40501", "text": "肺脏移植项目", "code": "fzyzxm" },
  { "value": "406", "text": "心脏大血管外科专业", "code": "xzdxgwkzy" },
  { "value": "40601", "text": "心脏移植项目", "code": "xzyzxm" },
  { "value": "407", "text": "烧伤科专业", "code": "sskzy" },
  { "value": "408", "text": "整形外科专业", "code": "zxwkzy" },
  { "value": "409", "text": "其他", "code": "qt" },
  { "value": "5", "text": "妇产科", "code": "fck" },
  { "value": "501", "text": "妇科专业", "code": "fkzy" },
  { "value": "502", "text": "产科专业", "code": "ckzy" },
  { "value": "503", "text": "计划生育专业", "code": "jhsyzy" },
  { "value": "504", "text": "优生学专业", "code": "ysxzy" },
  { "value": "505", "text": "生殖健康与不孕症专业", "code": "szjkybyzzy" },
  { "value": "506", "text": "其他", "code": "qt" },
  { "value": "6", "text": "妇女保健科", "code": "fnbjk" },
  { "value": "601", "text": "青春期保健专业", "code": "qcqbjzy" },
  { "value": "602", "text": "围产期保健专业", "code": "wcqbjzy" },
  { "value": "603", "text": "更年期保健专业", "code": "gnqbjzy" },
  { "value": "604", "text": "妇女心理卫生专业", "code": "fnxlwszy" },
  { "value": "605", "text": "妇女营养专业", "code": "fnyyzy" },
  { "value": "606", "text": "其他", "code": "qt" },
  { "value": "7", "text": "儿科", "code": "ek" },
  { "value": "701", "text": "新生儿专业", "code": "xsezy" },
  { "value": "702", "text": "小儿传染病专业", "code": "xecrbzy" },
  { "value": "703", "text": "小儿消化专业", "code": "xexhzy" },
  { "value": "704", "text": "小儿呼吸专业", "code": "xehxzy" },
  { "value": "705", "text": "小儿心脏病专业", "code": "xexzbzy" },
  { "value": "706", "text": "小儿肾病专业", "code": "xesbzy" },
  { "value": "707", "text": "小儿血液病专业", "code": "xexybzy" },
  { "value": "708", "text": "小儿神经病学专业", "code": "xesjbxzy" },
  { "value": "709", "text": "小儿内分泌专业", "code": "xenfmzy" },
  { "value": "710", "text": "小儿遗传病专业", "code": "xeycbzy" },
  { "value": "711", "text": "小儿免疫专业", "code": "xemyzy" },
  { "value": "712", "text": "其他", "code": "qt" },
  { "value": "8", "text": "小儿外科", "code": "xewk" },
  { "value": "801", "text": "小儿普通外科专业", "code": "xeptwkzy" },
  { "value": "802", "text": "小儿骨科专业", "code": "xegkzy" },
  { "value": "803", "text": "小儿泌尿外科专业", "code": "xemnwkzy" },
  { "value": "804", "text": "小儿胸心外科专业", "code": "xexxwkzy" },
  { "value": "805", "text": "小儿神经外科专业", "code": "xesjwkzy" },
  { "value": "806", "text": "其他", "code": "qt" },
  { "value": "9", "text": "儿童保健科", "code": "etbjk" },
  { "value": "901", "text": "儿童生长发育专业", "code": "etszfyzy" },
  { "value": "902", "text": "儿童营养专业", "code": "etyyzy" },
  { "value": "903", "text": "儿童心理卫生专业", "code": "etxlwszy" },
  { "value": "904", "text": "儿童五官保健专业", "code": "etwgbjzy" },
  { "value": "905", "text": "儿童康复专业", "code": "etkfzy" },
  { "value": "906", "text": "其他", "code": "qt" },
  { "value": "10", "text": "眼科", "code": "yk" },
  { "value": "11", "text": "耳鼻咽喉科", "code": "ebyhk" },
  { "value": "1101", "text": "耳科专业", "code": "ekzy" },
  { "value": "1102", "text": "鼻科专业", "code": "bkzy" },
  { "value": "1103", "text": "咽喉科专业", "code": "yhkzy" },
  { "value": "1104", "text": "其他", "code": "qt" },
  { "value": "12", "text": "口腔科", "code": "kqk" },
  { "value": "1201", "text": "口腔内科专业", "code": "kqnkzy" },
  { "value": "1202", "text": "口腔颌面外科专业", "code": "kqhmwkzy" },
  { "value": "1203", "text": "正畸专业", "code": "zjzy" },
  { "value": "1204", "text": "口腔修复专业", "code": "kqxfzy" },
  { "value": "1205", "text": "口腔预防保健专业", "code": "kqyfbjzy" },
  { "value": "1206", "text": "其他", "code": "qt" },
  { "value": "13", "text": "皮肤科", "code": "pfk" },
  { "value": "1301", "text": "皮肤病专业", "code": "pfbzy" },
  { "value": "1302", "text": "性传播疾病专业", "code": "xcbjbzy" },
  { "value": "1303", "text": "其他", "code": "qt" },
  { "value": "14", "text": "医疗美容科", "code": "ylmrk" },
  { "value": "15", "text": "精神科", "code": "jsk" },
  { "value": "1501", "text": "精神病专业", "code": "jsbzy" },
  { "value": "1502", "text": "精神卫生专业", "code": "jswszy" },
  { "value": "1503", "text": "药物依赖专业", "code": "ywylzy" },
  { "value": "1504", "text": "精神康复专业", "code": "jskfzy" },
  { "value": "1505", "text": "社区防治专业", "code": "sqfzzy" },
  { "value": "1506", "text": "临床心理专业", "code": "lcxlzy" },
  { "value": "1507", "text": "司法精神专业", "code": "sfjszy" },
  { "value": "1508", "text": "其他", "code": "qt" },
  { "value": "16", "text": "传染科", "code": "crk" },
  { "value": "1601", "text": "肠道传染病专业", "code": "cdcrbzy" },
  { "value": "1602", "text": "呼吸道传染病专业", "code": "hxdcrbzy" },
  { "value": "1603", "text": "肝炎专业", "code": "gyzy" },
  { "value": "1604", "text": "虫媒传染病专业", "code": "cmcrbzy" },
  { "value": "1605", "text": "动物源性传染病专业", "code": "dwyxcrbzy" },
  { "value": "1606", "text": "蠕虫病专业", "code": "rcbzy" },
  { "value": "1607", "text": "其它", "code": "qt" },
  { "value": "17", "text": "结核病科", "code": "jhbk" },
  { "value": "18", "text": "地方病科", "code": "dfbk" },
  { "value": "19", "text": "肿瘤科", "code": "zlk" },
  { "value": "20", "text": "急诊医学科", "code": "jzyxk" },
  { "value": "21", "text": "康复医学科", "code": "kfyxk" },
  { "value": "22", "text": "运动医学科", "code": "ydyxk" },
  { "value": "23", "text": "职业病科", "code": "zybk" },
  { "value": "2301", "text": "职业中毒专业", "code": "zyzdzy" },
  { "value": "2302", "text": "尘肺专业", "code": "cfzy" },
  { "value": "2303", "text": "放射病专业", "code": "fsbzy" },
  { "value": "2304", "text": "物理因素损伤专业", "code": "wlyssszy" },
  { "value": "2305", "text": "职业健康监护专业", "code": "zyjkjhzy" },
  { "value": "2306", "text": "其他", "code": "qt" },
  { "value": "24", "text": "临终关怀科", "code": "lzghk" },
  { "value": "25", "text": "特种医学与军事医学科", "code": "tzyxyjsyxk" },
  { "value": "26", "text": "麻醉科", "code": "mzk" },
  { "value": "27", "text": "疼痛科", "code": "ttk" },
  { "value": "28", "text": "重症医学科", "code": "zzyxk" },
  { "value": "30", "text": "医学检验科", "code": "yxjyk" },
  { "value": "3001", "text": "临床体液、血液专业", "code": "lctyxyzy" },
  { "value": "3002", "text": "临床微生物学专业", "code": "lcwswxzy" },
  { "value": "3003", "text": "临床生化检验专业", "code": "lcshjyzy" },
  { "value": "3004", "text": "临床免疫、血清学专业", "code": "lcmyxqxzy" },
  { "value": "3005", "text": "临床细胞分子遗传学专业", "code": "lcxbfzycxzy" },
  { "value": "3006", "text": "其他", "code": "qt" },
  { "value": "31", "text": "病理科", "code": "blk" },
  { "value": "32", "text": "医学影像科", "code": "yxyxk" },
  { "value": "3201", "text": "X线诊断专业", "code": "Xxzdzy" },
  { "value": "3202", "text": "CT诊断专业", "code": "CTzdzy" },
  { "value": "3203", "text": "磁共振成像诊断专业", "code": "cgzcxzdzy" },
  { "value": "3204", "text": "核医学专业", "code": "hyxzy" },
  { "value": "3205", "text": "超声诊断专业", "code": "cszdzy" },
  { "value": "3206", "text": "心电诊断专业", "code": "xdzdzy" },
  { "value": "3207", "text": "脑电及脑血流图诊断专业", "code": "ndjnxltzdzy" },
  { "value": "3208", "text": "神经肌肉电图专业", "code": "sjjrdtzy" },
  { "value": "3209", "text": "介入放射学专业", "code": "jrfsxzy" },
  { "value": "3210", "text": "放射治疗专业", "code": "fszlzy" },
  { "value": "3211", "text": "其他", "code": "qt" },
  { "value": "50", "text": "中医科", "code": "zyk" },
  { "value": "5001", "text": "内科专业", "code": "nkzy" },
  { "value": "5002", "text": "外科专业", "code": "wkzy" },
  { "value": "5003", "text": "妇产科专业", "code": "fckzy" },
  { "value": "5004", "text": "儿科专业", "code": "ekzy" },
  { "value": "5005", "text": "皮肤科专业", "code": "pfkzy" },
  { "value": "5006", "text": "眼科专业", "code": "ykzy" },
  { "value": "5007", "text": "耳鼻咽喉科专业", "code": "ebyhkzy" },
  { "value": "5008", "text": "口腔科专业", "code": "kqkzy" },
  { "value": "5009", "text": "肿瘤科专业", "code": "zlkzy" },
  { "value": "5010", "text": "骨伤科专业", "code": "gskzy" },
  { "value": "5011", "text": "肛肠科专业", "code": "gckzy" },
  { "value": "5012", "text": "老年病科专业", "code": "lnbkzy" },
  { "value": "5013", "text": "针灸科专业", "code": "zjkzy" },
  { "value": "5014", "text": "推拿科专业", "code": "tnkzy" },
  { "value": "5015", "text": "康复医学专业", "code": "kfyxzy" },
  { "value": "5016", "text": "急诊科专业", "code": "jzkzy" },
  { "value": "5017", "text": "预防保健科专业", "code": "yfbjkzy" },
  { "value": "5018", "text": "其他", "code": "qt" },
  { "value": "51", "text": "民族医学科", "code": "mzyxk" },
  { "value": "5101", "text": "维吾尔医学", "code": "wweyx" },
  { "value": "5102", "text": "藏医学", "code": "zyx" },
  { "value": "5103", "text": "蒙医学", "code": "myx" },
  { "value": "5104", "text": "彝医学", "code": "yyx" },
  { "value": "5105", "text": "傣医学", "code": "dyx" },
  { "value": "5106", "text": "其他", "code": "qt" },
  { "value": "52", "text": "中西医结合科", "code": "zxyjhk" },
  { "value": "69", "text": "其他业务科室", "code": "qtywks" }
];

// 生成条件（质量分析）
export const elementTypeSelect = [
  { value: "b", text: "批次" },
  { value: "y", text: "年份" },
  { value: "q", text: "季度" },
  { value: "m", text: "月份" },
  { value: "ib", text: "病种/批次" },
  { value: "iy", text: "病种/年份" },
  { value: "iq", text: "病种/季度" },
  { value: "im", text: "病种/月份" },
  { value: "opb", text: "手术/批次" },
  { value: "opy", text: "手术/年份" },
  { value: "opq", text: "手术/季度" },
  { value: "opm", text: "手术/月份" },
  { value: "mdb", text: "主要诊断/批次" },
  { value: "mdy", text: "主要诊断/年份" },
  { value: "mdq", text: "主要诊断/季度" },
  { value: "mdm", text: "主要诊断/月份" },
  { value: "mob", text: "主要手术/批次" },
  { value: "moy", text: "主要手术/年份" },
  { value: "moq", text: "主要手术/季度" },
  { value: "mom", text: "主要手术/月份" },
  { value: "molb", text: "主要手术级别/批次" },
  { value: "moly", text: "主要手术级别/年份" },
  { value: "molq", text: "主要手术级别/季度" },
  { value: "molm", text: "主要手术级别/月份" },
  { value: "npmb", text: "肿瘤/批次" },
  { value: "npmy", text: "肿瘤/年份" },
  { value: "npmq", text: "肿瘤/季度" },
  { value: "npmm", text: "肿瘤/月份" },
  { value: "npmopb", text: "恶性肿瘤重点手术/批次" },
  { value: "npmopy", text: "恶性肿瘤重点手术/年份" },
  { value: "npmopq", text: "恶性肿瘤重点手术/季度" },
  { value: "npmopm", text: "恶性肿瘤重点手术/月份" },
  { value: "asab", text: "麻醉分级/批次" },
  { value: "asay", text: "麻醉分级/年份" },
  { value: "asaq", text: "麻醉分级/季度" },
  { value: "asam", text: "麻醉分级/月份" },
  { value: "mdcb", text: "主要疾病分类/批次" },
  { value: "mdcy", text: "主要疾病分类/年份" },
  { value: "mdcq", text: "主要疾病分类/季度" },
  { value: "mdcm", text: "主要疾病分类/月份" },
  { value: "p26b", text: "出院科室/批次" },
  { value: "p26y", text: "出院科室/年份" },
  { value: "p26q", text: "出院科室/季度" },
  { value: "p26m", text: "出院科室/月份" },
  { value: "amcb", text: "麻醉方式类别/批次" },
  { value: "amcy", text: "麻醉方式类别/年份" },
  { value: "amcq", text: "麻醉方式类别/季度" },
  { value: "amcm", text: "麻醉方式类别/月份" }
];

export const AddMenu = [
  {
    fsort: 9,
    level: 1,
    menuAlias: "档案管理",
    menuCode: "900",
    parentCode: "0",
    url: "/archivesManage",
    children: [
      {
        fsort: 0,
        level: 2,
        menuAlias: "资产档案",
        menuCode: "999999",
        parentCode: "900",
        url: "/archivesManage/assetsRecord",
      }, {
        fsort: 1,
        level: 2,
        menuAlias: "资产档案-科室",
        menuCode: "99999-1",
        parentCode: "900",
        url: "/archivesManage/assetsRecordKS",
      },
      {
        fsort: 3,
        level: 2,
        menuAlias: "资产审核",
        menuCode: "999998",
        parentCode: "900",
        url: "/archivesManage/assetsAudit",
      },
      {
        fsort: 0,
        level: 2,
        menuAlias: "培训记录",
        menuCode: "999997",
        parentCode: "900",
        url: "/archivesManage/trainingRecord"
      },
      {
        fsort: 0,
        level: 2,
        menuAlias: "应急演练",
        menuCode: "999996",
        parentCode: "900",
        url: "/archivesManage/emergencyDrill"
      },
      {
        fsort: 0,
        level: 2,
        menuAlias: "物资分类",
        menuCode: "999995",
        parentCode: "900",
        url: "/archivesManage/materialClassification"
      },
    ]
  },
  {
    fsort: 9,
    level: 1,
    menuAlias: "质量控制",
    menuCode: "800",
    url: "/qualityControl",
    children: [
      {
        fsort: 0,
        level: 2,
        menuAlias: "不良事件-科室工作站",
        menuCode: "888886",
        parentCode: "800",
        url: "/qualityControl/badRecord_department"
      }, {
        fsort: 0,
        level: 2,
        menuAlias: "不良记录-设备系统管理",
        menuCode: "888887",
        parentCode: "800",
        url: "/qualityControl/badRecord_systemMgt"
      }, {
        fsort: 0,
        level: 2,
        menuAlias: "巡检记录",
        menuCode: "888888",
        parentCode: "800",
        url: "/qualityControl/inspectionRecord"
      }, {
        fsort: 0,
        level: 2,
        menuAlias: "计量目录-科室工作站",
        menuCode: "888889",
        parentCode: "800",
        url: "/qualityControl/meterMenu"
      }, {
        fsort: 0,
        level: 2,
        menuAlias: "计量查询",
        menuCode: "888890",
        parentCode: "800",
        url: "/qualityControl/meterquery"
      }, {
        fsort: 0,
        level: 2,
        menuAlias: "计量台账",
        menuCode: "888891",
        parentCode: "800",
        url: "/qualityControl/meterLedger"
      }
    ]
  },
  {
    fsort: 9,
    level: 1,
    menuAlias: "基础数据",
    menuCode: "700",
    url: "/basicData",
    children: [
      {
        fsort: 0,
        level: 2,
        menuAlias: "设备产品",
        menuCode: "777777",
        parentCode: "700",
        url: "/basicData/deviceProduct"
      }
    ]
  },
  {
    fsort: 9,
    level: 1,
    menuAlias: "系统管理",
    menuCode: "600",
    url: "/deviceSystemMgt",
    children: [
      {
        fsort: 0,
        level: 2,
        menuAlias: "派工规则",
        menuCode: "666666",
        parentCode: "600",
        url: "/deviceSystemMgt/laborRules"
      },
      {
        fsort: 0,
        level: 2,
        menuAlias: "流程控制",
        menuCode: "666665",
        parentCode: "600",
        url: "/deviceSystemMgt/processControl"
      },
      {
        fsort: 0,
        level: 2,
        menuAlias: "工作班组",
        menuCode: "666664",
        parentCode: "600",
        url: "/deviceSystemMgt/workTeam"
      }
    ]
  },
  {
    fsort: 9,
    level: 1,
    menuAlias: "科室设备管理",
    menuCode: "701",
    url: "/deptDeviceMgt",
    children: [
      {
        fsort: 0,
        level: 2,
        menuAlias: "报修登记",
        menuCode: "701001",
        parentCode: "701",
        url: "/deptDeviceMgt/repairRegister"
      }, {
        fsort: 0,
        level: 2,
        menuAlias: "报修记录",
        menuCode: "701002",
        parentCode: "701",
        url: "/deptDeviceMgt/repairRecord"
      }, {
        fsort: 0,
        level: 2,
        menuAlias: "维修验收",
        menuCode: "701003",
        parentCode: "701",
        url: "/deptDeviceMgt/repairAccept"
      }
    ]
  },
  {
    fsort: 9,
    level: 1,
    menuAlias: "维修管理",
    menuCode: "702",
    url: "/repairMgt",
    children: [
      {
        fsort: 0,
        level: 2,
        menuAlias: "维修录入",
        menuCode: "702001",
        parentCode: "702",
        url: "/repairMgt/repairInput"
      }, {
        fsort: 0,
        level: 2,
        menuAlias: "维修派工",
        menuCode: "702002",
        parentCode: "702",
        url: "/repairMgt/repairDispatch"
      }, {
        fsort: 0,
        level: 2,
        menuAlias: "维修记录",
        menuCode: "702003",
        parentCode: "702",
        url: "/repairMgt/repairRecord"
      }, {
        fsort: 0,
        level: 2,
        menuAlias: "我的维修",
        menuCode: "702004",
        parentCode: "702",
        url: "/repairMgt/myRepair"
      }, {
        fsort: 0,
        level: 2,
        menuAlias: "委外维修",
        menuCode: "702005",
        parentCode: "702",
        url: "/repairMgt/OutRepair"
      },
    ]
  }, {
    fsort: 9,
    level: 1,
    menuAlias: "资产转科",
    menuCode: "703",
    url: "/assetsTransfer",
    children: [
      {
        fsort: 0,
        level: 2,
        menuAlias: "集中转科",
        menuCode: "703001",
        parentCode: "702",
        url: "/assetsTransfer/centerTransfer"
      }, {
        fsort: 0,
        level: 2,
        menuAlias: "转科管理",
        menuCode: "703002",
        parentCode: "702",
        url: "/assetsTransfer/transferMgt"
      }
    ]
  }, {
    fsort: 9,
    level: 1,
    menuAlias: "库房管理",
    menuCode: "704",
    url: "/warehouseMgt",
    children: [
      {
        fsort: 0,
        level: 2,
        menuAlias: "设备验收",
        menuCode: "704001",
        parentCode: "704",
        url: "/warehouseMgt/deviceCheck"
      }, {
        fsort: 2,
        level: 2,
        menuAlias: "我的配送单",
        menuCode: "704002",
        parentCode: "704",
        url: "/warehouseMgt/distributionOrder"
      }, {
        fsort: 3,
        level: 2,
        menuAlias: "批量入库",
        menuCode: "704003",
        parentCode: "704",
        url: "/warehouseMgt/batchIn"
      }
    ]
  }
]
