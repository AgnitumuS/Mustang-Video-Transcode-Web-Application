import React from "react";
import '../../css/style.css';

import Abourus from "../Aboutus";

export default class Header extends React.Component {
	constructor(props) {
		    super(props)
		    this.state = {
		    };
		   this.open_about = this.open_about.bind(this); 
		  }
	
	open_about() {
		this.refs.about.openModal();
	}
	componentWillMount(){
        
    }
	
	
  render() {
		const containerStyle = {
      height:"52px"
    };
    return (

        <div className="navBar" style={containerStyle} >
						<div style={{height:"8px",width:"100%",background:"linear-gradient(to right, #1d6fde , #05b8e5)"}}>
						</div>
            <div className="navTitle">
              <div className="f_appIcon"/>
              <span className="f_bold">Mustang-</span>
							<span className="f_light">200</span>
            </div>

            <div className="navBox">
            {/*<div className="i_help" />*/}
            <div className="i_about" onClick={this.open_about}/>
            </div>
            <Abourus ref="about" dateSelect={this.dateSelect}/> 
        </div>

    );
  }
}
