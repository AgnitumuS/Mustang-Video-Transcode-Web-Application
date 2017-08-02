import React from "react";
import {taskConfig} from '../../config'
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
    var qpBitrateList=[];
    if(!this.props.FrameRate_QP_value){
      qpBitrateList.push(<td style={{height:"40px"}} key={"qp"}>{this.state.qp}</td>);
    }
    else{
      qpBitrateList.push(<td style={{height:"40px"}} key={"bitrate"}>{this.state.bitrate}</td>);
    }
    return (
      <tr >
        <td style={{height:"40px"}} >{this.state.resolution}</td>
        <td style={{height:"40px"}} >{this.state.framerate}</td>
        {qpBitrateList}
      </tr>
    );
  }
}
