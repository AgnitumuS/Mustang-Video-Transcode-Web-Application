import React from "react";
import '../../css/icon.css';
import '../../css/style.css';
import '../../css/overview.css';

export default class InLineEdit extends React.Component
{
  
  constructor(props) {
    super(props);
    
    this.state = {
      hoverEdit: false,
      editClick: false,
      displayFlag: false,
      editedValue: null,
      inlineValue: this.props.inLineValue
    };

    this.urlOpen = this.urlOpen.bind(this);
    this.onHoverEdit = this.onHoverEdit.bind(this);
    this.onHoverEditOut = this.onHoverEditOut.bind(this);
    this.editQTSText = this.editQTSText.bind(this);
    this.saveText = this.saveText.bind(this);
    this.cancelText = this.cancelText.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillUpdate(nextProps, nextState) {
    if(nextProps.inLineValue != this.props.inLineValue){
      this.setState({inlineValue:nextProps.inLineValue,editClick:false});
    }
  }

  urlOpen(uurl) {
     var urlStr = "http://"+uurl;
     window.open(urlStr, "_blank", "toolbar=no,scrollbars=no,resizable=no,top=300,left=300,width=800,height=600");
  }

  onHoverEdit(){
    this.setState({hoverEdit: true});
  }

  onHoverEditOut(){
    this.setState({hoverEdit:false});
  }

  editQTSText(){
    this.setState({editClick:!(this.state.editClick)});
  }

  handleChange({ target }) {
    this.setState({ editedValue : target.value});
  }

  saveText(){
    if(this.state.editedValue != null || this.state.editedValue != undefined){
      var respComponent;
      
      if(this.props.controlName == undefined){
        respComponent = "";
      }
      else{ respComponent = this.props.controlName;}

      this.props.handleResponse(true, this.state.editedValue, respComponent);  
    }

    this.setState({editClick:!(this.state.editClick)});    
  }

  cancelText(){
    this.props.handleResponse(false, "none","");
    this.setState({editClick:!(this.state.editClick)});
  }

  renderInLineEditControl()
  {
      if(this.state.editClick == true){
          return(this.renderEditInlineValue());
      } else{
        return(this.renderInlineValue());
      }
  }

  renderEditInlineValue(){
    return(
      <div style={{display: this.state.editClick ? 'block' : 'none', height:"26px", float:"left",border: "1px solid #1d6fde", padding:'0 0 0 0', margin: '0 0 0 0', verticalAlign: "middle"}} >
          <input type="text" class="inLineEditFontStyle" style={{border:'none', outline: 'none', height:"24px", width:"176px", verticalAlign:"text-bottom"}} defaultValue={this.state.inlineValue} onChange={this.handleChange }/>
          <div onClick={this.cancelText} className="i_btn_base i_btn_cancel" style={{paddingRight:"4px"}} />
          <div onClick={this.saveText} className="i_btn_base i_btn_ok"  />
      </div>
    )
  }

  renderInlineValue(){
    var imgEdit= '/img/btn_aciton_edit_active.png';
    var linkFlag ;
    if(this.props.urlLink == undefined){
      linkFlag = <div style={{ color: "#0071ba",fontSize:"Roboto-R",fontSize: "13px",float:"left",cursor:"default", width: "180px"}} >{this.state.inlineValue}</div>
    }
    else{
      linkFlag = <a class="urlStyle" style={{ fontSize:"Roboto-R",fontSize: "14px",float:"left",cursor:"pointer", width: "180px"}} onClick={x=>this.urlOpen(this.props.urlLink)} >{this.state.inlineValue}</a>
    }
    return(
      <div>
        <div style={{display: this.state.editClick ? 'none' : 'block' ,width:"210px",float:"left",fontSize: 14, height:"24px", verticalAlign: 'middle'}} onMouseOver={this.onHoverEdit} onMouseOut={this.onHoverEditOut}>
            {linkFlag}
            <div className="i_btn_aciton_edit" style={{display: this.state.hoverEdit ? 'block' : 'none' , float: 'right' }} onClick={this.editQTSText} />
        </div>
        <div style={{clear:"both"}} />
      </div>
    )

  }

  render() {

    return (
      this.renderInLineEditControl()
    );
  }
}
