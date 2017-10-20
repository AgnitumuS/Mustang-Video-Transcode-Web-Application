import React from 'react'

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Process from "./Tables";
import DisplayCardInfo from "./DisplayCardInfo";
import DisplayCardAction from "./DisplayCardAction";
import { cardInfo } from '../config';
export default class _Tabs extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      cardSelect:this.props.cardSelect,
      cpuSelect: this.props.cpuSelect,
      taskState: false
    }
    this.handlepop2 = this.handlepop2.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleTask = this.handleTask.bind(this);

  }
  handlepop2() {
	  this.refs.getSwordButton.addTask_click();
  }
  handleSelect(index, last){
      this.setState({
        cpuSelect: index
      });
  }

  handleTask(){
    this.setState({taskState:  !this.state.taskState});
  }

  render() {
    var myCardInfo = cardInfo.cards[this.state.cardSelect];

    //UI
    const marginYellow="10px";
    const marginPurple="30px";
    return (
      <div>
          <Tabs
            onSelect= {this.handleSelect}
            selectedIndex={this.state.cpuSelect}
          >
            <TabList>
              <Tab>{myCardInfo.cpuinfo1.id}</Tab>
              <Tab>{myCardInfo.cpuinfo2.id}</Tab>
            </TabList>
            <TabPanel>
              <DisplayCardInfo  cardSelect={this.state.cardSelect} cpuSelect={1}/>
              <div style={{marginTop:marginPurple}}>
                <DisplayCardAction ref="getSwordButton" cardSelect={this.state.cardSelect} cpuSelect={1} handleTask={this.handleTask} />
              </div>
              <div style={{marginTop:marginYellow}}>
                <Process ref="usetables" handlepop2={this.handlepop2.bind(this)} cardSelect={this.state.cardSelect} cpuSelect={1} taskState={this.state.taskState}/>
              </div>
            </TabPanel>
            <TabPanel>
              <DisplayCardInfo cardSelect={this.state.cardSelect} cpuSelect={2}/>
              <div style={{marginTop:marginPurple}}>
                <DisplayCardAction ref="getSwordButton" cardSelect={this.state.cardSelect} cpuSelect={2} handleTask={this.handleTask} />
              </div>
              <div style={{marginTop:marginYellow}}>
                <Process  ref="usetables" handlepop2={this.handlepop2.bind(this)} cardSelect={this.state.cardSelect} cpuSelect={2} taskState={this.state.taskState}/>
              </div>
            </TabPanel>
          </Tabs>
      </div>
    );
  }
}
