import { Configuration, DiffApi, DiffGet200ResponseInner } from "shared-differ";
import { ref } from "vue";

const apiConfig = new Configuration({
  basePath: "http://localhost:3000",
});
const Api = new DiffApi(apiConfig);
export const diffRecords = ref<DiffGet200ResponseInner[]>();

export async function getDiff() {
  const response = await Api.diffGet();
  diffRecords.value = response.data;
}
