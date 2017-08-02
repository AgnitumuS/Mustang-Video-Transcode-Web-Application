import React from "react";
import Tabs from "./Tabs";
import _        from 'lodash';
import Modal from 'react-modal';
import 'react-select/dist/react-select.css';
import '../components/layout/table.css';
import {Settings_step1,Settings_step2,Settings_step3,Settings_step4} from "../components/Settings_step";
import {routeResp,cardInfo} from '../config';
import {baseTrans} from '../api';
import '../css/normal.css';

const tabColor=["#1d6fde","#eee","#bbb","#fff"];
const tabUseColor=["#eaeaea","#dafbff","#d5d5d5"];//normal/hover/select
const stepNormal=['../../../img/ic_num_1 normal.png','../../../img/ic_num_2 normal.png','../../../img/ic_num_3 normal.png','../../../img/ic_num_4 normal.png'];
const stepSelect=['../../../img/ic_num_1 selected.png','../../../img/ic_num_2 selected.png','../../../img/ic_num_3 selected.png','../../../img/ic_num_4 selected.png'];
const stepArr=['../../../img/over_head.png','../../../img/over_tail.png','../../../img/select_head.png','../../../img/select_tail.png'];


var Post_body={
 "description" : "transcoding job 1",
 "action" : 1,
 "input" : {
  "filepath" : "/data/fast.mp4",
  "vresolution" : "1280x720",
  "vbitrate" : "13000kbps",
  "vcodec" : "h264",
  "vprofile" : "Main",
  "vlevel" : "3.1",
  "vframerate" : "30fps",
  "vaspectratio" : "16:9",
  "duration" : "100 mins",
  "acodec" : "AAC",
  "abitrate" : "1440kbs"
 },
 "output" : {
  "vcodecid" : 1,
  "profileid" : 2,
  "levelid" : 7,
  "acodecid" : 1,
  "abitrateid" : 3
 },
 "outputs" : [{
  "resolution" :"1920x1080",
  "resolutionid" : 3,
  "framerate" : 30,
  "bitrateenable" : false,
  "vquality" : "23"
 },
 {
  "resolution" :"1920x1080",
  "resolutionid" : 3,
  "framerate" : "30",
  "bitrateenable" : true,
  "vbitrate" : "25"
 }],
 "protocol" : 1,
 "cardid" : "CARD1",
 "cpu" : {
  "autocpu" : false,
  "cpuid" : "CPUID1",
  "ipaddress" : "192.168.0.10"
 }
}
const fileInfo={
  "video":"",
  "bitrate":"",
  "audio":"",
  "audiorate":"",
  "Resolution":"",
  "fps":"",
  "fsize":"",
  "Duration":""
}
export default class Settings extends React.Component {
  constructor(props) {
     super(props);
     var cpuId = cardInfo.cards[this.props.cardSelect].cpuinfo1.id;
     if(this.props.cpuSelect == 2){
       cpuId=cardInfo.cards[this.props.cardSelect].cpuinfo2.id;
     }
     var cardId=cardInfo.cards[this.props.cardSelect].id;


      var stepUseImg=new Array(4);
      stepUseImg[0] = stepSelect[0];
      stepUseImg[1] = stepNormal[1];
      stepUseImg[2] = stepNormal[2];
      stepUseImg[3] = stepNormal[3];
      var stepArrUseImg=new Array(4);
      stepArrUseImg[0] = stepArr[2];
      stepArrUseImg[1] = null;
      stepArrUseImg[2] = null;
      stepArrUseImg[3] = null;
      var tabBG = new Array(4);
      tabBG[0] = tabUseColor[2];
      tabBG[1] = tabUseColor[0];
      tabBG[2] = tabUseColor[0];
      tabBG[3] = tabUseColor[0];
      var tabBG2 = new Array(4);
      tabBG2[0] = tabUseColor[0];
      tabBG2[1] = tabUseColor[0];
      tabBG2[2] = tabUseColor[0];
      tabBG2[3] = tabUseColor[0];

     this.state = {
        modalIsOpen: false,
        mContentId:1,
        cardSelect:this.props.cardSelect,
        cpuSelect:this.props.cpuSelect,
        cardId:cardId,
        cpuId:cpuId,
        mContent:null,
        bodyConfig:{},
        mNextCheck:false,
        mType:null,
        body_input:null,
        body_output:null,
        body_outputs:null,
        body_protocol:null,
        body_cpu:null,
        body_card:null,
        checkData:false,
        stepUseImg:stepUseImg,
        stepArrUseImg:stepArrUseImg,
        tabBG:tabBG,
        tabBG2:tabBG2,
      };
      this.openModal = this.openModal.bind(this);
      this.afterOpenModal = this.afterOpenModal.bind(this);
      this.closeModal = this.closeModal.bind(this);
      this.changeContent = this.changeContent.bind(this);
      this.postapi = this.postapi.bind(this);
      this.postapi_callback = this.postapi_callback.bind(this);
      this.setBody_input = this.setBody_input.bind(this);
      this.setBody_output_protocol = this.setBody_output_protocol.bind(this);
      this.setBody_outputs = this.setBody_outputs.bind(this);
      this.getDataConfig = this.getDataConfig.bind(this);
      this.initDataConfig = this.initDataConfig.bind(this);
      this.setcheckData = this.setcheckData.bind(this);
      this.initData = this.initData.bind(this);

  }
  componentWillMount(){
   this.initDataConfig()
  }
  componentDidMount() {

  }
  openModal() {
    this.initDataConfig();
    this.changeContent(1);
    this.setState({modalIsOpen: true});
  }
  afterOpenModal() {
  }
  closeModal() {
    var strMsg="Are you sure to exit!!";

    if(confirm(strMsg))
    {
      //ok
      this.initData();
      this.setState({
        modalIsOpen: false
      });
    }
    else//Cancel
    {

    }
  }
  initData(){
    this.setState({
       mContentId:1,
       mContent:null,
       bodyConfig:{},
       mNextCheck:false,
       mType:null,
       body_input:null,
       body_output:null,
       body_outputs:null,
       body_protocol:null,
       body_cpu:null,
       body_card:null,
       checkData:false,
     });
  }
  initDataConfig(){
    var tem={};
    //---special initDataConfig
    tem.quickTranscodeEnable=false;
    tem.action=1;//1 is running; 0 is save;

    tem.cpu={
      "autocpu" : false,
      "cpuid" : this.state.cpuId
    };
    tem.cardid=  this.state.cardId;

    this.setState({
      bodyConfig:tem,
      body_cpu:tem.cpu,
      body_card:tem.cardid
    });
  }

