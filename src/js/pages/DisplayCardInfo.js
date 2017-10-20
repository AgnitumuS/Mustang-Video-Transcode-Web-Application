import React from "react";
import ProgressBar from "../components/layout/ProgressBar";
import { appConfig,cardInfo } from '../config';
import '../css/style.css';
import '../css/overview.css';
import '../css/normal.css';
import {update_cardName} from '../api';
import { get_cardInfo} from '../api';
import InlineEdit from "../components/layout/InLineEdit";
import PortSetting from "../components/PortSetting";
import Info from '../components/Info';
export default class DisplayCardInfo extends React.Component {
  constructor(props){
    super(props);
    var inputPath = window.location.href;
    var ipath1 = "http://".length;
    var stop = inputPath.replace("http://","http_//");
    var ipath2 = stop.indexOf(":");
    var subipPath = inputPath.substring(ipath1,ipath2);
    var localFlag = false;
    if(subipPath.length == 0){
     errortmp.errormsg(errormsgHead,errormsgMethod3,"input ip setting is null");
    }
    else{
      if(subipPath == "localhost" || subipPath=="127.0.0.1"){
        localFlag = true;
      }
    }
    var cpuId=cardInfo.cards[this.props.cardSelect].cpuinfo1.id;
    var cpu = cardInfo.cards[this.props.cardSelect].cpuinfo1.cpu;
    var gpu = cardInfo.cards[this.props.cardSelect].cpuinfo1.gpu;
    if(this.props.cpuSelect == 2){
      cpuId=cardInfo.cards[this.props.cardSelect].cpuinfo2.id;
      cpu = cardInfo.cards[this.props.cardSelect].cpuinfo2.cpu;
      gpu = cardInfo.cards[this.props.cardSelect].cpuinfo2.gpu;
    }



    this.state = {
      localFlag:localFlag,
      cardSelect:this.props.cardSelect,
      cpuSelect:this.props.cpuSelect,
      cpu:cpu,
      gpu:gpu,
      cpuId:cpuId,
      update:false,
      cpuid:null,
      carid:null,
      warnkey:null,
      qtsName:cardInfo.cards[this.props.cardSelect].cpuinfo1.info.qtsName,
      updatedQtsName:null
    }
    this.timer = this.timer.bind(this);
    this.urlOpen = this.urlOpen.bind(this);
    this.modifyPort_callback = this.modifyPort_callback.bind(this);
    this.updateData=this.updateData.bind(this);
    this.updateData_callback=this.updateData_callback.bind(this);
    this.portSetting_click = this.portSetting_click.bind(this);
  }

//cpu start
  timer(){
      var flag = false;
      var cpu = 0;
      var gpu = 0;
      if(cardInfo.cards.length>0){
        var cardusage = cardInfo.cards[this.state.cardSelect].cpuinfo1.cpu;
        if(this.state.cpuSelect==1){
          cpu = cardInfo.cards[this.state.cardSelect].cpuinfo1.cpu;
          gpu = cardInfo.cards[this.state.cardSelect].cpuinfo1.gpu;
        }
        else{
          cpu = cardInfo.cards[this.state.cardSelect].cpuinfo2.cpu;
          gpu = cardInfo.cards[this.state.cardSelect].cpuinfo2.gpu;
        }
        if(this.state.cpu != cpu){
          flag = true;
        }
        if(this.state.gpu != gpu){
          flag = true;
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

  modifyPort(name,cardid,cpuid){
	     var name = name;
		 update_cardName(name,cardid,cpuid,this.modifyPort_callback);
	 }
  modifyPort_callback(resp){
	  var result = resp.result;

	  if(result == 'Success') {
       this.updateData();
	  }else{
		 //this.updateData();
     console.log("Portmodification failed :(");
	  }
	}
  updateData(){
    get_cardInfo(this.updateData_callback);
  }
  updateData_callback(){
    var tmp = this.state.update;

    this.setState({
      update:!tmp
    });
  }

  portSetting_click(){
    this.refs.portset.openModal();
  }

  HandlerResponse(respType, respValue, respComponent){
    if(respType == true){
      var len, validateFlag;
      len = respValue.length;

      if(len > 0 && len <= 14){
          var re = /^[a-zA-Z0-9]+$/;
          validateFlag = re.test(respValue);//(respValue) => extract(str, "[0-9a-zA-Z]+");

          if(validateFlag == true){
            var cpuid = cardInfo.cards[this.state.cardSelect].cpuinfo1.id;
            var cardid = cardInfo.cards[this.state.cardSelect].id;
            this.setState({updatedQtsName: respValue});
            this.modifyPort(respValue,cardid,cpuid);
          }else if(validateFlag == false){
            this.refs.FailMsg.updateContent("warning","Tip","The server name must contain 1 to 14 characters and can be combination of alphabets (A-Z and a-z),numbers(0-9), and dash(-). Space and period(.)are not allowed.");
            this.refs.FailMsg.openModal();
          }
      }
      else{
        this.refs.FailMsg.updateContent("warning","Tip","The server name must contain 1 to 14 characters and can be combination of alphabets (A-Z and a-z),numbers(0-9), and dash(-). Space and period(.)are not allowed.");
        this.refs.FailMsg.openModal();
      }


    }else if(respType == false){

    }
  }

  render() {
      const mic_card ='../../img/ic_card.png';
      const mic_cpu ='../../img/ic_cpu.png';
      const mic_ram ='../../img/ic_ram.png';
      const mic_ip ='../../img/ic_ip.png';
      const mqts ='../../img/qts_lite_24.png';
      const edit_name = '../../img/btn_aciton_edit_active.png'
      var choose = this.state.cpuSelect;
      var cpu_str = "CPU"+choose;
      var gpu_str = "GPU"+choose;
      var uuu ="";
      if(this.state.localFlag){
        uuu=cardInfo.cards[this.state.cardSelect].cpuinfo1.info.ip;
        if(this.state.cpuSelect==2){
          uuu=cardInfo.cards[this.state.cardSelect].cpuinfo2.info.ip;
        }
      }
      else{
        uuu=cardInfo.hostIP+":"+cardInfo.cards[this.state.cardSelect].cpuinfo1.info.qtsPort;
        if(this.state.cpuSelect==2){
          uuu=cardInfo.hostIP+":"+cardInfo.cards[this.state.cardSelect].cpuinfo2.info.qtsPort;
        }
      }
      const tmp1info = cardInfo.cards[this.state.cardSelect].cpuinfo1.info;
      const tmp2info = cardInfo.cards[this.state.cardSelect].cpuinfo2.info;
      var ip = tmp1info.ip;
      var cpuid = cardInfo.cards[this.state.cardSelect].cpuinfo1.id;
      var cardid = cardInfo.cards[this.state.cardSelect].id;
      var qtsName = cardInfo.cards[this.state.cardSelect].cpuinfo1.info.qtsName;
      var cpuV=tmp1info.cpuVersion.Version;
      var cpuM=tmp1info.cpuMemory;
      var qtsport = tmp1info.qtsPort;
      var icecastport = tmp1info.icecastPort;
      var rtmpport = tmp1info.rtmpPort;
      var httpport = tmp1info.httpPort;


      if(this.state.cpuSelect==2){
        ip = tmp2info.ip;
        qtsName =tmp2info.qtsName;
        cpuid = cardInfo.cards[this.state.cardSelect].cpuinfo2.id;
        cpuV = tmp2info.cpuVersion.Version;
        cpuM = tmp2info.cpuMemory;
        cardid = cardInfo.cards[this.state.cardSelect].id;
        qtsport = tmp2info.qtsPort;
        icecastport = tmp2info.icecastPort;
        rtmpport = tmp2info.rtmpPort;
        httpport = tmp2info.httpPort;
      }


    //---UI
    const marginRightPink="6px";
    const marginLeftBrown="25px";

    return (
      <div>
          <table>
             <thead>
               <tr style={{height:"36px"}}>
                <th style={{minWidth:"230px",width:"22.5%",backgroundColor: 'white'}}><div style={{marginLeft:marginLeftBrown}}>CPU Usage</div> </th>
                <th style={{minWidth:"230px",width:"22.5%",backgroundColor: 'white'}}><div style={{marginLeft:marginLeftBrown}}>GPU Usage</div></th>
                <th style={{minWidth:"566px",width:"55%",backgroundColor: 'white',display: "table-cell",verticalAlign: "middle",lineHeight:"36px"}}>
                    <div style={{float:"left",marginLeft:marginLeftBrown}}>{this.state.cpuId} Information</div>
                    <div style={{float:"right", marginRight:"10px"}}  >
                        <button class="button_normal  button_yes " onClick={this.portSetting_click} >Port Settings</button>
                    </div>
                    <div style={{clear:"both"}}></div>
                </th>
               </tr>
             </thead>
             <tbody>
               <tr>
                 <td style={{textAlign:"center",backgroundColor: 'white'}}><ProgressBar className="cpuTextRegular" typeName={'cpu'}  progress_cpu ={this.state.cpu} target_name={cpu_str}/></td>
                 <td style={{textAlign:"center",backgroundColor: 'white'}}><ProgressBar className="gpuText_Regular" typeName={'gpu'} progress_cpu ={this.state.gpu} target_name={gpu_str}/></td>
                 <td style={{backgroundColor: 'white'}}>
                   <div>
                     <div style={{float:"left", marginLeft:marginLeftBrown, marginRight:marginRightPink}}>
                        <img src={mic_cpu} alt width={"20px"} height={"20px"}/>
                      </div>
                      <div style={{width:"100px",float:"left",display:"inline",fontSize: 14}}>CPU</div>
                      <div style={{float:"left"}}>{cpuV}</div>
                      <div style={{clear:"both"}}></div>
                   </div>
                   <br />
                   <div>
                     <div style={{float:"left", marginLeft:marginLeftBrown, marginRight:marginRightPink}}><img src={mic_ram} alt width={"20px"} height={"20px"}/></div><div style={{width:"100px",float:"left"}}>Memory</div><div style={{float:"left"}}>{cpuM}</div>
                     <div style={{clear:"left"}}></div>
                   </div>
                   <div><div className="rowHr" style={{marginLeft:marginLeftBrown}}></div></div>

                   <div style={{height:"40px"}}>
                      <div onClick={x=>this.urlOpen(uuu)}  style={{float:"left",display:"inline",marginLeft:marginLeftBrown, marginRight:marginRightPink}}>
                        <img style={{cursor: 'pointer'}} src={mqts} alt width={"20px"} height={"20px"}/>
                      </div>
                      <div style={{width:"100px",float:"left",display:"inline",fontSize: 14}}>QTS Name</div>


                      <InlineEdit inLineValue={qtsName} urlLink={uuu} handleResponse={this.HandlerResponse.bind(this)}/>
                        <div style={{clear:"both",display:"inline"}}></div>
                  </div>
                 </td>
               </tr>
             </tbody>
           </table>
           <PortSetting ref="portset" cardid={cardid} cpuid={cpuid} qtsName={qtsName} ip={ip} qtsport={qtsport} icecastport={icecastport} rtmpport={rtmpport} httpport={httpport} update_callback={this.updateData_callback}/>
           <Info ref="FailMsg" type="error" title="" content=""/>
      </div>
    );
  }
}
