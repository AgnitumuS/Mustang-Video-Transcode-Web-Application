'use strict';

import React, { PropTypes } from 'react';
import assign from 'object-assign';
import cx from 'classnames';
import blacklist from 'blacklist';
// import dashjs from './dash.all.min.js';
import dashjs from 'dashjs';


class ReactDash extends React.Component {
  constructor (props) {
      super(props);

      this.state = {
          playerId : Date.now(),
          player:null
      };
  }
  componentDidMount() {
      this._initPlayer ();
  }
  componentDidUpdate () {

  }
  componentWillUnmount() {
    const palyer=this.state.player;
    if(palyer !== null){
      console.log("dash.destroy()");
      palyer.reset();
    }
  }
  _initPlayer () {
      if (this.state.player !== null ) {
          this.player.reset();
      }
      // var url = this.props.src
      var player = dashjs.MediaPlayer().create(this);
      player.initialize(document.getElementById("video"), null, true);
      player.attachView(document.querySelector("#videoplayer"));
      player.attachSource(this.props.src);
      this.setState({
          player:player
      })
      console.log("dash.init() "+{player})

  }

    render () {
      let { playerId } = this.state;
      return (
        <div key={playerId}>
          <video
            id="videoplayer"
            controls
            width={this.props.width}
            height={this.props.height}></video>
          </div>

      )
    }
}

export default ReactDash;
