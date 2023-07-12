//***********************************************
//* request_log
//***********************************************

import { ApiRequestLogType } from "../enums";

export type BaseRequestLog = {
  id: number;
  // request_type: string;
  request_type: ApiRequestLogType;
  request_user: string;
  request_data: string;
};

export type BaseRequestModel = BaseRequestLog & {
  updated: Date;
  created: Date;
  deleted?: Date | null;
};
