'use strict';

// cards:[
//   {
//     id:"catching",
//     cpuinfo1:{
//       id:"catching",
//       cpu:0,
//       gpu:0,
//       ip:"catching"
//     },
//     cpuinfo2:{
//       id:"catching",
//       cpu:0,
//       gpu:0,
//       ip:"catching"
//     }
//   }]


// {
//   "cards":[
//     {"id":"CARD2","cpuinfo1":{"id":"CPUID1","cpu":0,"gpu":0,"memoryUsage":1.5,"usedMemoryPrecentage":9.7,"temperature":49,"RX":0,"TX":0,"info":{"cpuVersion":{"Version":"Intel(R) Core(TM) i7-7567U CPU @ 3.50GHz"},"cpuMemory":"16GB","ip":"192.168.13.2","mac":"00:18:7d:ff:00:df","gpu":"catching","qtsPort":"8083","rtmpPort":"1937","httpPort":"8002","icecastPort":"8102","qtsName":"Transcode A"}},"cpuinfo2":{"id":"CPUID2","cpu":0,"gpu":0,"memoryUsage":1.5,"usedMemoryPrecentage":9.39,"temperature":53,"RX":0,"TX":0,"info":{"cpuVersion":{"Version":"Intel(R) Core(TM) i7-7567U CPU @ 3.50GHz"},"cpuMemory":"16GB","ip":"192.168.14.2","mac":"00:18:7d:ff:00:e0","gpu":"catching","qtsPort":"8084","rtmpPort":"1938","httpPort":"8003","icecastPort":"8103","qtsName":"Transcode B"}}}
//     ],
//  "cardNum":3,
//  "hostIP":"10.10.70.145"
// }

export const cardInfo = {
  cards: [],
  cardNum: 0
}

export var get_cardsIdArray = function(){
  var tmpCardIDArr =[];
  for (var a = 0; a < cardInfo.cards.length; a++) {
    if(cardInfo.cards[a].id.toString() != undefined){
      tmpCardIDArr.push(cardInfo.cards[a].id.toString());
    }
  }
  return tmpCardIDArr;
}
