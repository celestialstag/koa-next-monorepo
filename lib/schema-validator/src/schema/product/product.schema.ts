import { InferType, object, string } from "yup";

//***********************************************
//* product
//***********************************************

export const productFormSchema = object({
  form_type: string().required(),
  revision_date: string().required(),
});

export const productSchema = object({
  form: productFormSchema.required(),
  contract_date: string().required(),
  /** @name PaymentType */
  payment_method: string().required(),
});

export type ProductSchema = InferType<typeof productSchema>;
