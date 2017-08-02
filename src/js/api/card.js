import { cardInfo,appConfig,routeResp } from '../config';
import Request from 'superagent';

const get_cardConfigInfo = function(callback){
  var url = appConfig.HOST_API.ConfigStart.url;
  Request.get(url).end(function(err, res){
    if (err || !res.ok) {
      console.log("get_cpu_gpu err: "+err);
    } else {
      var obj = res.body;
      cardInfo.hostIP=obj.externalIP;
    }
    callback(true);
  });
}

export const get_cardInfo = function(callback){
  var url = appConfig.HOST_API.GetCardInformation.url;

  Request.get(url).end(function(err, res){
    if (err || !res.ok) {
      callback(false);
      console.log("MY get_cardInfo err"+JSON.stringify(err));
    } else {
      // console.log("MY get_cardInfo "+JSON.stringify(res.body));
      var obj = res.body;
      if(obj==null){
        callback(false);
        console.log("MY get_cardInfo resp is null");
        return;
      }
      var len = obj.length;
      cardInfo.cardNum = len;
      for(var i=0; i < len; i++){
        var dataObj1 = obj[i].cpu[0];
        var dataObj2 = obj[i].cpu[1];
        var myObj = [];
        var cpuinfoBox=[];
        for(var j=0;j<2;j++){
            var dataObj = obj[i].cpu[j];
            var myObjTmp = {
                  id:"catching",
                  cpu:0,
                  gpu:0,
                  info:{
                     "cpuVersion": "catching",
                     "cpuMemory": "catching",
                     "ip": "catching",
                     "mac": "catching",
                     "gpu": "catching",
                     "qtsPort": "catching",
                     "rtmpPort": "catching",
                     "httpPort": "catching",
                     "icecastPort": "catching"
                  }
                };
            myObjTmp.id = dataObj.cpuId;
            myObjTmp.info.cpuVersion = dataObj.processor;
            myObjTmp.info.cpuMemory = dataObj.memory;
            myObjTmp.info.ip = dataObj.ipaddress;
            myObjTmp.info.mac = dataObj.mac;
            myObjTmp.info.qtsPort = dataObj.qtsPort;
            myObjTmp.info.rtmpPort = dataObj.rtmpPort;
            myObjTmp.info.httpPort = dataObj.httpPort;
            myObjTmp.info.icecastPort = dataObj.icecastPort;
            myObj.push(myObjTmp);
        }
        cardInfo.cards.push({'id' : obj[i].cardid, 'cpuinfo1':myObj[0],'cpuinfo2':myObj[1] });
      }
      get_cardConfigInfo(callback);
    }
  });
};
export const get_cpu_gpu = function(){
  var url = appConfig.HOST_API.GetCGInformation.url;

  Request.get(url).end(function(err, res){
    if (err || !res.ok) {
      console.log("get_cpu_gpu err: "+err);
    } else {
      // console.log("MY get_cpu_gpu "+JSON.stringify(res.body));
      var obj = res.body;
      if(obj==null){
        // console.log("MY get_cpu_gpu resp is null");
        return;
      }
      var len = obj.length;
      for(var i=0; i < len; i++){
        var cardObj = obj[i];
        if(cardObj.cginfo.usage[0].cpu == undefined){
          cardInfo.cards[i].cpuinfo1.cpu = 0;
          cardInfo.cards[i].cpuinfo1.gpu = 0;
        }
        else{
          cardInfo.cards[i].cpuinfo1.cpu = cardObj.cginfo.usage[0].cpu;
          cardInfo.cards[i].cpuinfo1.gpu = cardObj.cginfo.usage[0].gpu;
        }

        if(cardObj.cginfo.usage[1].cpu == undefined){
          cardInfo.cards[i].cpuinfo2.cpu = 0;
          cardInfo.cards[i].cpuinfo2.gpu = 0;
        }
        else{
          cardInfo.cards[i].cpuinfo2.cpu = cardObj.cginfo.usage[1].cpu;
          cardInfo.cards[i].cpuinfo2.gpu = cardObj.cginfo.usage[1].gpu;
        }
      }
    }
  });
};

