/* tslint:disable */
/* eslint-disable */
/**
 * Differ API Reference
 * API Endpoints for Differ Application
 *
 * The version of the OpenAPI document: 0.1.0
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
import { DiffGet200ResponseInner } from '../models';
/**
 * DiffApi - axios parameter creator
 * @export
 */
export const DiffApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Returns a list of changes
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        diffGet: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/diff`;
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
 * DiffApi - functional programming interface
 * @export
 */
export const DiffApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = DiffApiAxiosParamCreator(configuration)
    return {
        /**
         * Returns a list of changes
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async diffGet(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<DiffGet200ResponseInner>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.diffGet(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * DiffApi - factory interface
 * @export
 */
export const DiffApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = DiffApiFp(configuration)
    return {
        /**
         * Returns a list of changes
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        diffGet(options?: any): AxiosPromise<Array<DiffGet200ResponseInner>> {
            return localVarFp.diffGet(options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * DiffApi - interface
 * @export
 * @interface DiffApi
 */
export interface DiffApiInterface {
    /**
     * Returns a list of changes
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DiffApiInterface
     */
    diffGet(options?: AxiosRequestConfig): AxiosPromise<Array<DiffGet200ResponseInner>>;

}

/**
 * DiffApi - object-oriented interface
 * @export
 * @class DiffApi
 * @extends {BaseAPI}
 */
export class DiffApi extends BaseAPI implements DiffApiInterface {
    /**
     * Returns a list of changes
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DiffApi
     */
    public diffGet(options?: AxiosRequestConfig) {
        return DiffApiFp(this.configuration).diffGet(options).then((request) => request(this.axios, this.basePath));
    }
}