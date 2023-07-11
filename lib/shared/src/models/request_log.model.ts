//***********************************************
//* request_log
//***********************************************

export type BaseRequestLog = {
  id: number;
  request_type: string;
  request_user: string;
  request_data: string;
};

export type BaseRequestModel = BaseRequestLog & {
  updated: Date;
  created: Date;
  deleted?: Date | null;
};
