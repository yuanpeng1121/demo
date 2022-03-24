import React from 'react';
import store from "../../store";
import {clickMenu,getDevice} from "../../store/actionCreators"; 
import './mobile.scss';
import {Grid,List,Dropdown} from 'antd-mobile';
import { 
  Table,Select,Alert,Modal,Input,Form,Button,Upload, message
} from 'antd';
const { Option } = Select;
import { PlusOutlined,
  QuestionCircleOutlined,
  LoadingOutlined,MenuOutlined } from '@ant-design/icons';
import { DownOutline,AddOutline } from 'antd-mobile-icons'
import AddO from '../addO/addO';

class Mobile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo:store.getState().userInfo,
      isModalVisible:false, //新增组织弹窗
      isModal:false,//新增人员弹窗
      collapsed: false,
      loading: false,//上传图片的loading
      imageUrl:store.getState().detailedData?store.getState().detailedData.icon:'',//上传图片的地址
      error:false,//
      loading: false,//上传图片的loading
      name:'',//新增成员名称
      email:'',//新增email
      permissions:'',//新增permissions
      clickIndex:'',//
      detailedData:store.getState().detailedData,
      newName:'',
      permissionsList:store.getState().permissionsList,
      ltdList: store.getState().ltdList,
      pointList:['A','B','C'],
      columns : [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
        },
        {
          title: 'Permissions',
          dataIndex: 'permissions',
          key: 'permissions',
          render: (permissions) => 
            <Select defaultValue={permissions} style={{ width: 120 }} onChange={this.clickChange}>
              {
                  this.state.permissionsList.map((item,index) => (
                    <Option value={item} key={index}>{item}</Option>
                ))
              }
            </Select>,
          },
      ]
    };
    
    store.subscribe(this.storeChange.bind(this))
  }
  componentWillUnmount() {
    this.setState = ()=>false;
}
  storeChange() {
    this.setState(store.getState());
    this.setState({
      imageUrl:store.getState().detailedData?store.getState().detailedData.icon:''
    })
  }
  clickChange=(value)=>{
    let newD= this.state.detailedData;
    newD.sonList[this.state.clickIndex].permissions=value;
    const action=clickMenu(newD)
    store.dispatch(action)
  }
  // 点击顶部切换。切换组织
  clickDownMenu=(item)=>{
    console.log(item)
    this.downLeft.close()
    const action=clickMenu(item)
    store.dispatch(action)
  }
  // 点击顶部锚点
  goPoint=()=>{
    this.pointRef.close()
  }
  // 点击顶部添加按钮，添加组织
  showModalMenu=()=>{
    this.setState({
      isModalVisible:true
    })
  }
  handleCancel = (res) =>{
    this.setState({
      isModalVisible:res
    })
  }
  // 新增人员
  showModal=()=>{
    if(this.state.detailedData){
      this.setState({
        isModal:true,
        error:false
      })
    }else{
      this.setState({
        error:true
      })
    }
  }
  cancelAddMembers=()=>{
    this.setState({
      isModal:false
    })
  }
  
  clearModal=()=>{
    this.setState({
      name:'',
      email:'',
      permissions:''
    })
  }
  handleOk = (values) => {
    this.setState({
      isModal:false,
      permissions:values.permissions,
      email:values.email,
      name:values.name
    },()=>{
      // 新增进ltdList列表
      let newLtd={
        permissions:this.state.permissions,
        email:this.state.email,
        name:this.state.name
      }
      let newArr=this.state.detailedData
      newArr.sonList.unshift(newLtd)
      const action=clickMenu(JSON.parse(JSON.stringify(newArr)))
      store.dispatch(action)
    })
  };
  onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  // 更换logo
  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  }
  // 格式转换
  getBase64 = (img, callback)=>{
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  // 上传图片前。限制图片格式以及图片大小
  beforeUpload=(file)=>{
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }
  normFile = (e) => {  //如果是typescript, 那么参数写成 e: any
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  render() {
    const { loading } = this.state;
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <div className='APP'>
        { 
              this.state.error? <Alert  message="请先添加组织" type="error" />:''
            }
        {/* 新增人员开始 */}
        <Modal destroyOnClose title="新增成员" visible={this.state.isModal} footer={null} onCancel={this.cancelAddMembers} >
          <Form
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
            initialValues={{remember: true }}
            onFinish={this.handleOk}
            onFinishFailed={this.onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="请输入成员"
              name="name"
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="请输入邮箱"
              name="email"
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="请选择权限"
              name="permissions"
              rules={[{ required: true, message: 'Please input your permissions!' }]}
            >
              <Select defaultValue={this.state.defaultValue} style={{ width: 120 }} onChange={this.addChange}>
              {
                  this.state.permissionsList.map((item,index) => (
                    <Option value={item} key={index}>{item}</Option>
                ))
              }
            </Select>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        {/* 新增人员结束 */}
        <AddO isModalVisible={this.state.isModalVisible}     receiveAddClose={this.handleCancel}></AddO>
        <div className='headerBox'>
        <div className='header'>
          <span className="left">dataReachable</span>
          <div className="right">
              <div className='rightI'>YL</div>
              <div>
                <Dropdown ref={(el)=>this.pointRef=el} closeOnClickAway={true}  arrow={<MenuOutlined  style={{color:'#FD6B0B',fontSize:34}} />}>
                  <Dropdown.Item key='more' title=''>
                    <div style={{ padding: 12 }}>
                    <List>
                    {
                        this.state.pointList.map((item,index) => (
                          <List.Item arrow={false} key={index} onClick={this.goPoint}>
                            {item}
                          </List.Item>
                      ))
                    }
                     
                    </List>
                    </div>
                  </Dropdown.Item>
                </Dropdown>
              </div>
          </div>
          
        </div>
        <div className="controller">
          <div className="left">
          <Dropdown ref={(el)=>this.downLeft=el} closeOnClickAway={true} arrow={<DownOutline   style={{fontSize:14}} />}>
              <Dropdown.Item key='down' title=''>
                <div className="downList">
                <List>
                  {
                      this.state.ltdList.map((item,index) => (
                        <List.Item  arrow={false} key={index} onClick={()=>this.clickDownMenu(item)}>
                          <img style={{width:30,height:30,marginRight:10}} src={item.icon}></img>
                          {item.name}
                        </List.Item>
                    ))
                  }
                </List>
                </div>
              </Dropdown.Item>
            </Dropdown>
            <img src={store.getState().detailedData?store.getState().detailedData.icon:''} />
            <span className="name">{store.getState().detailedData?store.getState().detailedData.name:''}</span>
          </div>
          <div className='right' onClick={this.showModalMenu}>
            <AddOutline style={{color:'#478DA5',fontSize:34}}/>
          </div>
        </div>
        </div>
        <div className="contentWarp">
          <div className="bigLogo">
            <div>
                <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  beforeUpload={this.beforeUpload}
                  onChange={this.handleChange}
                >
                  {this.state.imageUrl ? <img src={this.state.imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                </Upload>
            </div>
            <span>Change Logo</span>
          </div>
          <div className="status">
            <p>status</p>
            <span>
              Private
            </span>
            <QuestionCircleOutlined />
          </div>
          <div className="Members">
            <p>Members</p>
            <div className="table">
            <Table pagination={false} columns={this.state.columns} dataSource={this.state.detailedData?this.state.detailedData.sonList:[]} rowKey={record => record.name} 
              onRow={(record,index) => {
                return {
                  onClick: event => {
                    this.setState({
                      clickIndex:index,
                    })
                  },
                  onDoubleClick: event => { console.log(event) }
                }
              }}>
            </Table>
            </div>
          </div>
          <div className="addLtd" onClick={this.showModal}>
              <PlusOutlined/>
              <span>Add member</span>
            </div>
        </div>
      </div>
    );
  }
}
export default Mobile;
