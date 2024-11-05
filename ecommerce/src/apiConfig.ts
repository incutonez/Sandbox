import { Configuration, ImagesApi, ProductsApi } from "@incutonez/spec";

export const configuration = new Configuration({
	basePath: import.meta.env.VITE_BASE_API,
});

export const ProductsAPI = new ProductsApi(configuration);

export const ImagesAPI = new ImagesApi(configuration);
