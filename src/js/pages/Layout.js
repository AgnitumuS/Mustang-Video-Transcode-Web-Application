import React from "react";
import { Link } from "react-router";
import Header from "../components/layout/Header";
import SideBarMenu from "../components/layout/SideBarMenu";
import { appConfig } from '../config';

export default class Layout extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      currentCount: 60,
      Card_value:1,
      MenuIsOpen:true,
      mini : false,
    }
    this.isMenuOpen = this.isMenuOpen.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.onMainMouseOver = this.onMainMouseOver.bind(this);
  }
    componentWillMount(){
      }

    isMenuOpen = function(state) {
      this.setState({
          MenuIsOpen:state.isOpen
      });
    };


    handleClick(event) {
        this.setState({MenuIsOpen: false});
    }

    onMainMouseOver() {

    }

    onImageClick(){
    }

  render() {

    const { location } = this.props;
    const containerStyle = {
      marginLeft: "35px"
    };

    var mainStyle = {marginLeft:"calc(120px - 30px)",width:'calc(100vw - 240px)',minWidth:"1042px"};
    var spanStyle = {display: 'inlineBlock'};
    var menuStyle = {minWidth: '5%', maxWidth: '30%', transition: 'width 3s ease'}
    var imgState= -1;
    var imgOpenClose;
    var openCloseStyle={background:"transparent", marginLeft:"30px"};
    var leftPanelStyle, rightPanelStyle;
    if(this.state.MenuIsOpen == true){
      imgOpenClose = '/img/collapse.png';
      imgState = 1;
    } else {
      imgOpenClose = '/img/expand.png';
      mainStyle = {marginLeft:"calc(45px - 15px)",width:'calc(100vw - 80px)',minWidth:"1042px"};
       imgState = 0;
    }

    return (
      <div className="App" style={{overflow:"hidden"}}>
        <Header />
        <div id="outer-container" >
          <div class="container" style={containerStyle} >
            <div class="row">
              <div class="col-md-12">
                <SideBarMenu style={menuStyle} location={location} isMini={this.state.mini} isOpen={this.state.MenuIsOpen}
                    pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" } isImageState={imgState}
                    onMouseLeave={this.onMenuBarMouseOut} width={ '15%' } onStateChange={ this.isMenuOpen } noOverlay customBurgerIcon={ false }
                    customCrossIcon ={ <img src={imgOpenClose} onClick={this.onImageClick.bind(this)} width={ 280 } height="20px"  /> }/
                     >
                  <main id="page-wrap" style={mainStyle} onClick={this.handleClick} onMouseOver={this.onMainMouseOver.bind(this)}>
                    <div style={{paddingLeft: "35px", paddingRight:"35px",background:"#f6f8f9",height:"calc(100vh - 52px)"}}>
                        {this.props.children}
                    </div>
                </main>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
