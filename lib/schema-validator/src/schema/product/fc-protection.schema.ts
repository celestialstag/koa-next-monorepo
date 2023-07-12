import { InferType, string } from "yup";

import { productSchema } from "./product.schema";

//***********************************************
//* fc-protection
//***********************************************

export const fcProtectionPriceSchema = productSchema.shape({
  retail_price: string().required(),
  discount_price: string().required(),
  contact_price: string().required(),
  /** @name GprFee */
  gpr_price: string().required(),
  /** @name GprGst */
  gpr_tax_gst_price: string().required(),
  /** @name GprGst */
  gpr_tax_pst_price: string().required(),
  /** @name Gst */
  tax_gst_price: string().required(),
  /** @name Pst */
  tax_pst_price: string().required(),
  /** @name TotalAmount */
  grand_total: string().required(),
});

export const fcProtectionSchema = productSchema.shape({
  plan_type: string().required(),
  coverage_type: string().required(),
  deductible_type: string().required(),
  month_term: string().required(),
  price: fcProtectionPriceSchema.required(),
});

export type FcProtectionSchema = InferType<typeof fcProtectionSchema>;
