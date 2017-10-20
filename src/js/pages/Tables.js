import React from "react";
import JobList from '../components/JobSelect'
import { appConfig,cardInfo } from '../config';
import {get_jobInfo_byCardId_byCPUId, terminateJobArray} from '../api';
import '../css/table.css';
import NoProcess from "./NoProcess";
import {routeResp} from '../config';
import _        from 'lodash';

export default class Tables extends React.Component {
    constructor(props){
      super(props);
      var cpuId=cardInfo.cards[this.props.cardSelect].cpuinfo1.id;
      if(this.props.cpuSelect == 2){
        cpuId=cardInfo.cards[this.props.cardSelect].cpuinfo2.id;
      }

      var cardId=cardInfo.cards[this.props.cardSelect].id;
      this.intervalId=null;
      this.state = {
        cardSelect:this.props.cardSelect,
        cpuSelect:this.props.cpuSelect,
        cardId:cardId,
        cpuId:cpuId,
        recieve_jobs1 : null,
        totalRunningTask:0,
        selectedTasks: new Set(),
        selectedTaskState: false,
        checked: false
      }
      this.timer = this.timer.bind(this);
      this.getJobList = this.getJobList.bind(this);
      this.renderProcessJobList = this.renderProcessJobList.bind(this);
      this.judge_process = this.judge_process.bind(this);
      this.terminateJobArray_callback = this.terminateJobArray_callback.bind(this);
    }



  handlepop() {
	  this.props.handlepop2();
  }


    timer(cpujobinfo){
      this.judge_process();

      if(cpujobinfo.length == 0 && this.state.selectedTasks.size > 0)
      {
          this.setState({
            selectedTasks : new Set(),
            checked: false,
            totalRunningTask:0
          })
      } else if(cpujobinfo.length > 0 && this.state.selectedTasks.size > 0){
          var count = 0;
          let selectedTasks = this.state.selectedTasks;

          for (var i = 0; i < cpujobinfo.length; i++) {
            if(selectedTasks.has(cpujobinfo[i].jobId) && cpujobinfo[i].status.toLowerCase() != "running"){
              selectedTasks.delete(cpujobinfo[i].jobId);
              count = count + 1;
            }
            if(this.state.checked == true && cpujobinfo[i].status.toLowerCase() == "running"){
              selectedTasks.add(cpujobinfo[i].jobId);
              count = count + 1;
            }
          }

          if(count > 0){
            this.setState({
              selectedTasks : selectedTasks
            })
          }
          this.setState({
            totalRunningTask:count
          })
      }

      if(!_.isEqual(this.state.recieve_jobs1,cpujobinfo)){
        this.setState({
            recieve_jobs1 : cpujobinfo
        })
      }
    }

    getJobList(){
          var now = new Date();
          var timeRange= 1*5*60*1000;//h,m,sec
          var sTime = new Date(now.getTime() - timeRange);
          var eTime=new Date();

          get_jobInfo_byCardId_byCPUId(sTime,eTime,this.state.cardId,this.state.cpuId,this.timer);

    }

    componentWillMount(){

      }
    componentDidMount(){
        this.intervalId =setInterval(this.getJobList,1500);
    }

    componentWillUnmount(){
       clearInterval(this.intervalId);

    }

    componentWillUpdate(nextProps, nextState) {
      if(nextProps.taskState != this.props.taskState){
        var arr;

        if(this.state.selectedTasks){
          arr = Array.from(this.state.selectedTasks);
          if(arr.length > 0){
            terminateJobArray(arr, this.terminateJobArray_callback);
          }
        }
      }
    }

    terminateJobArray_callback(resp){
      if(resp[routeResp.Result] == routeResp.FailResult){
        console.log("terminateJobArray_callback Fail");
        return;
      }
      var data = resp[routeResp.Data];
      this.handleSelectedTask(false, false);
    }

    handleSelectedTask(allSelected, individualSelected, selectedTask, checked) {

        let selectedTasks = this.state.selectedTasks

        if (allSelected && !individualSelected) {
          var o;
            if(this.state.recieve_jobs1 != null){
              this.state.recieve_jobs1.forEach((Pass_jobId) => {

                if(Pass_jobId.status.toLowerCase() == "running"){
                  o = {
                    id:Pass_jobId.jobId
                    // , status: Pass_jobId.status
                    // , type: Pass_jobId.type
                  };
                  selectedTasks.add(Pass_jobId.jobId)
                }
              });
            }
        } else if (!allSelected && !individualSelected) {
          selectedTasks.clear();
          this.setState({
              checked : false
          })
        } else if (individualSelected) {
          if (checked) {
           // o = { id:selectedTask }; // , status: Pass_jobId.status // , type: Pass_jobId.type};
            selectedTasks.add(selectedTask)

            if (selectedTasks.size === this.state.totalRunningTask) {
              this.setState({checked})
            }
          } else {
            selectedTasks.delete(selectedTask)
            this.setState({checked})
          }
        }
        this.setState({selectedTasks})
    }

    removeSelected () {
    const selectedTasks = Array.from(this.state.selectedTasks)
    Meteor.call('emails.remove', selectedTasks, (err, result) => {
      if (err) console.log(err)
      if (result) console.log(result)
    })
    }

    checkAll () {
      this.setState({checked: !this.state.checked})
      this.handleSelectedTask(!this.state.checked, false)
    }


    renderProcessJobList(){
       var Process_Job_List1 = [];
       if(this.state.recieve_jobs1!=null){
         if(this.state.recieve_jobs1.length > 0){
            Process_Job_List1 = this.state.recieve_jobs1.map((Pass_jobId, i) =>
              <JobList
              key={Pass_jobId.jobId}
              handleSelectedTask={this.handleSelectedTask.bind(this)}
              Pass_jobId={Pass_jobId}
              CPUID_num={this.state.cpuId}
              cardSelect={this.state.cardSelect}
              cpuSelect={this.state.cpuSelect}
              value={this.state.checked || this.state.selectedTasks.has(Pass_jobId.jobId)} />
            );

         }
       }
       return Process_Job_List1;
    }


	judge_process(){
		var Process_image = [];
		if(this.state.recieve_jobs1!= '') {
			Process_image = null;

			return Process_image;
		}else{
			return (<NoProcess type="cardProcess" handlepop={this.handlepop.bind(this)}/>);
		}
	}


  render() {
    //--checkbox
    const checkboxUseEnable=true;
    return (
    <div>
        <table className="table-fixed" style={{width:'100%'}}>
           <thead className="thead-fixed">
             <tr className="tr-fixed">
              <th style={{width:"5%"}} ><input style={{cursor: "pointer"}} disabled={!checkboxUseEnable} type="checkbox" value="" onChange={this.checkAll.bind(this)} checked={this.state.checked} /></th>
              <th style={{width:"25%"}}> Task </th>
              <th style={{width:"5%"}}>Output</th>
              <th style={{width:"17%"}}>Start Time</th>
              <th style={{width:"15%"}}>Status</th>
              <th style={{width:"33%"}}>Action</th>
             </tr>
           </thead>
           <tbody className="tbody-fixed tbody-fixed-height-cardProcess">
                {this.judge_process()}
                {this.renderProcessJobList()}
           </tbody>
         </table>

         <div id="bottom"></div>

       </div>
    );
  }
}