  setcheckData(checkData){
    this.setState({
      checkData:checkData
    });
  }
  getDataConfig(){
    // var bodyConfig ={
    //     body_input:this.state.body_input,
    //     body_output:this.state.body_output,
    //     body_protocol:this.state.body_protocol,
    //     body_outputs:this.state.body_outputs
    // }
    return this.state.bodyConfig;
  }
  setBody_input(input,type,quickTranscodeEnable){//step1
    var tem=this.state.bodyConfig;
    tem.quickTranscodeEnable=quickTranscodeEnable;
    tem["input"]=input;
    this.setState({
      mType:type,
      body_input:input,
      bodyConfig:tem
    });
  }
  setBody_output_protocol(output,protocol_fileextension){//step2
    var tem=this.state.bodyConfig;
    tem["protocol"]=protocol_fileextension;//0 - RTMP 1-HLS 2-MPEGDASH 3- ICECAST
    if(this.state.mType.Task_Type_value=="file"){
      tem["fileextension"]=protocol_fileextension;// filetype 0-7 MKV-MOV
    }
    tem.output=output;
    this.setState({
      body_output:output,
      body_protocol:protocol_fileextension,
      bodyConfig:tem
    })
  }
  setBody_outputs(outputs){//step3
    var tem=this.state.bodyConfig;
    tem["outputs"]=outputs;
    this.setState({
      body_outputs:outputs,
      bodyConfig:tem
    })
  }




