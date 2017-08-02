import React from "react";
// import HlsPlayer from "../components/player/HlsPlayer";
import HlsPlayer from "../components/player/VideoHLSPlayer";

import VideoPlayer from "../components/player/VideoPlayer";
// import DashPlayer from "../components/player/DashPlayer";
import DashPlayer from "../components/player/VideoDASHPlayer";
import VRPlayer from "../components/player/VideoVRPlayer";
export default class View extends React.Component {
  constructor(props){
    super(props)


    this.state = {
      playerType:props.playerType,
      Url:props.Url,
      isVR:props.isVR,
      // isVR:true,
      // playerType:"dash",
      // Url: '../../assets/shark.mp4',
      // Url: 'http://192.168.0.103:8100/pollytest',
      // Url: 'http://192.168.0.103:8000/hls/pollytest.m3u8',
      // Url: 'http://192.168.0.103:8000/dash/pollytest.mpd',
      // Url: 'rtmp://192.168.0.103:1935/live/pollytest'

    }

  }
  componentWillMount(){


  }
  componentDidMount(){
    // console.log("View:isVR~~~~~~");
    // console.log(this.state.isVR);
  }
  componentWillUnmount(){

  }

  handlePlay(player) {
    console.log('onPlay', player);
  }
  render() {


    const width =500;
    const height =375;
    var player;
    if(this.state.playerType ==='dash'){

      // player=<DashPlayer
      //         src={this.state.Url}
      //         width={ width }
      //         height={ height }
      //         onPlay={this.handlePlay}/>
      player=<DashPlayer
              src={this.state.Url}
              type="application/dash+xml"
              width={ width }
              height={ height }
              isVR={this.state.isVR}
              onPlay={this.handlePlay}/>

          }else if(this.state.playerType ==='live'){
            player=<VideoPlayer
               src={this.state.Url}
               preload='auto'
               type="rtmp/flv"
               onPlay={this.handlePlay}
               width={ width }
               height={ height } />

            // var isVR=false;
            // player=<VRPlayer
            //   src={this.state.Url}
            //   preload='auto'
            //   type="rtmp/flv"
            //   isVR={isVR}
            //   onPlay={this.handlePlay}
            //   width={ width }
            //   height={ height } />
          }else if(this.state.playerType ==='webm'){
            player=<VRPlayer
              src={this.state.Url}
              preload='auto'
              type="video/webm"
              isVR={this.state.isVR}
              onPlay={this.handlePlay}
              width={ width }
              height={ height } />
          }else if(this.state.playerType ==='file'){
            player=<VideoPlayer
                  src={this.state.Url}
                  preload='auto'
                  type="video/mp4"
                  onPlay={this.handlePlay}
                  width={ width }
                  height={ height } />
          }else if(this.state.playerType ==='fileVR'){
            player=<VRPlayer
                  src={this.state.Url}
                  preload='auto'
                  type="video/mp4"
                  onPlay={this.handlePlay}
                  width={ width }
                  height={ height } />
          }else if(this.state.playerType ==='hls'){
            // player=<HlsPlayer
            //   url={this.state.Url}
            //   autoplay={true}
            //   width={ width }
            //   height={ height }/>
            var isVR=false;
            player=<HlsPlayer
                  src={this.state.Url}
                  preload='auto'
                  type="application/x-mpegURL"
                  isVR={isVR}
                  onPlay={this.handlePlay}
                  width={ width }
                  height={ height } />
    }
    return (
      <div>

        {player}
      </div>
    );
  }
}
