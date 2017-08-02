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
      mOpen: this.props
    };
  }

  toggleCollapse() {

    const collapsed = !this.state.collapsed;
    const mOpen = !this.state.mOpen;
    this.setState({ collapsed , mOpen });
  }

  render() {
    const { location } = this.props;
    const { collapsed } = this.state;
    const { mOpen } = this.state.mOpen;

    var tmp_process_List=[];
    for(var i=0;i < cardInfo.cardNum;i++){
      var str = "Process"+i;
      tmp_process_List.push(str);
    }
    var Process_List=[];
    //Process_List = tmp_process_List.map((x,i)=><Link key={i} className='bm-item-list' to={x} onClick={this.toggleCollapse.bind(this)}> <a className="i_side_icons i_side_card"/>{cardInfo.cards[i].id}</Link>);
    Process_List = tmp_process_List.map((x,i)=><div key={x+i}><Link className='bm-item-list' to={x} onClick={this.toggleCollapse.bind(this)} style={{display: 'block', outline: 'none'}}> <div className="i_side_icons i_side_card"/>{cardInfo.cards[i].id}</Link><div style={{borderBottom: "1px solid rgba(255,255,255,0.2)"}} /></div>);
    var styles = {
            bmItemList: {
                color: '#b8b7ad',
                padding: '0.8em',
                height:'48.75px'
            }
        };
    return (
    		<Menu {...this.props} styles={styles}>          
          <IndexLink className='bm-item-list' to="/" onClick={this.toggleCollapse.bind(this)}><div className="i_side_icons i_side_overview"/>Overview</IndexLink>
          <div style={{borderBottom: "1px solid rgba(255,255,255,0.2)"}} />
          {Process_List}
          <Link className='bm-item-list' to="config" onClick={this.toggleCollapse.bind(this)}><div className="i_side_icons i_side_config"/>Network</Link>
          <div style={{borderBottom: "1px solid rgba(255,255,255,0.2)"}} />
        </Menu>
    );
  }
}
