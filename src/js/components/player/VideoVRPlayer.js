import React, { Component, PropTypes } from 'react'
import videojs from 'video.js';
import panorama from 'videojs-panorama';

class VideoVRPlayer extends Component{
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
      var self=this;
      if(this.player){
        this.player.src({
          src: self.mSrc,
          type: self.mType});
          this.player.load();
      }else{
        var videoElement = this.refs.player;
        this.player = videojs(videoElement, {});
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
              self.reloadPlayer();
            });
            this.src({
              src: self.mSrc,
              type: self.mType});

        });
        if(self.isVR){
          self.player.panorama({
              clickToToggle: false,
              initFov: 100,
              VREnable: true,
              clickAndDrag: true,
              callback: function () {
                self.player.play();
              }
          });


        }
      }
    }
    reloadPlayer(){
        console.log("reloadPlayer~~~~");
        this.initPlayer();

    }

    componentDidMount(){
        this.initPlayer();
    }
    componentWillUnmount() {
      this.player.dispose();
      this.player=null;
    }

    render(){
      const {width,height}= this.props;
        return (
          <video className="video-js vjs-default-skin"
                 controls preload="auto"
                 crossOrigin="anonymous"
                 ref="player"
                 width={width}
                 height={height}
                 data-setup='{}'>
          </video>
        );
    }
}
module.exports = VideoVRPlayer;
