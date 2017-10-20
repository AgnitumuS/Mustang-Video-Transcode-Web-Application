import { appConfig,routeResp } from '../config';
import Request from 'superagent';
import {makeConsole,objPType,respType} from './myConsole';

export const stopJob = function(jobId,callback){
  var url = appConfig.HOST_API.TerminateJob.url;
  var body= { "jobId": jobId};
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

export const terminateJobArray = function(arr,callback){
  var url = appConfig.HOST_API.TerminateJobArray.url;
  var body= { "jobsArray": arr};
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

export const delete_job_byJobId = function(jobId,callback){
  var url = appConfig.HOST_API.DeleteJob.url.replace("{jobid}",jobId);
  Request.del(url).end(function(err, res){
    if (err || !res.ok) {
      makeConsole("delete_job_byJobId",respType.err,err,objPType.err);
      var resp = {};
      resp[routeResp.Result]=routeResp.FailResult;
      resp[routeResp.Data]=err;
      callback(resp);
    } else {
      if(res.body == null){
        makeConsole("delete_job_byJobId",respType.null,res.body,objPType.null);
        var resp = {};
        resp[routeResp.Result]=routeResp.SuccessResult;
        resp[routeResp.Data]="null response";
        callback(resp);
        return;
      }
      if(res.body["success"]){
        var resp = {};
        resp[routeResp.Result]=routeResp.SuccessResult;
        resp[routeResp.Data]="success delete job";
        callback(resp);
      }
      else{
        var resp = {};
        resp[routeResp.Result]=routeResp.SuccessResult;
        resp[routeResp.Data]="fail delete job";
        callback(resp);
      }
    }
  });
}
//del JobID By Array
export const Delete_job_byJobId_array = function(arr,callback){
	  var length = arr.length;
    var count = 0;
    var arrayResp=[];
	  for (var i=0;i<length;i++) {
  	  var url = appConfig.HOST_API.DeleteJob.url.replace("{jobid}",arr[i]);
  	  Request.del(url).end(function(err, res){
        count++;
  	    if (err || !res.ok) {
  	      makeConsole("delete_job_byJobId",respType.err,err,objPType.err);
  	      var resp = {};
  	      resp[routeResp.Result]=routeResp.FailResult;
  	      resp[routeResp.Data]=err;
          resp["name"]=arr[i];
          arrayResp.push(resp);
  	    } else {
  	      if(res.body == null){
  	        makeConsole("delete_job_byJobId",respType.null,res.body,objPType.null);
  	        var resp = {};
  	        resp[routeResp.Result]=routeResp.SuccessResult;
  	        resp[routeResp.Data]="null response";
            resp["name"]=arr[i];
            arrayResp.push(resp);            	        
  	      }
          else{
            if(res.body["success"]){
    	        var resp = {};
    	        resp[routeResp.Result]=routeResp.SuccessResult;
    	        resp[routeResp.Data]="success delete job";
              resp["name"]=arr[i];
              arrayResp.push(resp);
    	      }
    	      else{
    	        var resp = {};
    	        resp[routeResp.Result]=routeResp.SuccessResult;
    	        resp[routeResp.Data]="fail delete job";
              resp["name"]=arr[i];
              arrayResp.push(resp);
    	      }
          }
  	    }
        if(count == length){
          callback(arrayResp);
        }
  	  });
	  } //for loop
 	};
