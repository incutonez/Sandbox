import { ref } from "vue";
import { DiffApi, DiffGet200ResponseInner } from "@incutonez/differ-shared";
import { apiConfig } from "@/api/config";

const Api = new DiffApi(apiConfig);
export const diffRecords = ref<DiffGet200ResponseInner[]>([]);

export async function getDiff() {
	const response = await Api.diffGet();
	diffRecords.value = response.data ?? [];
}
