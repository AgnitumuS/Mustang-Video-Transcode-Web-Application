import React from "react";
import Tabs from "./Tabs";
import { cardInfo } from '../config';

export default class Tables extends React.Component {

  constructor(props){
    super(props);
    this.state = ({
      title:cardInfo.cards[this.props.num].id,
      cardSelect:this.props.num
    })

  }

  parseQueryString() {
    var url = window.location.href;
    var urlParams = {};
    url.replace(
      new RegExp("([^?=&]+)(=([^&]*))?", "g"),
      function($0, $1, $2, $3) {
        urlParams[$1] = $3;
      }
    );
    return urlParams;
  }

  render() {
    var idVal = this.parseQueryString();
    var cpuSelect;

    if(idVal.id  == 1){
        cpuSelect =  parseInt(idVal.id);
    }else if(idVal.id  == 0){
        cpuSelect = parseInt(idVal.id); //0
    }else{
      cpuSelect = 0;
    }


    return (
      <div style={{height:"calc(100vh - 52px)"}}>
        <div style={{height:"60px", paddingTop:"20px", paddingBottom:"20px"}}>
          <text>{this.state.title}</text>
        </div>
        <div style={{height:"calc(100% - 60px)"}}>
          <Tabs cardSelect={this.state.cardSelect} cpuSelect={cpuSelect}/>
        </div>
      </div>
    );
  }
}
