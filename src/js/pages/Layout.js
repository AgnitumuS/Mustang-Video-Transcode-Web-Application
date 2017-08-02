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
      MenuIsOpen:false
    }
    this.isMenuOpen = this.isMenuOpen.bind(this);
  }
    componentWillMount(){
      }
    componentDidMount(){
      document.title = "Mustang-200";
    }
    componentWillUnMount(){
    }
    isMenuOpen = function(state) {
      this.setState({
          MenuIsOpen:state.isOpen
      });
    };

  render() {

    const { location } = this.props;
    const containerStyle = {
      marginTop: "20px"
    };

    return (
      <div id="outer-container" className="App">
      <Header />
        <div class="container" style={containerStyle} >
          <div class="row">
            <div class="col-md-12">
              <SideBarMenu location={location} pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" } width={ '15%' } onStateChange={ this.isMenuOpen } noOverlay customCrossIcon={ false } />
                <main id="page-wrap" >
                      {this.props.children}
              </main>
            </div>
          </div>
        </div>
      </div>

    );
  }
}
