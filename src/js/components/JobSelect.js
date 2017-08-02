import React from "react";
import Select from "react-select";
import 'react-select/dist/react-select.css';
import MyPopup from './Popup';
import { appConfig } from '../config';
import '../css/style.css';
import '../css/icon.css';
import '../css/table.css';
import {stopJob} from '../api';
import {routeResp} from '../config';

export default class JobSelect extends React.Component {

  constructor(props) {
   super(props);
   this.state = {
     cardSelect:this.props.cardSelect,
     cpuSelect:this.props.cpuSelect,
     value: null
   };
   this.remove_click = this.remove_click.bind(this);
   this.preview_click = this.preview_click.bind(this);
   this.stopJob_callback = this.stopJob_callback.bind(this);
 }

  preview_click()
  {
    this.refs.myPopup.openModal();
  }
  remove_click(e)
  {
    stopJob(e.target.id,this.stopJob_callback);
  }
  stopJob_callback(resp){
    if(resp[routeResp.Result] == routeResp.FailResult){
      console.log("stopJob_callback Fail");
      return;
    }
    var data = resp[routeResp.Data];
    // console.log('stopJob_callback ' + JSON.stringify(data));
  }

  render() {
    const { Select_name } = this.props;
    const { Pass_jobId } = this.props;
    const { CPUID_num } = this.props;

    var iTask;
    var styleType;
    var iStatusTask;
    var previewStatus = false;
    var deleteStatus = false;
    var previewStatusEmpty = true;
    var deleteStatusEmpty = true;
    switch(Pass_jobId.status.toLowerCase())
    {
      case "terminated":
      case "completed":
        iStatusTask = "i_status_ok";
      break;
      case "running":
       iStatusTask = "i_status_loading";
       deleteStatus = true;
       previewStatusEmpty = false;
       deleteStatusEmpty = false;
      break;
      case "failed":
        iStatusTask = "i_status_error";
      break;
    }

    switch (Pass_jobId.type.toLowerCase()) {
        case "live":
            switch(Pass_jobId.status.toLowerCase())
            {
              case "terminated":
              case "completed": iTask = "i_task_live_complete"; styleType = "completeInfo"; break;
              case "running": iTask = "i_task_live_running"; styleType = "runningInfo"; previewStatus = true; break;
              case "failed": iTask = "i_task_live_failed"; styleType = "failedInfo"; break;
            }
          break;
        case "vod":
            switch((Pass_jobId.status).toLowerCase())
            {
              case "terminated":
              case "completed": iTask = "i_task_vod_complete"; styleType = "completeInfo"; break;
              case "running": iTask = "i_task_vod_running"; styleType = "runningInfo"; previewStatus = true; break;
              case "failed": iTask = "i_task_vod_failed"; styleType = "failedInfo"; break;
            }
          break;
        case "file":
          switch(Pass_jobId.status.toLowerCase())
            {
              case "terminated":
              case "completed": iTask = "i_task_f2f_complete"; styleType = "completeInfo"; break;
              case "running": iTask = "i_task_f2f_running"; styleType = "runningInfo"; break;
              case "failed": iTask = "i_task_f2f_failed"; styleType = "failedInfo"; break;
            }
          break;
    }
    //---UI
    const marginYellow="10px";
    //--checkbox
    const checkboxUseEnable=false;
    return (
      <tr class={styleType}>
        <td id="css_td1"><input disabled={!checkboxUseEnable} type="checkbox" value=""/></td>
        <td id="css_td2"><div className = {"i_task_area "+iTask}/> <span> {Pass_jobId.type} </span><span> {Pass_jobId.input}  </span> </td>
        <td id="css_td3" class="hidden-phone">{Pass_jobId.numofoutputs}</td>
        <td id="css_td4" class="hidden-phone">{Pass_jobId.starttime}</td>
        <td id="css_td5"><div className = {"i_status_area "+iStatusTask} style={{marginRight:"10px",marginLeft:marginYellow}}/> {Pass_jobId.status}</td>
        <td>
          <div id="css_td6_1" ><button id = {Pass_jobId.jobId}  style={{display:(previewStatusEmpty)?"none":"inline",marginLeft:marginYellow}} disabled={!previewStatus} className="i_action_area i_action_preview" onClick={this.preview_click}/></div>
          <div id="css_td6_2" ><button id = {Pass_jobId.jobId}  style={{display:(deleteStatusEmpty)?"none":"inline"}} disabled={!deleteStatus} className="i_action_area i_action_delete" onClick={this.remove_click}/></div>
          <MyPopup ref="myPopup" para="" Job_Id_no={Pass_jobId.jobId} cardSelect={this.state.cardSelect} cpuSelect={this.state.cpuSelect}/>
          <div id="css_td6_3"></div>
        </td>
      </tr>

    );
  }


}

const Styles={
		  divcontent:{
		    paddingLeft:'15px',
		    paddingRight:'15px'
		  }
}
