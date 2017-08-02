import React from "react";
import Tabs from "./Tabs";
import { cardInfo } from '../config';

export default class Tables extends React.Component {

  constructor(props){
    super(props);
    var num = this.props.num+1;
    window.sessionStorage.setItem("card", num);
    this.state = ({
      title:cardInfo.cards[this.props.num].id,
      cardSelect:this.props.num
    })

  }

  render() {
    return (
      <div >
        <text>{this.state.title}</text>
        <Tabs cardSelect={this.state.cardSelect}/>
      </div>
    );
  }
}
