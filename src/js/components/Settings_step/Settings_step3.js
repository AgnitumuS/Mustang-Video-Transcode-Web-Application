import React from "react";
import _        from 'lodash';
import JobList from './Settings_step3_list'
import '../../css/normal.css';
import '../../css/table.css';
export default class Settings_step3 extends React.Component {
  constructor(props){
    super(props);
    var dataConfig  = props.getDataConfig();
    var mycontentData = dataConfig.outputs;
    var myupdateStatus = false;
    var FrameRate_QP_value = false;
    if(mycontentData==undefined){
      myupdateStatus = true;
      mycontentData=[{
       "resolution" :"1920x1080",
       "resolutionid" : 3,
       "framerate" : 30,
       "bitrateenable" : FrameRate_QP_value,
       "vquality" : "23",
       "vbitrate" : "5"
      }];
    }
    else {
      var mycontentData0=mycontentData[0];
      if(mycontentData0 != null ){
        FrameRate_QP_value = mycontentData0.bitrateenable;
      }
    }
    var bitrateUnUse = true;
    var dataOutput = dataConfig.output;
    if(dataOutput.vcodecid ==1 ||dataOutput.vcodecid ==2 ){
      bitrateUnUse = false;
    }
    var qpRange = [];
    var qpRangeSBox = [0,0,20,0,0];
    var qpRangeEBox = [51,51,70,255,30];
    var qpRangeS = qpRangeSBox[dataOutput.vcodecid-1];
    var qpRangeE = qpRangeEBox[dataOutput.vcodecid-1];

    for(var i = qpRangeS;i <= qpRangeE ;i++){
      qpRange.push({ Vquality_value: i, label: i.toString() });
    }

    this.state = {
      FrameRate_QP_value : FrameRate_QP_value,
      contentData:mycontentData,
      updateStatus:myupdateStatus,
      bitrateUnUse:bitrateUnUse,
      qpRange:qpRange,
      titleDescription:"Choose the output video quailty settings (QP or Bitrate) and add Resolution settings(Maximum 4)."
    };
    this.set_FrameRate_QP = this.set_FrameRate_QP.bind(this);
    this.addItem = this.addItem.bind(this);
    this.checkData = this.checkData.bind(this);
    this.status_onChange=this.status_onChange.bind(this);
    this.remove_click=this.remove_click.bind(this);
  }
  set_FrameRate_QP(data) {
    var mycontentData = this.state.contentData;
    var result = _.transform(mycontentData, function(result, value, key) {
      var tmp = value;
      tmp.bitrateenable=data;
      result[key]=tmp;
    });
    this.setState({ FrameRate_QP_value : data ,contentData:result});
  }

  componentWillMount(){
  }
  componentDidMount(){
    if(this.state.updateStatus){
      this.checkData();
    }
  }
  componentWillUnmount(){
  }
  componentDidUpdate(){
    if(this.state.updateStatus){
      this.checkData();
    }
  }
  status_onChange(index,title,val){
    var status = true;
    var mycontentData = this.state.contentData;
    switch (title) {
      case "resolution":
        mycontentData[index].resolution=val;
        break;
      case "resolutionid":
        mycontentData[index].resolutionid=val;
        break;
      case "framerate":
        mycontentData[index].framerate=val;
        break;
      case "vquality":
        mycontentData[index].vquality=val;
        break;
      case "vbitrate":
        mycontentData[index].vbitrate=val;
        break;
      default:
      status = false;
    }
    if(status){
      this.setState({contentData:mycontentData,updateStatus:true});
    }
  }
  remove_click(index){
    var mycontentData = this.state.contentData;
    if(mycontentData.length==1){
      return;
    }
    mycontentData.splice(index, 1);
    this.setState({contentData:mycontentData,updateStatus:true});
  }
  addItem() {
    var mycontentData = this.state.contentData;
    mycontentData.push({
     "resolution" :"1920x1080",
     "resolutionid" : 3,
     "framerate" : 30,
     "bitrateenable" : this.state.FrameRate_QP_value,
     "vquality" : "23",
     "vbitrate" : "25"
    });
    this.setState({ contentData : mycontentData,updateStatus:true})
  }
  checkData(){
      this.setState({updateStatus:false});
      var state=false;
      var item=[];

      state=true;
      var mycontentData = this.state.contentData;
      if(mycontentData != undefined){
        state=true;
        item=mycontentData;
      }

      if( state){
        this.props.setDataConfig(item);
      }
      this.props.setcheckData(state);
  }

  render() {
    var title = ["Resolution","FrameRate"];
    if(!this.state.FrameRate_QP_value){
      title.push("QP Value");
    }
    else{
      title.push("BitRate");
    }
    title.push("Remove");
    var TitleList = [];

    TitleList = title.map((x,i)=><th id="css_th2" key={i}>{x}</th>);
    var Process_Job_List1=[];
    const contentData = this.state.contentData;
    Process_Job_List1 = contentData.map((x, i) => <JobList key={Math.random()} obj={x} index={i} qpRange={this.state.qpRange} FrameRate_QP_value={this.state.FrameRate_QP_value} status_onChange={this.status_onChange} remove_click={this.remove_click} deleteStatus={i>0}/>);
    var addItemUse = false;
    if(contentData.length < 4){
      addItemUse = true;
    }

    //---UI
    const marginBlue="20px";
    const marginYellow="10px";
    const marginPurple="30px";
    const marginOrange="35px";

    //--checkbox
    const checkboxUseEnable=false;
    return (
      <div>
        <div style={{marginTop:marginBlue}}></div>
        <div style={{marginLeft:marginOrange}}>{this.state.titleDescription}</div>
        <div style={{marginTop:marginBlue}}></div>
        <div>
          <div style={{float:"left",width:"115px", marginLeft:marginOrange, marginRight:marginYellow}}>Quality Settings:</div>
            <form>
              <div style={{width:"90px",float:"left"}}>
                <label><div style={{float:"left"}}><input name="group1" type="radio" value="BitRate" disabled={this.state.bitrateUnUse} checked={this.state.FrameRate_QP_value} onChange={st=>this.set_FrameRate_QP(true)}/></div><div style={{float:"left",marginLeft:marginYellow}}>BitRate</div></label>
              </div>
              <div style={{float:"left", marginLeft:marginBlue}}>
                <label><div style={{float:"left"}}><input name="group1" type="radio" value="QP" checked={!this.state.FrameRate_QP_value} onChange={st=>this.set_FrameRate_QP(false)}/></div><div style={{float:"left", marginLeft:marginYellow}}>QP</div></label>
              </div>
            </form>
          <div style={{clear:"both"}}></div>
        </div>
        <div style={{marginTop:marginBlue}}></div>
        <div style={{height:"32px",marginBottom:"1px"}}>
          <button class="button_normal  button_yes" disabled={!addItemUse} onClick={this.addItem}>+ Add</button>
        </div>
        <table id="css_table" class="table-striped table-hover table-users table-bordered ">
         <thead>
           <tr >
             <td id="css_th"><input disabled={!checkboxUseEnable} type="checkbox" value=""/></td>
             {TitleList}
           </tr>
         </thead>
         <tbody>
            {Process_Job_List1}
         </tbody>
       </table>
     </div>
    );
  }
}
