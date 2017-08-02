import React from "react";
import ProgressBar from "../components/layout/ProgressBar";
import { appConfig,cardInfo } from '../config';
import '../css/style.css';
import '../css/overview.css';
export default class DisplayCardInfo extends React.Component {
  constructor(props){
    super(props);
    var cpuList = [];
    var gpuList = [];
    var url=[];
    var inputPath = window.location.href;
    var ipath1 = "http://".length;
    var stop = inputPath.replace("http://","http_//");
    var ipath2 = stop.indexOf(":");
    var subipPath = inputPath.substring(ipath1,ipath2);
    if(subipPath.length == 0){
     errortmp.errormsg(errormsgHead,errormsgMethod3,"input ip setting is null");
    }
    else{
      if(subipPath == "localhost"){
        for (var i = 0; i < cardInfo.cardNum; i++) {
           url[2*i]=cardInfo.cards[i].cpuinfo1.info.ip;
           url[2*i+1]=cardInfo.cards[i].cpuinfo2.info.ip;

           cpuList.push(0);
           cpuList.push(0);
           gpuList.push(0);
           gpuList.push(0);
        }
      }
      else{
        for (var i = 0; i < cardInfo.cardNum; i++) {
           url[2*i]=cardInfo.hostIP+":"+cardInfo.cards[i].cpuinfo1.info.qtsPort;
           url[2*i+1]=cardInfo.hostIP+":"+cardInfo.cards[i].cpuinfo2.info.qtsPort;

           cpuList.push(0);
           cpuList.push(0);
           gpuList.push(0);
           gpuList.push(0);
        }
      }
    }
    var cpuId=cardInfo.cards[this.props.cardSelect].cpuinfo1.id;
    if(this.props.cpuSelect == 2){
      cpuId=cardInfo.cards[this.props.cardSelect].cpuinfo2.id;
    }


    this.state = {
      cardSelect:this.props.cardSelect,
      cpuSelect:this.props.cpuSelect,
      cpu:cpuList,//[0,0,0,0,0,0],
      gpu:gpuList,//[0,0,0,0,0,0],
      cpuId:cpuId,
      pop:url
    }
    this.timer = this.timer.bind(this);
    this.urlOpen = this.urlOpen.bind(this);
  }

//cpu start
  timer(){
   // console.log("come here");
      var flag = false;
      var cpu = [];//[0,0,0,0,0,0];
      var gpu = [];//[0,0,0,0,0,0];
      if(cardInfo.cards.length>0){
        for(var i=0; i < cardInfo.cardNum ; i++){
          var cardusage = cardInfo.cards[0].cpuinfo1.cpu;
          cpu[2*i] = cardInfo.cards[i].cpuinfo1.cpu;
          cpu[2*i+1] = cardInfo.cards[i].cpuinfo2.cpu;
          gpu[2*i] = cardInfo.cards[i].cpuinfo1.gpu;
          gpu[2*i+1] = cardInfo.cards[i].cpuinfo2.gpu;
          if(this.state.cpu != cpu){
            flag = true;
          }

          if(this.state.gpu != gpu){
            flag = true;
          }
        }
      }

      if(flag){
        this.setState({
          cpu:cpu,
          gpu:gpu
        })
      }
    }


componentDidMount(){
    this.intervalId =setInterval(this.timer.bind(this),1000);
  }
//cpu ends


  componentWillMount(){
  }
  componentWillUnmount(){
     clearInterval(this.intervalId);
  }

  urlOpen(uurl) {
     var urlStr = "http://"+uurl;
     window.open(urlStr, "_blank", "toolbar=no,scrollbars=no,resizable=no,top=300,left=300,width=800,height=600");
  }

  render() {
      const mic_card ='../../img/ic_card.png';
      const mic_cpu ='../../img/ic_cpu.png';
      const mic_ram ='../../img/ic_ram.png';
      const mic_ip ='../../img/ic_ip.png';
      const mqts ='../../img/QTS logo_24.png';
      var choose = 2*this.state.cardSelect+this.state.cpuSelect;
      var real = choose - 1;
     // console.log("choose "+choose);
      var cpu_str = "CPU"+choose;
      var gpu_str = "GPU"+choose;
      var url_str = "url"+choose;
      real = Number(real);
      var uuu =this.state.pop[real];
      // console.log("DisplayCardInfo "+JSON.stringify(cardInfo.cards[this.state.cardSelect]));
      const tmp1info = cardInfo.cards[this.state.cardSelect].cpuinfo1.info;
      const tmp2info = cardInfo.cards[this.state.cardSelect].cpuinfo2.info;
      var ip = tmp1info.ip;
      var cpuV=tmp1info.cpuVersion.Version;
      var cpuM=tmp1info.cpuMemory;
      console.log();
      if(this.state.cpuSelect==2){
        ip = tmp2info.ip;
        cpuV = tmp2info.cpuVersion.Version;
        cpuM = tmp2info.cpuMemory;
      }


    //---UI
    const marginRightPink="6px";
    const marginLeftBrown="25px";
    return (
      <div>
          <table>
             <thead>
               <tr>
                <th style={{minWidth:"234px",width:"22.5%"}}><div style={{marginLeft:marginLeftBrown}}>CPU Usage</div></th>
                <th style={{minWidth:"234px",width:"22.5%"}}><div style={{marginLeft:marginLeftBrown}}>GPU Usage</div></th>
                <th style={{minWidth:"573px",width:"55%"}}><div style={{marginLeft:marginLeftBrown}}>{this.state.cpuId} Information</div></th>
               </tr>
             </thead>
             <tbody>
               <tr>
                 <td style={{textAlign:"center"}}><ProgressBar className="cpuTextRegular" typeName={'cpu'}  progress_cpu ={this.state.cpu[real]} target_name={cpu_str}/></td>
                 <td style={{textAlign:"center"}}><ProgressBar className="gpuText_Regular" typeName={'gpu'} progress_cpu ={this.state.gpu[real]} target_name={gpu_str}/></td>
                 <td>
                   <div>
                     <div style={{float:"left", marginLeft:marginLeftBrown, marginRight:marginRightPink}}><img src={mic_cpu} alt width={"20px"} height={"20px"}/></div><div style={{width:"100px",float:"left",display:"inline",fontSize: 14}}>CPU</div><div style={{float:"left"}}>{cpuV}</div><div style={{clear:"both"}}></div>
                   </div>
                   <br />
                   <div>
                     <div style={{float:"left", marginLeft:marginLeftBrown, marginRight:marginRightPink}}><img src={mic_ram} alt width={"20px"} height={"20px"}/></div><div style={{width:"100px",float:"left"}}>Memory</div><div style={{float:"left"}}>{cpuM}</div><div style={{clear:"both"}}></div>
                   </div>
                   <div><div className="rowHr" style={{marginLeft:marginLeftBrown}}></div>
                   </div>
                   <div>
                     <div onClick={x=>this.urlOpen(uuu)}  style={{float:"left",display:"inline",marginLeft:marginLeftBrown, marginRight:marginRightPink}}>
                       <img style={{cursor: 'pointer'}} src={mqts} alt width={"20px"} height={"20px"}/>
                     </div>
                     <div style={{width:"100px",float:"left",display:"inline",fontSize: 14}}>IP Address</div>
                     <a onClick={x=>this.urlOpen(uuu)} className="urlStyle" style={{float:"left",display:"inline",cursor:"pointer"}}> {ip} </a>
                     <div style={{clear:"both",display:"inline"}}></div>
                   </div>
                 </td>
               </tr>
             </tbody>
           </table>
      </div>
    );
  }
}
