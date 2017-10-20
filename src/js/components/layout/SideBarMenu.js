import React from "react";
import { IndexLink, Link } from "react-router";
import { elastic as Menu } from 'react-burger-menu';
import '../../css/style.css';
import {cardInfo} from '../../config';

export default class SideMenu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: true,
      mOpen: this.props,
      subMenuDisplay: 0
    };
  }

  toggleCollapse() {

    const collapsed = !this.state.collapsed;
    const mOpen = !this.state.mOpen;
    this.setState({ collapsed , mOpen });
  }

  subMenuClick(){
      if(this.state.subMenuDisplay == 0){
        this.setState({subMenuDisplay: 1});
      } else if(this.state.subMenuDisplay == 1){
        this.setState({subMenuDisplay: 0});
      }

  }

  render() {
    const { location } = this.props;
    const { collapsed } = this.state;
    const { mOpen } = this.state.mOpen;
    var spanStyle, displayStyle, hrStyle, imgType;

    var tmp_process_List=[];
    for(var i=0;i < cardInfo.cardNum;i++){
      var str = "Process"+i;
      tmp_process_List.push(str);
    }
    var Process_List=[];

    if(this.props.isImageState == 1){
        spanStyle = {display: 'inline'};
    } else if(this.props.isImageState == 0){
        spanStyle =  {display: 'none'};
    }

    if(this.state.subMenuDisplay == 1){
      imgType = "i_side_collapse";
      displayStyle = {display: 'block'};
    }else if(this.state.subMenuDisplay == 0){
      imgType = "i_side_expand";
      displayStyle = {display: 'none'};

    }


    Process_List = tmp_process_List.map((x,i)=><div key={x+i}><Link className='bm-item-list testHover' to={x} onClick={this.toggleCollapse.bind(this)} style={{display: 'block', outline: 'none',  paddingLeft: '70px', height:'50px'}}> <span style={spanStyle}>{cardInfo.cards[i].id}</span></Link><div className="bm-div-hr" /></div>);

    var styles ;

    if(this.props.isImageState == 0){
        hrStyle = {
          padding : '0 0 0 0',
          margin: '0 0 0 0px',
          borderBottom: '1px solid rgba(255,255,255,0.2)',
          width: '70px'}
        styles = {
              bmBurgerBars: {
                background: 'red'
              },
              bmCrossButton: {
                height: '20px',
                width: '20px',
                left: '130px',
                top: '20px'
              },
              bmCross: {
                background: 'transparent'
              },
              bmMenu: {
                background: 'linear-gradient(to bottom, #1d6fde, #009ec6)',
                padding: '2.5em 1.5em 0',
                fontSize: '1.15em',
                widht: '100px',
                display: 'block'
              },
              bmMorphShape: {
                fill: 'pink'
              },
              bmItemList: {
                color: '#ECF5FF',
                padding: '0.8em',
                height:'48.75px',
                width: '100px',
                right : '70px',
                paddingLeft : '85px',
                paddingRight : '50px'
              },
              'bmItemList:hover' : {backgroundColor: 'red'},
              bmOverlay: {
                background: 'rgba(0, 0, 0, 0.3)'
              },
              bmMenuWrap: {
                'WebkitTransitionTimingFunction': 'ease-in-out',
                'WebkitTransition': 'width .3s',
                'transition': 'width .3s',
                left: '0',
                 width:  '100px'
              }
            }
      }

      else{
          hrStyle = {
          padding : '0 0 0 0',
          margin: '0 0 0 0',
          borderBottom: '1px solid rgba(255,255,255,0.2)',
          width: '240px'}

          styles = {
              bmBurgerBars: {
                background: 'red'
              },
              bmCrossButton: {
                height: '20px',
                width: '20px',
                left: '200px', //'150px',
                top: '20px'
              },
              bmCross: {
                background: 'transparent'
              },
              bmMenu: {
                background: 'linear-gradient(to bottom, #1d6fde, #009ec6)',
                width: '240px',
                padding: '2.5em 0 0',
                fontSize: '1.15em',
                display: 'block'
              },
              bmMorphShape: {
                fill: 'pink'
              },
              bmItemList: {
                color: '#ECF5FF',

                height:'60px'
              },
              bmOverlay: {
                background: 'rgba(0, 0, 0, 0.3)'
              },
              bmMenuWrap: {
                'WebkitTransitionTimingFunction': 'ease-in-out',
                'WebkitTransition': 'width .3s',
                'transition': 'width .3s',
                'transitionDelay': '1s',
                 width:  '45px',
                 left: '0'
              }
            }
      }

    return (
        <Menu {...this.props} styles={ styles } >
          <IndexLink className='bm-item-list testHover' to="/" onClick={this.toggleCollapse.bind(this)} >
            <div className="i_side_icons i_side_overview" />
            <span style={spanStyle}>Overview</span>
          </IndexLink>
         <div  style={hrStyle}/>
         <Link className='bm-item-list testHover' to="history" onClick={this.toggleCollapse.bind(this)}><div className="i_side_icons i_side_log"/><span style={spanStyle}>Log</span></Link>

          <div  style={hrStyle}/>
          <div >
              <div className="bm-item-list testHover" style={{height:"60px",cursor:"pointer"}} onClick={this.subMenuClick.bind(this)}>
                <div className="i_side_icons i_side_card" style={{ padding: '15px 0 15px 0', height: '60px'}}/>
                <span  style={spanStyle}>Cards Info<div style={{ marginLeft: '68px'}} className={imgType} /></span>
              </div>
              <div className="bm-div-hr" style={ hrStyle}/>
              <div style={displayStyle}>
                  {Process_List}
              </div>
          </div>
        </Menu>
    );
  }
}
