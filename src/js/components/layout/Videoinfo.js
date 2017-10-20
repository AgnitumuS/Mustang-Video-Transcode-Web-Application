
import React from "react";
import '../../css/settings.css';

export default class Videoinfo extends React.Component {
	constructor(props) {
		    super(props)
		  }
  render() {
	    const marginOrange="35px";
	    const margin2Orange="70px";
	    const margin2Top = "10px";
	    var bitrate = this.props.bitrate;
	    var audiorate = this.props.audiorate;
	    if (bitrate !=='') { bitrate = " / "+this.props.bitrate;}
	    if (audiorate !== '') {audiorate = " / "+this.props.audiorate;}
		var array=[
			//{title:"Video Codec/ Bitrate(KB/S):",val:this.props.video+" / "+this.props.bitrate},
			//{title:"Audio Codec/ Bitrate(KHz):",val:this.props.audio+" / "+this.props.audiorate},
			{title:"Video Codec/ Bitrate(KB/S):",val:this.props.video+""+bitrate},
			{title:"Audio Codec/ Bitrate(KHz):",val:this.props.audio+""+audiorate},
			{title:"Resolution:",val:this.props.Resolution},
			{title:"FPS:",val:this.props.fps},
			{title:"File Size:",val:this.props.fsize},
			{title:"Duration:",val:this.props.Duration}
		];
		var list=[];
		list=array.map((x,i)=><div  style={{marginLeft:margin2Orange,marginTop:margin2Top,fontSize: 13}} key={i} ><div style={{float:"left", width:"200px"}} >{x.title}</div><div style={{float:"left",marginLeft:margin2Top}}>{x.val}</div><div style={{clear:"left"}}></div></div>);
    return (
			<div className="videoinfo">
				{list}
			</div>
    );
  }
}
