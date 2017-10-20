
import React from "react";
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

import Process from "../pages/Tables";
import DisplayCardInfo from "../pages/DisplayCardInfo";
const customStyles = {
  content : {
    top                   : '30%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};
export default class MyModalView extends React.Component {
  constructor(props) {
   super(props);
   this.state = {
      modalIsOpen: false,
      titl:null
   };

  this.openModal = this.openModal.bind(this);
      this.afterOpenModal = this.afterOpenModal.bind(this);
      this.closeModal = this.closeModal.bind(this);
 }
shouldComponentUpdate(nextProps,nextState){

  if(this.state.modalIsOpen==true){
    if(this.props.isVR != nextProps.isVR){
      return true;
    }
    return false;
  }
  return true;
}

 openModal() {
  this.setState({modalIsOpen: true});

  }

  afterOpenModal() {
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {
    return (
      <div>
          <button class="btn btn-sm btn-primary" onClick={this.openModal}>Process</button>
          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <DisplayCardInfo cardSelect={0} cpuSelect={1}/>
            <Process />
            <br />
            <button bsSize="xsmall" class="btn btn-sm btn-primary"  onClick={this.closeModal}>close</button>
          </Modal>
      </div>
    );
  }
}
