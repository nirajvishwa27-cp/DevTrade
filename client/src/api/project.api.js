import api from "../utils/axios";

export async function getAllProject() {
  const res = await api.get("/project");
  return res;
}

export async function uploadProject(data) {
  const res = await api.post("/project/upload", data);
  return res;
}

export async function updateProject(id, data) {
  const res = await api.patch(`/project/update/${id}`, data);
  return res;
}

export async function deleteProject(id) {
  const res = await api.delete(`/project/delete/${id}`);
  return res;
}

export async function getMyProjects(id) {
  const res = await api.get(`/project/getMyProject/${id}`);
  return res;
}

export async function getProjectById(id) {
  const res = await api.get(`/project/getProjectById/${id}`);
  return res;
}
