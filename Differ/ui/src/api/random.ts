import { RandomApi } from "shared-differ";
import { apiConfig } from "@/api/config";

export const ApiRandom = new RandomApi(apiConfig);

export async function getRandomData(page = 0) {
  const response = await ApiRandom.randomGet(page);
  return response.data;
}
