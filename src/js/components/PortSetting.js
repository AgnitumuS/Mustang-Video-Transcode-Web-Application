import React from 'react'
import { cardInfo,routeResp } from '../config';
import Modal from 'react-modal';
import '../css/table.css';
import JobList from '../components/PortSelect'
import InLineEdit from "../components/layout/InLineEdit";
import {update_cardInfo_port_byCardId_byCPUId} from '../api';
import { get_cardInfo} from '../api';
import '../css/pop.css';
import '../css/portsetting.css';
import Info from './Info';
const titleString = "Port Settings";
export default class PortSetting extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      cardId:this.props.cardid,
      cpuId:this.props.cpuid
    }
     //this bind area
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.renderProcessJobList = this.renderProcessJobList.bind(this);
    this.updatePort_callback = this.updatePort_callback.bind(this);
  }

  HandlerResponse(respResult,respValue,respType){
    if(respResult == true){
      this.updatePort(respType, respValue);
    }
  }

  updatePort(portType, portNo){
     var req={type:portType,value:portNo};
     update_cardInfo_port_byCardId_byCPUId(req,this.state.cardId,this.state.cpuId,this.updatePort_callback);
  }

  updatePort_callback(resp){
    if(resp[routeResp.Result]==routeResp.SuccessResult){
      this.updateData();
    }
    else if(resp[routeResp.Result]==routeResp.WarningResult){
      this.refs.FailMsg.updateContent("warning","modify port",resp[routeResp.Data]);
      this.refs.FailMsg.openModal();
    }
    else if(resp[routeResp.Result]==routeResp.FailResult){
      this.refs.FailMsg.updateContent("error","modify port",resp[routeResp.Data]);
      this.refs.FailMsg.openModal();
    }
  }

  updateData(){
      get_cardInfo(this.props.update_callback);
  }


  openModal() {
    this.setState({modalIsOpen: true});
  }
  afterOpenModal() {
  }
  closeModal() {
	  this.setState({
        modalIsOpen: false
      });
  }

  renderProcessJobList(){
    var Process_Job_List1=[];
    const contentData = cardInfo.cards;
    //rebuild data
    var length = contentData.length;
    var card1id = [];
    var card2id = [];
    var cpu1id = [];
    var cpu2id = [];
    var qts1port = [];
    var qts2port = [];
    var icecast1port = [];
    var icecast2port = [];
    var rtmp1port = [];
    var rtmp2port = [];
    var http1port = [];
    var http2port = [];
    for (var i=0;i<length;i++) {
    	card1id[i] = contentData[i].id;
    	card2id[i] = contentData[i].id;
    	cpu1id[i] = contentData[i].cpuinfo1.id+"("+contentData[i].cpuinfo1.info.qtsName+")";
    	cpu2id[i] = contentData[i].cpuinfo2.id+"("+contentData[i].cpuinfo2.info.qtsName+")";
    	qts1port[i] = contentData[i].cpuinfo1.info.qtsPort;
    	qts2port[i] = contentData[i].cpuinfo2.info.qtsPort;
    	icecast1port[i] = contentData[i].cpuinfo1.info.icecastPort;
    	icecast2port[i] = contentData[i].cpuinfo2.info.icecastPort;
    	rtmp1port[i] = contentData[i].cpuinfo1.info.rtmpPort;
    	rtmp2port[i] = contentData[i].cpuinfo2.info.rtmpPort;
    	http1port[i] = contentData[i].cpuinfo1.info.httpPort;
    	http2port[i] = contentData[i].cpuinfo2.info.httpPort;
    }
    card1id = card1id.concat(card2id);
    cpu1id = cpu1id.concat(cpu2id);
    qts1port = qts1port.concat(qts2port);
    icecast1port = icecast1port.concat(icecast2port);
    rtmp1port = rtmp1port.concat(rtmp2port);
    http1port = http1port.concat(http2port);

    Process_Job_List1 = card1id.map((x,i) => <JobList x={x} key={i} cpu1id={cpu1id[i]} qts1port={qts1port[i]} icecast1port={icecast1port[i]} rtmp1port={rtmp1port[i]} http1port={http1port[i]}/>);

    return Process_Job_List1;

    }



