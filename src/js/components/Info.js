import React from "react";
import Modal from 'react-modal';
import '../css/normal.css';
export default class Info extends React.Component {
  constructor(props){
    super(props);
    var myTitle="title";
    var myContent="content";
    var myType = this.props.type;//info, warning, help, error
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
    this.updateContent = this.updateContent.bind(this);
  }
    updateContent(type,title,content) {
    	if (content.length > 200) {
    		title = title.substr(0,200);
        	content = content.substr(0,200);
        	content = content+"...";
    	}
      this.setState({type:type,title: title,content:content});
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
    var mImg ='../../../img/function_info.png';
    var imageType;

    //info, warning, help, error
    if(this.state.type == "warning"){
      imageType = "i_baseStyle i_warning";
    } else if(this.state.type == "help"){
      imageType = "i_baseStyle i_help";
    } else if(this.state.type == "error"){
      imageType = "i_baseStyle i_error";
    }else{
      imageType = "i_baseStyle i_info1";
    }

    return (
      <div style={this.props.style, {visibility:"hidden",backgroundColor: "#f6f8f9",position: "relative"}}>
        <img style={{cursor:"pointer"}} src={ mImg } width="20px" height="20px" onClick={this.openModal}/>
          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={resetModalStyle}
            contentLabel="Example Modal"
          >
            <div style={{width:"100%", height:"100%"}}>
              <div className={"messageBoxContainer"}>
                <a className="i_closeBtn" onClick={this.closeModal} />
                <div style={{float:"left"}}>
                  <div className = {imageType}/>
                </div>
                <div style={{float:"left", marginTop:"8px",color:"#2f2f2f",marginLeft:"16px", marginRight:"16px",minHeight:"34px"}}>
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
                <div style={{float:"right",paddingLeft:"8px",paddingRight:"24px"}}>
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
const resetModalStyle = (() => {
  // Styles
  const initial = null

  const overlay = {
    zIndex: 100
  }
  const content = {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    padding                : '0 0 0 0',
    transform             : 'translate(-50%, -50%)',
    width                 : "340px"
  }

  return {overlay, content}
})()
