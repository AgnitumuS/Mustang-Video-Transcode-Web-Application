import React from "react";
import {taskConfig} from '../../config';

import '../../css/settings.css';

export default class Settings_step4_list extends React.Component {

  constructor(props) {
   super(props);
   this.state = {
     resolution:this.props.obj.resolution,
     framerate:this.props.obj.framerate,
     qp:this.props.obj.vquality,
     qpDisable:this.props.obj.bitrateenable,
     bitrate:this.props.obj.vbitrate
   };
  }

  render() {
	const marginBrown="12px";  
    var qpBitrateList=[];
    if(!this.props.FrameRate_QP_value){
      qpBitrateList.push(<td style={{height:"32px",textAlign:'left',paddingLeft: marginBrown}} key={"qp"}>{this.state.qp}</td>);
    }
    else{
      qpBitrateList.push(<td style={{height:"32px",textAlign:'left',paddingLeft: marginBrown}} key={"bitrate"}>{this.state.bitrate}</td>);
    }
    return (
      <tr >
        <td style={{height:"32px",textAlign:'left',paddingLeft: marginBrown}} >{this.state.resolution}</td>
        <td style={{height:"32px",textAlign:'left',paddingLeft: marginBrown}} >{this.state.framerate}</td>
        {qpBitrateList}
      </tr>
    );
  }
}
