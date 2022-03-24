import React from 'react';
// 图片本地引入 使用es6模块化思想 默认导入 
// 引入子组件
import Mobile from './components/mobile/mobile';
import Pc from './components/pc/pc';
import store from "./store";
import {clickMenu,getDevice} from "./store/actionCreators"; 
import './App.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ltdList: store.getState().ltdList,
    };
    store.subscribe(this.storeChange.bind(this))
  }
  
  componentWillUnmount() { 
    window.removeEventListener('load', this.handleResize.bind(this))
  }
  handleResize = e => {
    let isDevice='';
    if( e.currentTarget.innerWidth>=1200){
         isDevice='Desktop'
    }else if(e.currentTarget.innerWidth<1200&&e.currentTarget.innerWidth>768){
        isDevice='Tablet'
    }else{
        isDevice='Mobile'
    }
    const action=getDevice(isDevice)
    store.dispatch(action)
  }
  storeChange() {
    this.setState(store.getState());
  }
  componentDidMount(){
    window.addEventListener('load', this.handleResize.bind(this)) 
    const action=clickMenu(this.state.ltdList?this.state.ltdList[0]:[])
    store.dispatch(action)
  }
  render() {
    let warp=null
    if (store.getState().isDevice=='Mobile') {
      warp = <Mobile/>;
    } else {
      warp = <Pc/>;
    }
    return (
      <div style={{height:'100%'}}>
        {warp} 
      </div>
    );
  }
}
export default App;
