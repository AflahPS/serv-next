import { AxiosError } from "axios";
import { User } from "../types";

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

export const IsValidString = (str: string): boolean => str.trim().length > 0;

export const axiosThrowerByMessage = (
  err: any,
  message: string,
  cb: () => any
) => {
  if (err instanceof AxiosError) {
    if (err?.response?.data?.message == message) return cb();
    console.log(err?.response?.data?.message);
  }
  console.log(err?.message);
};

export const checkIfFriends = (currentUser: User, candidateUser: User) => {
  if (
    currentUser &&
    currentUser.followers?.some((el: string | User) => {
      if (typeof el === "string") {
        return el.toString() === candidateUser._id.toString();
      } else if (typeof el === "object") {
        return el._id.toString() === candidateUser._id.toString();
      }
    })
  ) {
    return true;
  }
  return false;
};
