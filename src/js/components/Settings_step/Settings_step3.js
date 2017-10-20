import React from "react";
import _        from 'lodash';
import JobList from './Settings_step3_list'
import '../../css/normal.css';
import '../../css/table.css';

import '../../css/settings.css';

export default class Settings_step3 extends React.Component {
  constructor(props){
    super(props);
    var dataConfig  = props.getDataConfig();
    var mycontentData = dataConfig.outputs;
    var mycontentDataId = {max:0,items:[],selectItems:[]};
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
      mycontentDataId.items.push(0);
      mycontentDataId.max = 1;
    }
    else {
      var mycontentData0=mycontentData[0];
      if(mycontentData0 != null ){
        FrameRate_QP_value = mycontentData0.bitrateenable;
      }
      mycontentData.map(function(x,i){mycontentDataId.items.push(i); mycontentDataId.max = i+1;});
    }
    var bitrateUnUse = true;
    var dataOutput = dataConfig.output;
    if(dataOutput.vcodecid ==1 ||dataOutput.vcodecid ==2 ){
      bitrateUnUse = false;
    }
    var qpRange = [];
    var qpRangeSBox = [0,0,20,0,0];
    var qpRangeEBox = [51,30,70,255,30];
    var qpRangeS = qpRangeSBox[dataOutput.vcodecid-1];
    var qpRangeE = qpRangeEBox[dataOutput.vcodecid-1];

    for(var i = qpRangeS;i <= qpRangeE ;i++){
      qpRange.push({ Vquality_value: i, label: i.toString() });
    }

    this.state = {
      FrameRate_QP_value : FrameRate_QP_value,
      contentData:mycontentData,
      contentDataId:mycontentDataId,
      allChecked: false,
      updateStatus:myupdateStatus,
      bitrateUnUse:bitrateUnUse,
      qpRange:qpRange,
      titleDescription:"1.Choose an output video quality index  (QP or Bitrate) .",
      titleDescription2:"2.Add resolution settings (Maximum 4)."
    };
    this.set_FrameRate_QP = this.set_FrameRate_QP.bind(this);
    this.addItem = this.addItem.bind(this);
    this.checkData = this.checkData.bind(this);
    this.status_onChange=this.status_onChange.bind(this);
    this.remove_click=this.remove_click.bind(this);
    this.remove_check=this.remove_check.bind(this);
    this.deleteOnClick=this.deleteOnClick.bind(this);
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
  remove_check(index,checked){
    var mycontentData = this.state.contentData;
    if(mycontentData.length==1){
      return;
    }
    var mycontentDataId = this.state.contentDataId;
    var num = mycontentDataId.items[index];
    if(checked){
      if(mycontentDataId.selectItems.length < (mycontentDataId.items.length-1)){
        mycontentDataId.selectItems.push(num);
      }
      else{
        return;
      }
    }
    else{
      var numSite=mycontentDataId.selectItems.indexOf(num);
      mycontentDataId.selectItems.splice(numSite, 1);
    }

    this.setState({contentData:mycontentData,updateStatus:true,contentDataId:mycontentDataId});
  }

  deleteOnClick(){
    var mycontentData = this.state.contentData;
    var mycontentDataId = this.state.contentDataId;
    var num, indexList, numSite,index;

    if(mycontentDataId.selectItems.length > 0)
    {
      for (var i= mycontentDataId.selectItems.length - 1 ; i >= 0; i--) {
        num = mycontentDataId.selectItems[i];

         index = mycontentDataId.items.indexOf(num);//map((o) => o).indexOf(num);
         //index1 = mycontentDataId.items.map((o) => o).indexOf(num);
         mycontentData.splice(index, 1);

         if(index != -1){
            mycontentDataId.items.splice(index, 1);
         }
         else{
          numSite=mycontentDataId.selectItems.indexOf(num);
          mycontentDataId.items.splice(numSite, 1);
         }
      }
      mycontentDataId.selectItems = [];
      mycontentDataId.selectItems.length=0;

      if(this.state.allChecked)
      {
        this.setState({allChecked:false});
      }
      this.setState({contentData:mycontentData,updateStatus:true,contentDataId:mycontentDataId});
    }

  }

