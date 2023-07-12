//***********************************************
//* certificate
//***********************************************

import { InferType, object, string } from "yup";

import { customerSchema } from "./customer.schema";

export const certificateDealerSchema = object({
  /** @name DealerGstNumber */
  gst_number: string().required(),
});

export const certificateSchema = object({
  dealer: certificateDealerSchema.required(),
  customer: customerSchema.required(),
});

export type CertificateSchema = InferType<typeof certificateSchema>;

export type CertificateDealerSchema = InferType<typeof certificateDealerSchema>;
