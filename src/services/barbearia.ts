import api from "./api";

export async function getBarbearias() {
  const { data } = await api.get("/barbearias");
  return data;
}

export async function createBarbearia(payload: any) {
  const { data } = await api.post("/barbearias", payload);
  return data;
}
