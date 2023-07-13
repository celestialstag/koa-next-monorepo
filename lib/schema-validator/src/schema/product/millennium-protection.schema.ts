import { InferType, string } from "yup";

import { productSchema } from "./product.schema";

//***********************************************
//* millennium-protection
//***********************************************

export const millenniumProtectionPriceSchema = productSchema.shape({
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

export const millenniumProtectionSchema = productSchema.shape({
  plan_type: string().required(),
  /** @name Price */
  total_price: string().required(),
  /** @name Premium */
  premium_price: string().required(),
  /** @name Gst */
  gst_price: string().required(),
  /** @name Pst */
  pst_price: string().required(),
  /** @name TotalPremium */
  total_premium_price: string().required(),
});

export type MillenniumProtectionSchema = InferType<
  typeof millenniumProtectionSchema
>;
