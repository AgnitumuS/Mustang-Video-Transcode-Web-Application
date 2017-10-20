import React from "react";

export default class PortSelect extends React.Component {
  constructor(props) {
   super(props);
 }
  render() {
    return (
      <tr>
        <td style={{fontSize: '14px',color: '#131313',fontFamily: 'Roboto-R',height:"32px",width:"10%"}}>{this.props.x}</td>
        <td style={{fontSize: '14px',color: '#131313',fontFamily: 'Roboto-R',height:"32px",width:"26%"}}>{this.props.cpu1id}</td>
        <td style={{fontSize: '14px',color: '#131313',fontFamily: 'Roboto-R',height:"32px",width:"16%"}}>{this.props.qts1port}</td>
        <td style={{fontSize: '14px',color: '#131313',fontFamily: 'Roboto-R',height:"32px",width:"16%"}}>{this.props.icecast1port}</td>
        <td style={{fontSize: '14px',color: '#131313',fontFamily: 'Roboto-R',height:"32px",width:"16%"}}>{this.props.rtmp1port}</td>
        <td style={{fontSize: '14px',color: '#131313',fontFamily: 'Roboto-R',height:"32px",width:"16%"}}>{this.props.http1port}</td>
      </tr>
    );
  }
}
