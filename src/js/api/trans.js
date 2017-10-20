import { appConfig,routeResp } from '../config';
import Request from 'superagent';

export const baseTrans = function(body,type,callback){
   var mapArray = {"vod":"CreateVODJob","live":"CreateLiveJob","file":"CreateFileJob"};
   var urltmp = appConfig.HOST_API[mapArray[type]];
   if(urltmp == null){
     var resp = {};
     resp[routeResp.Result]=routeResp.FailResult;
     resp[routeResp.Data]="no this type : "+type;
     callback(resp);
     return;
   }
   var url =urltmp.url;
   Request.post(url).set('Content-Type', 'application/json')
   .send(JSON.stringify(body)).end(function(err, res){
     if (err || !res.ok) {
       var resp = {};
       resp[routeResp.Result]=routeResp.FailResult;
       resp[routeResp.Data]=err;
       callback(resp);
     } else {
       var resp = {};
       resp[routeResp.Result]=routeResp.SuccessResult;
       resp[routeResp.Data]=res.body;
       callback(resp);
     }
   });
}