const jobInfo_Running = function(respArray,CardId,CpuId,callback){
  var url = appConfig.HOST_API.GetCardJobInformation.url.replace("{cardid}",CardId);

  Request.get(url).end(function(err, res){
    if (err || !res.ok) {
      console.log("MY get_jobInfo_Running_byCardId_byCPUId err "+JSON.stringify(err));
    } else {
      // console.log("MY get_jobInfo_byCardId_byCPUId "+JSON.stringify(res.body));
      var resp = [];
      var jobInfo={
           "jobId": null,
           "type": null,
           "input": null,
           "starttime": null,
           "numofoutputs": 0,
           "status": null
       };

       if(res.body == null){
         console.log("MY get_jobInfo_Running_byCardId_byCPUId null response");
         return;
       }
       if(res.body.cpujobinfo == null){
         console.log("MY get_jobInfo_Running_byCardId_byCPUId err cpujobinfo is null");
         return;
       }
       var myBody=null;
       if(res.body.cardid == CardId)
       if(res.body.cpujobinfo.length == 2){
         if(res.body.cpujobinfo[0].cpuId == CpuId){
           myBody = res.body.cpujobinfo[0].jobs;
         }
         else if(res.body.cpujobinfo[1].cpuId == CpuId){
           myBody = res.body.cpujobinfo[1].jobs;
         }
         else{
           console.log("MY get_jobInfo_Running_byCardId_byCPUId err : no ");
           return;
         }
       }
       else{
         console.log("MY get_jobInfo_Running_byCardId_byCPUId err "+JSON.stringify(res.body));
         return;
       }

       resp = myBody.map(function(x, i){
         var input="";
         var filepath="";

         if(x.type == "live"){
          filepath=x.input.streamurl+x.input.streamname;
          input = x.input.streamname;
         }
         else{
           var tmp=x.input.filepath;
           var len = tmp.length;
           var n = tmp.lastIndexOf("/");
           if(n ==-1){
             input = tmp;
           }
           else{
             input = tmp.substring(n+1,len);
           }
           filepath = x.input.filepath;
         }

         var statusBox = ["Save","Running","Completed","Failed","Terminated"];
         var status = statusBox[x.status];
         if(status != null && status== "Running"){
           var jobInfo={"jobId": x.jobId,
           "type": x.type,
           "input": input,
           "filepath":filepath,
           "starttime": x.starttime,
           "numofoutputs": x.numofoutputs,
           "status": status};
           return jobInfo;
         }
        }
       );
      var respAllTmp = resp.concat(respArray);
      var respAll = respAllTmp.filter(function(e) {
          if(e!=null){
            return true;
          }
          else{
            return false;
          }
        });
      callback(respAll);
    }
  });
}
var padDate=function(instr){
  var str = "" + instr
  var pad = "00"
  var ans = pad.substring(0, pad.length - str.length) + str;
  return ans;
}
export const get_jobInfo_byCardId_byCPUId = function(sTime,eTime,CardId,CpuId,callback){
  var body =   {
   "start" : {
    "year" : sTime.getFullYear().toString(),
    "month" : padDate(sTime.getMonth() + 1),
    "day" : padDate(sTime.getDate()),
    "hour" : padDate(sTime.getHours()),
    "minutes" : padDate(sTime.getMinutes())
   },
   "end" : {
     "year" : eTime.getFullYear().toString(),
     "month" : padDate(eTime.getMonth() + 1),
     "day" : padDate(eTime.getDate()),
     "hour" : padDate(eTime.getHours()),
     "minutes" : padDate(eTime.getMinutes())
   },
   "pageIdx" : 1,
   "countPerPage" : 10,
    "cardid" : CardId,
   "cpuid" : CpuId
  }

  var url = appConfig.HOST_API.SelectJobsbyTimeInterval.url.replace("{index}",body.pageIdx);
  url = url.replace("{cnt}",body.countPerPage);
  url = url.replace("{datetime}",body.start.year+"-"+body.start.month+"-"+body.start.day+" "+body.start.hour+":"+body.start.minutes+":00");
  url = url.replace("{datetime}",body.end.year+"-"+body.end.month+"-"+body.end.day+" "+body.end.hour+":"+body.end.minutes+":00");
  url = url.replace("{id}",CardId);
  url = url.replace("{cpuid}",CpuId);

  Request.get(url).end(function(err, res){
    if (err || !res.ok) {
      console.log("MY get_jobInfo_byCardId_byCPUId err "+JSON.stringify(err));
    } else {
      // console.log("MY get_jobInfo_byCardId_byCPUId "+JSON.stringify(res.body));
      var resp = [];
      var jobInfo={
           "jobId": null,
           "type": null,
           "input": null,
           "starttime": null,
           "numofoutputs": 0,
           "status": null
       };
       resp = res.body.map(function(x, i){
         var input="";
         var filepath="";

         if(x.type == "live"){
          filepath=x.input.streamurl+x.input.streamname;
          input = x.input.streamname;
         }
         else{
           var tmp=x.input.filepath;
           var len = tmp.length;
           var n = tmp.lastIndexOf("/");
           if(n ==-1){
             input = tmp;
           }
           else{
             input = tmp.substring(n+1,len);
           }
           filepath = x.input.filepath;
         }

         var statusBox = ["Save","Running","Completed","Failed","Terminated"];
         var status = statusBox[x.status];
         if(status != null && status!= "Save" && status!= "Running"){
           var jobInfo={"jobId": x.jobId,
           "type": x.type,
           "input": input,
           "filepath":filepath,
           "starttime": x.starttime,
           "numofoutputs": x.numofoutputs,
           "status": status};
           return jobInfo;
         }
        }
       );
      jobInfo_Running(resp,CardId,CpuId,callback);
    }
  });
};

export const get_jobInfo_byJobId = function(jobId,callback){
  var url = appConfig.HOST_API.GetJob.url.replace("{jobid}",jobId);
  const protocolMap=["live","hls","dash","webm"];
  Request.get(url).end(function(err, res){
    if (err || !res.ok) {
      var resp = {};
      resp[routeResp.Result]=routeResp.FailResult;
      resp[routeResp.Data]=err;
      callback(resp);
    } else {
      // console.log("MY get_jobInfo_byJobId "+JSON.stringify(res.body));
      var showInput = null;
      if(res.body.type == "live"){
        showInput = res.body.input.streamurl+res.body.input.streamname;
      }
      else{
        showInput = res.body.input.filepath;
      }
      var data={
        showInput:showInput,
        myurl:res.body.outputs,
        type:protocolMap[res.body.protocol]
      };

      var resp = {};
      resp[routeResp.Result]=routeResp.SuccessResult;
      resp[routeResp.Data]=data;
      callback(resp);
    }
  });
}
