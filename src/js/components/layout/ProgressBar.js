/*
   Name: Nayana Date:31-07-2017
   Description: 1. Modify for task tooltip on progressBar Click
    2. Modify unambiguous naming conventions and formating.
                like myname => deviceName, textStyleBox => ProgressStyle, textStyleBoxUse => DeviceProgressStyle etc
    3. Include PopupTask Model in ProgressBar click
    4. Add new task
*/


import React from "react";
import Progress from 'circular-progress-angular-gradient';
import '../../css/style.css';
import {get_currentJobInfo_byCardId_byCPUId} from '../../api';
import {routeResp} from '../../config';
import '../../css/pop.css';
import Settings from "../../pages/Settings";
import { IndexLink, Link } from "react-router";
import '../../css/progress.css';

export default class ProgressBar extends React.Component
{
  displayName: 'AppBar';
  constructor(props) {
    super(props);
    const ProgressStyle={"cpu":{"textStyle":'cpuTextRegular',"progressColor1":'#05b8e5',"progressColor2":'#1d6fde',"progressColor3":'#e28585',"progressColor4":'#dd0b0b'},
                  "gpu":{"textStyle":'gpuTextRegular',"progressColor1":'#2ed9e6',"progressColor2":'#00aab7',"progressColor3":'#e28585',"progressColor4":'#dd0b0b'}
    };
    var DeviceProgressStyle = ProgressStyle.cpu;
    var deviceName="cpu";

    if(this.props.target_name == undefined){
      deviceName = "cpu";
    }
    else{
      deviceName = this.props.target_name.toLowerCase();
      if(deviceName.indexOf("gpu")!=-1)
      {
        deviceName = "gpu";
      }
      else{
        deviceName = "cpu";
      }
    }

    if(deviceName=="gpu"){
      DeviceProgressStyle = ProgressStyle.gpu;
    }

    this.state = {
       hover: false,
       forceHover: 0,
       textStyle:DeviceProgressStyle.textStyle,
       progressColor1:DeviceProgressStyle.progressColor1,
       progressColor2:DeviceProgressStyle.progressColor2,
       progressColor3:DeviceProgressStyle.progressColor3,
       recieve_task : null,
       selectedCPU : 0
    };

    this.openModal = this.openModal.bind(this);
    this.timer = this.timer.bind(this);
    this.getJobList = this.getJobList.bind(this);
    this.openTaskModal = this.openTaskModal.bind(this);
  }

  openModal() {
    if(this.props.target_page == 1){
        this.getJobList();
        this.setState({ hover: true });
    }
  }

  openTaskModal(){
    this.setState({ forceHover: 1 });
    this.setState({ hover: false });
    var object = this.refs.addTaskPopup;
    object.openModal();
  }

  //Tooltip Control start
  timer(resp){
    var data = resp[routeResp.Data];
    if(resp[routeResp.Result] == routeResp.FailResult){
      return;
    }
    this.setState({
      recieve_task : data.data
    })
  }

  getJobList(){
     if(this.props.cardId !=null &&  this.props.cpuId !=null)
      {
        var cardId = this.props.cardId;
        var cpuId = this.props.cpuId;
        get_currentJobInfo_byCardId_byCPUId(cardId,cpuId,this.timer);
      }
  }

  //handleMouseIn() {
  onProgressBarClick(){
    if(this.props.target_page == 1){
      this.getJobList();
      this.setState({ hover: true })
    }
  }

  onProgressBarMouseOut() {
    if(this.state.forceHover == 1){
      this.setState({ hover: false });
      this.setState({ forceHover: 0 });
    }
    else {
    this.setState({ hover: false });}
  }

  onforceClosePopup()
  {
    if(this.state.forceHover == 1){
      this.setState({ hover: false });
      this.setState({ forceHover: 0 });
    }
  }




  renderTaskList()
    {
      var flag = 0;


      if(this.props.target_page == 1){

        if(this.state.recieve_task){
          if(this.state.recieve_task.length > 0){
            var TaskList = [];
            for (var i = 0; i < this.state.recieve_task.length; i++) {
              if(this.state.recieve_task[i].status.toLowerCase() == "running")
              {
                flag = 1;
                TaskList.push(this.renderTaskRow(i, this.state.recieve_task[i]));
              }
            }

            if(flag == 1){
              return(this.renderTaskTable(TaskList));
            }
            else{
              return(this.renderNoTask());
            }
          }
          else if(this.state.recieve_task.length == 0){
            return(this.renderNoTask());
          }
        }
        else
          return(this.renderNoTask());
      }
    }

    renderNoTask()
    {
      var i_addTask = '/img/add task_24.png';

      var imageStyle = { 'float':'left', 'paddingRight' : '16px', 'verticalAlign': 'middle'};
      return(
            <div  key="divEmptyTaskKey" id="divNoTask" className="emptyTaskBox" >
                <div style={imageStyle} ><img src={i_addTask} width={24} height={24}/></div>
                    <span> There is no task yet. Please press
                        <a className="urlStyle" style={{cursor: "pointer"}} onClick={this.openTaskModal}><u> here </u></a> to  add new task.
                    </span>
                    <Settings class="col-md-2" id="addTaskPopup" ref="addTaskPopup" card={this.props.cardSelect} cpu = {this.props.cpuSelect} ></Settings>
            </div>
      );
    }

