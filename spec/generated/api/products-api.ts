/* tslint:disable */
/* eslint-disable */
/**
 * API
 * The main API for all Sandbox apps
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import type { Configuration } from '../configuration';
import type { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
import globalAxios from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from '../common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';
// @ts-ignore
import { ApiPaginatedRequest } from '../models';
// @ts-ignore
import { ProductEntity } from '../models';
// @ts-ignore
import { ProductResponseModel } from '../models';
/**
 * ProductsApi - axios parameter creator
 * @export
 */
export const ProductsApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        bulkImport: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/products/3a9498d6-22ba-4ffa-ba00-3d68180d2618`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {string} productId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getProduct: async (productId: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'productId' is not null or undefined
            assertParamExists('getProduct', 'productId', productId)
            const localVarPath = `/products/{productId}`
                .replace(`{${"productId"}}`, encodeURIComponent(String(productId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {ApiPaginatedRequest} apiPaginatedRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listProducts: async (apiPaginatedRequest: ApiPaginatedRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'apiPaginatedRequest' is not null or undefined
            assertParamExists('listProducts', 'apiPaginatedRequest', apiPaginatedRequest)
            const localVarPath = `/products/list`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(apiPaginatedRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * ProductsApi - functional programming interface
 * @export
 */
export const ProductsApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = ProductsApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async bulkImport(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.bulkImport(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {string} productId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getProduct(productId: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ProductEntity>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getProduct(productId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {ApiPaginatedRequest} apiPaginatedRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listProducts(apiPaginatedRequest: ApiPaginatedRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ProductResponseModel>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.listProducts(apiPaginatedRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * ProductsApi - factory interface
 * @export
 */
export const ProductsApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = ProductsApiFp(configuration)
    return {
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        bulkImport(options?: any): AxiosPromise<void> {
            return localVarFp.bulkImport(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {string} productId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getProduct(productId: string, options?: any): AxiosPromise<ProductEntity> {
            return localVarFp.getProduct(productId, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {ApiPaginatedRequest} apiPaginatedRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listProducts(apiPaginatedRequest: ApiPaginatedRequest, options?: any): AxiosPromise<ProductResponseModel> {
            return localVarFp.listProducts(apiPaginatedRequest, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * ProductsApi - interface
 * @export
 * @interface ProductsApi
 */
export interface ProductsApiInterface {
    /**
     * 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ProductsApiInterface
     */
    bulkImport(options?: AxiosRequestConfig): AxiosPromise<void>;

    /**
     * 
     * @param {string} productId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ProductsApiInterface
     */
    getProduct(productId: string, options?: AxiosRequestConfig): AxiosPromise<ProductEntity>;

    /**
     * 
     * @param {ApiPaginatedRequest} apiPaginatedRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ProductsApiInterface
     */
    listProducts(apiPaginatedRequest: ApiPaginatedRequest, options?: AxiosRequestConfig): AxiosPromise<ProductResponseModel>;

}

/**
 * ProductsApi - object-oriented interface
 * @export
 * @class ProductsApi
 * @extends {BaseAPI}
 */
export class ProductsApi extends BaseAPI implements ProductsApiInterface {
    /**
     * 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ProductsApi
     */
    public bulkImport(options?: AxiosRequestConfig) {
        return ProductsApiFp(this.configuration).bulkImport(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {string} productId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ProductsApi
     */
    public getProduct(productId: string, options?: AxiosRequestConfig) {
        return ProductsApiFp(this.configuration).getProduct(productId, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {ApiPaginatedRequest} apiPaginatedRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ProductsApi
     */
    public listProducts(apiPaginatedRequest: ApiPaginatedRequest, options?: AxiosRequestConfig) {
        return ProductsApiFp(this.configuration).listProducts(apiPaginatedRequest, options).then((request) => request(this.axios, this.basePath));
    }
}
