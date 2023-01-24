export const validateEmail = (email: string) => {
  return String(email)
    ?.toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const lengthChecker = (word: string, min: number, max: number) => {
  const len = String(word).length;
  if (!len) return false;
  if (max < min) return false;
  if (len > max) return false;
  if (len < min) return false;
  return true;
};
// Check if the entered number is valid
export const validatePhone = (num: string) => {
  let isOnlyNum = /^\d+$/.test(num);
  let isLengthTen = num.length === 10;
  return isOnlyNum && isLengthTen;
};
