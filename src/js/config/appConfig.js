
'use strict';
const DebugUse=false;//false;
// More Special ----- 2017-07-10
const appConfigHead = {
  // connection status text references
  HOST_API: {
    host:"127.0.0.1",//"127.0.0.1"
    port:9453,
    mainPath:"/mvt/api/v1"
  }
};
export const routeResp = {
	Result:"result",//success/fail
  Data:"msg",//return data
	SuccessResult:"Success",
	FailResult:"Fail",
}
const HOST_API_URL_HEAD= DebugUse?("http://"+appConfigHead.HOST_API.host+":"+appConfigHead.HOST_API.port+appConfigHead.HOST_API.mainPath):(appConfigHead.HOST_API.mainPath);

export const appConfig = {

  APP_NAME: 'mvt_react',

  // connection status text references
  HOST_API_URL_HEAD:HOST_API_URL_HEAD,


  HOST_IP:appConfigHead.HOST_API.host,

  USECARD:1,
  HOST_API:{
    //VOD API    --------------------
    CreateVODJob:{
      url:HOST_API_URL_HEAD+"/vod/jobs",
      method:"POST"
    },
    //LIVE API    --------------------
    CreateLiveJob:{
      url:HOST_API_URL_HEAD+"/live/jobs",
      method:"POST"
    },
    //File API    --------------------
    CreateFileJob:{
      url:HOST_API_URL_HEAD+"/file/jobs",
      method:"POST"
    },
    //Card Info API    --------------------
    GetCardInformation:{
      url:HOST_API_URL_HEAD+"/cardinfo",
      method:"GET"
    },
    //CGMonitor API    --------------------
    GetCGInformation:{
      url:HOST_API_URL_HEAD+"/cginfo",
      method:"GET"
    },
    GetCardJobInformation:{
      url:HOST_API_URL_HEAD+"/cpujobinfo/{cardid}",
      method:"GET"
    },
    GetJob:{
      url:HOST_API_URL_HEAD+"/jobs/{jobid}",
      method:"GET"
    },
    //Special API    --------------------
    TerminateJob:{
      url:HOST_API_URL_HEAD+"/terminate",
      method:"POST"
    },
    //Special API From FILE   --------------------
    GetDetailAPI:{
      url:HOST_API_URL_HEAD+"/mediainfo",
      method:"POST"
    },
    ConfigStart:{
      url:HOST_API_URL_HEAD+"/getconfig",
      method:"GET"
    },
    // General API -----
    GetContentOfSpecifiedPath:{
      url:HOST_API_URL_HEAD+"/listdir?path={dirpath}",
      method:"GET"
    },
    SelectJobsbyTimeInterval:{
      url:HOST_API_URL_HEAD+"/jobs/timeinterval?pageIdx={index}&countPerPage={cnt}&startDate={datetime}&endDate={datetime}&cardid={id}&cpuid={cpuid}",
      method:"GET"
    },
    GetHomeDirectoryPathOfHostMachine:{
      url:HOST_API_URL_HEAD+"/homedir",
      method:"GET"
    },
  },
};
