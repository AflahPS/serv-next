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
  if (!word) return false;
  if (max < min) return false;
  const len = String(word).length;
  if (!len) return false;
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
  if (!currentUser) return false;
  if (!currentUser.followers?.length) return false;
  const otherUserId = candidateUser?._id?.toString();
  if (!otherUserId) return false;
  if (
    currentUser.followers.some((el: string | User) => {
      if (typeof el === "string") return el.toString() === otherUserId;
      if (typeof el === "object") return el?._id?.toString() === otherUserId;
      return false;
    })
  ) {
    return true;
  }
  return false;
};

export const firstLetterCapitalizer = (str: string) =>
  `${str[0].toUpperCase()}${str.slice(1)}`;

export const deepCloneObject = (obj: {}) => JSON.parse(JSON.stringify(obj));

export const checkIfAdmin = (user: User): boolean => {
  return user.role === "admin" || user.role === "super-admin";
};
