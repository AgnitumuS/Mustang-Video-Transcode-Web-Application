import React from "react";
import Videoinfo from "../layout/Videoinfo";
import {get_file_list,get_file_info} from '../../api';
import {taskConfig,routeResp} from '../../config';
//popup
import Modal from 'react-modal';
import '../../css/normal.css';
import '../../css/icon.css';
export default class Settings_step1_component extends React.Component {

  constructor(props){
    super(props);
    this.state = ({
      video:"",
    	bitrate:"",
    	audio:"",
    	fps:"",
    	audiorate:"",
    	fsize:"",
    	Duration:"",
    	Resolution:"",
    	value:null,
      files:[],
      folders:[],
      mDirPath:"",
      mFileName:""
    })
    this.getFileList_callback=this.getFileList_callback.bind(this);
    this.getFileInfo_callback=this.getFileInfo_callback.bind(this);
    this.getFileInfo=this.getFileInfo.bind(this);
    this.getFileInfo_callback=this.getFileInfo_callback.bind(this);
    this.getFileInfo_onlyinfo_callback=this.getFileInfo_onlyinfo_callback.bind(this);
    //popup
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.submitModal = this.submitModal.bind(this);
    this.back = this.back.bind(this);
    this.gohome = this.gohome.bind(this);
    this.changefile = this.changefile.bind(this);
    this.changefolder =this.changefolder.bind(this);

  }

  /* File */
  back() {
    var req={stage:"back"};
    this.getFileList(req);
  }
  gohome() {
    var req={stage:"home"};
    this.getFileList(req);
  }
  changefile(value) {
    this.getFileInfo(value.x);
	  this.submitModal(value.x);
  }

  changefolder(value) {
	  var base = this.state.mDirPath;
	  base = base + value.x;
    var req={stage:"next",dirName:value.x};
    this.getFileList(req);
  }

    getFileList(req){
      get_file_list(req,this.getFileList_callback)
    }
    getFileList_callback(resp){
      if(resp[routeResp.Result] == routeResp.FailResult){
        console.log("getFileList_callback fail");
        return;
      }

      var tmpFilelist = resp[routeResp.Data].File;
      var tmpDirlist = resp[routeResp.Data].Dir;
      var path = resp[routeResp.Data].DirPath;
      this.setState({
          files:tmpFilelist,
          folders:tmpDirlist,
          mDirPath:path,
      });


    }
    getFileInfo(filename){
      get_file_info(filename,this.getFileInfo_callback)
    }
    getFileInfo_callback(resp){
      if(resp[routeResp.Result] == routeResp.FailResult){
        console.log("getFileInfo_callback fail");
        return;
      }
      var data = resp[routeResp.Data];
      this.setState({
        video:data.video,
        bitrate:data.bitrate,
        audio:data.audio,
        fps:data.fps,
        audiorate:data.audiorate,
        fsize:data.fsize,
        Duration:data.Duration,
        Resolution:data.Resolution,
      });

      var wholepath=this.state.mDirPath+"/"+this.state.mFileName;
      if(this.state.mDirPath.length > 1){
        wholepath=this.state.mDirPath+"/"+this.state.mFileName;
      }
      else if(this.state.mFileName.length >1){
        wholepath=this.state.mDirPath+this.state.mFileName;
      }
      else{
        return;
      }

      this.props.callbackParent(wholepath,data);
    }

    //pop
    openModal() {
      if(this.state.mDirPath.length==0){
        var req={stage:"first"};
        this.getFileList(req);
      }
      else{
        var req={stage:"setDirPath",dirPath:this.state.mDirPath};
        this.getFileList(req);
      }
      this.setState({modalIsOpen: true});
    }
    afterOpenModal() {
    }
    closeModal() {
      this.setState({
        modalIsOpen: false
      });
    }
    submitModal(filename){
      this.setState({mFileName:filename})
      this.closeModal();
    }
  componentWillMount(){
    if(this.props.mFile_value != null){
      if(this.props.mFile_value.indexOf("/")!=-1){
        //filename is full path
        var tmp = this.props.mFile_value;
        var n = tmp.lastIndexOf("/");
        if(n > 2){
          var path = tmp.substring(0, n);
          var filename = tmp.substring(n+1, tmp.length);
          this.setState({
            mDirPath:path,
            mFileName:filename
          })
        }

        get_file_info(this.props.mFile_value,this.getFileInfo_onlyinfo_callback);
      }
    }
  }

