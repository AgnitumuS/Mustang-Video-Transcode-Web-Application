import React from "react";
import JobList from '../components/HistoryJobSelect'
import { appConfig,cardInfo } from '../config';
import {get_jobInfo_byCardId_byCPUId} from '../api';
import '../css/table.css';
import '../css/icon.css';
import { render } from 'react-dom';
import Pager from 'react-pager';
//for search
import {Search_jobInfo_by_condition} from '../api';
import {Delete_job_byJobId_array} from '../api';
import NoProcess from "./NoProcess";
import _        from 'lodash';

export default class Tables extends React.Component {
    constructor(props){
      super(props);
      var loopCount = 0;
      if(this.props.jobs != null){
        loopCount=this.props.jobs.length;
      }
      this.state = {
          visiblePage: 1,
          recieve_jobs1 : this.props.jobs,
          selectedTasks: new Set(),
          checked: false,
          keyval:1,
          loopCount:loopCount,
          unRunningTask:new Set()
      };

      this.handlePageChanged = this.handlePageChanged.bind(this);
      this.del_array = this.del_array.bind(this);
      this.delete_job_byJobId_array_callback=this.delete_job_byJobId_array_callback.bind(this);
    }
    handlePageChanged(newPage) {
        this.props.passData(newPage,null);
        this.setState({ checked: false });
    }

    componentWillUpdate(nextProps, nextState) {

      if (nextProps.searchState != this.props.searchState) {

        let selectedTasks = this.state.selectedTasks;

        selectedTasks.clear();

        this.setState({selectedTasks:selectedTasks, recieve_jobs1 : this.props.jobs, checked : false});
      }
      if(nextProps.jobs != null && this.props.jobs != null){
        if(!_.isEqual(nextProps.jobs,this.props.jobs)){
          var loopCount = 0;
          loopCount = nextProps.jobs.length;
          var unRunningTask = new Set();
          for (var i = 0; i < loopCount; i++) {
            if(nextProps.jobs[i].status.toLowerCase() != "running"){
              unRunningTask.add(nextProps.jobs[i].jobId);
            }
          }
          this.setState({loopCount:loopCount,unRunningTask:unRunningTask});
        }
      }
    }

    handleSelectedTask(allSelected, individualSelected, selectedTask, checked) {

        let selectedTasks = this.state.selectedTasks;

        if (allSelected && !individualSelected) {
          var o;
          this.props.jobs.forEach((Pass_jobId) => {
            if(Pass_jobId.status.toLowerCase() != "running"){
                o = {
                  id:Pass_jobId.jobId
                };

                selectedTasks.add(Pass_jobId.jobId);
            }
          })
        } else if (!allSelected && !individualSelected) {
          for (var i = 0; i < this.props.jobs.length; i++) {
            if(selectedTasks.has(this.props.jobs[i].jobId))
            {
              selectedTasks.delete(this.props.jobs[i].jobId);
            }
          }
        } else if (individualSelected) {
          if (checked) {

            selectedTasks.add(selectedTask);

            var flag=true;
            for (var a of this.state.unRunningTask){
              if (!selectedTasks.has(a)){
                flag = false;
              }
            }
            if (flag) {
              this.setState({checked})
            }
          } else {
            selectedTasks.delete(selectedTask)
            this.setState({checked})
          }
        }
        this.setState({selectedTasks})
           this.props.check_click();
    }

    removeSelected () {
      const selectedTasks = Array.from(this.state.selectedTasks)
      Meteor.call('emails.remove', selectedTasks, (err, result) => {
        if (err) console.log(err)
        if (result) console.log(result)
      })
    }

