export function getImageUrl(imageId = "") {
	return `${import.meta.env.VITE_BASE_API}/images/${imageId}`;
}