render() {
  const box1=["ID:","CPU ID:","QTS Name:","IP Address:"];
  const box2=[this.props.cardid,this.props.cpuid,this.props.qtsName,this.props.ip];
  const box3=["QTS-Lite Port:","Ice Cast Port:","RTMP Port:","HTTP Port:"];
  const box3_name=["qtsPort","icecastPort","rtmpPort","httpPort"];
  const box4=[this.props.qtsport,this.props.icecastport,this.props.rtmpport,this.props.httpport];
    //UI

    const marginBlue="20px";
    const marginPink="8px";
    const marginGreen="15px";
    const marginPurpleBlue="6px";
    const marginPurple="10px";
  return (
    <div>
      <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={resetModalStyle}
          contentLabel="Example Modal"
          shouldCloseOnOverlayClick={false}
      >
        <div style={{width:"100%",height:"100%"}}>
          <div className="popHeader">
                <span className="f_medium">{titleString}</span>
                <a className="i_closeBtn" onClick={this.closeModal} />
          </div>
          <div className="titleHr"></div>
          <div style={{float:"left", width:'35px'}}>
          </div>
          <div style={{float:"left", width:'100%',paddingLeft:"35px",paddingRight:"35px"}}>
            <div style={{fontFamily: 'Roboto-R',fontSize: '13px',color: '#131313',marginTop:marginBlue,marginBottom:marginPink}}>Setup a unique port for each service of Mustang-200.</div>
            <div style={{fontFamily: 'Roboto-R',fontSize: '13px',color: '#131313',marginBottom:marginGreen}}>To check the ports that are assigned to other cards, see the Port Information below.</div>
            <div style={{width:"100%"}}>
              <div style={{float:"left", width:'50%'}}>
                <div style={{float:"left",width:'140px'}}>
                  <div class="bodyContentStyle14" style={{width:'100%'}}>
                    <div style={{marginBottom:marginPurpleBlue}}>{box1[0]}</div>
                    <div style={{marginBottom:marginPurpleBlue}}>{box1[1]}</div>
                    <div style={{marginBottom:marginPurpleBlue}}>{box1[2]}</div>
                    <div style={{marginBottom:marginPurple}}>{box1[3]}</div>
                  </div>
                </div>
                <div style={{float:"left"}}>
                  <div class="bodyContentStyle13" style={{width:'100%'}}>
                    <div style={{marginBottom:marginPurpleBlue}}>{box2[0]}</div>
                    <div style={{marginBottom:marginPurpleBlue}}>{box2[1]}</div>
                    <div style={{marginBottom:marginPurpleBlue}}>{box2[2]}</div>
                    <div style={{marginBottom:marginPurple}}>{box2[3]}</div>
                  </div>
                </div>
                <div style={{clear:"left"}}></div>
              </div>
              <div style={{float:"left", width:'50%'}}>
                <div style={{float:"left",width:'140px'}}>
                  <div class="bodyContentStyle14" style={{width:'100%'}}>
                    <div style={{marginBottom:marginPurpleBlue}}>{box3[0]}</div>
                    <div style={{marginBottom:marginPurpleBlue}}>{box3[1]}</div>
                    <div style={{marginBottom:marginPurpleBlue}}>{box3[2]}</div>
                    <div style={{marginBottom:marginPurple}}>{box3[3]}</div>
                  </div>
                </div>
                <div style={{float:"left"}}>
                  <div class="bodyContentStyle13" style={{width:'100%'}}>
                    <div style={{marginBottom:marginPurpleBlue}}><InLineEdit inLineValue={box4[0]} handleResponse={this.HandlerResponse.bind(this)} controlName={box3_name[0]}/></div>
                    <div style={{marginBottom:marginPurpleBlue}}><InLineEdit inLineValue={box4[1]} handleResponse={this.HandlerResponse.bind(this)} controlName={box3_name[1]}/></div>
                    <div style={{marginBottom:marginPurpleBlue}}><InLineEdit inLineValue={box4[2]} handleResponse={this.HandlerResponse.bind(this)} controlName={box3_name[2]}/></div>
                    <div style={{marginBottom:marginPurple}}><InLineEdit inLineValue={box4[3]} handleResponse={this.HandlerResponse.bind(this)} controlName={box3_name[3]}/></div>
                  </div>
                </div>
                <div style={{clear:"left"}}></div>
              </div>
              <div style={{clear:"left"}}></div>
            </div>
            <div style={bodyContentStyle2}>Port Information</div>
            <div style={{width:'100%',height:'128px'}}>
              <table className="table-fixed" style={{width:'100%',height:"100%"}}>
                <thead className="thead-fixed">
                  <tr className="tr-fixed">
                    <th style={{width:"10%"}}>Card ID</th>
                    <th style={{width:"26%"}}>CPUID (QTS Name)</th>
                    <th style={{width:"16%"}}>QTS-Lite Port</th>
                    <th style={{width:"16%"}}>Ice Cast Port</th>
                    <th style={{width:"16%"}}>RTMP Port</th>
                    <th style={{width:"16%"}}>HTTP Port</th>
                  </tr>
                </thead>
                <tbody className="tbody-fixed tbody-fixed-height-portList">
                  {this.renderProcessJobList()}
                </tbody>
              </table>
            </div>
            <div style={{width:"100%"}} >
              <button style={{float:"right",marginRight:'35px',marginTop:marginBlue,marginBottom:'24px'}} className="button_commit button_no" onClick={()=> this.closeModal()}>CLOSE</button>
            </div>
          </div>
          <div style={{float:"right", width:'35px'}}>
          </div>
        </div>
        <Info ref="FailMsg" type="error" title="" content=""/>
      </Modal>
    </div>
  );}
}

const bodyContentStyle2=
{
    fontFamily: 'Roboto-M',
    fontSize: '14px',
    color: '#000000',
    width              : '100%',
    height             : '32px',
    verticalAlign:"middle"
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
	  const content= {
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
	        width:'830px'
	      }

	  return {overlay, content}
	})()