  getFileInfo_onlyinfo_callback(resp){
    if(resp[routeResp.Result] == routeResp.FailResult){
      console.log("getFileInfo_callback fail");
      this.setState({
        mDirPath:"",
        mFileName:""
      });
      return;
    }
    var data = resp[routeResp.Data];
    this.setState({
      video:data.video,
      bitrate:data.bitrate,
      audio:data.audio,
      fps:data.fps,
      audiorate:data.audiorate,
      fsize:data.fsize,
      Duration:data.Duration,
      Resolution:data.Resolution,
    });
  }

  /* 加的中止點 */
  render() {
	  const files = this.state.files;
	  const folders = this.state.folders;
	  var FileList = [];
	  FileList = files.map((x,i)=><div key={"file"+i}  style={{cursor:"pointer"}} onClick={() => this.changefile({x})}><button id={"file"+i} className="i_area_24x24 i_task_f2f_complete"/>{x}</div>);
	  var FolderList = [];
	  FolderList = folders.map((x,i)=><div key={"folder"+i} style={{cursor:"pointer"}} onDoubleClick={() => this.changefolder({x})}><button id={"folder"+i} className="i_area_24x24 i_area_folderopen"/>{x}</div>);
    //--file name , whole path
    var pathOverLength = false;
    var wholepathtmp=this.state.mDirPath+"/"+this.state.mFileName;
    if(this.state.mDirPath.length > 1){
      wholepathtmp=this.state.mDirPath+"/"+this.state.mFileName;
    }
    else if(this.state.mFileName.length >1){
      wholepathtmp=this.state.mDirPath+this.state.mFileName;
    }
    else{
      wholepathtmp="Path";
    }
    var wholepath = wholepathtmp;
    if(wholepath.length > 55){
      pathOverLength = true;
      wholepath="FILEPATHFORFLOWSHOW "+wholepathtmp;
    }

    //---UI
    const marginBlue="20px";
    const marginYellow="10px";
    const marginGreenLight="15px";
    const marginPurple="30px";

    return (
      <div >
        <div style={{float:"left",width:"115px", marginRight:marginYellow}}>Select File:</div>
      <div style={{float:"left",width:"400px",borderStyle:'solid',marginBottom: '1em',overflow:'hidden',textOverflow:"ellipsis",display:'inline',direction:(pathOverLength)?'rtl':'ltr',whiteSpace: 'nowrap'}}><text>{wholepath}</text></div>
        <div style={{float:"left",marginLeft:marginYellow}}><button className="i_area_24x24 i_area_folderopen" onClick={this.openModal} /></div>
        <div style={{clear:"both"}}></div>
        <div style={{marginTop:marginBlue}}></div>
        <div style={{float:"left", marginLeft:"125px"}}>
          <Videoinfo
            video={this.state.video}
            fps={this.state.fps}
            audio={this.state.audio}
            audiorate={this.state.audiorate}
            bitrate={this.state.bitrate}
            fsize={this.state.fsize}
            Duration={this.state.Duration}
            Resolution={this.state.Resolution}/>
        </div>
        <div style={{clear:"both"}}></div>
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
              <div class="col-xs-1 col-sm-1" style={Styles.div1}></div>
              <div class="col-xs-10 col-sm-10" style={Styles.div2}>
                <br />
                <div>
                  <div style={{display: 'inline'}}><input type="text" width="500px" value={this.state.mDirPath} /></div>
                  <div style={{marginLeft:"12px",display: 'inline',cursor: "pointer"}} onClick={this.back}>Back</div>
                  <div style={{marginLeft:"12px",display: 'inline',cursor: "pointer"}} onClick={this.gohome}>Home</div>
                </div>
                <br />
                <div className="row" style={{maxHeight: "300px", overflow: 'auto'}}>
                  {FolderList}
                  {FileList}
                </div>
              </div>
            </div>
            <div style={{marginLeft:"35px",marginBottom:"24px",marginTop:"24px"}}>
              <button class="button_commit button_no" onClick={()=> this.closeModal()}>Cancel</button>
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
	        minHeight: '40rem',
	        left: '50%',
	        padding: '0rem',
	        overflow: 'false',
	        position: 'fixed',
	        right: 'auto',
	        top: '50%',
	        transform: 'translate(-50%,-50%)',
	        minWidth: '20rem',
	        width: '80%',
	        maxWidth: '50rem',
	      }

	  return {overlay, content}
	})()

	const Styles={
	  divcontent:{
	    paddingLeft:'15px',
	    paddingRight:'15px'
	  },
	  div1:{
		  paddingLeft:'0px',
	  },
	  div2:{
		  paddingLeft:'0px',
		  fontSize: 15,
	  },
	  div3:{
		  paddingLeft:'15px',
	  }
	}
