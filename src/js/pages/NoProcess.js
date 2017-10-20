import React from "react";
import '../css/table.css';
import '../css/normal.css';
import '../css/icon.css';


export default class NoProcess extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      type:this.props.type
    }
  }

  render() {
    var textvalue = '';
    switch(this.state.type){
      case "cardProcess":
        textvalue = 'No Task Press "+" to add new task';
        return (
          <tr style={{height:"calc(100% - 1em)"}}>
            <td style={{height:"100%",width:"100%",display: "table"}}>
              <div id="background" style={{display:"table-cell", verticalAlign: "middle",textAlign:"center"}} >
                <div id="btn" className="i_about_area i_cardProcessEmpty" style={{cursor: 'pointer'}} onClick={this.props.handlepop}></div>
                <div id="content" style={{marginTop:"20px"}}>{textvalue}</div>
              </div>
            </td>
          </tr>
        );
      break;
    case "historyProcess":
      textvalue = 'No matches were found.';
      return (
        <tr style={{height:"calc(100% - 1em)"}}>
          <td style={{height:"100%",width:"100%",display: "table"}}>
            <div id="background" style={{display:"table-cell", verticalAlign: "middle",textAlign:"center"}} >
              <div className="i_about_area i_historyProcessEmpty"></div>
              <div id="content" style={{marginTop:"20px"}}>{textvalue}</div>
            </div>
          </td>
        </tr>
      );
    break;
    default:
      return null;
    break;
    }
  }
}
