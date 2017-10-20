import React from "react";
import '../css/normal.css';
import '../css/icon.css';
import {routeResp} from '../config';

import Select from "react-select";
import HistoryCalendar from "../components/HistoryCalendar";
//for test
import {Search_jobInfo_by_condition} from '../api';
const taskConfig = {
      transcodeType:[
        { value: "", label: 'none' },
        { value: "vod", label: 'VOD' },
        { value: "live", label: 'Live' },
        { value: "file", label: 'File' }
      ],
      timeType:[
        { value: 1, label: '1 day' },
        { value: 2, label: '3 day' },
        { value: 3, label: '1 week' },
        { value: 4, label: '1 month' },
        { value: 5, label: '2 month' },
        { value: 6, label: 'other' }
      ],
      statusType:[
        { value: "", label: 'none' },
        { value: 2, label: 'complete' },
        { value: 3, label: 'failed' },
        { value: 4, label: 'Terminated' }
      ]};

export default class HistoryAction extends React.Component {
  constructor(props){
    super(props);

    var Task_Type_value = _.find(taskConfig.transcodeType, props.mType);
    if(Task_Type_value == null){
      Task_Type_value = taskConfig.transcodeType[0];
      myupdateStatus = true;
    }
    var Task_Time_value = _.find(taskConfig.timeType, props.mTime);
    if(Task_Time_value == null){
      Task_Time_value = taskConfig.timeType[0];
      myupdateStatus = true;
    }
    var Task_Status_value = _.find(taskConfig.statusType, props.mStatus);
    if(Task_Status_value == null){
      Task_Status_value = taskConfig.statusType[0];
      myupdateStatus = true;
    }

    this.state = {
      mType:Task_Type_value,
      mTime:Task_Time_value,
      mStatus:Task_Status_value,
      mdisable:false,
      startDate:null,
      endDate:null
    }

    this.search_click = this.search_click.bind(this);
    this.Type_onChange=this.Type_onChange.bind(this);
    this.Time_onChange=this.Time_onChange.bind(this);
    this.Status_onChange=this.Status_onChange.bind(this);
    this.dateSelect = this.dateSelect.bind(this);
    this.clearLogs_array = this.clearLogs_array.bind(this);

  }
  componentWillMount(){
    this.search_click();
  }
  dateSelect(startDate,endDate){
    this.setState({startDate:startDate,endDate:endDate});
  }
  search_click(){
	  var CardId = '';
	  var CpuId = '';
	  var Type = this.state.mType.value;
	  var Status = this.state.mStatus.value;  //1 run 2Complex 3 Fail 4Stop
    var now = new Date();
    var sTime = new Date(now.getTime());
    var eTime=new Date();
    switch(this.state.mTime.value){
      case 2:
        sTime.setDate(now.getDate() - 2);
      break;
      case 3:
        sTime.setDate(now.getDate() - 6);
      break;
      case 4:
        sTime.setMonth(now.getMonth() - 1);
      break;
      case 5:
        sTime.setMonth(now.getMonth() - 2);
      break;
      case 6:
        // check how to set Time
        if(this.state.startDate==null || this.state.endDate==null){
          sTime.setDate(now.getDate() - 1);//1day
        }
        else{
          sTime = new Date(this.state.startDate);
          if(this.state.endDate == ""){
            eTime = new Date(this.state.startDate);
            eTime.setMonth(sTime.getMonth() + 2);
          }
          else{
            eTime = new Date(this.state.endDate);
          }
        }
      break;
      default:
        sTime.setDate(now.getDate());//1day
      break;
    }
    sTime.setHours(0,0,0,0);
    eTime.setHours(23,59,59,999);
	  this.props.passData(sTime,eTime,CardId,CpuId,Type,Status);
  }

  Type_onChange(val){
      this.setState({
        mType:val
      });
      this.setState({updateStatus:true});
  }

  Time_onChange(val){
      if(val.value == 6){
        //Open the calendar
        this.refs.calendar.openModal();
      }
      this.setState({
        mTime:val
      });
      this.setState({updateStatus:true});
  }
  Status_onChange(val){
      this.setState({
        mStatus:val
      });
      this.setState({updateStatus:true});
  }
  clearLogs_array(){
	  this.props.handlehistory();
  }
  render() {
    //UI
    const clearable = false;
    const marginPink = "8px";
    const marginYellow = "12px";
    const marginBrown = "10px";
    const filter=["Date Filter:","Type Filter:","Status Filter:"];
    return (
      <div>
        <div style={{float:"left",marginRight:marginBrown}}>{filter[0]}</div>
        <div style={{float:"left",width:"180px", marginRight:marginPink}}>
          <Select
          onChange={this.Time_onChange}
          options={taskConfig.timeType}
          placeholder="Select Time"
          value={this.state.mTime}
          clearable={clearable}/>
        </div>
        <div style={{float:"left",marginLeft:marginBrown,marginRight:marginBrown}}>{filter[1]}</div>
        <div style={{float:"left",width:"120px",marginRight:marginPink}}>
        <Select
          onChange={this.Type_onChange}
          options={taskConfig.transcodeType}
          placeholder="Selet Task Type"
          value={this.state.mType}
        clearable={clearable}/>
        </div>
        <div style={{float:"left",marginLeft:marginBrown,marginRight:marginBrown}}>{filter[2]}</div>
        <div style={{float:"left",width:"120px",marginRight:marginPink}}>
        <Select
          onChange={this.Status_onChange}
          options={taskConfig.statusType}
          placeholder="Selet Status Type"
          value={this.state.mStatus}
        clearable={clearable}/>
        </div>
        <div style={{float:"left", marginLeft:marginBrown}}  >
          <button class="i_btn_aciton_search_area i_btn_aciton_search" disabled={false} onClick={this.search_click} ></button>
        </div>
        <div style={{float:"right", marginLeft:marginYellow}}  >
          <button class="button_normal  button_yes i_button_clear" disabled={this.props.mdisable} onClick={this.clearLogs_array} >Clear Logs</button>
        </div>
        <div style={{clear:"right"}}></div>
        <div>
          <HistoryCalendar ref="calendar" dateSelect={this.dateSelect}/>
        </div>
      </div>
    );
  }
}