  changeContent(contentId){
        var mContent;
        var id=contentId;
        switch (contentId) {
         case 1:
          mContent=<Settings_step1
                      mType={this.state.mType}
                      setDataConfig={this.setBody_input}
                      getDataConfig={this.getDataConfig}
                      setcheckData={this.setcheckData} />;
           break;
         case 2:
          mContent=<Settings_step2
                      mType={this.state.mType}
                      setDataConfig={this.setBody_output_protocol}
                      getDataConfig={this.getDataConfig}
                      setcheckData={this.setcheckData}/>;
           break;
         case 3:
          mContent=<Settings_step3
                      setDataConfig={this.setBody_outputs}
                      getDataConfig={this.getDataConfig}
                      setcheckData={this.setcheckData} />;
           break;
         case 4:
          mContent=<Settings_step4
                      mType={this.state.mType}
                      getDataConfig={this.getDataConfig}
                      setcheckData={this.setcheckData}/>;
           break;
        }

        // UI
        var stepUseImg = this.state.stepUseImg;
        var stepArrUseImg = this.state.stepArrUseImg;
        var tabBG = this.state.tabBG;

        switch (contentId) {
         case 1:
            stepUseImg[0] = stepSelect[0];
            stepUseImg[1] = stepNormal[1];
            stepUseImg[2] = stepNormal[2];
            stepUseImg[3] = stepNormal[3];
            stepArrUseImg[0] = stepArr[2];
            stepArrUseImg[1] = null;
            stepArrUseImg[2] = null;
            stepArrUseImg[3] = null;
            tabBG[0] = tabUseColor[2];
            tabBG[1] = tabUseColor[0];
            tabBG[2] = tabUseColor[0];
            tabBG[3] = tabUseColor[0];

           break;
         case 2:
           stepUseImg[0] = stepNormal[0];
           stepUseImg[1] = stepSelect[1];
           stepUseImg[2] = stepNormal[2];
           stepUseImg[3] = stepNormal[3];
           stepArrUseImg[0] = stepArr[3];
           stepArrUseImg[1] = stepArr[2];
           stepArrUseImg[2] = null;
           stepArrUseImg[3] = null;
           tabBG[0] = tabUseColor[0];
           tabBG[1] = tabUseColor[2];
           tabBG[2] = tabUseColor[0];
           tabBG[3] = tabUseColor[0];
           break;
         case 3:
           stepUseImg[0] = stepNormal[0];
           stepUseImg[1] = stepNormal[1];
           stepUseImg[2] = stepSelect[2];
           stepUseImg[3] = stepNormal[3];
           stepArrUseImg[0] = null;
           stepArrUseImg[1] = stepArr[3];
           stepArrUseImg[2] = stepArr[2];
           stepArrUseImg[3] = null;
           tabBG[0] = tabUseColor[0];
           tabBG[1] = tabUseColor[0];
           tabBG[2] = tabUseColor[2];
           tabBG[3] = tabUseColor[0];
           break;
         case 4:
           stepUseImg[0] = stepNormal[0];
           stepUseImg[1] = stepNormal[1];
           stepUseImg[2] = stepNormal[2];
           stepUseImg[3] = stepSelect[3];
           stepArrUseImg[0] = null;
           stepArrUseImg[1] = null;
           stepArrUseImg[2] = stepArr[3];
           stepArrUseImg[3] = stepArr[2];
           tabBG[0] = tabUseColor[0];
           tabBG[1] = tabUseColor[0];
           tabBG[2] = tabUseColor[0];
           tabBG[3] = tabUseColor[2];
           break;
        }

        this.setState({
          mContentId:id,
          mContent:mContent,
          stepUseImg :stepUseImg,
          stepArrUseImg:stepArrUseImg,
          tabBG:tabBG
        });

  }

