import { nest } from "../utils";
import { User } from "../types";

export const signinUser = async (dataV: any) => {
  try {
    const { data } = await nest({
      url: "auth/signin",
      method: "POST",
      data: dataV,
    });
    if (data?.status === "success") {
      return data;
    }
    return false;
  } catch (err) {
    throw err;
  }
};

interface SignupUserDataV {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
}

export interface SignupUserReturn {
  status: string;
  token: string;
  user: User;
}

export const signupUser = async (
  dataV: SignupUserDataV
): Promise<SignupUserReturn> => {
  try {
    const { data } = await nest({
      url: "auth/signup",
      method: "POST",
      data: dataV,
    });
    if (data?.status === "success") {
      return data;
    }
    throw new Error(data?.message || "Something went wrong !");
  } catch (err) {
    throw err;
  }
};

interface SignupVendorDataV {
  service: string;
  location: {
    type: string;
    coordinates: number[];
  };
  phone: string;
  about: string;
  place: string;
}

export const signupVendor = async (dataV: SignupVendorDataV, token: string) => {
  try {
    const { data } = await nest({
      url: "auth/signup/vendor",
      method: "POST",
      data: dataV,
      headers: {
        authorization: "Bearer " + token,
      },
    });
    if (data?.status === "success") {
      return data;
    }
    return false;
  } catch (err) {
    throw err;
  }
};

export const signinAdmin = async (dataV: any) => {
  try {
    const { data } = await nest({
      url: "auth/signin/admin",
      method: "POST",
      data: dataV,
    });
    if (data?.status === "success") {
      return data;
    }
    return false;
  } catch (err) {
    throw err;
  }
};

interface SignProviderDataV {
  name: string | null;
  email: string | null;
  image: string | null;
  phone: string | null;
  provider: string;
  idToken: string;
}

export const signinWithProvider = async (dataV: SignProviderDataV) => {
  try {
    const { data } = await nest({
      url: "auth/signin/provider",
      method: "POST",
      data: dataV,
    });
    if (data?.status === "success") {
      return data;
    }
    return false;
  } catch (err) {
    throw err;
  }
};
