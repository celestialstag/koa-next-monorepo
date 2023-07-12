import { InferType, object, string } from "yup";

//***********************************************
//* product
//***********************************************

export const productSchema = object({
  contract_date: string().required(),
  /** @name PaymentType */
  payment_method: string().required(),
});

export type ProductSchema = InferType<typeof productSchema>;