  remove_click(index){
    var mycontentData = this.state.contentData;

        if(mycontentData.length==1){
          return;
        }
        mycontentData.splice(index, 1);
        var mycontentDataId = this.state.contentDataId;
        var num = mycontentDataId.items[index];
        var numSite=mycontentDataId.selectItems.indexOf(num);
        if(numSite!= -1){
          mycontentDataId.selectItems.splice(numSite, 1);
        }


    mycontentDataId.items.splice(index, 1);
    this.setState({contentData:mycontentData,updateStatus:true,contentDataId:mycontentDataId});
  }
  addItem() {
    var mycontentData = this.state.contentData;
    mycontentData.push({
     "resolution" :"1920x1080",
     "resolutionid" : 3,
     "framerate" : 30,
     "bitrateenable" : this.state.FrameRate_QP_value,
     "vquality" : "23",
     "vbitrate" : "5"
    });
    var mycontentDataId = this.state.contentDataId;
    var maxId=mycontentDataId.max;
    mycontentDataId.items.push(maxId);
    mycontentDataId.max += 1;
    this.setState({ contentData : mycontentData,updateStatus:true,contentDataId:mycontentDataId});
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

  onCheckkChange(event)
  {
    var update=false;
    var mycontentData = this.state.contentData;
    if(mycontentData.length==1){
      return;
    }
    var mycontentDataId = this.state.contentDataId;
    if(event.target.checked){

      if(mycontentDataId.items.length >1){
        var a = [];
        mycontentDataId.selectItems = a.concat(mycontentDataId.items);
        mycontentDataId.selectItems.splice(0, 1);

        update = true;
      }
    }
    else{
      mycontentDataId.selectItems = [];
      mycontentDataId.selectItems.length=0;
      update = true;
    }
    this.setState({ updateStatus:true,contentDataId:mycontentDataId, allChecked:event.target.checked});
  }

  render() {
	const marginBrown="12px";
    var title = ["Resolution","FrameRate"];
    if(!this.state.FrameRate_QP_value){
      title.push("QP Value");
    }
    else{
      title.push("BitRate");
    }
    title.push("Remove");
    var TitleList = [];

    TitleList = title.map((x,i)=><th style={{textAlign:'left',paddingLeft: marginBrown}} id="css_th2" key={i}>{x}</th>);
    var Process_Job_List1=[];
    const contentData = this.state.contentData;
    const mycontentDataId = this.state.contentDataId;
    var deleteStatusTmp = (contentData.length >1);
    Process_Job_List1 = contentData.map((x, i) => <JobList key={mycontentDataId.items[i]} checkStatus={mycontentDataId.selectItems.indexOf(mycontentDataId.items[i])!=-1} obj={x} index={i} qpRange={this.state.qpRange} FrameRate_QP_value={this.state.FrameRate_QP_value} status_onChange={this.status_onChange} remove_click={this.remove_click} remove_check={this.remove_check} deleteStatus={deleteStatusTmp}/>);
    var addItemUse = false;
    var deleteItemUse = true;
    if(mycontentDataId.selectItems.length > 0){
      deleteItemUse = false;
    }
    if(contentData.length < 4){
      addItemUse = true;
    }

    //---UI
    const marginBlue="20px";
    const marginYellow="10px";
    const marginPurple="30px";
    const marginOrange="35px";
    const marginGrape="8px";
    const marginTop="4px";
    const margin2Orange="70px";
    const i_addTask = '/img/btn_add_12.png';

    //--checkbox
    const checkboxUseEnable=true;
    return (
      <div>
        <div style={{marginTop:marginBlue}}></div>
        <div className="settings_step3_title" style={{marginLeft:margin2Orange}}>{this.state.titleDescription}<br />{this.state.titleDescription2}</div>
        <div style={{marginTop:marginBlue}}></div>
        <div >
          <div className="settings_step3_apart" style={{float:"left",width:"115px",marginLeft:margin2Orange,marginRight:marginYellow}}>Quality Settings:</div>
            <form>
              <div className="settings_step3_apart2" style={{width:"90px",float:"left"}}>
                <label><div style={{float:"left"}}><input name="group1" type="radio" value="BitRate" disabled={this.state.bitrateUnUse} checked={this.state.FrameRate_QP_value} onChange={st=>this.set_FrameRate_QP(true)}/></div><div style={{float:"left",marginLeft:marginYellow}}>BitRate</div></label>
              </div>
              <div  className="settings_step3_apart3" style={{float:"left", marginLeft:marginBlue}}>
                <label><div style={{float:"left"}}><input name="group1" type="radio" value="QP" checked={!this.state.FrameRate_QP_value} onChange={st=>this.set_FrameRate_QP(false)}/></div><div style={{float:"left", marginLeft:marginYellow}}>QP</div></label>
              </div>
            </form>
          <div style={{clear:"both"}}></div>
        </div>
        <div style={{marginTop:marginBlue}}></div>
        {/*<div style={{height:"32px",marginBottom:"1px"}}>#f6f8f9
          <button style={{marginLeft:marginOrange}} class="button_normal  button_yes" disabled={!addItemUse} onClick={this.addItem}>+ Add</button>
        </div>*/}
        <div style={{backgroundColor:'#f6f8f9',float: 'left', width:"12px",height:"32px",marginLeft:"70px"}}></div>
        <div className="settings_step3_bpart" style={{height:"32px",fontSize:"14px",color:"#000000",backgroundColor:"#f6f8f9",marginLeft:80,width:'730px'}}>Output Options
        <button style={{height:'26px',marginRight:marginGrape,float:'right',marginTop:'4px'}} class="button_normal  button_yes  i_button_del" disabled={deleteItemUse} onClick={this.deleteOnClick}>Remove</button>
        <button class="button_normal  button_yes i_button_add"  style={{height:'26px',marginRight:marginGrape,float: 'right',marginTop:'4px',background:'#FFFFFF'}} onClick={this.addItem} disabled={!addItemUse}> + Add </button></div>

        <table className="settings_step3_cpart" style={{width:'740px',marginLeft:margin2Orange,marginRight:marginOrange}} id="css_table" class="table-striped table-hover table-users table-bordered ">
         <thead>
           <tr >
             <td id="css_th"><input disabled={!checkboxUseEnable} type="checkbox" value="" onChange={this.onCheckkChange.bind(this)} checked={this.state.allChecked}/></td>
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
