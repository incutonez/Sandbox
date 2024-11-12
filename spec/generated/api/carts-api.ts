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
import { CartAddEntity } from '../models';
// @ts-ignore
import { CartResponseModel } from '../models';
/**
 * CartsApi - axios parameter creator
 * @export
 */
export const CartsApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {CartAddEntity} cartAddEntity 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        addToCart: async (cartAddEntity: CartAddEntity, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'cartAddEntity' is not null or undefined
            assertParamExists('addToCart', 'cartAddEntity', cartAddEntity)
            const localVarPath = `/carts`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(cartAddEntity, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getCart: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/carts`;
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
         * @param {string} userId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getCartByUser: async (userId: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'userId' is not null or undefined
            assertParamExists('getCartByUser', 'userId', userId)
            const localVarPath = `/carts/{userId}`
                .replace(`{${"userId"}}`, encodeURIComponent(String(userId)));
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
    }
};

/**
 * CartsApi - functional programming interface
 * @export
 */
export const CartsApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = CartsApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {CartAddEntity} cartAddEntity 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async addToCart(cartAddEntity: CartAddEntity, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.addToCart(cartAddEntity, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getCart(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CartResponseModel>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getCart(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {string} userId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getCartByUser(userId: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CartResponseModel>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getCartByUser(userId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * CartsApi - factory interface
 * @export
 */
export const CartsApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = CartsApiFp(configuration)
    return {
        /**
         * 
         * @param {CartAddEntity} cartAddEntity 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        addToCart(cartAddEntity: CartAddEntity, options?: any): AxiosPromise<void> {
            return localVarFp.addToCart(cartAddEntity, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getCart(options?: any): AxiosPromise<CartResponseModel> {
            return localVarFp.getCart(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {string} userId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getCartByUser(userId: string, options?: any): AxiosPromise<CartResponseModel> {
            return localVarFp.getCartByUser(userId, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * CartsApi - interface
 * @export
 * @interface CartsApi
 */
export interface CartsApiInterface {
    /**
     * 
     * @param {CartAddEntity} cartAddEntity 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CartsApiInterface
     */
    addToCart(cartAddEntity: CartAddEntity, options?: AxiosRequestConfig): AxiosPromise<void>;

    /**
     * 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CartsApiInterface
     */
    getCart(options?: AxiosRequestConfig): AxiosPromise<CartResponseModel>;

    /**
     * 
     * @param {string} userId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CartsApiInterface
     */
    getCartByUser(userId: string, options?: AxiosRequestConfig): AxiosPromise<CartResponseModel>;

}

/**
 * CartsApi - object-oriented interface
 * @export
 * @class CartsApi
 * @extends {BaseAPI}
 */
export class CartsApi extends BaseAPI implements CartsApiInterface {
    /**
     * 
     * @param {CartAddEntity} cartAddEntity 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CartsApi
     */
    public addToCart(cartAddEntity: CartAddEntity, options?: AxiosRequestConfig) {
        return CartsApiFp(this.configuration).addToCart(cartAddEntity, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CartsApi
     */
    public getCart(options?: AxiosRequestConfig) {
        return CartsApiFp(this.configuration).getCart(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {string} userId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CartsApi
     */
    public getCartByUser(userId: string, options?: AxiosRequestConfig) {
        return CartsApiFp(this.configuration).getCartByUser(userId, options).then((request) => request(this.axios, this.basePath));
    }
}
