import { ResponseListEntity } from "@incutonez/spec/dist";

export function toInt(value: string) {
	return parseInt(value, 10);
}

export function isListResponse(response: ResponseListEntity | unknown[]): response is ResponseListEntity {
	return "total" in response || "data" in response;
}
