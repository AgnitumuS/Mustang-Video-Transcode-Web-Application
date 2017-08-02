/*
  Modify By: Nayana
  Date: 16 June 2017
  Description : URL View is change into dynamicaly generated table
*/

import React from "react";
import ReactDOM from 'react-dom';
import Popup from 'react-popup';
import 'react-select/dist/react-select.css';
import Modal from 'react-modal';
import MyPopup from './PopupView';
import { appConfig,routeResp } from '../config';
import { get_jobInfo_byJobId} from '../api';
import '../css/pop.css';
import '../css/normal.css';
import '../css/icon.css';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    padding                : '0 0 0 0',
    transform             : 'translate(-50%, -50%)'
  }
};
export default class MyModal extends React.Component {
  constructor(props) {
   super(props);
   this.state = {
     msg:props.para,
      modalIsOpen: false,
      showInput:"STREAM",
      showVRcheck:true,
      isVR:false,
      cardSelect:this.props.cardSelect,
      cpuSelect:this.props.cpuSelect,
   };
    this.msg_onChange = this.msg_onChange.bind(this);
    this.myfunc = this.myfunc.bind(this);
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleChangeChk = this.handleChangeChk.bind(this);
    this.copyToClipboard = this.copyToClipboard.bind(this);

 }

 openModal() {
   get_jobInfo_byJobId(this.props.Job_Id_no,this.myfunc);

  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    //this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false,isVR:false});
  }

  myfunc(resp){

    if(resp[routeResp.Result] == routeResp.FailResult){
      console.log("Popup myfunc fail");
      return;
    }
    var data = resp[routeResp.Data];

    // console.log("Popup myfunc data "+JSON.stringify(data));

    this.setState(
      {
        showInput:data.showInput,
        myurl:data.myurl,
        type:data.type,
        modalIsOpen: true
      })
  }

  msg_onChange(val) {this.setState({msg : val}) }

  handleChangeChk(){
    var chkbox=this.state.isVR;
    this.setState({
      isVR:!chkbox,
    });
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
          for (var i = 0; i < this.state.myurl.length; i++) {
            DataList.push(this.renderData(i, this.state.myurl[i]));
          }
          return DataList;
      }
  }

  renderData(i, row){
      var style = "" ;
      var result = i % 2;

      if(result == 0)
        style = "cell1";
      else
        style = "cell2";

        //---UI
        const marginYellow="10px";
      return(
          <tr key={i} className= {style}>
            <td>{row.resolution} &nbsp;  px</td>
            <td className = "alignRight">{row.framerate} &nbsp; fps</td>
            <td className = "alignRight">{row.vquality}</td>
            <td>
                <span style={{float:"left"}} className="spanUrl"> &nbsp; {row.url} </span> &nbsp;
                <button className="i_area_16x16 i_area_btn_copy" style={{float:"right", marginLeft:marginYellow , marginRight:marginYellow}}  onClick={()=>this.copyToClipboard(row.url)}/>
                <div style={{clear:"both"}}></div>
            </td>
            <td>
                <MyPopup type={this.state.type} url={row.url} isVR={this.state.isVR}/>
            </td>
          </tr>
      )
  }


  render() {
    const title = ["Resolution","Frameset","QP Value","URL","Open "];
    var TitleList = [];

    return (
      <div>
        <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Example Modal"
        >
          <div className="popupContainer">
            <div className="popHeader">
                  <span className="f_medium">{this.state.showInput}</span>
                  <a className="i_closeBtn" onClick={this.closeModal} />
            </div>
            <div className="titleHr"></div>

            <div className="bodyStyle">
              <div className="bodyHeader">
                <span> You can copy URL to other player or directly open it.</span>
              </div>

              <div className="bodyContent">
                <table className = "tableBorder">
                      <thead>
                         <tr >
                           <th> Resolution </th>
                           <th> Frameset </th>
                           <th> &nbsp; QP Value &nbsp;</th>
                           <th> URL </th>
                           <th> &nbsp; Open &nbsp;</th>
                         </tr>
                     </thead>
                     <tbody>
                        {this.renderDataList()}
                     </tbody>
                </table>
              </div>
            </div>
            <div className="popFooter">
                  <button class="button_commit button_no" onClick={this.closeModal}>Cancel</button>
            </div>
          </div>
        </Modal>
      </div>

    );
  }

}
