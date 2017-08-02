import React from "react";
import '../../css/style.css';

export default class Header extends React.Component {
	/*要傳值需要用到這*/
	constructor(props) {
		    super(props)
		    this.state = {
		    };
		  }
    /*傳值需要用到這*/
  render() {
		const containerStyle = {
      marginTop: "15px"
    };
    return (

        <div className="navBar" style={containerStyle} >

            <div className="navTitle">
              {/*<img src='../../img/open_n.png'/>*/}
              <span className="f_bold">Mustang-</span>
							<span className="f_light">200</span>
            </div>

            <div className="navBox">
              <img src='../../img/about_i.png'/>
            </div>

        </div>

    );
  }
}
