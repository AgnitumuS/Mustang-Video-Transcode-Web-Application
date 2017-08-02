
import React from "react";
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import View from '../pages/View';
import '../css/style.css';
import '../css/pop.css';
import '../css/normal.css';

const customStyles = {
  content : {
    top                   : '50%',
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
  //  this.post_api(this.props.Job_Id_no);
  this.setState({modalIsOpen: true});

  }

  afterOpenModal() {
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {
    const urlFolderOpen = '/img/open_n.png';

    return (
      <div>
        <div style={{cursor:"pointer"}}>
            &nbsp; <img src={urlFolderOpen} alt width={"16px"} height={"16px"} onClick={this.openModal} />
        </div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div >
            <div className="popHeader">
                  <span className="f_medium">Video Display</span>
                  <a className="i_closeBtn" onClick={this.closeModal} />
            </div>
            <div className="titleHr"></div>
            <div className="bodyStyle">
                <div className="bodyHeader">
                  <span> You can copy URL to other player or directly open it.</span>
                </div>

               <div className="bodyContent">
                  <View playerType={this.props.type} Url={this.props.url} isVR={this.props.isVR}/>
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
