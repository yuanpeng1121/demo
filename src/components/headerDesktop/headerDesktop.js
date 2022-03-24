import React from 'react';
import { 
  Table,Select,Alert,Modal,Input,Form,Button,Upload, message
} from 'antd';
import './headerDesktop.scss';
import store from "../../store";


class HeaderDesktop extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
          
        }
        store.subscribe(this.storeChange.bind(this))
    }
    storeChange() {
      this.setState(store.getState());
    }
    componentWillUnmount() {
      this.setState = ()=>false;
  }
  render(){
    return (
      <React.Fragment>
          <div className="left">dataReachable</div>
          <div className="right">
            <i>YL</i>
            <span>GO to Dashboard</span>
          </div>
      </React.Fragment>
    )
  }
}

export default HeaderDesktop;