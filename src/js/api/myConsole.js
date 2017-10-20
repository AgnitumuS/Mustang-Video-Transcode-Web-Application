export const objPType={normal:0,json:1,err:2,obj:3,null:4};
export const respType={err:0,unknown:1,normal:2,null:3};
export const makeConsole = function(functionName,respTypeTmp,obj,objPTypeTmp){
  var title=functionName;
  var subTitle=" ";
  if(respType==respType.err){
    subTitle=" err : ";
  }
  else if(respType==respType.unknown){
    subTitle=" undefined resp : ";
  }
  else if(respType == respType.normal){
    subTitle=" obj : ";
  }
  else if(respType == respType.null){
    subTitle=" : ";
  }
  var objTmp="";
  if(objPTypeTmp==objPType.normal){
    objTmp = obj;
  }
  else if(objPTypeTmp==objPType.json){
    if(obj == null){
      objTmp="JSON.stringify but obj is null";
    }
    else{
      objTmp = JSON.stringify(obj);
    }
  }
  else if(objPTypeTmp==objPType.err){
    objTmp = obj;
  }
  else if(objPTypeTmp==objPType.obj){
    if(obj == null){
      objTmp="JSON.stringify but obj is null";
    }
    else{
      objTmp = JSON.stringify(obj);
    }
  }
  else if(objPTypeTmp==objPType.null){
    objTmp = "null response";
  }

  var result=title+subTitle+objTmp;
  //console.log(result);
}
