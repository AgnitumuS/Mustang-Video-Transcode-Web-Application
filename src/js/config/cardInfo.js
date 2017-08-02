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
//         "cardid": "CARD1",
//         "serialno": "AACCC12324",
//         "cardname": "Your Own Cardname",
//         "model": "CA-200",
//         "firmware": "4.2.3",
//         "manufacturer": "IEI",
//         "cpu": [
//             {
//                 "cpuId": "CPUID1",
//                 "processor": "Intel(R) Core(TM) i5-7267U CPU@3.10GHz",
//                 "memory": "8GB",
//                 "ipaddress": "192.168.11.2",
//                 "mac": "E0:18:7D:2E:CE:03",
//                 "gpu": "Intel® Iris™ Plus Graphics 650 (GT3e) Embedded graphics DRAM per GPU: 64 MB"
//             },
//             {
//                 "cpuId": "CPUID2",
//                 "processor": "Intel(R) Core(TM) i5-7267U CPU@3.10GHz",
//                 "memory": "8GB",
//                 "ipaddress": "192.168.12.2",
//                 "mac": "E0:18:7D:2E:CE:02",
//                 "gpu": "Intel® Iris™ Plus Graphics 650 (GT3e) Embedded graphics DRAM per GPU: 64 MB"
//             }
//         ]
//     }
//
export const cardInfo = {
  cards: [],
  cardNum: 0
}
