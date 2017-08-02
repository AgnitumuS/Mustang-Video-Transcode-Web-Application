import React from "react";
import {taskConfig,taskConfigVCodecUse,taskConfigVStreamUse,taskConfigVFileUse,taskConfigVFileUseQuick,taskConfigFileUseQuick} from '../../config';
import Select from "react-select";
//POP
import Info from '../Info';

export default class Settings_step2 extends React.Component {
  constructor(props){
    super(props);
    var dataConfig  = props.getDataConfig();
    var fileTypeEnable = false;
    if(props.mType.Task_Type_value =="file"){
      fileTypeEnable = true;
    }
    var myTaskConfig=taskConfig;
    var mQuickTranscodeEnable = dataConfig.quickTranscodeEnable;
    var myupdateStatus = false;
    var myOutput = dataConfig.output;
    if(myOutput==undefined){
      myupdateStatus = true;
      myOutput= {
       "vcodecid" : 1,
       "profileid" : 1,
       "levelid" : 3,
       "acodecid" : 1,
       "abitrateid" : 3
     };
    }
    // console.log("myOutput "+JSON.stringify(myOutput));
    //---Stream check
    var myProtocol_Fileextension = null;
    if(fileTypeEnable){
      myProtocol_Fileextension = dataConfig.fileextension;
      if(myProtocol_Fileextension==undefined){
        myupdateStatus = true;
        myProtocol_Fileextension= 0;
      }
    }
    else{
      myProtocol_Fileextension = dataConfig.protocol;
      if(myProtocol_Fileextension==undefined){
        myupdateStatus = true;
        myProtocol_Fileextension= 0;
      }
    }
    if(!fileTypeEnable){
      var myVCodecWithTypeTmp = _.find(taskConfigVStreamUse, {Stream_Protocol_value:myProtocol_Fileextension});
      if(myVCodecWithTypeTmp == null){
        myVCodecWithTypeTmp = taskConfigVStreamUse[0];
        myProtocol_Fileextension = _.result(myVCodecWithTypeTmp,'Stream_Protocol_value');
        myupdateStatus = true;
      }
      var myVCodecWithType=_.result(myVCodecWithTypeTmp,'label');
      const myVCodec=_.result(_.find(myVCodecWithType, {Task_Type_value:props.mType.Task_Type_value}),'label');
      myTaskConfig.Video_Codec=myVCodec.Video_Codec;
    }
    else{
      var myRefConf=taskConfigVFileUse;
      if(mQuickTranscodeEnable){
        myRefConf=taskConfigVFileUseQuick;
        myTaskConfig.fileType=taskConfigFileUseQuick;
      }
      // console.log("myRefConf "+JSON.stringify(myRefConf));
      var myVCodecWithTypeTmp = _.find(myRefConf, {File_Type_value:myProtocol_Fileextension});
      if(myVCodecWithTypeTmp == null){
        myVCodecWithTypeTmp = myRefConf[0];
        myProtocol_Fileextension = _.result(myVCodecWithTypeTmp,'File_Type_value');
        myupdateStatus = true;
      }
      const myVCodec=_.result(myVCodecWithTypeTmp,'label');
      myTaskConfig.Video_Codec=myVCodec.Video_Codec;
    }

    //---Vcodec check value useful
    var Video_Codec_value = _.find(myTaskConfig.Video_Codec, {Video_Codec_value:myOutput.vcodecid});
    if(Video_Codec_value == null){
      Video_Codec_value = myTaskConfig.Video_Codec[0];
      myOutput.vcodecid = _.result(Video_Codec_value,'Video_Codec_value');
      myupdateStatus = true;
    }

    //---Vcodec check
    var tmpTmp=_.find(taskConfigVCodecUse, {Video_Codec_value:myOutput.vcodecid});
    if(tmpTmp == null){
      tmpTmp = taskConfigVCodecUse[0];
      myOutput.vcodecid = _.result(tmpTmp,'Video_Codec_value');
      myupdateStatus = true;
    }

    var tmp = _.result(tmpTmp,'label');
    var tmpcfgTmp = null;
    var tmpcfg=null;

    switch(myOutput.vcodecid){
      case 1:
      case 2:
        tmpcfgTmp = _.find(taskConfig.Video_Profile, {Video_Profile_value:myOutput.profileid});
        if(tmpcfgTmp == null){
          tmpcfgTmp = taskConfig.Video_Profile[0];
          myOutput.profileid = _.result(tmpcfgTmp,'Video_Profile_value');
          myupdateStatus = true;
        }
        tmpcfg = _.result(tmpcfgTmp,'label');
        myTaskConfig.Video_Level=tmp.Video_Level[tmpcfg];
        if(fileTypeEnable){
          myTaskConfig.Audio_Codec=tmp.Audio_Codec.File;
        }
        else{
          myTaskConfig.Audio_Codec=tmp.Audio_Codec.Stream;
        }
      break;
      case 3:
      case 4:
      case 5:
      break;
    }
    //--set data
    var Stream_Protocol_value_tmp = null;
    var File_Type_value_tmp = null;
    if(fileTypeEnable){
      File_Type_value_tmp = _.find(myTaskConfig.fileType, {File_Type_value:myProtocol_Fileextension});
    }
    else{
      Stream_Protocol_value_tmp = _.find(myTaskConfig.Stream_Protocol, {Stream_Protocol_value:myProtocol_Fileextension});
    }


    var Video_Level_value = _.find(myTaskConfig.Video_Level, {Video_Level_value:myOutput.levelid});
    if(Video_Level_value == null){
      Video_Level_value = myTaskConfig.Video_Level[0];
      myOutput.levelid = _.result(Video_Level_value,'Video_Level_value');
      myupdateStatus = true;
    }
    var Audio_Codec_value = _.find(myTaskConfig.Audio_Codec, {Audio_Codec_value:myOutput.acodecid});
    if(Audio_Codec_value == null){
      Audio_Codec_value = myTaskConfig.Audio_Codec[0];
      myOutput.acodecid = _.result(Audio_Codec_value,'Audio_Codec_value');
      myupdateStatus = true;
    }
    var Audio_BitRate_value = _.find(myTaskConfig.Audio_BitRate, {Audio_BitRate_value:myOutput.abitrateid});
    if(Audio_BitRate_value == null){
      Audio_BitRate_value = myTaskConfig.Audio_BitRate[0];
      myOutput.abitrateid = _.result(Audio_BitRate_value,'Audio_BitRate_value');
      myupdateStatus = true;
    }

    this.state={
       Video_Codec_value : Video_Codec_value,
       Video_Profile_value : myOutput.profileid,
       Video_Level_value : Video_Level_value,
       Audio_Codec_value : Audio_Codec_value,
       Audio_BitRate_value : Audio_BitRate_value,
       Stream_Protocol_value : Stream_Protocol_value_tmp,
       File_Type_value : File_Type_value_tmp,
       output:myOutput,
       protocol_fileextension:myProtocol_Fileextension,
       updateStatus:myupdateStatus,
       fileTypeEnable:fileTypeEnable,
       myTaskConfig:myTaskConfig,
       mQuickTranscodeEnable:mQuickTranscodeEnable,
       titleDescription:"Select Output protocols (RTMP,HLS,DASH,ICECAST) or File Format. Multiple Video Codecs(H.264,H.265,VP8,VP9) and Audio Codecs(AAC,MP3,Vorbis) formats supports."
    };
    this.Video_Codec_onChange = this.Video_Codec_onChange.bind(this);
    this.Video_Level_onChange = this.Video_Level_onChange.bind(this);
    this.Audio_Codec_onChange = this.Audio_Codec_onChange.bind(this);
    this.Audio_BitRate_onChange= this.Audio_BitRate_onChange.bind(this);
    this.Stream_Protocol_onChange = this.Stream_Protocol_onChange.bind(this);
    this.File_Type_onChange = this.File_Type_onChange.bind(this);

  }
  componentDidMount(){
    if(this.state.updateStatus){
      this.checkData();
    }
  }
  componentWillUnmount(){
  }
  componentDidUpdate(){
    if(this.state.updateStatus){
      this.checkData();
    }
  }
  Video_Codec_onChange(val) {
    //---Vcodec check
    var tmp = _.result(_.find(taskConfigVCodecUse, {Video_Codec_value:val.Video_Codec_value}),'label');
    var tmpcfg=null;
    var myOutput=this.state.output;
    var fileTypeEnable = this.state.fileTypeEnable;
    var myTaskConfig=this.state.myTaskConfig;
    var myProtocol_Fileextension = this.state.protocol_fileextension;
    var Stream_Protocol_value_tmp = null;
    var File_Type_value_tmp = null;
    var vcodecId=_.get(val,'Video_Codec_value');
    switch(vcodecId){
      case 1:
      case 2:
        myOutput.profileid = 1;
        myOutput.levelid = 1;
        myOutput.acodecid = vcodecId;
        tmpcfg = _.result(_.find(taskConfig.Video_Profile, {Video_Profile_value:myOutput.profileid}),'label');
        myTaskConfig.Video_Level=tmp.Video_Level[tmpcfg];
        if(fileTypeEnable){
          myTaskConfig.Audio_Codec=tmp.Audio_Codec.File;

          this.setState({
             Video_Profile_value : myOutput.profileid,
             Video_Level_value : _.find(myTaskConfig.Video_Level, {Video_Level_value:myOutput.levelid}),
          });
        }
        else{
          myTaskConfig.Audio_Codec=tmp.Audio_Codec.Stream;
        }
        this.setState({
           Audio_Codec_value : _.find(myTaskConfig.Audio_Codec, {Audio_Codec_value:myOutput.acodecid})
        });
      break;
      case 3:
      case 4:
      case 5:
        myOutput.acodecid = vcodecId;
        if(fileTypeEnable){
          myTaskConfig.Audio_Codec=tmp.Audio_Codec.File;
          if(myTaskConfig.Audio_Codec.length>0){
            this.Audio_Codec_onChange(myTaskConfig.Audio_Codec[0]);
          }
        }
        else{
          myTaskConfig.Audio_Codec=tmp.Audio_Codec.Stream;
          if(myTaskConfig.Audio_Codec.length>0){
            this.Audio_Codec_onChange(myTaskConfig.Audio_Codec[0]);
          }
        }
      break;
    }

	   this.setState({Video_Codec_value : val});

     myOutput.vcodecid=vcodecId;
     this.setState({output:myOutput,updateStatus:true,myTaskConfig:myTaskConfig});
	 };
  Video_Profile_onChange(val){
    this.setState({Video_Profile_value: val});

    var myOutput = this.state.output;
    myOutput.profileid=val;
    this.setState({output:myOutput,updateStatus:true});

    myOutput.levelid = 1;

    var tmp = _.result(_.find(taskConfigVCodecUse, {Video_Codec_value:myOutput.vcodecid}),'label');
    var tmpcfg=null;
    tmpcfg = _.result(_.find(taskConfig.Video_Profile, {Video_Profile_value:myOutput.profileid}),'label');
    var myTaskConfig=this.state.myTaskConfig;
    myTaskConfig.Video_Level=tmp.Video_Level[tmpcfg];
    this.setState({
       Video_Level_value : _.find(myTaskConfig.Video_Level, {Video_Level_value:myOutput.levelid}),
       myTaskConfig:myTaskConfig

    });
  }
  Video_Level_onChange(val) {
	   this.setState({Video_Level_value : val});

     var myOutput = this.state.output;
     myOutput.levelid=_.result(val,'Video_Level_value');
     this.setState({output:myOutput,updateStatus:true});
	  };
  Audio_Codec_onChange(val) {
	  this.setState({ Audio_Codec_value : val });

    var myOutput = this.state.output;
    myOutput.acodecid=_.result(val,'Audio_Codec_value');
    this.setState({output:myOutput,updateStatus:true});
	  };
  Audio_BitRate_onChange(val) {
	  this.setState({ Audio_BitRate_value : val });

    var myOutput = this.state.output;
    myOutput.abitrateid=_.result(val,'Audio_BitRate_value');
    this.setState({output:myOutput,updateStatus:true});
	  };
  Stream_Protocol_onChange(val) {
    this.setState({ Stream_Protocol_value : val });

    //---Stream check
    var myTaskConfig=this.state.myTaskConfig;
    const myVCodecWithType=_.result(_.find(taskConfigVStreamUse, {Stream_Protocol_value:val.Stream_Protocol_value}),'label');
    const myVCodec=_.result(_.find(myVCodecWithType, {Task_Type_value:this.props.mType.Task_Type_value}),'label');
    myTaskConfig.Video_Codec=myVCodec.Video_Codec;

     var myPara = this.state.protocol_fileextension;
     myPara=_.result(val,'Stream_Protocol_value');
     this.setState({protocol_fileextension:myPara,updateStatus:true,myTaskConfig:myTaskConfig});

     if(myTaskConfig.Video_Codec[0]!=undefined){
       this.Video_Codec_onChange(myTaskConfig.Video_Codec[0]);
     }
	  };
  File_Type_onChange(val) {
    this.setState({ File_Type_value : val });

    //---File check
    var myTaskConfig=this.state.myTaskConfig;
    var myRefConf=taskConfigVFileUse;
    if(this.state.mQuickTranscodeEnable){
      myRefConf=taskConfigVFileUseQuick;
    }
    const myVCodec=_.result(_.find(myRefConf, {File_Type_value:val.File_Type_value}),'label');
    myTaskConfig.Video_Codec=myVCodec.Video_Codec;

    var myPara = this.state.protocol_fileextension;
    myPara=_.result(val,'File_Type_value');
    this.setState({protocol_fileextension:myPara,updateStatus:true});

    if(myTaskConfig.Video_Codec[0]!=undefined){
      this.Video_Codec_onChange(myTaskConfig.Video_Codec[0]);
    }
  }


