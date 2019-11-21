/* 动态设置table表头 */

import React ,{ PureComponent } from 'react';
import { Modal, Row, Col, Checkbox , Card , Tree } from 'antd';
import './index.less'
const TreeNode = Tree.TreeNode;

class TableConfigModal extends PureComponent{

  constructor(props){
    super(props)
    this.state={
      column:[],
      visible:props.visible || false,
      options:props.config,
      selectedKeys: [],
      treeNodes: [],
      cacheSelectedKeys:[],//每次提交的时候保持的缓存
      cacheColumns:[],
      callback:null,//函数回调事件
    }
  }
  
  static defaultProps= {
    hasIndex: true
  }

  componentDidMount() {
    const { _option } = this.props;
    if(_option&&_option.callback){
      this.setState({callback:_option.callback})
    }
    if(_option&&_option.columns){
      const column = this._initColumn(_option.columns)[0];
      const selectedKeys = this._initColumn(_option.columns)[1];
      const cacheColumns = _option.columns ;
      this.setState({ column , cacheColumns , selectedKeys},()=>{
        this._genTreeNodes(selectedKeys)
      })
    }
  }
  componentWillReceiveProps(nextProps){
    console.log(nextProps,'nextProps')
    const { visible } = this.state;
    if(visible !==nextProps.visible){
      this.setState({visible:nextProps.visible})
    }
  }
  //弹出取消 
  handleCancel = () => {
    this.setState({visible: false})
    this.props.callback(false)
  }
  //弹出 OK 
  handleOk = () => {
    const { callback , selectedKeys , cacheColumns } = this.state;
    let ret = [];
    selectedKeys.map((item,i) => 
      cacheColumns.map((subItem,j) => (
        item === subItem.dataIndex ? ret.push(subItem) : null
      ))
    )
    callback && callback(ret);//返回最终处理完成的column
    this.setState({ visible: false })
    this.props.callback(false)
  }
  //初始化column
  _initColumn=(columns)=>{
    
    let options = [];
    let columnArr = columns.slice();
    console.log(columnArr,'columnArr')
    if(this.props.hasIndex){
      columnArr.unshift({
        title:'序号',
        unMovable:true,
        fixed:'left',
        className:'text-center',
        dataIndex:'indexNumber',
        width: 50,
        render:(text,record,index)=>`${index+1}`
      })
    }
    if(columnArr[columnArr.length-1].title === '操作'){
      columnArr[columnArr.length-1].unMovable = true;
    }
    
    
    let _initSelectedKeys = columnArr.map((item, index) => {
      if (item.title) {//columns存在则显示放入选框
        options.push({ label: item.title, value: item.dataIndex,disabled:item.unMovable?true:false})
      }
      return item.dataIndex;
    })
    return [options,_initSelectedKeys]
  }
  //勾选事件
  _columnsChange = (value, e) => {
    const { selectedKeys } = this.state;
    if (e.target.checked && !selectedKeys.includes(value)) {
      selectedKeys.push(value)
    } else if (!e.target.checked && selectedKeys.includes(value)){
      selectedKeys.splice(selectedKeys.findIndex(val => val === value), 1);
    }
    this.setState({ selectedKeys })
    this._genTreeNodes(selectedKeys);
  }
  //生成右侧树状列表
  _genTreeNodes = (keys) => {
    const selectedKeys = keys || this.state.selectedKeys;
    const { column } = this.state;
    const nodes = [];
    for (let i=0; i<selectedKeys.length; i++) {
      for (let key in column) {
        if(selectedKeys[i] === column[key].value) {
          nodes.push({ title: column[key].label, key: column[key].value,disabled:column[key].disabled||false});
          break;
        }
      }
    }
    this.setState({ treeNodes: nodes })
  }
  //右侧树状列表拖拽事件
  onDrop = node => {
    let currentNode = node.node ;
    const { treeNodes } = this.state;
    if(currentNode.props.disabled){return}
    for (let i=0; i<treeNodes.length; i++) {
      if ( node.dragNodesKeys.includes(treeNodes[i].key)) {
        treeNodes.splice(i, 1)
        break;
      }
    }
    let newNodeArr = [];
    let dropPosition = node.dropPosition;
    /* 向上拖拽时，获取禁用个数的下标。不允许插入dropPosition */
    let dp = treeNodes.findIndex((item)=>!item.disabled);
    if(node.dropPosition===(dp-1)){
      /* 默认设置为禁用的第一个位置*/
      dropPosition=dp
    }else if(node.dropPosition===treeNodes.length){
      /* 向下拖拽时候默认设置为禁用的最后一个内容 */
      dropPosition=treeNodes.length-1
    }
    const newNode = { key: node.dragNodesKeys[0], title: node.dragNode.props.title.split('：')[1] , disabled:node.dragNode.props.disabled}
    switch (dropPosition) {
      case -1:
          treeNodes.unshift(newNode)
        break;
      case treeNodes.length + 1:
          treeNodes.push(newNode)
        break;
      default:
        for( let j=0; j<treeNodes.length + 1; j++ ) {
          if (j < dropPosition) {
            newNodeArr[j] = treeNodes[j];
          } else if (j === dropPosition) {
            newNodeArr[j] = { ...newNode }
          } else {
            newNodeArr[j] = treeNodes[j-1]
          }
        }
        break;
    }    
    const mapArr = newNodeArr.length ? newNodeArr : treeNodes;
    let newCheckedArr = mapArr.map(item => item.key);
    this.setState({treeNodes: [...mapArr], selectedKeys: [...newCheckedArr]})
  }
  render(){
    const { visible , column , selectedKeys , treeNodes} = this.state;
    console.log(this.state.cacheColumns,'cacheColumns')
    return(
      <Modal 
      title={'自定义表头'}
      className='settingTableModal'
      visible={visible} 
      onOk={this.handleOk}
      onCancel={this.handleCancel}
      width={1000}>
          <Row>
            <Col span={18} className='borderRight'>
              <Card title="可选字段" bordered={false}>
                <Row>
                  {
                    column.map((item, index) => (
                      <Col span={8} key={index}>
                        <Checkbox 
                          style={{marginBottom:15}}
                          disabled={item.disabled}
                          onChange={this._columnsChange.bind(this, item.value)}
                          checked={selectedKeys.includes(item.value)}
                        > 
                          { item.label } 
                        </Checkbox>
                      </Col>
                    ))
                  }
                </Row>
              </Card>
            </Col>
            <Col span={6} className='borderLeft'>
              <Card title="已选字段" bordered={false}>
                <Tree
                  className="draggable-tree"
                  draggable
                  onDrop={this.onDrop}
                >
                  {
                    treeNodes.map((node, index) => (
                      <TreeNode
                        title={ `${index+1}：${node.title}` }
                        key={ node.key }
                        disabled={ node.disabled }
                      />
                    ))
                  }
                </Tree>
              </Card>
            </Col>
          </Row>
      </Modal>
    )
  }
}
export default TableConfigModal