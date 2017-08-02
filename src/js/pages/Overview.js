import React from "react";
import { appConfig,cardInfo } from '../config';
import ProgressBar from "../components/layout/ProgressBar";
import '../css/overview.css';

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
      if(subipPath == "localhost"){
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

  renderCPU(i, row) {

    const mic_card ='/img/ic_card.png';
    const mic_cpu ='/img/ic_cpu.png';
    const mic_ram ='/img/ic_ram.png';
    const mic_ip ='/img/ic_ip.png';
    const mqts ='/img/QTS logo_24.png';

    var real = 2*i ;
    real = Number(real);
    var uuu1 =this.state.pop[real];
    var uuu2 =this.state.pop[real+1];

    //---UI
    const imgW="24px";
    const imgH="24px";
    const marginYellow="10px";


    if(cardInfo.cards){
      var CpuList = [];

        return(
          <div key={"divCard"+i} id="divCard1" className="infoPanel">
              <div className="titlePanel">
                  <img src={mic_card} alt width={imgW} height={imgH} />
                  <span className="mainTitle"> {row.id} </span>
              </div>
              <div className="mainTitleHr"></div>
              <div id="divCardBody">
                  <div className="leftPanel">
                      <div className="d1">
                          <table  class="bottomBorder">
                            <tbody>
                              <tr>
                                  <td >
                                       <div style={{float:"left"}}><img src={mic_cpu} alt width={imgW} height={imgH} /></div>
                                       <div className="cardInfoStyle" style={{float:"left",marginLeft:marginYellow}}>{row.cpuinfo1.id}</div>
                                       <div style={{float:"left", marginLeft:marginYellow}}><Info title="titleTest" content="contentTest"/></div>
                                       <div style={{clear:"left"}}></div>
                                  </td>
                              </tr>
                              <tr>
                                <td >
                                  <div style={{float:"left"}}><img src={mic_ram} alt width={imgW} height={imgH} /></div>
                                  <div className="cardInfoStyle" style={{float:"left",marginLeft:marginYellow}}>{row.cpuinfo1.info.cpuMemory}</div>
                                  <div style={{clear:"left"}}></div>
                                </td>
                              </tr>
                              <tr><td><div className="rowHr"></div></td></tr>
                              <tr>
                                  <td >
                                      <div style={{display: 'inline',cursor: "pointer"}} onClick={x=>this.urlOpen(uuu1)}>
                                        <img style={{float:"left"}} src={mqts} width={imgW} height={imgH} />
                                        <a className="urlStyle" style={{float:"left",marginLeft:marginYellow}}>{row.cpuinfo1.info.ip}</a>
                                      </div>
                                      <div style={{float:"left", marginLeft:marginYellow}}><Info title="titleTest" content="contentTest"/></div>
                                      <div style={{clear:"both"}}></div>
                                  </td>
                              </tr>
                            </tbody>
                          </table>
                      </div>
                      <div className="d2"> <span className="cardInfoStyle"> CPU Usage </span>
                          <div className="cpuProgress"><ProgressBar  progress_cpu ={row.cpuinfo1.cpu} target_name={'CPU1'}/></div>
                      </div>

                      <div className="d3"> <span className="cardInfoStyle"> GPU Usage </span>
                        <div className="cpuProgress"><ProgressBar  progress_cpu ={row.cpuinfo1.gpu} target_name={'GPU1'} /></div>
                      </div>
                      <div className="d4 imgPosition">  </div>

                  </div>

                  <div className="rightPanel">
                      <div className="d1">
                          <table  class="bottomBorder">
                            <tbody>
                              <tr>
                                  <td>
                                    <div style={{float:"left"}}><img src={mic_cpu} alt width={imgW} height={imgH}/></div>
                                    <div className="cardInfoStyle" style={{float:"left",marginLeft:marginYellow}}>{row.cpuinfo2.id}</div>
                                    <div style={{float:"left", marginLeft:marginYellow}}><Info title="titleTest" content="contentTest"/></div>
                                    <div style={{clear:"left"}}></div>
                                  </td>
                              </tr>
                              <tr>
                                <td >
                                  <div style={{float:"left"}}><img src={mic_ram} alt width={imgW} height={imgH} /></div>
                                  <div className="cardInfoStyle" style={{float:"left",marginLeft:marginYellow}}>{row.cpuinfo2.info.cpuMemory}</div>
                                  <div style={{clear:"left"}}></div>
                                </td>
                              </tr>
                              <tr><td><div className="rowHr"></div></td></tr>
                              <tr>
                                  <td >
                                       <div style={{display: 'inline',cursor: "pointer"}} onClick={x=>this.urlOpen(uuu2)}>
                                         <img style={{float:"left"}} src={mqts} width={imgW} height={imgH} />
                                         <a className="urlStyle" style={{float:"left",marginLeft:marginYellow}}>{row.cpuinfo2.info.ip}</a>
                                       </div>
                                       <div style={{float:"left", marginLeft:marginYellow}}><Info title="titleTest" content="contentTest"/></div>
                                       <div style={{clear:"both"}}></div>
                                  </td>
                              </tr>
                            </tbody>
                          </table>
                      </div>
                      <div className="d2"> <span className="cardInfoStyle"> CPU Usage </span>
                          <div className="cpuProgress"><ProgressBar  progress_cpu ={row.cpuinfo2.cpu} target_name={'CPU1'}/></div>
                      </div>
                      <div className="d3"> <span className="cardInfoStyle"> GPU Usage </span>
                        <div className="cpuProgress"><ProgressBar  progress_cpu ={row.cpuinfo2.gpu} target_name={'GPU1'}/></div>
                      </div>
                      <div className="d4 imgPosition"></div>
                  </div>
              </div>
          </div>
        )
    }
  }

  render() {
    const marginBlue="20px";
    return (
      <div className="overviewPage" style={{marginLeft:marginBlue}}>
          <div id="mainTitleBar" style={{marginTop:marginBlue}}>
              <span className="mainTitleStyle">Overview</span>
          </div>
          <div style={{marginBottom:marginBlue}}>{this.renderCpuList()}</div>
      </div>
    );
  }
}
