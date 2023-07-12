//***********************************************
//* api_user
//***********************************************

export type BaseApiUser = {
  user_id: number;
  token: string;
};

export type ApiUserModel = BaseApiUser & {
  updated: Date;
  created: Date;
  deleted?: Date | null;
};
