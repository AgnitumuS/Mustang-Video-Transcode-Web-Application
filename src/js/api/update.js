import { appConfig,routeResp } from '../config';
import Request from 'superagent';
import {makeConsole,objPType,respType} from './myConsole';

export const update_cardInfo_port_byCardId_byCPUId = function(req,CardId,CpuId,callback){
  //alert(JSON.stringify(req));
  if(req.type == undefined || req.value == undefined){
    var resp = {};
    resp[routeResp.Result]=routeResp.WarningResult;
    resp[routeResp.Data]="Please fill type and value";
    callback(resp);
    return;
  }
  const maxPort = 20000;
  const minPort = 1024;
  var port=req.value;
  var re = /^[0-9]+$/;
  var validateFlag = re.test(port);//(respValue) => extract(str, "[0-9a-zA-Z]+");

  if(!validateFlag){
    var resp = {};
    resp[routeResp.Result]=routeResp.WarningResult;
    resp[routeResp.Data]="Range: "+minPort+" ~ "+maxPort;
    callback(resp);
    return;
  }

  var intValue = parseInt(port);
  if(intValue > maxPort || intValue < minPort){
    var resp = {};
    resp[routeResp.Result]=routeResp.WarningResult;
    resp[routeResp.Data]="Range: "+minPort+" ~ "+maxPort;
    callback(resp);
    return;
  }

  var tmp = "";
   switch (req.type) {
     case "qtsPort":
       break;
     case "rtmpPort":
       break;
     case "httpPort":
       break;
     case "icecastPort":
       break;
     default:
       var resp = {};
       resp[routeResp.Result]=routeResp.WarningResult;
       resp[routeResp.Data]="Please check port Name";
       callback(resp);
       return;
   }

   var url = appConfig.HOST_API.UpdateNetworkConfig.url;
   var body={
     cardid : CardId,
     cpuid : CpuId,
     rtmpPort : "",
     httpPort : "",
     icecastPort : "",
     qtsPort : ""
   };
   body[req.type]=req.value;

   Request.put(url).set('Content-Type', 'application/json')
   .send(body)
   .end(function(err, res){
     if (err || !res.ok) {
       makeConsole("update_cardInfo_port_byCardId_byCPUId",respType.err,err,objPType.err);
       var resp = {};
 		   resp[routeResp.Result]=routeResp.FailResult;
       resp[routeResp.Data]=err;
       callback(resp);
     } else {
       if(res.body == null){
         var resp = {};
   		   resp[routeResp.Result]=routeResp.FailResult;
         resp[routeResp.Data]="Info format error";
         callback(resp);
         return;
       }
       if(res.body.success){
         var resp = {};
         resp[routeResp.Result]=routeResp.SuccessResult;
         resp[routeResp.Data]="Success to update";

         callback(resp);
       }
       else{
         var msgBox=res.body.message;
         var msg = "no error message"
         if(msgBox!=undefined){
           if(msgBox.length>0){
             msg = msgBox.toString();
           }
         }
         var resp = {};
         resp[routeResp.Result]=routeResp.FailResult;
         resp[routeResp.Data]=msg;
         callback(resp);
       }
     }
   });
};

export const update_cardName = function(name,cardid,cpuid,callback){
	  var url = appConfig.HOST_API.UpdateCardName.url;
	   var body={
	     cardid : cardid,
	     cpuid : cpuid,
	     name : name
	   };

	   Request.put(url).set('Content-Type', 'application/json')
	   .send(body)
	   .end(function(err, res){
	     if (err || !res.ok) {
	       makeConsole("update_cardInfo_port_byCardId_byCPUId",respType.err,err,objPType.err);
	       var resp = {};
	 		   resp[routeResp.Result]=routeResp.FailResult;
	       resp[routeResp.Data]=err;
	       callback(resp);
	     } else {
	       if(res.body == null){
	         var resp = {};
	   		   resp[routeResp.Result]=routeResp.FailResult;
	         resp[routeResp.Data]="Info format error";
	         //alert('resp2='+JSON.stringify(resp));
	         callback(resp);
	         return;
	       }

	       if(res.body == null){
	         var resp = {};
	   		   resp[routeResp.Result]=routeResp.FailResult;
	         resp[routeResp.Data]="Info format error";
	         //alert('resp3='+JSON.stringify(resp));
	         callback(resp);
	         return;
	       }
	       if(res.body.success){
	         var resp = {};
	         resp[routeResp.Result]=routeResp.SuccessResult;
	         resp[routeResp.Data]="Success to update";
	         //alert('resp4='+JSON.stringify(resp));
	         callback(resp);
	       }
	       else{
	         var msgBox=res.body.message;
	         var msg = "no error message"
	         if(msgBox!=undefined){
	           if(msgBox.length>0){
	             msg = msgBox.toString();
	           }
	         }
	         var resp = {};
	         resp[routeResp.Result]=routeResp.FailResult;
	         resp[routeResp.Data]=msg;
	         //alert('resp5='+JSON.stringify(resp));
	         callback(resp);
	       }
	     }
	   });
	};
