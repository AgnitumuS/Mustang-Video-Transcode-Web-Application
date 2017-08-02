
import React from "react";
import '../css/table.css';
export default class ConfigList extends React.Component {

	constructor(props) {
		    super(props)
	 }

	createUI(){

	     let uiItems = [];
	           uiItems.push(

	            )
	     return uiItems || null;
	  }


  render() {
    return (
			<div>
				<div style={{marginTop:"24px"}}>{this.props.card}</div>
				<div style={{width:"50%",float:"left",paddingLeft:"5px",paddingRight:"5px"}}>
					<table key={this.props.cpu1.mac} id="css_table" class="table-striped table-hover table-users table-bordered">
						<thead>
	            <tr class="bg-primary">
	              <td id="css_th2">Item</td>
								<td id="css_th2">Value</td>
								<td id="css_th2">Item</td>
								<td id="css_th2">Value</td>
	            </tr>
	          </thead>
						<tbody>
							<tr>
								<td>CPU</td>
								<td>{this.props.cpu1.cpuVersion.Version}</td>
								<td>Memory</td>
								<td>{this.props.cpu1.cpuMemory}</td>
							</tr>
							<tr>
								<td>ip</td>
								<td>{this.props.cpu1.ip}</td>
								<td>mac</td>
								<td>{this.props.cpu1.mac}</td>
							</tr>
							<tr>
								<td>icecastPort</td>
								<td>{this.props.cpu1.icecastPort}</td>
								<td>qtsPort</td>
								<td>{this.props.cpu1.qtsPort}</td>
							</tr>
							<tr>
								<td>rtmpPort</td>
								<td>{this.props.cpu1.rtmpPort}</td>
								<td>httpPort</td>
								<td>{this.props.cpu1.httpPort}</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div style={{width:"50%",float:"right",paddingLeft:"5px",paddingRight:"5px"}}>
					<table key={this.props.cpu2.mac} id="css_table" class="table-striped table-hover table-users table-bordered">
						<thead>
	            <tr class="bg-primary">
								<td id="css_th2">Item</td>
								<td id="css_th2">Value</td>
								<td id="css_th2">Item</td>
								<td id="css_th2">Value</td>
	            </tr>
	          </thead>
						<tbody>
							<tr>
								<td>CPU</td>
								<td>{this.props.cpu2.cpuVersion.Version}</td>
								<td>Memory</td>
								<td>{this.props.cpu2.cpuMemory}</td>
							</tr>
							<tr>
								<td>ip</td>
								<td>{this.props.cpu2.ip}</td>
								<td>mac</td>
								<td>{this.props.cpu2.mac}</td>
							</tr>
							<tr>
								<td>icecastPort</td>
								<td>{this.props.cpu2.icecastPort}</td>
								<td>qtsPort</td>
								<td>{this.props.cpu2.qtsPort}</td>
							</tr>
							<tr>
								<td>rtmpPort</td>
								<td>{this.props.cpu2.rtmpPort}</td>
								<td>httpPort</td>
								<td>{this.props.cpu2.httpPort}</td>
							</tr>							
						</tbody>
					</table>
				</div>
				<div style={{clear:"both"}}></div>
			</div>
    );
  }
}
