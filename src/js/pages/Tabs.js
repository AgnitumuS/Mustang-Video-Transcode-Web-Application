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
      cardSelect:this.props.cardSelect
    }
  }

  handleSelect(index, last) {
    // console.log('Selected tab: ' + index + ', Last tab: ' + last);
  }
  render() {
    var myCardInfo = cardInfo.cards[this.state.cardSelect];

    //UI
    const marginYellow="10px";
    const marginPurple="30px";
    return (
      <div>
          <Tabs
            onSelect={this.handleSelect}
            selectedIndex={0}
          >
            <TabList>
              <Tab>{myCardInfo.cpuinfo1.id}</Tab>
              <Tab>{myCardInfo.cpuinfo2.id}</Tab>
            </TabList>
            <TabPanel>
              <DisplayCardInfo cardSelect={this.state.cardSelect} cpuSelect={1}/>
              <div style={{marginTop:marginPurple}}>
                <DisplayCardAction cardSelect={this.state.cardSelect} cpuSelect={1}/>
              </div>
              <div style={{marginTop:marginYellow}}>
                <Process cardSelect={this.state.cardSelect} cpuSelect={1}/>
              </div>
            </TabPanel>
            <TabPanel>
              <DisplayCardInfo cardSelect={this.state.cardSelect} cpuSelect={2}/>
              <div style={{marginTop:marginPurple}}>
                <DisplayCardAction cardSelect={this.state.cardSelect} cpuSelect={2}/>
              </div>
              <div style={{marginTop:marginYellow}}>
                <Process cardSelect={this.state.cardSelect} cpuSelect={2}/>
              </div>
            </TabPanel>
          </Tabs>
      </div>
    );
  }
}
