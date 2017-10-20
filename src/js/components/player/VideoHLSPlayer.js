import React, { Component, PropTypes } from 'react'
var videojs = require('video.js');
window.videojs = videojs;
require('videojs-contrib-hls');
import panorama from 'videojs-panorama';


class VideoHLSPlayer extends Component{
    constructor(props){
        super(props);
        this.displayName = 'PanoramaVideoPlayer';
        this.player = null;
        this.mSrc=props.src;
        this.mType=props.type;
        this.isVR=props.isVR;
        this.initPlayer=this.initPlayer.bind(this);
        this.reloadPlayer=this.reloadPlayer.bind(this);
    }

    initPlayer(){
      var videoElement = this.refs.player;
      var self = this;
      this.player = videojs(videoElement, { "techOrder": ["hls","flash","html5"] });
      this.player.ready(function() {
          videoElement.addEventListener("resize", () => {
              var canvas = self.player.getChild('Canvas');
              if(canvas){
                canvas.handleResize();
                console.log({canvas})
              }
          });
          videoElement.addEventListener("error", function(){
            console.log("error~~~~~~~~");
            //self.reloadPlayer();
          });
          // var width = videoElement.offsetWidth;
          // var height = videoElement.offsetHeight;
          // self.player.width(width), self.player.height(height);
          this.src({
            src: self.mSrc,
            type: self.mType});
      });
      if(this.isVR){
        this.player.panorama({
            clickToToggle: false,
            initFov: 100,
            VREnable: true,
            clickAndDrag: true,
            callback: function () {
              self.player.play();
            }
        });

        this.player.on("play", function(){//CardBoard
           //var vrbtn = self.player.controlBar.getChild("VRButton");
           //vrbtn.handleClick();
         });
      }
    }
    reloadPlayer(){
        console.log("reloadPlayer~~~~");
        if(this.player){
            // this.player.reset();
            this.initPlayer();
          }
    }

    componentDidMount(){
        this.initPlayer();
    }
    componentWillUnmount() {
      console.log("HLSvideo.destroy()");
      this.player.dispose();
    }

    render(){
      const {width,height}= this.props;
        return (
          <div>
              <video className="video-js vjs-default-skin"
                     controls preload="auto"
                     crossOrigin="anonymous"
                     ref="player"
                     width={width}
                     height={height}
                     data-setup='{}'>
              </video>
          </div>
        );
    }
}
  //  <source src={this.props.src} type={ this.props.type }/>
module.exports = VideoHLSPlayer;
