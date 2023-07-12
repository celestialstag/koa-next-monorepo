//***********************************************
//* certificate
//***********************************************

export type BaseCertificate = {
  user_id: number;
  token: string;
};

export type CertificateModel = BaseCertificate & {
  updated: Date;
  created: Date;
  deleted?: Date | null;
};
