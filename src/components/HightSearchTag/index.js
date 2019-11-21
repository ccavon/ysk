/* 高级搜索 - tag  HightSearchTag */
import React , { PureComponent } from 'react'
import { Tag } from 'antd';
import { configSelect } from '../HightSearch/configSelect.js';

export default  class HightSearchTag extends PureComponent {

  state = {
    tags:[],//当前tag循环的显示内容
    tagsLabel:{},
    staticTag:{}
  }

  static defaultProps ={
    data:null,
    onDelete:null,
    style:{},
    className:'',

  }
  
  componentDidMount(){
    const { data } = this.props;    
    this.setState({staticTag:data});//save cache 
    this._setPropsTagToState(data);
  }

  componentWillReceiveProps(nextProps){
    const { staticTag } = this.state;
    if(nextProps.data!==staticTag){//difference cache , then set
      this.setState({staticTag:nextProps.data})
      this._setPropsTagToState(nextProps.data);
    }
  }

  _setPropsTagToState = (data)=>{
    if(!data){return}
    let tags =[];
    for(let i in data ){
      tags.push({ [i]:data[i] });
    }
    this.setState({tags})

    let labelDoms = document.querySelectorAll('.ant-form-item-label>label');
    if(labelDoms){
      let tagsLabel= {}
      for(let j =0;j<labelDoms.length;j++){
        let forLabel = labelDoms[j].getAttribute('for');
        let labelText = labelDoms[j].getAttribute('title');
        tagsLabel[forLabel] = labelText;
      }
      let tagsLabelOption = configSelect.reduce((current,item)=>{
        let tagLabel = {
          [item.value]:item.title,
          [current.value]:current.title,
        }
        current = Object.assign(current||{},tagLabel)
        return current
      })
      // console.log(tagsLabelOption)
      // console.log(tagsLabel)
      this.setState({tagsLabel:Object.assign(tagsLabel,tagsLabelOption)})
    }
  }

  handleClose = (removedTag) => {
     const { onDelete } = this.props;
     const tags = this.state.tags.filter(tag => tag !== removedTag);
     let tagsLabel = JSON.parse(JSON.stringify(this.state.tagsLabel));//
     for(let j in tagsLabel){
        if(removedTag[j]){
          delete tagsLabel[j]
        }
     }
     this.setState({ tags , tagsLabel });
     if(tags.length){
      //此处需要将 tags 的多个Item合并为一个 
      const retTag = tags.slice();
      var retData = retTag.reduce((cuur,values)=>{
        cuur = Object.assign(cuur,values)
        return cuur
      })
     }else{
      retData = {}
     }
     onDelete(retData);//callbak to parentNode
  }

  render(){
    let { tags , tagsLabel } = this.state;
    let { style , className } = this.props;
    return (
      <span style={style} className={className}>
        {
          tags && tags.map((item,index)=>{
            let key = Object.keys(item)[0];
            let dom = null;
            if(item[key] && item[key] !==''){
              dom = <Tag key={`${key}-${index}`} closable afterClose={() => this.handleClose(item)} >{`${tagsLabel[key]}:${item[key]}`}</Tag>
            }
            return dom
          })
        }
      </span>
    )
  }
}