import React from "react";
import Select from "react-select";
import 'react-select/dist/react-select.css';
import { appConfig } from '../config';
import '../css/style.css';
import '../css/icon.css';
import '../css/table.css';
import {get_jobInfo_FailMsg_byJobId,delete_job_byJobId} from '../api';
import {routeResp} from '../config';
import PopTranscoding from "./PopupTranscodingInfo";

//POP
import Info from './Info';

export default class JobSelect extends React.Component {

  constructor(props) {
   super(props);
   this.state = {
     deleteStatus:false,
     value: null,
     checkAll: false
   }
   this.deleteJob_callback = this.deleteJob_callback.bind(this);
   this.failJobInfo_callback = this.failJobInfo_callback.bind(this);
   this.clear_click = this.clear_click.bind(this);
   this.preview_click = this.preview_click.bind(this);
   this.faile_tag = this.faile_tag.bind(this);
   this.preview_click = this.preview_click.bind(this);
 }
  faile_tag(e) {
    get_jobInfo_FailMsg_byJobId(e.target.id,this.failJobInfo_callback);
  }
  preview_click() {
	  this.refs.popTrancode.openModal();
  }

  failJobInfo_callback(resp){
    if(resp[routeResp.Result] == routeResp.FailResult){
      this.refs.FailMsg.updateContent("info","No Fail Log","");
      this.refs.FailMsg.openModal();
      return;
    }
    var data = resp[routeResp.Data];
    this.refs.FailMsg.updateContent("error","Fail Log",data.msg);
    this.refs.FailMsg.openModal();
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
    this.props.removeCallback();
    this.setState({deleteStatus:true});
  }

  onCheckkChange(event)
  {
    this.props.handleSelectedTask(false, true, event.target.name, event.target.checked);
  }

  render() {
    const { Pass_jobId } = this.props;
    var checkboxUseEnable=true;


    var iTask;
    var styleType;
    var iStatusTask, checkedValue;
    var previewStatus = true;
    var deleteStatus = false;
    var previewStatusEmpty = true;
    var deleteStatusEmpty = true;
    var clearStatusEmpty = true;
    switch(Pass_jobId.status.toLowerCase())
    {
      case "terminated":
    	  previewStatusEmpty = false;
      case "completed":
        iStatusTask = "i_status_ok";
        previewStatusEmpty = false;
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
        previewStatusEmpty = false;
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

    if (Pass_jobId.status == 'Running') {
    	checkboxUseEnable=false;
      checkedValue = false;
    }else{
    	checkboxUseEnable=true;
      checkedValue = this.props.value;
    }
    return (
      <tr class={styleType} style={{display:(this.state.deleteStatus)?"none":"inlineBlock"}}>
        <td id="css_th_a3" style={{width:"3%",textAlign:"center"}}>
          <input disabled={!checkboxUseEnable} type="checkbox" value=""
            onChange={this.onCheckkChange.bind(this)} checked={checkedValue} name={Pass_jobId.jobId}   />
        </td>
        <td  style={{width:"21%"}}><div className = {"i_task_area "+iTask}/> <span> {Pass_jobId.type} </span><span> {Pass_jobId.input}  </span> </td>
        <td  style={{width:"10%"}}>{Pass_jobId.cardId} - {Pass_jobId.cpuId}</td>
        <td  style={{width:"13%"}} class="hidden-phone">{Pass_jobId.numofoutputs}</td>
        <td  style={{width:"13%"}} class="hidden-phone">{Pass_jobId.starttime}</td>
        <td  style={{width:"13%"}}>
          <div className = {"i_status_area "+iStatusTask} style={{float:"left", marginRight:"10px",marginLeft:marginYellow}} />
          <div style={{float:"left"}} id={Pass_jobId.jobId} onClick={(iStatusTask=="i_status_error")?this.faile_tag:null} className={(iStatusTask=="i_status_error")?"i_status_error_text":null}>{Pass_jobId.status}</div>
          <Info ref="FailMsg" type="error" title="" content=""/>
          <div style={{clear:"left"}}/>
        </td>
        <td id="css_th_a3a" style={{width:"27%"}}>
          <div id="css_td6_3" ref="jobItem" ><button id = {Pass_jobId.jobId}  style={{display:(previewStatusEmpty)?"none":"inline",marginLeft:marginYellow}} disabled={!previewStatus} className="i_action_area i_action_preview" onClick={this.preview_click}/><button id = {Pass_jobId.jobId}  style={{display:((clearStatusEmpty)?"none":"inline")}} className="i_action_area i_aciton_clear" onClick={this.clear_click}/></div>
          <div id="css_td6_4"></div>
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
