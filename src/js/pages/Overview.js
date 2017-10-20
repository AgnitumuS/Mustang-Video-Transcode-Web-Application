import React from "react";
import { appConfig,cardInfo } from '../config';
import ProgressBar from "../components/layout/ProgressBar";
import '../css/overview.css';
import { Route, Link} from "react-router";
import '../css/style.css';
//POP
import Info from '../components/Info';

export default class Overview extends React.Component {
  constructor(props){
    super(props);
    var url = [];
    var cpuList = [];
    var gpuList = [];
    var inputPath = window.location.href;

    var ipath1 = "http://".length;
    var stop = inputPath.replace("http://","http_//");
    var ipath2 = stop.indexOf(":");
    var subipPath = inputPath.substring(ipath1,ipath2);

    if(subipPath.length == 0){
      errortmp.errormsg(errormsgHead,errormsgMethod3,"input ip setting is null");
    }
    else{
      if(subipPath == "localhost" || subipPath=="127.0.0.1"){
        var j = 0;
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
        var j = 0;
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
    this.state = {
      cpu:cpuList,
      gpu:gpuList,
      pop:url
    }

    this.showMessageBox = this.showMessageBox.bind(this);
  }

  componentWillMount(){
  }
  openModal () {
    this.setState({ modalActive: true })
  }
  closeModal () {
    this.setState({ modalActive: false })
  }
  openModal2 () {
    this.setState({ modalActive2: true })
  }

  closeModal2 () {
    this.setState({ modalActive2: false })
  }

//cpu start
  timer(){
      var flag = false;
      var cpu = [];
      var gpu = [];
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
        this.intervalId =setInterval(this.timer.bind(this),1000)
    }

    componentWillUnmount(){
       clearInterval(this.intervalId);
    }
//cpu end


  urlOpen(uurl) {
    var urlStr = "http://"+uurl;
    window.open(urlStr, "_blank", "toolbar=no,scrollbars=no,resizable=no,top='300px',left='300px',width='800px',height='600px'");
  }
  onHover() {
     window.open("config", "_blank", "toolbar=no,scrollbars=no,resizable=no,top='100px',left='300px',width='900px',height='500px'");
  }

  renderCardView()
  {

  }

  renderCpuList(){
    var CpuList = [];

    if(cardInfo.cards){
        for (var i = 0; i < cardInfo.cardNum; i++) {
          CpuList.push(this.renderCPU(i, cardInfo.cards[i]));
        }
        return CpuList;
    }

  }

  showCpuDetail(id)
  {
    var params = {
      'id' : id,
    }
  }

  showPopup()
  {

  }

  redirectToCard(selectedCard){
      // <Link to={"Process" + selectedCard} />
  }

  renderCPU(i, row) {
    var mic_ram ="i_ram";
    var mic_temp = "i_temp";
    var mic_ram2 ="i_ram";
    var mic_temp2 = "i_temp";
    var mic_ip ="i_ip";
    var mqts ="i_qts";
    var mic_upload = "i_upload";
    var mic_download = "i_download";
    var mic_more = "i_more";
    var TemperatureStyle = "textMemoryTemp";
    var MemoryStyle = "textMemoryTemp";
    var TemperatureStyle2 = "textMemoryTemp";
    var MemoryStyle2 = "textMemoryTemp";
    var real = 2*i ;
    real = Number(real);
    var uuu1 =this.state.pop[real];
    var uuu2 =this.state.pop[real+1];
    var fahrenheitTemp1 = 0 , fahrenheitTemp2 = 0;

    const marginYellow="10px";

    if(cardInfo.cards){
      var CpuList = [];

      if(row.cpuinfo1.usedMemoryPrecentage > 70){
        MemoryStyle = "textMemoryTempAlert";
        mic_ram ="i_ram_warn";
      }

      if(row.cpuinfo1.temperature > 70){
        TemperatureStyle = "textMemoryTempAlert";
        mic_temp ="i_temp_warn";
      }

      if(row.cpuinfo2.usedMemoryPrecentage > 70){
        MemoryStyle2 = "textMemoryTempAlert";
        mic_ram2 ="i_ram_warn";
      }

      if(row.cpuinfo2.temperature > 70){
        TemperatureStyle2 = "textMemoryTempAlert";
        mic_temp2 ="i_temp_warn";
      }

      return(
          <div key={"divCard"+i} id="divCard1" className="infoPanel">
              <div className="titlePanel">
                  <div className = {"i_base i_icCard"}/>
                  <span className="mainTitle"> {row.id} </span>
              </div>
              <div className="mainTitleHr"></div>
              <div id="divCardBody" style={{width:"100%"}}>
                  <div className="leftPanel">
                      <div className="d1">
                          <table  class="bottomBorder">
                            <tbody>
                              <tr>
                                  <td style={{marginBottom:marginYellow}}>
                                       <div className="txtCpuType" style={{float:"left",marginRight:marginYellow}}>{row.cpuinfo1.id}</div>
                                       <div style={{clear:"left"}} />
                                  </td>
                              </tr>
                              <tr>
                                <td style={{marginBottom:marginYellow}}>
                                  <div style={{float:"left",marginLeft:marginYellow}}><div className = {"i_base " + mic_ram}/></div>
                                  <div className={MemoryStyle} style={{float:"left",marginLeft:marginYellow}}>{row.cpuinfo1.memoryUsage} / {row.cpuinfo1.info.cpuMemory}</div>
                                  <div style={{clear:"left"}} />
                                </td>
                              </tr>
                              <tr>
                                <td style={{marginBottom:marginYellow}}>
                                  <div style={{float:"left" ,marginLeft:marginYellow}}><div className = {"i_base " + mic_temp}/></div>
                                  <div className={TemperatureStyle} style={{float:"left",marginLeft:marginYellow}}>{row.cpuinfo1.temperature} °C/  {parseInt(row.cpuinfo1.temperature * 1.8 + 32)}°F</div>                                  <div style={{clear:"left"}} />
                                  <div style={{clear:"left"}} />
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <div style={{float:"left"}} className = {"i_base " + mic_upload}/>
                                  <div className="textTxRx" style={{float:"left", marginLeft:"4px"}}>{row.cpuinfo1.TX}</div>
                                  <div  style={{float:"left"}} className = {"i_base " + mic_download}/>
                                  <div className="textTxRx" style={{float:"left",marginLeft:"4px", display: "inlineBlock"}}>{row.cpuinfo1.RX}</div>
                                  <div style={{clear:"left"}}></div>
                                </td>
                              </tr>
                              <tr><td><div className="rowHr"></div></td></tr>
                              <tr>
                                  <td >
                                      <div style={{display: 'inline',cursor: "pointer"}} onClick={x=>this.urlOpen(uuu1)}>
                                        <div style={{float:"left"}}><div className = {"i_base " + mqts}/></div>
                                        <a className="urlStyle" style={{float:"left",marginLeft:marginYellow}}>{row.cpuinfo1.info.ip}</a>
                                        <div style={{clear:"left"}} />
                                      </div>
                                  </td>
                              </tr>
                            </tbody>
                          </table>
                      </div>

                      <div className="d2">
                          <span className="txtCPUUsage"> CPU Usage </span>
                          <div className="cpuProgress" ><ProgressBar progress_cpu ={row.cpuinfo1.cpu} target_name={'CPU1'} target_page={1} cardId={row.id} cpuId={row.cpuinfo1.id} cpuSelect={1} cardSelect={i}/></div>
                      </div>

                      <div className="d3"> <span className="txtCPUUsage"> GPU Usage </span>
                        <div className="cpuProgress"><ProgressBar progress_cpu ={row.cpuinfo1.gpu} target_name={'GPU1'} target_page={0} /></div>
                      </div>

                      <div className="d4">
                          <Link to={"Process" + i}>
                            <div className = {"i_base " + mic_more}  />
                          </Link>
                      </div>

                  </div>

                  <div className="rightPanel">
                      <div className="d1" >
                          <table  class="bottomBorder">
                            <tbody>
                              <tr>
                                  <td style={{marginBottom:marginYellow}}>
                                       <div className="txtCpuType" style={{float:"left",marginRight:marginYellow}}>{row.cpuinfo2.id}</div>
                                       <div style={{clear:"left"}}></div>
                                  </td>
                              </tr>
                              <tr>
                                <td style={{marginBottom:marginYellow}}>
                                  <div style={{float:"left",marginLeft:marginYellow}}><div className = {"i_base " + mic_ram2}/></div>
                                  <div className={MemoryStyle2} style={{float:"left",marginLeft:marginYellow}}>{row.cpuinfo2.memoryUsage} / {row.cpuinfo2.info.cpuMemory}</div>
                                  <div style={{clear:"left"}}></div>
                                </td>
                              </tr>
                              <tr>
                                <td style={{marginBottom:marginYellow}}>
                                  <div style={{float:"left" ,marginLeft:marginYellow}}><div className = {"i_base " + mic_temp2}/></div>
                                  <div className={TemperatureStyle2} style={{float:"left",marginLeft:marginYellow}}>{row.cpuinfo2.temperature} °C/  {parseInt(row.cpuinfo2.temperature * 1.8 + 32)}°F</div>
                                  <div style={{clear:"left"}}></div>
                                </td>
                              </tr>
                              <tr >
                                <td>
                                    <div style={{float:"left"}} className = {"i_base " + mic_upload}/>
                                    <div className="textTxRx" style={{float:"left", marginLeft:"4px"}}>{row.cpuinfo2.TX}</div>
                                    <div  style={{float:"left"}} className = {"i_base " + mic_download}/>
                                    <div className="textTxRx" style={{float:"left",marginLeft:"4px", display: "inlineBlock"}}>{row.cpuinfo2.RX}</div>
                                    <div style={{clear:"left"}} />
                                </td>
                              </tr>
                              <tr><td><div className="rowHr"></div></td></tr>
                              <tr>
                                  <td >
                                      <div style={{display: 'inline',cursor: "pointer"}} onClick={x=>this.urlOpen(uuu2)}>
                                        <div style={{float:"left"}}><div className = {"i_base " + mqts}/></div>
                                        <a className="urlStyle" style={{float:"left",marginLeft:marginYellow}}>{row.cpuinfo2.info.ip}</a>
                                        <div style={{clear:"left"}}></div>
                                      </div>

                                  </td>
                              </tr>
                            </tbody>
                          </table>
                      </div>

                      <div className="d2"> <span className="txtCPUUsage"> CPU Usage </span>
                        <div className="cpuProgress"><ProgressBar progress_cpu ={row.cpuinfo2.cpu} target_name={'CPU1'}  target_page={1} cardId={row.id} cpuId={row.cpuinfo2.id} cpuSelect={2} cardSelect={i}/></div>
                      </div>

                      <div className="d3"> <span className="txtCPUUsage"> GPU Usage </span>
                        <div className="cpuProgress"><ProgressBar  progress_cpu ={row.cpuinfo2.gpu} target_name={'GPU1'} target_page={0} /></div>
                      </div>

                      <div className="d4">
                        <Link to={"Process" + i} query={{id:1}} >
                            <div className = {"i_base " + mic_more}  />
                        </Link>
                      </div>
                  </div>
              </div>
          </div>
        )
    }
  }

  showMessageBox(type) {
   //1:info, 2:warning, 3:help, 4:error

    if(type == 1){
      this.refs.FailMsg.updateContent("info","No Fail Log","Information content");
      this.refs.FailMsg.openModal();
    }else if(type == 2){
      this.refs.FailMsg.updateContent("warning","No Fail Log","Warning Content");
      this.refs.FailMsg.openModal();
    }else if(type == 3){
      this.refs.FailMsg.updateContent("help","No Fail Log","/help Content");
      this.refs.FailMsg.openModal();
    }else if(type == 4){
      this.refs.FailMsg.updateContent("error","No Fail Log","Error Content");
      this.refs.FailMsg.openModal();
    }

  }

  render() {
    const marginBlue="0px";
    return (
      <div className="overviewPage" style={{marginLeft:marginBlue}}>
          <div id="mainTitleBar" style={{paddingTop:marginBlue, marginBottom:marginBlue}}>
              <span className="mainTitleStyle">Overview</span>
              <Info ref="FailMsg" title="" content="" type="help"/>
          </div>
          <div style={{marginBottom:marginBlue,overflowY: 'scroll',height:'calc(100vh - 100px)'}}>{
            this.renderCpuList()}
          </div>


      </div>
    );
  }
}
