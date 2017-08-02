import { cardInfo,appConfig,routeResp } from '../config';
import { filesInfo } from './data/mediadb';
import Request from 'superagent';

const get_file_list_callback = function(callback){
  if(filesInfo.currentPath == undefined){
    var resp = {};
    resp[routeResp.Result]=routeResp.FailResult;
    resp[routeResp.Data]="currentPath is undefined";
    callback(resp);
    return;
  }
  var url = appConfig.HOST_API.GetContentOfSpecifiedPath.url.replace("{dirpath}",filesInfo.currentPath);
  Request.get(url).end(function(err, res){
    if (err || !res.ok) {
      var resp = {};
      resp[routeResp.Result]=routeResp.FailResult;
      resp[routeResp.Data]=err;
      callback(resp);
    } else {
      var num = res.body.length;
      var arr=[];
      var dirArray=[];
      for(var i=0;i < num;i++){
        if(res.body[i].type == "directory"){
          dirArray.push(res.body[i].name);
        }
        else if(res.body[i].type == "file"){
          arr.push(res.body[i].name);
        }
      };
      var resp = {};
      resp[routeResp.Result]=routeResp.SuccessResult;
      resp[routeResp.Data]={File:arr,Dir:dirArray,DirPath:filesInfo.currentPath};
      callback(resp);

    }
  });
}
export const get_file_list = function(req,callback){
  if(req.stage == undefined){
    var resp = {};
    resp[routeResp.Result]=routeResp.FailResult;
    resp[routeResp.Data]="Please fill stage";
    callback(resp);
    return;
  }
// stage
var tmp = "";
 switch (req.stage) {
   case "first":
   var url = appConfig.HOST_API.GetHomeDirectoryPathOfHostMachine.url;
   Request.get(url).end(function(err, res){
     if (err || !res.ok) {
       var resp = {};
       resp[routeResp.Result]=routeResp.FailResult;
       resp[routeResp.Data]=err.toString();
       callback(resp);
       console.log("MY get_file_list err"+JSON.stringify(err));
     } else {
      //  console.log("MY get_file_list "+JSON.stringify(res.body));
       var homedir = res.body.homedir;
       if(homedir == undefined){
         homedir = "/";
       }
       filesInfo.homePath = homedir;
       filesInfo.currentPath = homedir;
       get_file_list_callback(callback);
     }
   });
     break;
   case "next":
     if(req.dirName == undefined){
       var resp = {};
       resp[routeResp.Result]=routeResp.FailResult;
       resp[routeResp.Data]="Please fill dirName";
       callback(resp);
       return;
     }
     else{
       if(filesInfo.currentPath == undefined){
         filesInfo.currentPath = "/";
       }
       tmp = filesInfo.currentPath;
       var n = tmp.lastIndexOf("/");
       if(n < 2 && tmp.length<=1){
         filesInfo.currentPath = "/"+req.dirName;
       }
       else{
         filesInfo.currentPath = tmp+"/"+req.dirName;
       }
       get_file_list_callback(callback);
     }
     break;
   case "back":
     if(filesInfo.currentPath == undefined){
       filesInfo.currentPath = "/";
     }
     tmp = filesInfo.currentPath;
     var n = tmp.lastIndexOf("/");
     if(n > 2){
       filesInfo.currentPath = tmp.substring(0, n);
     }
     else {
       filesInfo.currentPath = "/";
     }
     get_file_list_callback(callback);
     break;
   case "home":
     if(filesInfo.homePath == undefined){
       var resp = {};
       resp[routeResp.Result]=routeResp.FailResult;
       resp[routeResp.Data]="Please check stage: first -> home";
       callback(resp);
     }
     else{
       filesInfo.currentPath = filesInfo.homePath;
        get_file_list_callback(callback);
     }
     break;
   case "setDirPath":
     if(req.dirPath == undefined){
       var resp = {};
       resp[routeResp.Result]=routeResp.FailResult;
       resp[routeResp.Data]="Please fill dirPath";
       callback(resp);
       return;
     }
     else{
       filesInfo.currentPath = req.dirPath;
       get_file_list_callback(callback);
     }
     break;
   default:
     var resp = {};
     resp[routeResp.Result]=routeResp.FailResult;
     resp[routeResp.Data]="Please check stage";
     callback(resp);
     return;
 }
}

export const get_file_info = function(fileinput,callback){
  var path = null;
  var filename = null;
  if(fileinput != null){
    if(fileinput.indexOf("/")!=-1){
      //filename is full path
      var tmp = fileinput;
      var n = tmp.lastIndexOf("/");
      if(n > 2){
        path = tmp.substring(0, n);
        filename = tmp.substring(n+1, tmp.length);
      }
    }
    else{
      if(filesInfo.currentPath == undefined){
        var resp = {};
        resp[routeResp.Result]=routeResp.FailResult;
        resp[routeResp.Data]="No Current Path";
        callback(resp);
        return;
      }
      else{
        path = filesInfo.currentPath;
        filename = fileinput;
      }
    }
  }
  else{
    var resp = {};
    resp[routeResp.Result]=routeResp.FailResult;
    resp[routeResp.Data]="File Name is null";
    callback(resp);
    return;
  }


  var url = appConfig.HOST_API.GetDetailAPI.url;
  var body = { path: path,filename:filename};
  // console.log("get_file_info body "+JSON.stringify(body));
  Request.post(url).set('Content-Type', 'application/json')
  .send(body)
  .end(function(err, res){
    if (err || !res.ok) {
      var resp = {};
		  resp[routeResp.Result]=routeResp.FailResult;
      resp[routeResp.Data]=err;
      callback(resp);
    } else {
      // console.log("get_file_info resp "+JSON.stringify(res.body));
      var InfoGeneral=res.body["General"];
      var InfoVideo=res.body["Video"];
      var InfoAudio=res.body["Audio"];
      if(InfoGeneral == undefined || InfoVideo==undefined || InfoAudio==undefined ){
        var resp = {};
  		  resp[routeResp.Result]=routeResp.FailResult;
        resp[routeResp.Data]="Info format error";
        callback(resp);
      }
      var UniqueID = InfoGeneral["Unique ID"];
      var mCompletename =InfoGeneral["Complete name"];
      var mvideo = InfoVideo["Format"];
      var mformat = InfoAudio["Format"];  //音訊編碼
      var mfsize = InfoGeneral["File size"];
      var mDuration = InfoGeneral["Duration"]; //播放時間
      var mbitrate = InfoGeneral["Overall bit rate"]; //bitrate
      var maudiorate = InfoAudio["Sampling rate"]; //採樣率
      var mfps = InfoVideo["Frame rate"]; //fps
      var mW = InfoVideo["Width"];
      if(mW != undefined){
        mW= InfoVideo["Width"].match(/\d+/g);
      }
      else{
        mW="?";
      }
      var mH = InfoVideo["Height"];
      if(mH != undefined){
        mH= InfoVideo["Height"].match(/\d+/g);
      }else{
        mH="?";
      }
      var mresolution =mW+"x"+mH;
      var resp = {};
      resp[routeResp.Result]=routeResp.SuccessResult;
      resp[routeResp.Data]={video:mvideo,fps:mfps,audio:mformat,audiorate:maudiorate,bitrate:mbitrate,fsize:mfsize,Duration:mDuration,Resolution:mresolution};
      callback(resp);
    }
  });
}
