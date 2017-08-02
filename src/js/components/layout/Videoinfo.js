
import React from "react";
export default class Videoinfo extends React.Component {
	/*要傳值需要用到這*/
	constructor(props) {
		    super(props)
		  }
    /*傳值需要用到這*/
  render() {
		var array=[
			{title:"Video Codec/ Bitrate(KB/S)",val:this.props.video+" / "+this.props.bitrate},
			{title:"Audio Codec/ Audio Bitrate(KHz)",val:this.props.audio+" / "+this.props.audiorate},
			{title:"Resolution",val:this.props.Resolution},
			{title:"FPS",val:this.props.fps},
			{title:"File Size",val:this.props.fsize},
			{title:"Duration",val:this.props.Duration}
		];
		var list=[];
		list=array.map((x,i)=><div key={i} ><div style={{float:"left", width:"200px"}} >{x.title}</div><div style={{float:"left"}}>{x.val}</div><div style={{clear:"left"}}></div></div>);
    return (
			<div>
				{list}
			</div>
    );
  }
}
