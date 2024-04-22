// validate password through regex
export const passwordValidation = (
  newPassword: any,
  setValidations: any
): void => {
  const lengthRegex = /.{6,}/;
  const lowercaseRegex = /[a-z]/;
  const uppercaseRegex = /[A-Z]/;
  const numberRegex = /[0-9]/;
  const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

  const updatedValidations = {
    length: lengthRegex.test(newPassword),
    lowercase: lowercaseRegex.test(newPassword),
    uppercase: uppercaseRegex.test(newPassword),
    number: numberRegex.test(newPassword),
    specialChar: specialCharRegex.test(newPassword)
  };

  setValidations(updatedValidations);
};
