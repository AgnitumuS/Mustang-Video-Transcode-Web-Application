import React from "react";
import JobList from '../components/JobSelect'
import { appConfig,cardInfo } from '../config';
import {get_jobInfo_byCardId_byCPUId} from '../api';
import '../css/table.css';

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
        recieve_jobs1 : null
      }
      this.timer = this.timer.bind(this);
      this.getJobList = this.getJobList.bind(this);
      this.renderProcessJobList = this.renderProcessJobList.bind(this);
    }

    timer(cpujobinfo){
      this.setState({
        recieve_jobs1 : cpujobinfo
        })
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

    renderProcessJobList(){
       var Process_Job_List1 = [];
       if(this.state.recieve_jobs1!=null){
         if(this.state.recieve_jobs1.length > 0){
            Process_Job_List1 = this.state.recieve_jobs1.map((Pass_jobId, i) => <JobList key={Pass_jobId.jobId} Pass_jobId={Pass_jobId} CPUID_num={this.state.cpuId} cardSelect={this.state.cardSelect} cpuSelect={this.state.cpuSelect}/> );
         }
       }
       return Process_Job_List1;
    }


  render() {
    //--checkbox
    const checkboxUseEnable=false;
    return (
      <div>
        <div id="myModal" class="modal hide fade" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                         <div class="modal-header">
                             <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                             <h3 id="myModalLabel">Delete</h3>
                         </div>
                         <div class="modal-body">
                             <p></p>
                         </div>
                         <div class="modal-footer">
                             <button class="btn " data-dismiss="modal" aria-hidden="true">Close</button>
                             <button data-dismiss="modal" class="btn red" id="btnYes">Confirm</button>
                         </div>
        </div>
        <table id="css_table" class="table-striped table-hover table-users table-bordered">
           <thead>
             <tr>
               <th id="css_th"><input disabled={!checkboxUseEnable} type="checkbox" value=""/></th>
               <th id="css_th2"> Task </th>
               <th id="css_th2">Output</th>
               <th id="css_th2">Start Time</th>
               <th id="css_th2">Status</th>
               <th id="css_th2">Action</th>
             </tr>
           </thead>

           <tbody>
                {this.renderProcessJobList()}
           </tbody>
         </table>
         <div id="bottom"></div>
       </div>
    );
  }
}
