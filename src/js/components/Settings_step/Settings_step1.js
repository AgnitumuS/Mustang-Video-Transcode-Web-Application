import React from "react";
import Settings_step1_component from "./Settings_step1_component";
import Select from "react-select";
import {taskConfig,routeResp} from '../../config';
import '../../css/style.css';
import '../../css/react-select.css';
//POP
import Info from '../Info';

import '../../css/settings.css';

export default class Settings_step1 extends React.Component {
    constructor(props) {
       super(props);
       var dataConfig  = props.getDataConfig();
       var mycontentData = dataConfig.input;
       var mQuickTranscodeEnable = dataConfig.quickTranscodeEnable;
       var myupdateStatus = false;
       var mLiveUrl = "";
       var mFile_value = null;
       var mFileinfo = {
        "Duration":"",
        "Resolution":"",
        "audio":"",
        "audiorate":"",
        "bitrate":"",
        "fps":""
      };
      var Task_Type_value = _.find(taskConfig.transcodeType, props.mType);
      if(Task_Type_value == null){
        Task_Type_value = taskConfig.transcodeType[0];
        myupdateStatus = true;
      }
      if(mycontentData != undefined){
        var tmpcfg = _.result(Task_Type_value,'Task_Type_value');
        if(tmpcfg == "live"){
          mLiveUrl=mycontentData.streamname;
          myupdateStatus = true;
        }
        else{
          mFile_value = mycontentData.filepath;
          mFileinfo = {
            "Duration":mycontentData.duration,
            "Resolution":mycontentData.vresolution,
            "audio":mycontentData.acodec,
            "audiorate":mycontentData.abitrate,
            "bitrate":mycontentData.vbitrate,
            "fps":mycontentData.vframerate
          }
          myupdateStatus = true;
        }
      }
        //quickTranscodeEnableUse
        var quickTranscodeEnableUse = false;
        if(_.result(Task_Type_value,'Task_Type_value')=="file"){
          quickTranscodeEnableUse = true;
        }
       this.state = {
          mFileinfo:mFileinfo,
          mFile_value:mFile_value,
          mType:Task_Type_value,
          mLiveUrl:mLiveUrl,
          updateStatus:myupdateStatus,
          mQuickTranscodeEnable:mQuickTranscodeEnable,
          quickTranscodeEnableUse:quickTranscodeEnableUse,
          titleDescription:"VOD, Live and File transcoding types are available. Quick transcode function is only for \"File\" transcoding."
        };
        this.Type_onChange=this.Type_onChange.bind(this);
        this.input_onChange = this.input_onChange.bind(this);
        this.handleChangeChk = this.handleChangeChk.bind(this);


        this.change_status = this.change_status.bind(this);
        this.change_next = this.change_next.bind(this);

    }

    handleChangeChk(){
      var chkbox=this.state.mQuickTranscodeEnable;
      this.setState({
        mQuickTranscodeEnable:!chkbox,
      });
      this.setState({updateStatus:true});
    }

    componentDidMount(){
      if(this.state.updateStatus){
        this.checkData();
      }
    }
    componentDidUpdate(){
      if(this.state.updateStatus){
        this.checkData();
      }
    }

    Type_onChange(val){
      var quickTranscodeEnableUse = false;
      if (val.Task_Type_value=="file"){
        quickTranscodeEnableUse = true;
      }

      this.setState({
        mType:val,
        mQuickTranscodeEnable:false,
        quickTranscodeEnableUse:quickTranscodeEnableUse
      });
      this.setState({updateStatus:true});
    }
    input_onChange(e){
      this.setState({mLiveUrl: e.target.value});

      this.setState({updateStatus:true});
    }


    change_status(mFile_value,mFileinfo) {
  	 if(mFile_value !=null){
         this.setState({
           mFile_value:mFile_value,
           mFileinfo:mFileinfo
         });
        this.setState({updateStatus:true});
     }
    }
    change_next(){
      this.setState({
        mFile_value:null,
        mFileinfo:null
      });
     this.setState({updateStatus:true});
    }
    //####End

