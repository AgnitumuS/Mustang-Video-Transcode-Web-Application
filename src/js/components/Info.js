import React from "react";
import Modal from 'react-modal';
import '../css/normal.css';
export default class Info extends React.Component {
  constructor(props){
    super(props);
    var myTitle="title";
    var myContent="content";
    var myType = this.props.type;//info, warning, help, error
    if(myType == undefined){
      myType = "info";
    }
    if(props.title != undefined){
      myTitle=props.title;
    }
    if(props.content != undefined){
      myContent=props.content;
    }
    this.state = {
      title:myTitle,
      content:myContent,
      type:myType
    };
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

    openModal() {
      this.setState({modalIsOpen: true});
    }

    afterOpenModal() {
    }

    closeModal() {
      this.setState({modalIsOpen: false});
    }

  render() {
    const mImg ='../../../img/function_info.png';
    const customStyles = {
      content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        padding                : '0 0 0 0',
        transform             : 'translate(-50%, -50%)',
        width                 : "340px"
      }
    };
    return (
      <div style={this.props.style, {visibility:"hidden",backgroundColor: "#f6f8f9",position: "relative"}}>
        <img style={{cursor:"pointer"}} src={ mImg } width="20px" height="20px" onClick={this.openModal}/>
          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <div>
              <div style={{marginTop:"24px",marginLeft:"24px"}}>
                <div style={{float:"left"}}>
                  <img src={ mImg } width="32px" height="32px"/>
                </div>
                <div style={{float:"left", marginTop:"8px",color:"#2f2f2f",marginLeft:"16px", marginRight:"16px"}}>
                  <div style={{fontWeight:"bold",minHeight:"14px"}}>
                    {this.state.title}
                  </div>
                  <div style={{marginTop:"8px",minHeight:"14px"}}>
                    {this.state.content}
                  </div>
                </div>

                <div style={{clear:"both"}}></div>
              </div>
              <div style={{marginTop:"20px",marginBottom:"24px"}}>
                <div style={{float:"right",marginLeft:"8px",marginRight:"24px"}}>
                  <button class="button_commit button_no" onClick={this.closeModal}>NO</button>
                </div>
                <div style={{float:"right"}}>
                  <button class="button_commit button_yes" onClick={this.closeModal}>YES</button>
                </div>
                <div style={{clear:"both"}}></div>
              </div>
            </div>
          </Modal>
     </div>
    );
  }
}
