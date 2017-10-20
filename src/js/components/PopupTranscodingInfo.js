import React from "react";
import ReactDOM from 'react-dom';
import Popup from 'react-popup';
import 'react-select/dist/react-select.css';
import Modal from 'react-modal';
import '../css/normal.css';
import '../css/pop.css';
import '../css/popupTranscode.css';
import { appConfig,routeResp,taskConfig } from '../config';
import { get_jobInfoDetail_byJobId} from '../api';

export default class MyModal extends React.Component {
  constructor(props) {
   super(props);
   this.state = {
   		modalIsOpen: false
   };

   this.openModal = this.openModal.bind(this);
   this.afterOpenModal = this.afterOpenModal.bind(this);
   this.closeModal = this.closeModal.bind(this);
   this.jobInfoCallback = this.jobInfoCallback.bind(this);
   this.copyToClipboard = this.copyToClipboard.bind(this);
 }

 openModal() {
   get_jobInfoDetail_byJobId(this.props.Job_Id_no,this.jobInfoCallback);

  }

  afterOpenModal() {
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  jobInfoCallback(resp){

    if(resp[routeResp.Result] == routeResp.FailResult){
      console.log("Popup myfunc fail");
      return;
    }
    var data = resp[routeResp.Data];

   	var obj = data.myurl;
   	var vquality = JSON.stringify(obj.outputs[0].vquality);
   	var labelValue;
    if (typeof vquality !== "undefined"){
    	 labelValue = 'QP Value';
    }else{
    	labelValue = 'BitRate';
    }

    this.setState(
      {
        showInput:data.showInput,
        myurl:data.myurl,
        type:data.type,
        modalIsOpen: true,
        tableLabelVal : labelValue
      })
  }

 	copyToClipboard(content) {

   // Create an auxiliary hidden input
   var aux = document.createElement("input");

   // Get the text from the element passed into the input
   aux.setAttribute("value", content);

   // Append the aux input to the body
   document.body.appendChild(aux);

   // Highlight the content
   aux.select();

   // Execute the copy command
   document.execCommand("copy");

   // Remove the input from the body
   document.body.removeChild(aux);

 }

  renderDataList(){
    var DataList = [];
      if(this.state.myurl){
      	var obj = this.state.myurl;
          for (var i = 0; i < obj.outputs.length; i++) {
            DataList.push(this.renderData(i, obj.outputs[i]));
          }
          return DataList;
      }
  }

  renderData(i, row){
      const marginBrown = "12px";
      var pathOverLength = false;

      if(row.url.length > 40){
      	pathOverLength = true;
    	}

      return(

          <tr key={i} style={{width:"100%", height:"32px"}}>
            <td style={{width:"16%", maxWidth:"122px"}}><span style={{marginLeft:marginBrown}} className="bodyContentStyle">{row.resolution}</span></td>
            <td style={{width:"14%",maxWidth:"106px"}}><span style={{marginLeft:marginBrown}} className="bodyContentStyle">{row.framerate} fps</span></td>
            <td style={{width:"12%",maxWidth:"9px"}}><span style={{marginLeft:marginBrown, marginRight:marginBrown}} className="bodyContentStyle">{row.vquality}{row.vbitrate}</span></td>
            <td style={{width:"58%" ,maxWidth:"439px"}}>
                <span style={{float:"left", marginLeft:marginBrown}} className="bodyContentStyle">File path :</span>
                <div style={{float:"left",height:"30px",maxWidth:"300px",overflow:'hidden', marginLeft:"5px"
            			,textOverflow:"ellipsis",display:'inline',direction:(pathOverLength)?'rtl':'ltr',whiteSpace: 'nowrap'}}>
            			<text style={{maxWidth:"300px"}}>{row.url}</text>
            		</div>
                <button className="i_area_16x16 i_area_btn_copy" style={{ marginLeft:marginBrown, marginRight:"5px",marginTop:"5px",float:"right"}} onClick={()=>this.copyToClipboard(row.url)}/>

            </td>
          </tr>
      )
  }

  render() {
		const marginGreen = "15px";
		const marginPurple = "20px";
		const marginBlue = "20px";
		const margineBlue = "15px";
		const marginPurpleBlue = "15px";
		const marginBrown = "12px";

		var obj ,jobID,  videoProfiletmp=null, audioBitratetmp=null, audioMsg, videoMsg, startTime, duration, task, labelVal, outputFolder ;
		if(this.state.myurl){
			 	obj = this.state.myurl;

			 	jobID = obj.cardid + " " + obj.cpu.cpuid;
			 	task = obj.type + " " + this.props.file_input;
			 	startTime = this.state.myurl.starttime;
			 	duration = this.state.myurl.input.duration;

		    videoProfiletmp=" / Profile-"+_.result(_.find(taskConfig.Video_Profile, {Video_Profile_value:obj.output.profileid}),'label');
		    videoProfiletmp= videoProfiletmp + " / level:"+_.result(_.find(taskConfig.Video_Level, {Video_Level_value:obj.output.levelid}),'label');
		    if(videoProfiletmp.indexOf("undefined")!=-1){
		      videoProfiletmp=null;
		    }

		    videoMsg=_.result(_.find(taskConfig.Video_Codec, {Video_Codec_value:obj.output.vcodecid}),'label');
		    if(obj.output.vcodecid == 1 || obj.output.vcodecid == 2){
		      videoMsg = _.result(_.find(taskConfig.Video_Codec, {Video_Codec_value:obj.output.vcodecid}),'label')+videoProfiletmp;
		    }

		    audioBitratetmp=" / "+_.result(_.find(taskConfig.Audio_BitRate, {Audio_BitRate_value:obj.output.abitrateid}),'label');
		    if(audioBitratetmp.indexOf("undefined")!=-1){
		      audioBitratetmp=null;
		    }

		    audioMsg=_.result(_.find(taskConfig.Audio_Codec, {Audio_Codec_value:obj.output.acodecid}),'label')+audioBitratetmp;
		    if(obj.output.vcodecid == 4){
		      audioMsg = "default";
		    }
		    labelVal = this.state.tableLabelVal;

		    if(obj.type == "file"){
			    var outputUrl = obj.outputs[0].url;
			    outputFolder = "File Output";

				    var position = outputUrl.lastIndexOf("/");
				     if(position > 2){
				       outputFolder = outputUrl.substring(0, position);
				     }
				  }else{
			  	outputFolder = "N/A";
			  }


		}


		const box1=["Job ID:","Start Time:","Duration:"];
	  const box2=[jobID ,startTime, duration];
	  const box3=["Output folder:","Video Settings:","Audio Settings:"];
	  const box4=[outputFolder, videoMsg, audioMsg];

    return (
      <div>
        <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={resetModalStyle}
            contentLabel="Example Modal"
        >
          <div style={{width:"100%",height:"100%"}}>
            <div className="popHeader">
                  <span className="f_medium">Transcoding Summary</span>
                  <a className="i_closeBtn" onClick={this.closeModal} />
            </div>
            <div className="titleHr"></div>
            <div style={{float:"left", width:'35px'}}>
            </div>


            <div style={{float:"left", width:'100%',paddingLeft:"35px",paddingRight:"35px"}}>


            		<div style={{width:"100%", marginTop:marginBlue,marginBottom:marginBlue}}>


            		  <div style={{height:'24px',marginBottom:marginGreen}}>
	                   <div className="bodyContentStyle" style={{float:"left", minWidth:"140px"}}>Task :</div>
	                   <div className="bodyContentStyle" style={{float:"left"}}>{task}</div>
	                   <div style={{clear:"left"}}></div>
              	  </div>


		              <div style={{float:"left", width:'50%'}}>
		                <div style={{float:"left",width:'140px'}}>
		                  <div style={{width:'100%'}}>
		                    <div class="bodyContentStyle" style={{height:'24px',marginBottom:marginGreen}}>{box1[0]}</div>
		                    <div class="bodyContentStyle" style={{height:'24px',marginBottom:marginGreen}}>{box1[1]}</div>
		                    <div class="bodyContentStyle" style={{height:'24px'}}>{box1[2]}</div>
		                  </div>
		                </div>
		                <div style={{float:"left"}}>
		                  <div style={{width:'100%'}}>
		                    <div class="bodyContentStyle" style={{height:'24px',marginBottom:marginGreen}}>{box2[0]}</div>
		                    <div class="bodyContentStyle" style={{height:'24px',marginBottom:marginGreen}}>{box2[1]}</div>
		                    <div class="bodyContentStyle" style={{height:'24px'}}>{box2[2]}</div>
		                  </div>
		                </div>
		                <div style={{clear:"left"}}></div>
		              </div>

		              <div style={{float:"left", width:'50%'}}>
		                <div style={{float:"left",width:'140px'}}>
		                  <div style={{width:'100%'}}>
		                    <div class="bodyContentStyle" style={{height:'24px',marginBottom:marginGreen}}>{box3[0]}</div>
		                    <div class="bodyContentStyle" style={{height:'24px',marginBottom:marginGreen}}>{box3[1]}</div>
		                    <div class="bodyContentStyle" style={{height:'24px'}}>{box3[2]}</div>
		                  </div>
		                </div>
		                <div style={{float:"left",width:'calc(100% - 140px)'}}>
		                  <div style={{width:'100%'}}>
		                    <div class="bodyContentStyle" style={{height:'24px',marginBottom:marginGreen,textOverflow:"ellipsis",overflow:'hidden',direction:'ltr',whiteSpace: 'nowrap'}}>{box4[0]}</div>
		                    <div class="bodyContentStyle" style={{height:'24px',marginBottom:marginGreen}}>{box4[1]}</div>
		                    <div class="bodyContentStyle" style={{height:'24px',marginBottom:marginGreen}}>{box4[2]}</div>
		                  </div>
		                </div>
		                <div style={{clear:"left"}}></div>
		              </div>
		              <div style={{clear:"left"}}></div>
		            </div>

		            <div style={{width:'100%'}}>
			              <table style={{width:'100%'}}>
			                <thead id="thead_1" style={{width:"100%"}}>
			                  <tr style={{width:"100%", height: "32px"}}><th colSpan="4" id="css_th_b"><span style={{marginLeft:marginBrown}}>Output</span></th></tr>
			                  <tr style={{width:"100%"}}>
			                    <th id="css_th_ab" style={{width:"16%"}}><span style={{marginLeft:marginBrown}}>Resolution (px)</span></th>
			                    <th id="css_th_ab" style={{width:"14%"}}><span style={{marginRight:marginBrown, float: "right"}}>FramesRate</span></th>
			                    <th id="css_th_ab" style={{width:"12%"}}><span style={{marginRight:marginBrown, float: "right"}}>{labelVal}</span></th>
			                    <th id="css_th_ab" style={{width:"58%"}}><span style={{marginLeft:marginBrown}}>Output</span></th>
			                  </tr>
			                </thead>
			                <tbody id="tbody_1">
			                  {this.renderDataList()}
			                </tbody>
			              </table>
		            </div>
	          </div>

            <button style={{float:"right", marginTop:marginBlue, marginRight: "35px"}} className="button_commit button_no" onClick={()=> this.closeModal()}>CLOSE</button>
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
    backgroundColor   : 'rgba(0, 0, 0, 0.5)',
    zIndex: 100
  }
  const content = {
    border: '0',
    borderRadius: '4px',
    bottom: 'auto',
    minHeight: '505px',
    left: '50%',
    padding: '0rem',
    overflow: 'false',
    position: 'fixed',
    right: 'auto',
    top: '50%',
    transform: 'translate(-50%,-50%)',

    width:'830px',
    background:"#f6f8f9"

  }

  return {overlay, content}
})()
