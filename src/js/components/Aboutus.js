import React from "react";
import 'react-select/dist/react-select.css';
import Modal from 'react-modal';
import '../css/pop.css';
import '../css/icon.css';
const titleString = "About";
import {cardInfo } from '../config';

const IEIURL="www.ieiworld.com";
const QNAPURL="www.qnap.com";

export default class MyModal extends React.Component {
  constructor(props) {
   super(props);
   var version = "unknown"
   if(cardInfo.hostVersion != null){
     version = cardInfo.hostVersion;
   }
   this.state = {
      modalIsOpen: false,
      version:version
   };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
 }
   urlOpen(uurl) {
      var urlStr = "https://"+uurl;
      window.open(urlStr, "_blank", "toolbar=no,scrollbars=no,resizable=no,top=300,left=300,width=800,height=600");
   }
	openModal() {
		this.setState({modalIsOpen: true});
	}
	closeModal() {
		this.setState({modalIsOpen: false});
	}

  render() {
    const marginOrange="35px";
    return (
      <div style={{width:"100%",height:"100%"}}>
        <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={resetModalStyle}
            contentLabel="Example Modal"
        >
          <div style={{width:"100%",height:"100%"}}>
            <div className="popHeader">
                  <span className="f_medium">{titleString}</span>
                  <a className="i_closeBtn" onClick={this.closeModal} />
            </div>
            <div className="titleHr"></div>
            <div style={bodyContentStyle}>
              <div style={{width:'100%',paddingLeft:"10px",paddingRight:"10px"}}>
                <div style={{marginBottom:"8px",height:"210px",width:'100%'}}>
                  <div style={{marginTop:"20px",marginBottom:"8px",width:'100%'}} className="i_about_area i_about_mvt"></div>
                  <div style={{textAlign: 'center'}}>MVT Host</div>
                  <div style={{textAlign: 'center'}}>Version {this.state.version}</div>
                  <div style={{marginTop:"20px",marginBottom:"20px",width:'100%'}} className="i_about_area i_about_ieiqnap"></div>
                  <div>
                    <div className="i_about_area i_about_iei"></div>
                    <span> <a className="urlStyle" style={{verticalAlign:"middle",cursor:"pointer"}} onClick={x=>this.urlOpen(IEIURL)} >{IEIURL}</a></span>
                  </div>
                  <div style={{fontSize:"12px"}}>@2016 IEI Integration Corp. All Rights Reserved.</div>
                  <div>
                    <div className="i_about_area i_about_qnap"></div>
                    <span> <a className="urlStyle" style={{verticalAlign:"middle",cursor:"pointer"}} onClick={x=>this.urlOpen(QNAPURL)} >{QNAPURL}</a></span>
                  </div>
                  <div style={{fontSize:"12px"}}>@2016 QNAP Integration Corp. All Rights Reserved.</div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
const bodyContentStyle=
{
    fontFamily: 'Roboto-M',
    fontSize: '14px',
    color: '#131313',
    width              : '100%',
    height             : '100%'

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
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    padding               : '0 0 0 0',
    minWidth              : '350px',
    minHeight             : '550px',
    backgroundColor       : '#FFFFFF',
    transform             : 'translate(-50%, -50%)'
  }

  return {overlay, content}
})()
