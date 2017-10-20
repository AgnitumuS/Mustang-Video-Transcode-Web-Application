import React from 'react'

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Process from "./HistoryProcess";
import HistoryAction from "./HistoryAction";
import {routeResp} from '../config';
import {Search_jobInfo_by_condition} from '../api';

export default class History extends React.Component {

  constructor(props){
    super(props);
    var searchAPIData = {
      sTime:null,
      eTime:null,
      CardId:null,
      CpuId:null,
      Type:"",
      Status:"",
      PageIdx:1,
      CountPerPage:100
    };
    this.state = {
      jobs : [],
      searchState: false,
      pagerSate: false,
      keyval : 1,
      mdisable:false,
      searchAPIData:searchAPIData,
      totalNum:0
    }
    this.SearchUpdate=this.SearchUpdate.bind(this);
    this.PagerUpdate=this.PagerUpdate.bind(this);
    this.Search_jobInfo_by_condition_callback=this.Search_jobInfo_by_condition_callback.bind(this);
    this.Search_History_jobInfo = this.Search_History_jobInfo.bind(this);
    this.handlehistory=this.handlehistory.bind(this);
  }
  SearchUpdate(sTime,eTime,CardId,CpuId,Type,Status){
    var searchAPIData = this.state.searchAPIData;
    var searchState = !(this.state.searchState);
    searchAPIData.sTime=sTime;
    searchAPIData.eTime=eTime;
    searchAPIData.CardId=CardId;
    searchAPIData.CpuId=CpuId;
    searchAPIData.Type=Type;
    searchAPIData.Status=Status;
    searchAPIData.PageIdx=1;
    this.setState({
      searchAPIData:searchAPIData,
      searchState: searchState
    });
  }
  PagerUpdate(PageIdx,CountPerPage){
    if(PageIdx == null && CountPerPage == null){
      return;
    }
    var searchAPIData = this.state.searchAPIData;
    var pagerSate = !(this.state.pagerSate);
    if(PageIdx != null){
      if(PageIdx >= 0){
        searchAPIData.PageIdx=PageIdx+1;
      }
    }
    if(CountPerPage != null){
        if(CountPerPage >= 1){
          searchAPIData.CountPerPage=CountPerPage;
        }
        else{
          return;
        }
    }
    this.setState({
      searchAPIData:searchAPIData,
      pagerSate:pagerSate
    });
  }
  shouldComponentUpdate(nextProps,nextState){
    if(this.state.pagerSate != nextState.pagerSate || this.state.searchState != nextState.searchState){
      this.Search_History_jobInfo(nextState.searchAPIData);
    }
    // if(this.state.update == nextState.update){
    //   return false;
    // }

    return true;
  }
  Search_History_jobInfo(searchAPIData){
    Search_jobInfo_by_condition(searchAPIData.sTime,searchAPIData.eTime,searchAPIData.CardId,searchAPIData.CpuId,searchAPIData.Type,searchAPIData.Status,searchAPIData.PageIdx,searchAPIData.CountPerPage,this.Search_jobInfo_by_condition_callback);
  }

  Search_jobInfo_by_condition_callback(data){
    var update=!(this.state.update);
    this.setState({jobs:data.jobInfo,totalNum:data.totalNum,update:update});
  }
  check_click() {
	  //return data click
	  this.setState({mdisable:false});
  }
  handlehistory(e){
	   this.refs.usetables.del_array();
  }
  render() {
    //UI
    const marginYellow="10px";
    const marginPurple="30px";
    const marginGreenLight="15px";
    const marginBrown = "10px";
    var title="Log";
    var content="To search transcoding logs,  select filters from the drop-down list and click the search icon.";
    var totalPage = Math.ceil(this.state.totalNum/this.state.searchAPIData.CountPerPage);
    var currentPage = this.state.searchAPIData.PageIdx-1;
    var countPerPage = this.state.searchAPIData.CountPerPage;
    var totalNum = this.state.totalNum;
    var initData={totalPage:totalPage,currentPage:currentPage,countPerPage:countPerPage,totalNum:totalNum};
    return (
      <div>
        <div style={{marginBottom:marginPurple}}>
          <div style={{fontFamily:"Roboto-M",fontSize: "20px",color: "#000000"}}>{title}</div>
        </div>
        <div style={{marginBottom:marginGreenLight}}>
          <div style={{fontFamily:"Roboto-R",fontSize: "13px",color: "#131313"}}>{content}</div>
        </div>
        <div style={{marginBottom:marginBrown}}>
          <HistoryAction ref="research" handlehistory={this.handlehistory} passData={this.SearchUpdate} mdisable={this.state.mdisable}/>
        </div>
        <div style={{marginTop:marginYellow}}>
        <Process ref="usetables" check_click={this.check_click.bind(this)} www={this.state.keyval} jobs={this.state.jobs} searchState={this.state.searchState} passData={this.PagerUpdate} initData={initData}/>
        </div>
      </div>
    );
  }
}
