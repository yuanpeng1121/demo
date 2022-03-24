import React from 'react';
import { 
  Table,Select,Alert,Modal,Input,Form,Button,Upload, message
} from 'antd';
import './members.scss';
const { Option } = Select;
import store from "../../store";
import { clickMenu} from "../../store/actionCreators"; 

import {
  PlusOutlined,
  QuestionCircleOutlined,
  LoadingOutlined, 
} from '@ant-design/icons';

class Members extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
          isModalVisible:false,
          detailedData:store.getState().detailedData,
          ltdName:'',
          clickIndex:null,
          error:false,//
          loading: false,//上传图片的loading
          imageUrl:'',//上传图片的地址
          name:'',//新增成员名称
          email:'',//新增email
          permissions:'',//新增permissions
          permissionsList:store.getState().permissionsList,
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
        }
        store.subscribe(this.storeChange.bind(this))
    }
    storeChange() {
      this.setState(store.getState());
      this.setState({
        imageUrl:store.getState().detailedData?store.getState().detailedData.icon:''
      })
    }
    componentWillUnmount() {
      this.setState = ()=>false;
    }
    // 选择后修改state中的detailedData
    clickChange=(value)=>{
      let newD= this.state.detailedData;
      newD.sonList[this.state.clickIndex].permissions=value;
      const action=clickMenu(newD)
      store.dispatch(action)
    }
    addChange=(value)=>{
      this.setState({
        permissions:value
      })
    }
    showModal = () => {
      if(this.state.detailedData){
        this.setState({
          isModalVisible:true,
          error:false
        })
      }else{
        this.setState({
          error:true
        })
      }
    };
    handleCancel = () => {
      this.setState({
        isModalVisible:false
      })
    };
    // 清空新增弹窗
  clearModal=()=>{
    this.setState({
      name:'',
      email:'',
      permissions:''
    })
  }
  handleOk = (values) => {
    this.setState({
      isModalVisible:false,
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
  info() {
    Modal.info({
      title: 'This is a notification message',
      content: (
        <div>
          <p>some messages...some messages...</p>
          <p>some messages...some messages...</p>
        </div>
      ),
      onOk() {},
    });
  }
  // 新增组织---结束
  // 上传头像-开始
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
  render(){
    const { loading } = this.state;
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <React.Fragment>
        <div className="warp"> 
          <div>
            { 
              this.state.error? <Alert  message="请先添加组织" type="error" />:''
            }
          </div>
          <Modal destroyOnClose title="新增成员" visible={this.state.isModalVisible} footer={null} onCancel={this.handleCancel} >
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
            <div className="members">
              <div className="top">{store.getState().detailedData?store.getState().detailedData.name:''}</div>
              <div className="status">
                <div className="left">
                  <p>status</p>
                  <div className="left-icon">
                    <span>
                      Private
                    </span>
                    <QuestionCircleOutlined onClick={this.info}/>
                  </div>
                </div>
                <div className="right">
                  <div className="right-Log">
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
                  <p>Change Logo</p>
                </div>
              </div>
              <p className="text-style">Members</p>
            </div>
            <Table pagination={false} columns={this.state.columns} scroll={{ y: 330}} dataSource={this.state.detailedData?this.state.detailedData.sonList:[]} rowKey={record => record.name} 
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
            <div className="addLtd" onClick={this.showModal}>
              <PlusOutlined/>
              <span>Add member</span>
            </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Members;