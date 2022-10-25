type Validator = (value: any, values?: any) => string | null;

export const required = (value: any) => {
  if (!value) return 'Required';
  return null;
};

export const minLenght = (length: number) => (value: string) => {
  if (!value) return null;
  if (value.length < length)
    return `This should have at least ${length} characters.`;
  return null;
};

export const maxLength = (length: number) => (value: string) => {
  if (!value) return null;
  if (value.length > length)
    return `This should have at most ${length} characters.`;
  return null;
};

export const max = (amount: number) => (value: number) => {
  if (!value) return null;
  if (value > amount) return `Value cannot exceed ${amount}.`;
  return null;
};

export const min = (amount: number) => (value: number) => {
  if (!value) return null;
  if (value < amount) return `Value cannot be lower than ${amount}.`;
  return null;
};

export const matches =
  (field: string, message: string) => (value: any, values: any) => {
    if (!value) return null;
    if (value === values[field]) return null;
    return message;
  };

export const email = (value: string) => {
  if (!value) return null;
  if (/^\S+@\S+$/.test(value)) return null;
  return 'Invalid email';
};

export const stopOnFirstFailure =
  (validators: Validator[]) => (value: any, values: any) => {
    for (const validator of validators) {
      const result = validator(value, values);
      if (result) return result;
    }
    return null;
  };
