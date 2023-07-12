import { InferType, array, string } from "yup";

import { productSchema } from "./product.schema";

//***********************************************
//* fc-insurance
//***********************************************

export const fcInsuranceCoveragePriceSchema = productSchema.shape({
  insurance_type: string().required(),
});

export const fcInsuranceCoverageSchema = productSchema.shape({
  /** @name InsuranceType */
  type: string().required(),
  coverage_type: string().required(),
  product_type: string().required(),
  insured_type: string().required(),
  price: fcInsuranceCoveragePriceSchema.required(),
});

export const fcInsurancePriceSchema = productSchema.shape({
  /** @name TotalPremium */
  premium_price: string().required(),
  /** @name TotalGst */
  tax_gst_price: string().required(),
  /** @name TotalPst */
  tax_pst_price: string().required(),
  /** @name PaymentAmount */
  payment_price: string().required(),
  /** @name FinanceAmount */
  grand_total: string().required(),
});

export const fcInsuranceSchema = productSchema.shape({
  /** @name Coverages */
  coverage: array(fcInsuranceCoverageSchema).required(),
  price: fcInsurancePriceSchema.required(),
});

export type FcInsuranceSchema = InferType<typeof fcInsuranceSchema>;
