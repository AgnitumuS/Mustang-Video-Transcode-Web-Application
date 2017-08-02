import React from "react";
import _        from 'lodash';
import JobList from './Settings_step4_list'
import {taskConfig} from '../../config'
import '../../css/table.css';
import '../../css/icon.css';
export default class Settings_step4 extends React.Component {
  constructor(props){
    super(props);
    var dataConfig  = props.getDataConfig();
    var tmp = dataConfig.input.filepath;
    if(tmp == undefined){
      tmp = dataConfig.input.streamname;
    }
    var n = tmp.lastIndexOf("/");
    var len = tmp.length;
    var tasktmp=props.mType.label+"-"+tmp.substring(n+1, len);
    var iTaskLable=null;
    var fileUse = false;
    if(props.mType!= undefined){
      if(props.mType.label!=undefined){
        iTaskLable="i_task2_area i_task2_"+props.mType.label.toLowerCase()+"_task";
        if(props.mType.Task_Type_value=="file"){
          fileUse = true;
        }
      }
    }
    var videoProfiletmp=null;
    videoProfiletmp="/ Profile-"+_.result(_.find(taskConfig.Video_Profile, {Video_Profile_value:dataConfig.output.profileid}),'label')+"/level:"+_.result(_.find(taskConfig.Video_Level, {Video_Level_value:dataConfig.output.levelid}),'label');
    if(videoProfiletmp.indexOf("undefined")!=-1){
      videoProfiletmp=null;
    }
    var audioBitratetmp=null;
    audioBitratetmp="/ "+_.result(_.find(taskConfig.Audio_BitRate, {Audio_BitRate_value:dataConfig.output.abitrateid}),'label');
    if(audioBitratetmp.indexOf("undefined")!=-1){
      audioBitratetmp=null;
    }
    var mycontentData = dataConfig.outputs;
    var FrameRate_QP_value = false;
    if(mycontentData!=undefined){
      var mycontentData0=mycontentData[0];
      if(mycontentData0 != null ){
        FrameRate_QP_value = mycontentData0.bitrateenable;
      }
    }
    var videoMsg=_.result(_.find(taskConfig.Video_Codec, {Video_Codec_value:dataConfig.output.vcodecid}),'label');
    if(dataConfig.output.vcodecid == 1 || dataConfig.output.vcodecid == 2){
      videoMsg = _.result(_.find(taskConfig.Video_Codec, {Video_Codec_value:dataConfig.output.vcodecid}),'label')+videoProfiletmp;
    }
    var audioMsg=_.result(_.find(taskConfig.Audio_Codec, {Audio_Codec_value:dataConfig.output.acodecid}),'label')+audioBitratetmp;
    if(dataConfig.output.vcodecid == 4){
      audioMsg = "default";
    }

    this.state = {
      FrameRate_QP_value : FrameRate_QP_value,
      iTask:iTaskLable,
      Task:tasktmp,
      VideoSettings:videoMsg,
      Streaming:_.result(_.find(taskConfig.Stream_Protocol, {Stream_Protocol_value:parseInt(dataConfig.protocol)}),'label'),
      FileType:_.result(_.find(taskConfig.fileType, {File_Type_value:parseInt(dataConfig.fileextension)}),'label'),
      AudioSettings:audioMsg,
      contentData:dataConfig.outputs,
      fileUse:fileUse,
      titleDescription:"Overview of the task to start transcoding job."
    };
  }

  componentWillMount(){
  }
  componentDidMount(){
  }
  componentWillUnmount(){
  }

  makeTitleList(title){
    var len = title.length;
    for(var i = 0;i < len ; i++){
      var str = "<th >"+title[0]+"</th>";
    }

  }
  render() {
    var title = ["Resolution (px)","FrameRate (fps)"];
    if(!this.state.FrameRate_QP_value){
      title.push("QP Value");
    }
    else{
      title.push("BitRate (Mbps)");
    }
    var TitleList = [];
    TitleList = title.map((x,i)=><th id="css_th2" key={i}>{x}</th>);
    var Process_Job_List1=[];
    const contentData = this.state.contentData;
    Process_Job_List1 = contentData.map((x, i) => <JobList key={i} obj={x} FrameRate_QP_value={this.state.FrameRate_QP_value}/>);

    //--Stream/file
    var typeTitle="Streaming:";
    var typeInfo = this.state.Streaming;
    if(this.state.fileUse){
      typeTitle="File Type:";
      typeInfo = this.state.FileType;
    }
    //---UI
    const marginBlue="20px";
    const marginYellow="10px";
    const marginPink="8px";
    const marginOrange="35px";

    return (
      <div>
        <div style={{marginTop:marginBlue}}></div>
        <div style={{marginLeft:marginOrange}}>{this.state.titleDescription}</div>
        <div style={{marginTop:marginBlue}}></div>
        <div className="row">
          <div className="col-sm-12">
            <div className="col-sm-6">
              <div style={{float:"left",width:"115px",marginLeft:marginOrange}}>Task:</div>
              <div style={{float:"left",marginLeft:marginYellow}} className = {this.state.iTask}></div>
              <div style={{float:"left",marginLeft:marginPink}}>{this.state.Task}</div>
              <div style={{clear:"both"}}></div>
            </div>
            <div className="col-sm-6">
              <div style={{float:"left",width:"115px",marginLeft:marginBlue}}>Video Settings:</div>
              <div style={{float:"left",marginLeft:marginYellow}}>{this.state.VideoSettings}</div>
              <div style={{clear:"both"}}></div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div className="col-sm-6">
              <div style={{float:"left",width:"115px",marginLeft:marginOrange}}>{typeTitle}</div>
              <div style={{float:"left",marginLeft:marginYellow}}>{typeInfo}</div>
              <div style={{clear:"both"}}></div>
            </div>
            <div className="col-sm-6">
              <div style={{float:"left",width:"115px",marginLeft:marginBlue}}>Audio Settings:</div>
              <div style={{float:"left",marginLeft:marginYellow}}>{this.state.AudioSettings}</div>
              <div style={{clear:"both"}}></div>
            </div>
          </div>
        </div>
        <div style={{marginTop:marginBlue}}></div>
        <div style={{height:"32px",fontSize:"14px",color:"#000000",backgroundColor:"#f6f8f9",marginLeft:marginYellow}}>Output</div>
        <table id="css_table" class="table-striped table-hover table-users table-bordered ">
         <thead>
           <tr>
             {TitleList}
           </tr>
         </thead>
         <tbody>
            {Process_Job_List1}
         </tbody>
       </table>
     </div>
    );
  }
}