    renderTaskTable(TaskList)
    {
      const img_more ='/img/ic_see more.png';
      var popupStyle={'minWidth': '450px', 'paddingTop' : '0px' }
      var bodystyle = {'padding' : '15px 15px 15px 15px', 'minHeight': '50px', 'borderStyle': '1px solid #131313'};
      var rightAlign = {'textAlign': 'right', 'paddingRight': '10px'}
      var linkStyle, textDetail = "";

      if(TaskList.length > 9 ){
          linkStyle = {cursor: "pointer",display: 'inline', float: 'right', margine: '2px 0 2px 0', 'padding' : '15px 0px 15px 0px'};
          textDetail = "... see other " + (TaskList.length - 9) + " items";
      } else {
          linkStyle =  {cursor: "pointer",display: 'none'};
      }

      return(
            <div key={"divTaskTableKey"} id="divTaskTable">
                <div style={bodystyle}>
                    <table className = "tableBorder" style={popupStyle}>
                       <thead>
                         <tr class="bg-primary">
                           <th > Task(s) </th>
                           <th style={rightAlign}>Output</th>
                         </tr>
                       </thead>

                       <tbody>
                           {TaskList}
                       </tbody>

                     </table>
                     <div style={linkStyle}> <a className="urlStyle" >
                                <Link to={"Process" + this.props.cardSelect}> {textDetail} </Link>
                                <img src={img_more} alt width={7} height={11} style={{'marginLeft':'10px', 'display':'inlineBlock'}} />
                                </a> </div>
                </div>
            </div>
          );
    }

    renderTaskRow(i, row)
    {
      if(i < 10){
        var iTask;
        var styleType;
        var rightAlign = {'textAlign': 'right', 'paddingRight': '10px'};

        switch (row.type.toLowerCase()) {
            case "live": iTask = "i_task_live_running"; styleType = "runningInfo"; break;
            case "vod": iTask = "i_task_vod_running"; styleType = "runningInfo"; break;
            case "file": iTask = "i_task_f2f_running"; styleType = "runningInfo"; break;
        }

        return(
            <tr key={"tr"+i+"Key"} id={"tr_"+i} class={styleType}>
              <td> <div className = {"i_task_area "+iTask}/> <span> {row.type} </span> &nbsp; <span> {row.input}  </span> </td>
              <td class="hidden-phone" style={rightAlign}><span> {row.numofoutputs} </span></td>
            </tr>
        )
      }
    }
  //Tooltip Control End


  render() {
    var textStyle = {'fill': this.state.textStyleNormal};
    var textAlert = {'fill': this.state.textStyleAlarm}

    const tooltipStyle = { display: this.state.hover ? 'block' : 'none'};

    const progressNum = this.props.progress_cpu==null?0:Number(this.props.progress_cpu).toFixed();
    const progressNumPercent = progressNum;

    var bgColorS,bgColorE, txtColor, modalType, arrow_in, arrow_out ;
    var bgStyle = {

    }
    var textClassUse ;
    if(progressNum < 75)
    {
        bgColorS = this.state.progressColor1;  //'linear-gradient(to right, #2ed9e6 , #00aab7)';
        bgColorE = this.state.progressColor2;
        textClassUse = this.state.textStyle;
    }
    else {
        bgColorS = this.state.progressColor3;  //'linear-gradient(to right, #2ed9e6 , #00aab7)';
        bgColorE = this.state.progressColor4;
        textClassUse = "cpugpuTextAlert";
    }

    var cursorStyle = {cursor: "initial"};
    if(this.props.target_page == 1){
      cursorStyle = {cursor: "pointer"};
    }

    if(this.props.cpuSelect == 1){
      modalType = "taskModal";
      arrow_in = "arrow_l_int" ;
      arrow_out = "arrow_l_out";
    } else if(this.props.cpuSelect == 2){
      modalType = "taskModalRight";
      arrow_in = "arrow_r_int" ;
      arrow_out = "arrow_r_out";
    }

    return (
      <div key="contentContainerKey" id="contentContainer" onClick={this.onProgressBarClick.bind(this)} onMouseLeave={this.onProgressBarMouseOut.bind(this)} onMouseMove={this.onforceClosePopup.bind(this)} >
        <div style={cursorStyle} className="box">
          <div style={cursorStyle} id="P1" >
              <Progress
                colorEmpty= '#f4f4f4'
                colorFill= 'rgba(255, 255, 255, 0)'
                colorEnd= '#f4f4f4'
                colorStart= '#f4f4f4'
                percentage= {0}
                strokeLinecap= 'round'
                strokeWidth= {6}
                width= {107}>
              </Progress>
          </div>
          <div style={cursorStyle} id="P2" class="mirror" >
              <Progress
                colorEmpty= 'rgba(255, 255, 255, 0)'
                colorFill= 'white'
                colorEnd= {bgColorE}
                colorStart= {bgColorS}
                percentage= {progressNumPercent/100}
                strokeLinecap= 'round'
                strokeWidth= {12}
                width= {110}>
              </Progress>
          </div>
          <div id="P3">
            <text className={textClassUse} >{progressNumPercent}</text><text className="percentText_Regular">%</text>
          </div>
        </div>

        <div style={tooltipStyle } className={modalType}>
            <span style={tooltipStyle} className={arrow_in}></span>
            <span style={tooltipStyle} className={arrow_out}></span>
            <div className="popupContainer">
               {this.renderTaskList()}
            </div>
        </div>
      </div>
    );
  }
}
