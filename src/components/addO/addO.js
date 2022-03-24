import React from 'react';
import { 
  Modal,Input,Form,Button,Upload, message
} from 'antd';
import './addO.scss';
import store from "../../store";
import { clickMenu,createNew} from "../../store/actionCreators"; 
import {
  PlusOutlined,
  LoadingOutlined, 
} from '@ant-design/icons';

class AddO extends React.Component {

  constructor(props) {
      super(props);
      this.state ={
        isModalVisible:false,
        loading: false,//上传图片的loading
        imageUrl:'',//上传图片的地址
        newName:'',
      }
  }
  static getDerivedStateFromProps(props, state) {
    return {
      isModalVisible: props.isModalVisible,
    };
  }
  componentWillUnmount() {
    this.setState = ()=>false;
}
  onHandleClick = (e) => {
    this.props.receiveKey(this.state.leftList[e.key])
    
  };
  handleCancel = () => {
    this.props.receiveAddClose(false)
  };
  // 清空新增弹窗
  clearModal=()=>{
    this.setState({
      newName:'',
      imageUrl:''
    })
  }
  handleOk = (values) => {
    this.props.receiveAddClose(false)
    this.setState({
      isModalVisible:false,
      newName:values.newName,
      imageUrl:values.imageUrl[0].response.url
    },()=>{
      // 新增进ltdList列表
      let newLtd={
        name:values.newName,
        icon:values.imageUrl[0].response.url,
        sonList:[]
      }
      if(store.getState().ltdList.length==0){
        store.dispatch(clickMenu(newLtd))
      }
      const action = createNew(store.getState().ltdList.concat(newLtd));
      store.dispatch(action)
      this.clearModal()
    })
  };
  onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
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
  // 上传头像-结束
  render(){
    const { loading, imageUrl } = this.state;
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <React.Fragment>
        <div>
          <Modal maskClosable closable={true} destroyOnClose={true} title="新增组织" visible={this.state.isModalVisible} footer={null} onCancel={this.handleCancel} >
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
                label="请输入组织名称"
                name="newName"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="imageUrl"
                　　// 下面两条必须存在
              　valuePropName="fileList"
              rules={[{ required: true, message: 'Please input your imageUrl!' }]}
                // 如果没有这一句会报错 Uncaught TypeError: (fileList || []).forEach is not a function
                getValueFromEvent={this.normFile}
            　　label="上传头像"
              >
                <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  beforeUpload={this.beforeUpload}
                  onChange={this.handleChange}
                >
                  {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                </Upload>
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  提交
                </Button>
              </Form.Item>
            </Form>
          </Modal>
          
        </div>
      </React.Fragment>
    )
  }
}

export default AddO;