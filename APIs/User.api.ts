import { nest } from "../utils";

export const getUsersByRole = async (role: string, token: string) => {
  try {
    const { data } = await nest({
      method: "GET",
      url: `/user/role/${role}`,
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (data.status === "success") {
      return data?.users;
    }
  } catch (err) {
    throw err;
  }
};

export const getFollowers = async (userId: string) => {
  try {
    const { data } = await nest({
      method: "GET",
      url: `/user/followers/${userId}`,
    });
    if (data.status === "success") {
      return data?.followers;
    }
    return false;
  } catch (err) {
    throw err;
  }
};

export const doSearch = async (searchText: string) => {
  try {
    if (!searchText) return false;
    const { data } = await nest({
      method: "GET",
      url: "/user/search/" + searchText,
    });
    if (!data || data.status !== "success") return false;
    return data;
  } catch (err) {
    throw err;
  }
};

export const banUser = async (
  userId: string,
  token: string,
  action: "ban" | "unban"
) => {
  try {
    const { data } = await nest({
      method: "PATCH",
      url: `/user/${action}/${userId}`,
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return data?.status === "success";
  } catch (err) {
    throw err;
  }
};

export const deleteUser = async (userId: string, token: string) => {
  try {
    const { data } = await nest({
      method: "DELETE",
      url: `/user/${userId}`,
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return data?.status === "success";
  } catch (err) {
    throw err;
  }
};

export const getVendorFollowers = async (token: string) => {
  try {
    const { data } = await nest({
      method: "GET",
      url: `/user/followers/vendor`,
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (data?.status === "success") return data?.users;
  } catch (err) {
    throw err;
  }
};

export const getMeUser = async (token: string) => {
  try {
    const { data } = await nest({
      method: "GET",
      url: `/user/me`,
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (data?.status === "success") return data?.user;
  } catch (err) {
    throw err;
  }
};

export const getMeAdmin = async (token: string) => {
  try {
    const { data } = await nest({
      method: "GET",
      url: `/user/admin/me`,
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (data?.status === "success") return data?.user;
  } catch (err) {
    throw err;
  }
};

export interface RoleDataV {
  from: "user" | "admin" | "super-admin";
  to: "user" | "admin" | "super-admin";
  id: string;
}

export const changeRole = async (token: string, dataV: RoleDataV) => {
  try {
    const { data } = await nest({
      method: "PATCH",
      url: `/user/role`,
      data: dataV,
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (data?.status === "success") return data?.user;
  } catch (err) {
    throw err;
  }
};

export interface EditPersonal {
  name: string;
  email: string;
  phone: unknown;
  location: {
    type: string;
    coordinates: number[];
  };
  place: string;
}

export const editPersonal = async (token: string, dataV: EditPersonal) => {
  try {
    const { data } = await nest({
      method: "PATCH",
      url: `/user/personal`,
      data: dataV,
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (data?.status === "success") return data?.user;
  } catch (err) {
    throw err;
  }
};

interface ChangeImage {
  image: string;
}

export const changeProfileImage = async (dataV: ChangeImage, token: string) => {
  try {
    const { data } = await nest({
      method: "PATCH",
      url: `/user/image`,
      data: dataV,
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (data?.status === "success") {
      return data;
    }
    return null;
  } catch (err) {
    throw err;
  }
};

interface ProfessionalData {
  service: string;
  workingDays: string;
  workRadius: string;
  experience: string;
  about: string;
}

export const updateProfessionalDetails = async (
  dataV: ProfessionalData,
  token: string
) => {
  try {
    const { data } = await nest({
      url: "/vendor/professional",
      method: "PATCH",
      data: dataV,
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (data?.status === "success") {
      return data;
    }
    return null;
  } catch (err) {
    throw err;
  }
};
