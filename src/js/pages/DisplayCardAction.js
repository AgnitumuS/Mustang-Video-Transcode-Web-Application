import React from "react";
import Settings from "./Settings";
export default class DisplayCardAction extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      cardSelect:this.props.cardSelect,
      cpuSelect:this.props.cpuSelect,
    }
  }

  componentWillMount(){
  }
  componentDidMount(){
  }

  render() {
    //UI
    const marginPink = "8px";
    return (
      <div>
        <div style={{float:"right"}} >
          <button class="button_normal  button_yes" disabled={true} ><input style={{marginRight:marginPink}} className="i_button_area i_button_del" disabled={true}></input>Cancel Task</button>
        </div>
        <div style={{float:"right",marginRight:marginPink}}>
          <Settings cardSelect={this.state.cardSelect} cpuSelect={this.state.cpuSelect}/>
        </div>
        <div style={{clear:"right"}}></div>
      </div>
    );
  }
}
