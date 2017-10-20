import React from "react";
import Settings from "./Settings";
import '../css/normal.css';
import '../css/icon.css';
import {routeResp} from '../config';
import {get_jobInfo_FailMsg_byJobId} from '../api';

export default class DisplayCardAction extends React.Component {
  constructor(props){
	var sss;
    super(props);
    this.state = {
      cardSelect:this.props.cardSelect,
      cpuSelect:this.props.cpuSelect,
      cancelTastFlag: false
    }
    this.addTask_click = this.addTask_click.bind(this);
    this.cancelTask_click = this.cancelTask_click.bind(this);
  }
  addTask_click()
  {
    this.refs.MySetting.openModal();
  }

  cancelTask_click()
  {
    this.props.handleTask();
  }

  componentWillMount(){
  }
  componentDidMount(){
  }
  render() {
    //UI
    const marginPink = "8px";
    const marginYellow = "12px";
    return (
      <div>
        <div class="app_setting" style={{float:"right", marginRight:marginYellow}}  >
          <button class="button_normal  button_yes i_button_del" onClick={this.cancelTask_click} >Cancel Task</button>
        </div>
        <div class="app_setting" style={{float:"right", marginRight:marginPink}}>
          <button class="button_normal  button_yes i_button_add" onClick={this.addTask_click}>Add Task</button>
        </div>
        <div style={{clear:"right"}}></div>
        <Settings ref="MySetting" cardSelect={this.state.cardSelect} cpuSelect={this.state.cpuSelect}/>
      </div>
    );
  }
}
