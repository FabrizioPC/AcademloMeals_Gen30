import z from 'zod';
import { extractValidationData } from '../../common/utils/extractErrorData.js';

const createOrderSchema = z.object({
  mealId: z
    .number({
      invalid_type_error: 'mealId must be a number',
      required_error: 'mealId is required',
    })
    .int({ invalid_type_error: 'mealId must be a integer' }),
  quantity: z
    .number({
      invalid_type_error: 'quantity must be a number',
      required_error: 'quantity is required',
    })
    .int({ invalid_type_error: 'quantity must be a integer' }),
});

export function validateOrder(data) {
  const result = createOrderSchema.safeParse(data);

  const {
    hasError,
    errorMessages,
    data: orderData,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessages,
    orderData,
  };
}
