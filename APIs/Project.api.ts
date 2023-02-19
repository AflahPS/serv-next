import { nest } from "../utils";

export async function getAllProjects(token: string) {
  try {
    const { data } = await nest({
      method: "GET",
      url: "/project/all",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (data?.status === "success") {
      return data;
    }
  } catch (err) {
    throw err;
  }
}

export async function getProjectsOfVendor(token: string) {
  try {
    const { data } = await nest({
      method: "GET",
      url: "/project",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (data?.status === "success") {
      return data?.projects;
    }
    return false;
  } catch (err) {
    throw err;
  }
}

export async function getProjectsOfUser(token: string) {
  try {
    const { data } = await nest({
      method: "GET",
      url: "/project/user",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (data?.status === "success") {
      return data?.projects;
    }
    return false;
  } catch (err) {
    throw err;
  }
}

export async function createProject(dataV: any, token: string) {
  try {
    const { data } = await nest({
      method: "POST",
      url: "/project",
      data: dataV,
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (data?.status === "success") {
      return data;
    }
  } catch (err) {
    throw err;
  }
}

export async function reportProject(projectId: string, token: string) {
  try {
    const { data } = await nest({
      method: "PATCH",
      url: `/project/report/${projectId}`,
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (data?.status === "success") {
      return true;
    }
    return false;
  } catch (err) {
    throw err;
  }
}

export async function unreportProject(projectId: string, token: string) {
  try {
    const { data } = await nest({
      method: "PATCH",
      url: `/project/unreport/${projectId}`,
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (data?.status === "success") {
      return true;
    }
    return false;
  } catch (err) {
    throw err;
  }
}

export async function deleteProject(projectId: string, token: string) {
  try {
    const { data } = await nest({
      method: "DELETE",
      url: `/project/${projectId}`,
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (data?.status === "success") {
      return true;
    }
    return false;
  } catch (err) {
    throw err;
  }
}
