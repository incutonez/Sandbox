import { ref } from "vue";
import { Configuration, DefaultApi, LeagueMatchEntity, LeaguesApi, ProfileEntity } from "@incutonez/spec";
import axios from "axios";

export const configuration = new Configuration({
	basePath: "http://localhost:3000",
});

export const DefaultService = new DefaultApi(configuration);

export const LeaguesService = new LeaguesApi(configuration);

export const profile = ref<ProfileEntity>();


/**
 * @param refresh
 * Refresh param is to be used if you want to get a new access token in case the previous one had expired.
 */
export async function setAccessToken(refresh = true) {
	const commonConfig = axios.defaults.headers.common;
	if (refresh) {
		commonConfig.Authorization = null;
	}
	if (commonConfig.Authorization) {
		return;
	}
	try {
		const { data } = await DefaultService.getAccessToken();
		// Right now we just assume that all API calls will need this access token, so we set it globally
		commonConfig.Authorization = `Bearer ${data.accessToken}`;
		setProfile();
	}
	catch (ex) {
		alert("An error occurred.  Please contact someone.");
		console.error(ex);
	}
}

export async function setProfile() {
	try {
		const { data } = await DefaultService.getProfile();
		profile.value = data;
	}
	catch (ex) {
		alert("An error occurred.  Please contact someone.");
		console.error(ex);
	}
}

export async function getAllMatches() {
	let response: LeagueMatchEntity[] = [];
	try {
		await setAccessToken();
		const { data } = await LeaguesService.getMatches();
		response = data.data;
	}
	catch (ex) {
		alert("An error occurred.  Please contact someone.");
		console.error(ex);
	}
	return response;
}

export async function getAPIVersion() {
	try {
		const { data } = await DefaultService.getVersion();
		return data.version;
	}
	catch (ex) {
		alert("An error occurred.  Please contact someone.");
		console.error(ex);
	}
}
