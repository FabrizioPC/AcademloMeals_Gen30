import z from 'zod';

import { extractValidationData } from '../../common/utils/extractErrorData.js';

const createReviewSchema = z.object({
  comment: z.string({
    invalid_type_error: 'comment must be a string',
    required_error: 'comment is required',
  }),
  rating: z
    .number({
      invalid_type_error: 'Rating must be a number',
      required_error: 'rating is required',
    })
    .int({ invalid_type_error: 'The rating must be a integer' })
    .min(1, { message: 'Rating number must be greater than 1' })
    .max(5, { message: 'The maximum rating number is 5' }),
});
const updateReviewSchema = z.object({
  comment: z.string({
    invalid_type_error: 'comment must be a string',
    required_error: 'comment is required',
  }),
  rating: z
    .number({
      invalid_type_error: 'Rating must be a number',
      required_error: 'rating is required',
    })
    .int({ invalid_type_error: 'The rating must be a integer' })
    .min(1, { message: 'Rating number must be greater than 1' })
    .max(5, { message: 'The maximum rating number is 5' }),
});

export function validateReview(data) {
  const result = createReviewSchema.safeParse(data);

  const {
    hasError,
    errorMessages,
    data: reviewData,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessages,
    reviewData,
  };
}

export function validateUpdateReview(data) {
  const result = updateReviewSchema.safeParse(data);

  const {
    hasError,
    errorMessages,
    data: reviewData,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessages,
    reviewData,
  };
}