    checkData(){
      var state=false;
      var item=null;
      if(this.state.mType != null){
        if(this.state.mType.Task_Type_value=="live"){
          if(this.state.mLiveUrl != null){
              if(this.state.mLiveUrl.length > 0){
                state=true;
                item={
                  "streamname":this.state.mLiveUrl
                }
              }
          }
        }else{
          if(this.state.mFile_value != null && this.state.mFileinfo != null ){
              state=true;
              item={
                "filepath" : this.state.mFile_value,
                "vresolution" : this.state.mFileinfo.Resolution,
                "vbitrate" : this.state.mFileinfo.bitrate,
                "vcodec" : "h264",
                "vframerate" : this.state.mFileinfo.fps,
                "duration" : this.state.mFileinfo.Duration,
                "acodec" : this.state.mFileinfo.audio,
                "abitrate" : this.state.mFileinfo.audiorate
              }
          }
        }
        if( state && item != null){

          this.props.setDataConfig(item,this.state.mType,this.state.mQuickTranscodeEnable);
        }
        this.props.setcheckData(state);
      }
    }

    render(){
      //-- Select
      const clearable = false;

      //Info
      var infoShow=<Info title="titleTest" content="contentTest"/>;


    	const mImg ='../../../img/function_info.png';
    	const mImg2 ='../../../img/folderopen_a.png';
      var mTypeShow=null;
      if(this.state.mType != null){
        const mTypeValue=this.state.mType.Task_Type_value;
        if(mTypeValue=="live"){
          mTypeShow=<input id="SettingInputName"
                 disabled = {this.state.Live_inputkey_enable}
                 className="col-sm-8"
                 type="text"
                 name="input"
                 onChange={this.input_onChange}
                 value={this.state.mLiveUrl}
                 placeholder="Input Live StreamerName" />;
        }else if (mTypeValue=="vod"){

           mTypeShow=<Settings_step1_component
                mFile_value={this.state.mFile_value}
                callbackParent={this.change_status}
                callbacknext = {this.change_next}
        	/>
        }else if (mTypeValue=="file"){
			        	mTypeShow=<Settings_step1_component
                        mFile_value={this.state.mFile_value}
						            callbackParent={this.change_status}
			        				callbacknext = {this.change_next}
						    	/>
        }
      }
      var myBigGreenDialog = {
    	      width: '40%',
    	      height: '140px',
    	      marginTop: '-200px',
    	      marginLeft: '-5%',
    	      opacity: '0.8'
    	    };

      //---UI
      const marginBlue="20px";
      const marginYellow="10px";
      const marginGreenLight="15px";
      const marginPurple="30px";
      const marginOrange="35px";
      const margin2Orange="70px";

      return (
        <div className="settings_step1">
          <div style={{marginTop:marginBlue}}></div>
          <div style={{marginLeft:margin2Orange}}>{this.state.titleDescription}</div>
          <div style={{marginTop:marginBlue}}></div>
          <div style={{float:"left",width:"115px",  marginRight:marginYellow,marginLeft:margin2Orange}}>Task Type:</div>
          <div style={{float:"left",width:"200px"}}>
            <Select
              onChange={this.Type_onChange}
              options={taskConfig.transcodeType}
              placeholder="Selet Task Type"
              value={this.state.mType}
              clearable={clearable}/>
          </div>
          <div style={{float:"left",width:"130px", marginLeft:marginYellow, marginRight:marginYellow}}>Quick Transcode:</div>
          <div style={{float:"left"}}>
            <input type="checkbox" disabled={!this.state.quickTranscodeEnableUse} className="checkbox" checked={this.state.mQuickTranscodeEnable} onChange={this.handleChangeChk}/>
          </div>
          <div style={{clear:"both"}}></div>
          <div style={{marginTop:marginGreenLight}}></div>
          {mTypeShow}
        </div>
      );
    }
}
