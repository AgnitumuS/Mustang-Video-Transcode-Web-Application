import { cardInfo,get_cardsIdArray,appConfig,routeResp } from '../config';
import Request from 'superagent';
import {makeConsole,objPType,respType} from './myConsole';

const get_cardConfigInfo = function(callback){
  var url = appConfig.HOST_API.ConfigStart.url;
  Request.get(url).end(function(err, res){
    if (err || !res.ok) {
      makeConsole("get_cardConfigInfo",respType.err,err,objPType.err);
    } else {
      var obj = res.body;
      if(obj.externalIP != null){
        cardInfo.hostIP=obj.externalIP;
      }
      else{
        makeConsole("get_cardConfigInfo",respType.unknown,obj,objPType.obj);
      }
      if(obj.version != null){
        cardInfo.hostVersion=obj.version;
      }
    }
    callback(true);
  });
}

export const get_cardInfo = function get_cardInfo(callback){
  var url = appConfig.HOST_API.GetCardInformation.url;


  Request.get(url).end(function(err, res){
    if (err || !res.ok) {
      makeConsole("get_cardInfo",respType.err,err,objPType.err);
      callback(false);
    } else {
      var obj = res.body;
      if(obj==null){
        callback(false);
        makeConsole("get_cardInfo",respType.null,obj,objPType.null);
        return;
      }
      var len = obj.length;
      cardInfo.cardNum = len;
      cardInfo.cards = [];
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
                  memoryUsage: 0,
                  usedMemoryPrecentage: 0,
                  temperature: 0,
                  RX: 0,
                  TX: 0,
                  info:{
                     "cpuVersion": "catching",
                     "cpuMemory": "catching",
                     "ip": "catching",
                     "mac": "catching",
                     "gpu": "catching",
                     "qtsPort": "catching",
                     "rtmpPort": "catching",
                     "httpPort": "catching",
                     "icecastPort": "catching",
                     "qtsName": "catching"
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
            myObjTmp.info.qtsName = dataObj.qtsName;
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
      makeConsole("get_cpu_gpu",respType.err,err,objPType.err);
    } else {
      var obj = res.body;
      if(obj==null){
        makeConsole("get_cpu_gpu",respType.null,obj,objPType.null);
        return;
      }
      var len = obj.length;
      var cardIdArray = get_cardsIdArray();
      for(var i=0; i < len; i++){
        var cardObj = obj[i];
        var cardId = cardObj.cardid.toString();
        var index = cardIdArray.indexOf(cardId);
        if(index >= 0){
            var index = tmpCardIDArr.indexOf(cardId);
            if(cardObj.cginfo.usage[0].cpu == undefined){
              cardInfo.cards[index].cpuinfo1.cpu = 0;
              cardInfo.cards[index].cpuinfo1.gpu = 0;
            }
            else{
              cardInfo.cards[index].cpuinfo1.cpu = cardObj.cginfo.usage[0].cpu;
              cardInfo.cards[index].cpuinfo1.gpu = cardObj.cginfo.usage[0].gpu;
            }

            if(cardObj.cginfo.usage[1].cpu == undefined){
              cardInfo.cards[index].cpuinfo2.cpu = 0;
              cardInfo.cards[index].cpuinfo2.gpu = 0;
            }
            else{
              cardInfo.cards[index].cpuinfo2.cpu = cardObj.cginfo.usage[1].cpu;
              cardInfo.cards[index].cpuinfo2.gpu = cardObj.cginfo.usage[1].gpu;
            }
        }
      }
    }
  });
  var tmpCardIDArr = get_cardsIdArray();
  get_cpu_memoryusage(tmpCardIDArr);
  get_cpu_traffic(tmpCardIDArr);
  get_cpu_temperature(tmpCardIDArr);
};
const get_cpu_memoryusage = function(cardIdArray){
  var url = appConfig.HOST_API.GetMemoryUsageInfo.url;

  Request.get(url).end(function(err, res){

    if (err || !res.ok) {
      makeConsole("get_cpu_memoryusage",respType.err,err,objPType.err);
    }else {
      var obj = res.body;
      if(obj==null){
        makeConsole("get_cpu_memoryusage",respType.null,obj,objPType.null);
        return;
      }
      var len = obj.length;
      for(var i=0; i < len; i++){
        var cardObj = obj[i];
        var cardId = cardObj.cardid.toString();
        var index = cardIdArray.indexOf(cardId);
        if(index >= 0){
          if(cardObj.usage[0] == null){
            cardInfo.cards[index].cpuinfo1.memoryUsage = 0;
            cardInfo.cards[index].cpuinfo1.usedMemoryPrecentage = 0;
          }
          else if(cardObj.usage[0].used == undefined){
            cardInfo.cards[index].cpuinfo1.memoryUsage = 0;
            cardInfo.cards[index].cpuinfo1.usedMemoryPrecentage = 0;
          }
          else{
            cardInfo.cards[index].cpuinfo1.memoryUsage = parseFloat((cardObj.usage[0].used / 1024).toFixed(1));
            cardInfo.cards[index].cpuinfo1.usedMemoryPrecentage = cardObj.usage[0].usage;
          }

          if(cardObj.usage[1] == null){
            cardInfo.cards[index].cpuinfo2.memoryUsage = 0;
            cardInfo.cards[index].cpuinfo2.usedMemoryPrecentage = 0;
          }
          else if(cardObj.usage[1].used == undefined){
            cardInfo.cards[index].cpuinfo2.memoryUsage = 0;
            cardInfo.cards[index].cpuinfo2.usedMemoryPrecentage = 0;
          }
          else{
            cardInfo.cards[index].cpuinfo2.memoryUsage = parseFloat((cardObj.usage[1].used / 1024).toFixed(1));
            cardInfo.cards[index].cpuinfo2.usedMemoryPrecentage = cardObj.usage[1].usage;
          }
        }
      }
    }
  });
};
const get_cpu_traffic = function(cardIdArray){
  var url = appConfig.HOST_API.GetCpuTrafficInfo.url;

  Request.get(url).end(function(err, res){
    if (err || !res.ok) {
      makeConsole("get_cpu_memoryusage",respType.err,err,objPType.err);
    }else {
      var obj = res.body;
      if(obj==null){
        makeConsole("get_cpu_memoryusage",respType.null,obj,objPType.null);
        return;
      }
      var len = obj.length;
      for(var i=0; i < len; i++){
        var cardObj = obj[i];
        var cardId = cardObj.cardid.toString();
        var index = cardIdArray.indexOf(cardId);
        if(index >= 0){
          if(cardObj.usage[0] == null){
            cardInfo.cards[index].cpuinfo1.RX = 0;
            cardInfo.cards[index].cpuinfo1.TX = 0;
          }
          else if(cardObj.usage[0].RX.value == undefined){
            cardInfo.cards[index].cpuinfo1.RX = 0;
          }
          else if(cardObj.usage[0].TX.value == undefined){
            cardInfo.cards[index].cpuinfo1.TX = 0;
          }
          else{
            cardInfo.cards[index].cpuinfo1.RX = parseInt(cardObj.usage[0].RX.value) + " " + cardObj.usage[0].RX.unit;
            cardInfo.cards[index].cpuinfo1.TX = parseInt(cardObj.usage[0].TX.value) + " " + cardObj.usage[0].TX.unit ;
          }

          if(cardObj.usage[1] == null){
            cardInfo.cards[index].cpuinfo2.RX = 0;
            cardInfo.cards[index].cpuinfo2.TX = 0;
          }
          else if(cardObj.usage[1].RX.value == undefined){
            cardInfo.cards[index].cpuinfo2.RX = 0;
            cardInfo.cards[index].cpuinfo2.TX = 0;
          }
          else if(cardObj.usage[1].TX.value == undefined){
            cardInfo.cards[index].cpuinfo2.RX = 0;
            cardInfo.cards[index].cpuinfo2.TX = 0;
          }
          else{
            cardInfo.cards[index].cpuinfo2.RX = parseInt(cardObj.usage[1].RX.value) + " " + cardObj.usage[1].RX.unit;;
            cardInfo.cards[index].cpuinfo2.TX = parseInt(cardObj.usage[1].TX.value) + " " + cardObj.usage[1].TX.unit;;
          }
        }
      }
    }
  });
};
const get_cpu_temperature = function(cardIdArray){
  var url = appConfig.HOST_API.GetCpuTemperature.url;

  Request.get(url).end(function(err, res){

    if (err || !res.ok) {
      makeConsole("get_cpu_memoryusage",respType.err,err,objPType.err);
    }else {
      var obj = res.body;
      if(obj==null){
        makeConsole("get_cpu_memoryusage",respType.null,obj,objPType.null);
        return;
      }
      var len = obj.length;
      for(var i=0; i < len; i++){
        var cardObj = obj[i];
        var cardObj = obj[i];
        var cardId = cardObj.cardid.toString();
        var index = cardIdArray.indexOf(cardId);
        if(index >= 0){
          if(cardObj.usage[0] == null){
            cardInfo.cards[index].cpuinfo1.temperature = 0;
          }
          else if(cardObj.usage[0].temperature == undefined){
            cardInfo.cards[index].cpuinfo1.temperature = 0;
          }
          else{
            cardInfo.cards[index].cpuinfo1.temperature = cardObj.usage[0].temperature;
          }

          if(cardObj.usage[1] == null){
            cardInfo.cards[index].cpuinfo2.temperature = 0;
          }
          else if(cardObj.usage[1].temperature == undefined){
            cardInfo.cards[index].cpuinfo2.temperature = 0;
          }
          else{
            cardInfo.cards[index].cpuinfo2.temperature = cardObj.usage[1].temperature;
          }
        }
      }
    }
  });
};
export const get_currentJobInfo_byCardId_byCPUId = function(CardId,CpuId,callback){
  var url = appConfig.HOST_API.GetCardJobInformation.url.replace("{cardid}",CardId);

  Request.get(url).end(function(err, res){
    if (err || !res.ok) {
      var resp = {};
      resp[routeResp.Result]=routeResp.FailResult;
      resp[routeResp.Data]=err.toString();
      callback(resp);
      makeConsole("get_currentJobInfo_byCardId_byCPUId",respType.err,err,objPType.err);
    } else {
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
         makeConsole("get_currentJobInfo_byCardId_byCPUId",respType.null,res.body,objPType.null);
         var resp = {};
         resp[routeResp.Result]=routeResp.FailResult;
         resp[routeResp.Data]="jobInfo is null";
         callback(resp);
         return;
       }
       if(res.body.cpujobinfo == null){
         makeConsole("get_currentJobInfo_byCardId_byCPUId",respType.unknown,res.body,objPType.obj);
         var resp = {};
         resp[routeResp.Result]=routeResp.FailResult;
         resp[routeResp.Data]="jobInfo format error";
         callback(resp);
         return;
       }
       var myBody=null;
       var jobsNum=0;
       if(res.body.cpujobinfo.length == 2){
         if(res.body.cpujobinfo[0].cpuId == CpuId){
           myBody = res.body.cpujobinfo[0].jobs;
           jobsNum = res.body.cpujobinfo[0].numofjobs;
         }
         else if(res.body.cpujobinfo[1].cpuId == CpuId){
           myBody = res.body.cpujobinfo[1].jobs;
           jobsNum = res.body.cpujobinfo[1].numofjobs;
         }
         else{
           makeConsole("get_currentJobInfo_byCardId_byCPUId",respType.unknown,res.body,objPType.obj);
           var resp = {};
           resp[routeResp.Result]=routeResp.FailResult;
           resp[routeResp.Data]="jobInfo format error";
           callback(resp);
           return;
         }
       }
       else{
         makeConsole("get_currentJobInfo_byCardId_byCPUId",respType.unknown,res.body,objPType.obj);
         var resp = {};
         resp[routeResp.Result]=routeResp.FailResult;
         resp[routeResp.Data]="jobInfo format error";
         callback(resp);
         return;
       }

       if(myBody == null){
         makeConsole("get_currentJobInfo_byCardId_byCPUId",respType.unknown,res.body,objPType.obj);
         return;
       }
       try{
         var respInfo = myBody.map(function(x, i){
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
         var respAll = respInfo.filter(function(e) {
             if(e!=null){
               return true;
             }
             else{
               return false;
             }
           });
         var resp = {};
         resp[routeResp.Result]=routeResp.SuccessResult;
         resp[routeResp.Data]={total:jobsNum,data:respAll};
         callback(resp);
       }
       catch(err){
         makeConsole("get_currentJobInfo_byCardId_byCPUId",respType.unknown,res.body,objPType.obj);
         makeConsole("get_currentJobInfo_byCardId_byCPUId",respType.err,err,objPType.err);
         var resp = {};
         resp[routeResp.Result]=routeResp.FailResult;
         resp[routeResp.Data]=err;
         callback(resp);
       }

    }
  });
}
const jobInfo_Running = function(respArray,CardId,CpuId,callback){
  var url = appConfig.HOST_API.GetCardJobInformation.url.replace("{cardid}",CardId);

  Request.get(url).end(function(err, res){
    if (err || !res.ok) {
      makeConsole("jobInfo_Running",respType.err,err,objPType.err);
    } else {
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
         makeConsole("jobInfo_Running",respType.null,res.body,objPType.null);
         return;
       }
       if(res.body.cpujobinfo == null){
         makeConsole("jobInfo_Running",respType.unknown,res.body,objPType.obj);
         return;
       }
       var myBody=null;
       if(res.body.cpujobinfo.length == 2){
         if(res.body.cpujobinfo[0].cpuId == CpuId){
           myBody = res.body.cpujobinfo[0].jobs;
         }
         else if(res.body.cpujobinfo[1].cpuId == CpuId){
           myBody = res.body.cpujobinfo[1].jobs;
         }
         else{
           makeConsole("jobInfo_Running",respType.unknown,res.body,objPType.obj);
           return;
         }
       }
       else{
          makeConsole("jobInfo_Running",respType.unknown,res.body,objPType.obj);
         return;
       }

       if(myBody == null){
         makeConsole("jobInfo_Running",respType.unknown,res.body,objPType.obj);
         return;
       }

       try{
         resp = myBody.map(function(x, i){
           var input="";
           var filepath="";
           if(x.message == "Jobid is not exist"){
             return null;
           }

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
      catch(err){
        makeConsole("jobInfo_Running",respType.unknown,res.body,objPType.obj);
        makeConsole("jobInfo_Running",respType.err,err,objPType.err);
      }
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
   "countPerPage" : 100,
    "cardid" : CardId,
   "cpuid" : CpuId
  }

  var url = appConfig.HOST_API.SelectJobsbyTimeInterval.url.replace("{index}",body.pageIdx);
  url = url.replace("{cnt}",body.countPerPage);
  url = url.replace("{datetime}",body.start.year+"-"+body.start.month+"-"+body.start.day+" "+body.start.hour+":"+body.start.minutes+":00");
  url = url.replace("{datetime}",body.end.year+"-"+body.end.month+"-"+body.end.day+" "+body.end.hour+":"+body.end.minutes+":00");
  url = url.replace("{id}",CardId);
  url = url.replace("{cpuid}",CpuId);
  url = url.replace("{type}",'');
  url = url.replace("{status}",'');

  Request.get(url).end(function(err, res){
    if (err || !res.ok) {
      makeConsole("get_jobInfo_byCardId_byCPUId",respType.err,err,objPType.err);
    } else {
      var resp = [];
      var jobInfo={
           "jobId": null,
           "type": null,
           "input": null,
           "starttime": null,
           "numofoutputs": 0,
           "status": null
       };
       resp = res.body.data.map(function(x, i){
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
      makeConsole("get_jobInfo_byJobId",respType.err,err,objPType.err);
      var resp = {};
      resp[routeResp.Result]=routeResp.FailResult;
      resp[routeResp.Data]=err;
      callback(resp);
    } else {

      var showInput = null;
      if(res.body == null){
        makeConsole("get_jobInfo_byJobId",respType.null,res.body,objPType.null);
        return;
      }
      if(res.body.type == null){
        makeConsole("get_jobInfo_byJobId",respType.unknown,res.body,objPType.obj);
        return;
      }
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

export const get_jobInfoDetail_byJobId = function(jobId,callback){
  var url = appConfig.HOST_API.GetJob.url.replace("{jobid}",jobId);
  const protocolMap=["live","hls","dash","webm"];
  Request.get(url).end(function(err, res){
    if (err || !res.ok) {
      makeConsole("get_jobInfoDetail_byJobId",respType.err,err,objPType.err);
      var resp = {};
      resp[routeResp.Result]=routeResp.FailResult;
      resp[routeResp.Data]=err;
      callback(resp);
    } else {

      var showInput = null;
      if(res.body == null){
        makeConsole("get_jobInfoDetail_byJobId",respType.null,res.body,objPType.null);
        return;
      }
      if(res.body.type == null){
        makeConsole("get_jobInfoDetail_byJobId",respType.unknown,res.body,objPType.obj);
        return;
      }
      if(res.body.type == "live"){
        showInput = res.body.input.streamurl+res.body.input.streamname;
      }
      else{
        showInput = res.body.input.filepath;
      }
      var data={
        showInput:showInput,
        myurl:res.body,
        type:protocolMap[res.body.protocol]
      };

      var resp = {};
      resp[routeResp.Result]=routeResp.SuccessResult;
      resp[routeResp.Data]=data;
      callback(resp);
    }
  });
}

export const get_jobInfo_FailMsg_byJobId = function(jobId,callback){
  var url = appConfig.HOST_API.GetJob.url.replace("{jobid}",jobId);
  Request.get(url).end(function(err, res){
    if (err || !res.ok) {
      makeConsole("get_jobInfo_FailMsg_byJobId",respType.err,err,objPType.err);
      var resp = {};
      resp[routeResp.Result]=routeResp.FailResult;
      resp[routeResp.Data]=err;
      callback(resp);
    } else {
      if(res.body == null){
        makeConsole("get_jobInfo_FailMsg_byJobId",respType.null,res.body,objPType.null);
        return;
      }
      if(res.body.status!=3){
        makeConsole("get_jobInfo_FailMsg_byJobId",respType.unknown,res.body,objPType.obj);
        var resp = {};
        resp[routeResp.Result]=routeResp.FailResult;
        resp[routeResp.Data]="status is not error";
        callback(resp);
        return;
      }
      var showInput = null;
      if(res.body.type == "live"){
        showInput = res.body.input.streamurl+res.body.input.streamname;
      }
      else{
        showInput = res.body.input.filepath;
      }
      var msg = "No error log";
      if(res.body.error){
        if(res.body.errorlog!=undefined && res.body.errorlog.length > 0){
          msg=res.body.errorlog;
        }
      }
      var data={
        showInput:showInput,
        myurl:res.body.outputs,
        msg:msg
      };

      var resp = {};
      resp[routeResp.Result]=routeResp.SuccessResult;
      resp[routeResp.Data]=data;
      callback(resp);
    }
  });
}
//add search by time+status+task type or time or time+status or time+ task type
	export const Search_jobInfo_by_condition = function(sTime,eTime,CardId,CpuId,Type,Status,PageIdx,CountPerPage,callback){
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
		   "pageIdx" : PageIdx,
		   "countPerPage" : CountPerPage,
		    "cardid" : CardId,
		   "cpuid" : CpuId
		  }

		  var url = appConfig.HOST_API.SelectJobsbyCondition.url.replace("{index}",body.pageIdx);


		  url = url.replace("{cnt}",body.countPerPage);
		  url = url.replace("{datetime}",body.start.year+"-"+body.start.month+"-"+body.start.day+" "+body.start.hour+":"+body.start.minutes+":00");
		  url = url.replace("{datetime}",body.end.year+"-"+body.end.month+"-"+body.end.day+" "+body.end.hour+":"+body.end.minutes+":00");
		  url = url.replace("{id}",CardId);
		  url = url.replace("{cpuid}",CpuId);

		  if (Type != '') {
			  url = url.replace("{type}",Type);
		  }else{
			  url = url.replace("{type}",'');
		  }
		  if (Status != '') {
			  url = url.replace("{status}",Status);
		  }else{
		     url = url.replace("{status}",'');
		  }


		  Request.get(url).end(function(err, res){
		    if (err || !res.ok) {
		      makeConsole("Search_jobInfo_by_condition",respType.err,err,objPType.err);
		    } else {
		      var resp = [];
		      var jobInfo={
		           "jobId": null,
		           "type": null,
		           "input": null,
               "cardId":null,
               "cpuId":null,
		           "starttime": null,
		           "numofoutputs": 0,
		           "status": null
		       };
		       //Total Data;
		       var totalnum = res.body.totalCount;
		       resp = res.body.data.map(function(x, i){
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
		         if(status != null && status!= "Save"){
		        // if(status != null && status!= "Save" && status!= "Running"){
		           var jobInfo={"jobId": x.jobId,
		           "type": x.type,
		           "input": input,
		           "filepath":filepath,
               "cardId":x.cardid,
               "cpuId":x.cpuid,
		           "starttime": x.starttime,
		           "numofoutputs": x.numofoutputs,
		           "status": status};
		           return jobInfo;
		         }
		        }
		       );
		       var respAll = resp.filter(function(e) {
		            if(e!=null){
		              return true;
		            }
		            else{
		              return false;
		            }
		          });

		        callback({jobInfo:respAll,totalNum:totalnum});
		    }
		  });
		};
