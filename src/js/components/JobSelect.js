import React from "react";
import Select from "react-select";
import 'react-select/dist/react-select.css';
import MyPopup from './Popup';
import { appConfig } from '../config';
import '../css/style.css';
import '../css/icon.css';
import '../css/table.css';
import {stopJob,get_jobInfo_FailMsg_byJobId,delete_job_byJobId} from '../api';
import {routeResp} from '../config';
import PopTranscoding from "./PopupTranscodingInfo";

//POP
import Info from './Info';

export default class JobSelect extends React.Component {

  constructor(props) {
   super(props);
   this.state = {
     cardSelect:this.props.cardSelect,
     cpuSelect:this.props.cpuSelect,
     value: null,
     checkAll: false
   };
   this.remove_click = this.remove_click.bind(this);
   this.preview_click = this.preview_click.bind(this);
   this.open_click = this.open_click.bind(this);
   this.stopJob_callback = this.stopJob_callback.bind(this);
   this.deleteJob_callback = this.deleteJob_callback.bind(this);
   this.failJobInfo_callback = this.failJobInfo_callback.bind(this);
   this.clear_click = this.clear_click.bind(this);
   this.faile_tag = this.faile_tag.bind(this);
 }

  faile_tag(e) {
    get_jobInfo_FailMsg_byJobId(e.target.id,this.failJobInfo_callback);
  }
  failJobInfo_callback(resp){
    if(resp[routeResp.Result] == routeResp.FailResult){
      this.refs.FailMsg.updateContent("info","No Fail Log","");
      this.refs.FailMsg.openModal();
      return;
    }
    var data = resp[routeResp.Data];
     //alert('failJobInfo_callback ' + JSON.stringify(data));
    this.refs.FailMsg.updateContent("error","Fail Log",data.msg);
    this.refs.FailMsg.openModal();
  }
  preview_click()
  {
    this.refs.popTrancode.openModal();
  }
  open_click()
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
  }
  clear_click(e)
  {
    delete_job_byJobId(e.target.id,this.deleteJob_callback);
  }
  deleteJob_callback(resp){
    if(resp[routeResp.Result] == routeResp.FailResult){
      console.log("deleteJob_callback Fail");
      return;
    }
    var data = resp[routeResp.Data];
  }

  onCheckkChange(event)
  {
    //console.log("event.target.name = " + event.target.name + "\n event.target.checked = " + event.target.checked );
    this.props.handleSelectedTask(false, true, event.target.name, event.target.checked);
  }

  render() {
    const { Select_name } = this.props;
    const { Pass_jobId } = this.props;
    const { CPUID_num } = this.props;
    var checkboxUseEnable=true;


    var iTask;
    var styleType;
    var iStatusTask, checkedValue;
    var previewStatus = false;
    var deleteStatus = false;
    var previewStatusEmpty = true;
    var deleteStatusEmpty = true;
    var clearStatusEmpty = true;
    switch(Pass_jobId.status.toLowerCase())
    {
      case "terminated":
      case "completed":
        iStatusTask = "i_status_ok";
        clearStatusEmpty = false;
      break;
      case "running":
       iStatusTask = "i_status_loading";
       deleteStatus = true;
       previewStatusEmpty = false;
       deleteStatusEmpty = false;
      break;
      case "failed":
        iStatusTask = "i_status_error";
        clearStatusEmpty = false;
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

    const marginYellow="10px";

    if (Pass_jobId.status != 'Running') {
      checkboxUseEnable=false;
      checkedValue = false;
    }else{
      checkboxUseEnable=true;
      checkedValue = this.props.value;
    }

    return (
      <tr class={styleType}>
        <td id="css_td1" style={{width:"5%"}}>
            <input disabled={!checkboxUseEnable} type="checkbox"
              onChange={this.onCheckkChange.bind(this)}
            checked={checkedValue}
            value="" name={Pass_jobId.jobId}  />
        </td>
        <td id="css_td2" style={{width:"25%"}}><div className = {"i_task_area "+iTask}/> <span> {Pass_jobId.type} </span><span> {Pass_jobId.input}  </span> </td>
        <td id="css_td3" style={{width:"5%"}} class="hidden-phone">{Pass_jobId.numofoutputs}</td>
        <td id="css_td4" style={{width:"17%"}} class="hidden-phone">{Pass_jobId.starttime}</td>
        <td id="css_td5" style={{width:"15%",display: "table-cell",verticalAlign: "middle",lineHeight:"32px"}}>
          <div className = {"i_status_area "+iStatusTask} style={{float:"left", marginRight:"10px",marginLeft:marginYellow}} />
          <div style={{float:"left"}} id = {Pass_jobId.jobId} onClick={(iStatusTask=="i_status_error")?this.faile_tag:null} className={(iStatusTask=="i_status_error")?"i_status_error_text":null}>{Pass_jobId.status}</div>
          <Info ref="FailMsg" type="error" title="" content=""/>
          <div style={{clear:"left"}}/>
        </td>
        <td style={{width:"33%",height:"32px"}}>
          <div id="css_td6_1" ><button id = {Pass_jobId.jobId}  style={{display:(previewStatusEmpty)?"none":"inline",marginLeft:marginYellow}} disabled={!previewStatus} className="i_action_area i_action_open" onClick={this.open_click}/></div>
          <div id="css_td6_2" ><button id = {Pass_jobId.jobId}  style={{marginLeft:marginYellow}} className="i_action_area i_action_preview" onClick={this.preview_click}/></div>
          <div id="css_td6_3" ><button id = {Pass_jobId.jobId}  style={{display:(deleteStatusEmpty)?"none":"inline"}} disabled={!deleteStatus} className="i_action_area i_action_delete" onClick={this.remove_click}/></div>
          <div id="css_td6_4" ><button id = {Pass_jobId.jobId}  style={{display:(clearStatusEmpty)?"none":"inline"}} className="i_action_area i_aciton_clear" onClick={this.clear_click}/></div>

          <MyPopup ref="myPopup" para="" Job_Id_no={Pass_jobId.jobId} cardSelect={this.state.cardSelect} cpuSelect={this.state.cpuSelect} />
          <PopTranscoding ref="popTrancode" Job_Id_no={Pass_jobId.jobId} file_input={Pass_jobId.input}/>
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
