import React from "react";
import { appConfig } from '../config';

import './Config.css';
import { cardInfo } from '../config';

import JobList from './ConfigList'

export default class View extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      card1IP:null,
      intervalId:null
    }
  }

  render() {

    var Process_Job_List1=[];
    const contentData = cardInfo.cards;
    Process_Job_List1 = contentData.map((x, i) => <JobList key={i} card={x.id} cpu1={x.cpuinfo1.info} cpu2={x.cpuinfo2.info} index={i}/>);
    const marginBlue="20px";
    return (
      <div style={{marginBottom:marginBlue}}>
	     {Process_Job_List1}
      </div>
    );
  }
}
