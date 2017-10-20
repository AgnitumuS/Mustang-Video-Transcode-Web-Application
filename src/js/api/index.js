'use strict';
import { get_cpu_gpu,get_cardInfo,get_jobInfo_byCardId_byCPUId,get_jobInfo_byJobId,get_jobInfoDetail_byJobId,get_jobInfo_FailMsg_byJobId,get_currentJobInfo_byCardId_byCPUId,Search_jobInfo_by_condition} from './info';
import { update_cardInfo_port_byCardId_byCPUId,update_cardName } from './update';
import { stopJob,terminateJobArray,delete_job_byJobId,Delete_job_byJobId_array } from './delete';
import { baseTrans} from './trans';
import { get_file_list,get_file_info } from './media';

export {
  //info
  get_cpu_gpu,
  get_cardInfo,
  get_jobInfo_byCardId_byCPUId,
  get_jobInfo_byJobId,
  get_jobInfoDetail_byJobId,
  get_jobInfo_FailMsg_byJobId,
  get_currentJobInfo_byCardId_byCPUId,
  Search_jobInfo_by_condition,
  //update
  update_cardInfo_port_byCardId_byCPUId,
  update_cardName,
  //delete
  Delete_job_byJobId_array,
  stopJob,
  terminateJobArray,
  delete_job_byJobId,
  //media
  get_file_list,
  get_file_info,
  //trans
  baseTrans
};
