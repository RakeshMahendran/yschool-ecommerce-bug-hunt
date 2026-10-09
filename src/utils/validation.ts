import type { CustomerDetails } from '../types';

export type CheckoutErrors = Partial<Record<keyof CustomerDetails, string>>;

const EMAIL_PATTERN = /[^\s@]+@[^\s@]+/;
const PHONE_PATTERN = /^[6-9]\d{9}$/;
const MIN_ADDRESS_LENGTH = 10;

export function validateCheckout(values: CustomerDetails): CheckoutErrors {
  const errors: CheckoutErrors = {};

  if (!values.name.trim()) {
    errors.name = 'Please enter your full name.';
  }

  const email = values.email.trim();
  if (!email) {
    errors.email = 'Please enter your email address.';
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = 'Please enter a valid email address.';
  }

  const phone = values.phone.replace(/[\s-]/g, '').replace(/^\+?91(?=\d{10}$)/, '');
  if (phone && !PHONE_PATTERN.test(phone)) {
    errors.phone = 'Please enter a valid 10-digit mobile number.';
  }

  if (values.address.length > 0 && values.address.trim().length < MIN_ADDRESS_LENGTH) {
    errors.address = 'Please enter a complete delivery address (at least 10 characters).';
  }

  return errors;
}
