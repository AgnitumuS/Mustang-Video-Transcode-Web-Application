import assign from 'object-assign';
import cx from 'classnames';
import blacklist from 'blacklist';
import React from 'react';
import videojs from 'video.js';

class ReactVideo extends React.Component {
  constructor (props) {
      super(props);

      this.state = {
          player : null,
      };
      this.initPlayer=this.initPlayer.bind(this);
  }
  componentDidMount() {
    this.initPlayer();
  }
  componentWillUnmount() {
    // console.log("video.destroy()");
    this.player.dispose();
    this.player=null;

  }
  initPlayer(){
      var self = this;
      var player = videojs(this.refs.video, this.props.options).ready(function() {
        self.player = this
        self.player.play();
      });
  }

  render() {
    var props = blacklist(this.props, 'children', 'className', 'src', 'type', 'onPlay', 'onPlayerInit');
    props.className = cx(this.props.className, 'videojs', 'video-js vjs-default-skin');
    assign(props, {
      ref: 'video',
      controls: true,
      preload: 'auto'
    });
    return (
      <div>
        <video {... props}>
          <source src={this.props.src} type={ this.props.type }/>
        </video>
      </div>
    )
  }
}



export default ReactVideo;
