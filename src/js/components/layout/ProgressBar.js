import React from "react";
import ProgressLabel from "react-progress-label";
import '../../css/style.css';

export default class ProgressBar extends React.Component
{
  displayName: 'AppBar';
  constructor(props) {
    super(props);
    const textStyleBox={"cpu":{"textStyleNormal":'#3c7fdd',"textStyleAlarm":'#e72d2e',"progressColor1":'#05b8e5',"progressColor2":'#1d6fde',"progressColor3":'#e72d2e'},
                  "gpu":{"textStyleNormal":'#00aab7',"textStyleAlarm":'#e72d2e',"progressColor1":'#2ed9e6',"progressColor2":'#00aab7',"progressColor3":'#e72d2e'}
    };
    var textStyleBoxUse = textStyleBox.cpu;
    var myname="cpu";
    if(this.props.target_name == undefined){
      myname = "cpu";
    }
    else{
      myname = this.props.target_name.toLowerCase();
      if(myname.indexOf("gpu")!=-1)
      {
        myname = "gpu";
      }
      else{
        myname = "cpu";
      }
    }

    if(myname=="gpu"){
      textStyleBoxUse = textStyleBox.gpu;
    }
    this.state = {
       textStyleNormal:textStyleBoxUse.textStyleNormal,
       textStyleAlarm: textStyleBoxUse.textStyleAlarm,
       progressColor1:textStyleBoxUse.progressColor1,
       progressColor2:textStyleBoxUse.progressColor2,
       progressColor3:textStyleBoxUse.progressColor3
    };
  }

  render() {
    var textStyle = {
      //'font-size': '25px',
      'fill': this.state.textStyleNormal
      //'textAnchor': 'middle'
    };
    var textAlert = {
      //'font-size': '20px',
      'fill': this.state.textStyleAlarm
      //'textAnchor': 'middle'
    }

    const progressNum = this.props.progress_cpu==null?0:Number(this.props.progress_cpu);
    const progressNumPercent = progressNum;

    var bgColor;
    var txtColor;

    var bgStyle = {

    }

    if(progressNum < 35)
    {
        bgColor = this.state.progressColor1;  //'linear-gradient(to right, #2ed9e6 , #00aab7)';
        txtColor = textStyle;

    }
    else if(progressNum < 75){
        bgColor = this.state.progressColor2;
        txtColor = textStyle;
    }
    else {
        bgColor = this.state.progressColor3;
        txtColor = textAlert;
    }


    return (

        <ProgressLabel
          progress={progressNum}
          startDegree={360}
          progressWidth={12}
          trackWidth={12}
          cornersWidth={6}
          size={130}
          fillColor="white"
          trackColor="#f4f4f4"
          progressColor={bgColor}>
          <text x="65" y="75" style={txtColor} className="cpuTextRegular">{progressNumPercent}</text><text x="100" y="75" style={txtColor}>%</text>
        </ProgressLabel>

    );
  }
}