    checkAll(event){
        this.setState({checked:  !this.state.checked});
        this.handleSelectedTask( !this.state.checked, false);
    }
    removeCallback(){
      var loopCount = this.state.loopCount;
      loopCount--;
      if(loopCount==0){
        //Refresh
        this.setState({checked:  false});
        var currentPage = this.props.initData.currentPage;
        var maxLoopCount = 0;
        if(this.props.jobs!=null){
          maxLoopCount=this.props.jobs.length;
        }
        var saveNum=this.props.initData.totalNum-maxLoopCount;
        var savePageNum=Math.ceil(saveNum/this.props.initData.countPerPage);
        if(currentPage >= savePageNum){
          currentPage = savePageNum-1;
        }
        if(currentPage < 0){
          currentPage = 0;
        }
        this.props.passData(currentPage,null);
      }
      else{
        this.setState({loopCount:loopCount});
      }
    }
    renderProcessJobList(){

      var obj = this.props.jobs[0];

      if (typeof obj !== "undefined") {
           var Process_Job_List1 = [];
           if(this.props.jobs!=null){
             if(this.props.jobs.length > 0){
                Process_Job_List1 = this.props.jobs.map((Pass_jobId, i) =>
                  <JobList
                  key={Pass_jobId.jobId}
                  Pass_jobId={Pass_jobId}
                  status={Pass_jobId.status}
                  handleSelectedTask={this.handleSelectedTask.bind(this)}
                  removeCallback={this.removeCallback.bind(this)}
                  checkAll={this.state.checked}
                  list={this.state.selectedTasks}
                  value={this.state.checked || this.state.selectedTasks.has(Pass_jobId.jobId)} />
                );
             }
           }
          return Process_Job_List1;
      }
    }
    del_array()  {
    	var arr = Array.from(this.state.selectedTasks);
    	Delete_job_byJobId_array(arr,this.delete_job_byJobId_array_callback);
    }

    delete_job_byJobId_array_callback(data) {
      this.setState({checked:  false});
      var currentPage = this.props.initData.currentPage;
      var saveNum=this.props.initData.totalNum-data.length;
      var savePageNum=Math.ceil(saveNum/this.props.initData.countPerPage);
      if(currentPage >= savePageNum){
        currentPage = savePageNum-1;
      }
      if(currentPage < 0){
        currentPage = 0;
      }
      this.props.passData(currentPage,null);
    }

	judge_process(){
		var Process_image = [];
		if(this.props.jobs!= '') {
			Process_image = <div style={{textAlign: 'center'}}>
			<Pager
	         total={this.props.initData.totalPage}
	         current={this.props.initData.currentPage}
	         visiblePages={this.state.visiblePage}
	         titles={{ first: 'Home', last: 'Last' }}
	         className="pagination-sm pull-right"
	         onPageChanged={this.handlePageChanged}
	         /></div>;

			return Process_image;
		}else{
      Process_image = null;
      return Process_image;
		}
	}

  judge_processEmpty(){
    var Process_image = [];
    if(this.props.jobs!= '') {
      Process_image = null;

      return Process_image;
    }else{
      return (<NoProcess type="historyProcess"/>);
    }
  }


  render() {
    //--checkbox
    const checkboxUseEnable=true;
    return (
      <div>
          <table className="table-fixed" style={{width:'100%',height:"100%"}}>
             <thead className="thead-fixed">
               <tr className="tr-fixed">
               <th style={{width:"3%"}}><input style={{cursor: "pointer"}} type="checkbox" value=""
                   onChange={this.checkAll.bind(this)} checked={this.state.checked}/>
                  </th>
                 <th style={{width:"21%"}}> Task </th>
                 <th style={{width:"10%"}}> CardID-CPUID </th>
                 <th style={{width:"13%"}}>Output</th>
                 <th style={{width:"13%"}}>Start Time</th>
                 <th style={{width:"13%"}}>Status</th>
                 <th style={{width:"27%"}}>Action</th>
               </tr>
             </thead>
             <tbody className="tbody-fixed tbody-fixed-height-historyProcess">
                  {this.renderProcessJobList()}
                  {this.judge_processEmpty()}
             </tbody>
           </table>
           {this.judge_process()}
           <div id="bottom"></div>
      </div>
    );
  }
}