  postapi(body){
    var strMsg="Start Transcode!!"
    var JSONbody=JSON.stringify(body);
    var taskTypeVal = this.state.mType.Task_Type_value;
    baseTrans(body,taskTypeVal,this.postapi_callback);
    this.initData();
    this.setState({
      modalIsOpen: false
    });
  }
  postapi_callback(resp){
    if(resp[routeResp.Result] == routeResp.FailResult){
      console.log("postapi_callback No Info");
      return;
    }
    var data = resp[routeResp.Data];
  }
  render() {
    const add_task_24 = '../../../img/add task_24.png';

    const mContent=this.state.mContent;
    const mContentId=this.state.mContentId;
    var strTitle="Add Task on " + this.state.cpuId;

    const marginYellow="10px";
    const marginPink="12px";
    const marginOrange="35px"
    var tagTitleList=[];
    var tagTitleListStr=["Select a Task","Transcode Settings","Output Settings","Summary"];
    tagTitleList=tagTitleListStr.map((x,i)=>
    <div key={"tag"+i} style={{float:"left",height:"52px",backgroundColor:this.state.tabBG[i]}}>
      <div id={"tab"+i} style={{float:"left",height:"52px",backgroundColor:this.state.tabBG[i],lineHeight:"52px",verticalAlign:"middle",textAlign:"center"}}><img src={ this.state.stepUseImg[i] }/></div>
      <div style={{float:"left",height:"52px", marginLeft:marginYellow,backgroundColor:this.state.tabBG[i],lineHeight:"52px",verticalAlign:"middle",textAlign:"center"}}><text>{x}</text></div>
      <div style={{float:"left",width:{marginPink},height:"52px",backgroundColor:this.state.tabBG[i]}}></div>
      <div id={"tab"+i} style={{float:"left",width:"14px",backgroundColor:this.state.tabBG2[i]}}><img src={ this.state.stepArrUseImg[i] } />
      </div>
      <div style={{float:"left",width:{marginPink},height:"52px",backgroundColor:this.state.tabBG[i]}}></div>
    </div>);

    return (
      <div>
        <div>
          <button class="button_normal  button_yes" onClick={this.openModal}>+ Add Task</button>
        </div>
        <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={resetModalStyle}
            contentLabel="Example Modal"
            shouldCloseOnOverlayClick={false}
          >
          <div class="row" style={Styles.divcontent}>
            <div class="row">
                <div class="col-xs-12 col-sm-12" style={Styles.div1}>
                    <h4 style={Styles.fontTitle}><img src={ add_task_24 } width="30px" height="30px"/>{strTitle}</h4>
                </div>
              </div>
              <div class="row" style={{backgroundColor:tabUseColor[0],verticalAlign:"middle",textAlign:"center"}}>
                    {tagTitleList}
                    <div style={{clear:"both"}}></div>
              </div>
              <div class="row" style={Styles.div3}>
                {mContent}
              </div>
              <div class="row" style={Styles.div4}>
                <div style={{marginBottom:"24px"}}>
                  <div style={{float:"left",marginLeft:marginOrange,marginRight:"24px"}}>
                    <button class="button_commit button_no" onClick={()=> this.closeModal(5)}>Cancel</button>
                  </div>
                  <div style={{float:"right",marginLeft:"8px",marginRight:"24px"}}>
                    <button style={{display:(this.state.mContentId!=4)?"inline":"none"}} disabled={!this.state.checkData} class="button_commit button_yes" onClick={()=>this.changeContent(this.state.mContentId+1)}>Next</button>
                  </div>
                  <div style={{float:"right",marginLeft:"8px",marginRight:"24px"}}>
                    <button style={{display:(this.state.mContentId==4)?"inline":"none"}} disabled={!this.state.checkData} class="button_commit button_yes" onClick={()=>this.postapi(this.state.bodyConfig)}>Start</button>
                  </div>
                  <div style={{float:"right"}}>
                    <button style={{display:(this.state.mContentId!=1)?"inline":"none"}} disabled={!this.state.checkData} class="button_commit button_no" onClick={()=>this.changeContent(this.state.mContentId-1)}>Back</button>
                  </div>
                  <div style={{clear:"both"}}></div>
                </div>
              </div>
          </div>
        </Modal>
      </div>
    );
  }
}



const resetModalStyle = (() => {
  // Styles
  const initial = null

  const overlay = {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(0, 0, 0, 0.5)'
  }
  const content= {
        border: '0',
        borderRadius: '4px',
        bottom: 'auto',
        minHeight: '10rem',
        left: '50%',
        padding: '0rem',
        overflow: 'false',
        position: 'fixed',
        right: 'auto',
        top: '50%',
        transform: 'translate(-50%,-50%)',
        minWidth: '70rem',
        Width:'900px'
      }

  return {overlay, content}
})()

const Styles={
  divcontent:{
    paddingLeft:'15px',
    paddingRight:'15px',
    width             : "900px"
  },
  div1:{
    backgroundColor        : tabColor[0],
    height            : "52px",
    width             : "900px"
  },
  div3:{
    padding:"10px",
    backgroundColor        : tabColor[3],
    height            : "416px",
    width             : "900px"
  },
  div4:{
    backgroundColor        : tabColor[3],
    height            : "52px",
    width             : "900px"
  },
  fontTitle:{
    color: tabColor[3]
  },
  btn:{
	  height: "30px"
	  }
}