  checkData(){
      this.setState({updateStatus:false});
      var state=false;
      var myoutput = this.state.output;
      var mypara = this.state.protocol_fileextension;
      if(myoutput != undefined){
        state=true;
      }
      if(mypara != undefined){
        state=true;
      }

      if( state){
        this.props.setDataConfig(myoutput,mypara);
      }
      this.props.setcheckData(state);
  }

  render() {
      //-- Select
      const clearable = false;

	    const video_icon = '../../../img/video icon.png';
      const audio_icon = '../../../img/audio icon.png';
      //-- file or stream
      var typeTitle="Streaming";
      var typeContent=<Select
        onChange={this.Stream_Protocol_onChange}
        options={this.state.myTaskConfig.Stream_Protocol}
        placeholder="Streaming"
        value={this.state.Stream_Protocol_value}
        clearable={clearable}/>;

      if(this.state.fileTypeEnable){
        typeTitle="File Type";
        typeContent=<Select
          onChange={this.File_Type_onChange}
          options={this.state.myTaskConfig.fileType}
          placeholder="File Type"
          value={this.state.File_Type_value}
          clearable={clearable}/>;
      }

      //--- profile Value
      const valMain=[1,2];
      var vprofileStage=0;//0:all disable, 1:main/high enable, 2: main enable
      var vcodecid=this.state.output.vcodecid;
      if(vcodecid == 1 || vcodecid == 2){
        vprofileStage = vcodecid;
      }
      //--
      var DisableAudio = false;
      if(vcodecid==4){
        DisableAudio = true;
      }
      //---UI
      const marginBlue="20px";
      const marginYellow="10px";
      const marginGreenLight="15px";
      const marginPurple="30px";

    return (
      <div>
        <div style={{marginTop:marginBlue}}></div>
        <div >{this.state.titleDescription}</div>
        <div style={{marginTop:marginBlue}}></div>
        <div>
          <div style={{float:"left",width:"115px", marginRight:marginYellow}}>{typeTitle}</div>
          <div style={{width:"200px",float:"left"}}>
            {typeContent}
          </div>
          <div style={{float:"left", marginLeft:marginYellow}}><Info title="titleTest" content="contentTest"/></div>
          <div style={{clear:"both"}}></div>
        </div>
        <div style={{marginTop:marginBlue}}></div>
          <div style={{float:"left", width:"50%"}}>
            <div style={{float:"left"}}><img src={video_icon} width={"24px"} height={"24px"}/></div>
            <div style={{float:"left", marginLeft:marginYellow}}>Video Options</div>
            <div style={{clear:"both"}}></div>
          </div>
          <div style={{float:"left", width:"50%"}}>
            <div style={{float:"left"}}><img src={audio_icon} width={"24px"} height={"24px"}/></div>
            <div style={{float:"left", marginLeft:marginYellow}}>Audio Options</div>
            <div style={{clear:"both"}}></div>
          </div>
          <div style={{clear:"both"}}></div>
        <div style={{marginTop:marginBlue}}></div>
          <div style={{float:"left", width:"50%"}}>
            <div style={{float:"left",width:"110px", marginLeft:marginPurple, marginRight:marginYellow}}>Video Codec:</div>
            <div style={{float:"left",width:"200px"}}>
              <Select
                    onChange={this.Video_Codec_onChange}
                    options={this.state.myTaskConfig.Video_Codec}
                    placeholder="Video Codec"
                    value={this.state.Video_Codec_value}
                    clearable={clearable}/>
            </div>
            <div style={{clear:"both"}}></div>
          </div>
          <div style={{float:"left", width:"50%"}}>
            <div style={{float:"left",width:"110px", marginLeft:marginPurple, marginRight:marginYellow}}>Audio Codec:</div>
            <div style={{float:"left",width:"200px"}}>
              <Select
                      onChange={this.Audio_Codec_onChange}
                      options={this.state.myTaskConfig.Audio_Codec}
                      placeholder="Audio Codec"
                      value={this.state.Audio_Codec_value}
                      disabled={DisableAudio}
                      clearable={clearable}/>
            </div>
            <div style={{clear:"both"}}></div>
          </div>
          <div style={{clear:"both"}}></div>
        <div style={{marginTop:marginGreenLight}}></div>
          <div style={{float:"left", width:"50%"}}>
            <div style={{float:"left",width:"110px", marginLeft:marginPurple, marginRight:marginYellow}}>Video Profile:</div>
            <div style={{float:"left",width:"90px"}}>
              <input name="Video_Profile_value" type="radio" disabled={vprofileStage==0} value={valMain[0]} checked={this.state.Video_Profile_value===valMain[0]} onChange={x=>this.Video_Profile_onChange(valMain[0])}/>
              <div style={{float:"left", marginLeft:marginYellow}}>Main</div>
            </div>
            <div style={{float:"left", marginLeft:marginBlue}}></div>
            <div style={{float:"left",width:"90px"}}>
              <input name="Video_Profile_value" type="radio" disabled={vprofileStage!=1} value={valMain[1]} checked={this.state.Video_Profile_value===valMain[1]} onChange={x=>this.Video_Profile_onChange(valMain[1])}/>
              <div style={{float:"left", marginLeft:marginYellow}}>High</div>
            </div>
            <div style={{clear:"both"}}></div>
          </div>
          <div style={{float:"left", width:"50%"}}>
            <div style={{float:"left",width:"110px", marginLeft:marginPurple, marginRight:marginYellow}}>Audio Bitrate:</div>
            <div style={{float:"left",width:"200px"}}>
              <Select
                  onChange={this.Audio_BitRate_onChange}
                  options={this.state.myTaskConfig.Audio_BitRate}
                  placeholder="Audio BitRate"
                  value={this.state.Audio_BitRate_value}
                  disabled={DisableAudio}
                  clearable={clearable}/>
            </div>
            <div style={{clear:"both"}}></div>
          </div>
          <div style={{clear:"both"}}></div>
        <div style={{marginTop:marginGreenLight}}></div>
          <div style={{float:"left", width:"50%"}}>
            <div style={{float:"left",width:"110px", marginLeft:marginPurple, marginRight:marginYellow}}>Level:</div>
            <div style={{float:"left",width:"200px"}}>
              <Select
                  onChange={this.Video_Level_onChange}
                  options={this.state.myTaskConfig.Video_Level}
                  placeholder="Level"
                  value={this.state.Video_Level_value}
                  disabled={vprofileStage==0}
                  clearable={clearable}/>
            </div>
            <div style={{clear:"both"}}></div>
          </div>
          <div style={{float:"left", width:"50%"}}></div>
          <div style={{clear:"both"}}></div>
        <div style={{marginTop:marginGreenLight}}></div>
      </div>
    );
  }
}
