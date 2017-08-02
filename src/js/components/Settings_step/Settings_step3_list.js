import React from "react";
import Select from "react-select";
import 'react-select/dist/react-select.css';
import _        from 'lodash';
import {taskConfig} from '../../config'
import ReactDOM from 'react-dom';
import '../../css/icon.css';

export default class Settings_step3_list extends React.Component {
  constructor(props) {
   super(props);
   var tmp = this.props.obj.vbitrate;
   this.state = {
     resolution:_.find(taskConfig.Video_Resolution, {label:this.props.obj.resolution}),
     framerate:_.find(taskConfig.FrameRate, {FrameRate_value:this.props.obj.framerate}),
     qp:_.find(props.qpRange, {label:this.props.obj.vquality}),
     qpDisable:this.props.obj.bitrateenable,
     bitrate:_.find(taskConfig.Video_BitRate, {Video_BitRate_value:parseInt(tmp)}),
     index:this.props.obj.index
   };
    this.resolution_onChange = this.resolution_onChange.bind(this);
    this.framerate_onChange = this.framerate_onChange.bind(this);
    this.qp_onChange = this.qp_onChange.bind(this);
    this.bitrate_onChange = this.bitrate_onChange.bind(this);
  }

  resolution_onChange(val) {
	  this.setState({resolution : val})
    this.props.status_onChange(this.props.index,"resolution",_.result(val,'label'));
    this.props.status_onChange(this.props.index,"resolutionid",_.result(val,'Video_Resolution_value'));

	  };
  framerate_onChange(val) {
	  this.setState({framerate : val})
    this.props.status_onChange(this.props.index,"framerate",_.result(val,'FrameRate_value'));
	  };
  qp_onChange(val) {
	  this.setState({qp : val})
    this.props.status_onChange(this.props.index,"vquality",_.result(val,'label'));
	  };
  bitrate_onChange(val) {
    this.setState({vbitrate : val})
    var tmp = _.result(val,'Video_BitRate_value');
    this.props.status_onChange(this.props.index,"vbitrate",parseInt(tmp));
    };

  render() {
    //-- Select
    const clearable = false;

    var qpBitrateList=[];
    if(!this.props.FrameRate_QP_value){
      qpBitrateList.push(<td key={"qp"}><Select className="col-sm-12"
            onChange={this.qp_onChange}
            options={this.props.qpRange}
            value={this.state.qp}
            clearable={clearable}/></td>);
    }
    else{
      qpBitrateList.push(<td key={"bitrate"}><Select className="col-sm-12"
            onChange={this.bitrate_onChange}
            options={taskConfig.Video_BitRate}
            value={this.state.bitrate}
            clearable={clearable}/></td>);
    }
    //--checkbox
    const checkboxUseEnable=false;
    return (
      <tr>
        <td><input disabled={!checkboxUseEnable} type="checkbox" /></td>
        <td><Select className="col-sm-12"
        	  ref={this.state.index}
              onChange={this.resolution_onChange}
              options={taskConfig.Video_Resolution}
              value={this.state.resolution}
              clearable={clearable}/></td>
        <td><Select className="col-sm-12"
              onChange={this.framerate_onChange}
              options={taskConfig.FrameRate}
              value={this.state.framerate}
              clearable={clearable}/></td>
      {qpBitrateList}
      <td>
        <button disabled={!this.props.deleteStatus} className="i_area_17x16 i_area_delete" onClick={(x)=>this.props.remove_click(this.props.index)}/>
      </td>
      </tr>
    );
  }
}
