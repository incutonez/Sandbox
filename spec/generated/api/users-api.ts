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
import { BulkResponse } from '../models';
// @ts-ignore
import { UserEntity } from '../models';
// @ts-ignore
import { UserResponseModel } from '../models';
/**
 * UsersApi - axios parameter creator
 * @export
 */
export const UsersApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {string} userId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        copyUser: async (userId: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'userId' is not null or undefined
            assertParamExists('copyUser', 'userId', userId)
            const localVarPath = `/users/{userId}/copy`
                .replace(`{${"userId"}}`, encodeURIComponent(String(userId)));
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
         * @param {UserEntity} userEntity 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createUser: async (userEntity: UserEntity, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'userEntity' is not null or undefined
            assertParamExists('createUser', 'userEntity', userEntity)
            const localVarPath = `/users`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(userEntity, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {Array<UserEntity>} userEntity 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createUsers: async (userEntity: Array<UserEntity>, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'userEntity' is not null or undefined
            assertParamExists('createUsers', 'userEntity', userEntity)
            const localVarPath = `/users/bulk`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(userEntity, localVarRequestOptions, configuration)

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
        deleteUser: async (userId: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'userId' is not null or undefined
            assertParamExists('deleteUser', 'userId', userId)
            const localVarPath = `/users/{userId}`
                .replace(`{${"userId"}}`, encodeURIComponent(String(userId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
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
        getUser: async (userId: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'userId' is not null or undefined
            assertParamExists('getUser', 'userId', userId)
            const localVarPath = `/users/{userId}`
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
        /**
         * 
         * @param {ApiPaginatedRequest} apiPaginatedRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listUsers: async (apiPaginatedRequest: ApiPaginatedRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'apiPaginatedRequest' is not null or undefined
            assertParamExists('listUsers', 'apiPaginatedRequest', apiPaginatedRequest)
            const localVarPath = `/users/list`;
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
        /**
         * 
         * @param {string} userId 
         * @param {UserEntity} userEntity 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateUser: async (userId: string, userEntity: UserEntity, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'userId' is not null or undefined
            assertParamExists('updateUser', 'userId', userId)
            // verify required parameter 'userEntity' is not null or undefined
            assertParamExists('updateUser', 'userEntity', userEntity)
            const localVarPath = `/users/{userId}`
                .replace(`{${"userId"}}`, encodeURIComponent(String(userId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(userEntity, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * UsersApi - functional programming interface
 * @export
 */
export const UsersApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = UsersApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {string} userId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async copyUser(userId: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<UserEntity>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.copyUser(userId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {UserEntity} userEntity 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createUser(userEntity: UserEntity, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<UserEntity>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.createUser(userEntity, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {Array<UserEntity>} userEntity 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createUsers(userEntity: Array<UserEntity>, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<BulkResponse>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.createUsers(userEntity, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {string} userId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deleteUser(userId: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.deleteUser(userId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {string} userId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getUser(userId: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<UserEntity>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getUser(userId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {ApiPaginatedRequest} apiPaginatedRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listUsers(apiPaginatedRequest: ApiPaginatedRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<UserResponseModel>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.listUsers(apiPaginatedRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {string} userId 
         * @param {UserEntity} userEntity 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updateUser(userId: string, userEntity: UserEntity, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<UserEntity>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.updateUser(userId, userEntity, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * UsersApi - factory interface
 * @export
 */
export const UsersApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = UsersApiFp(configuration)
    return {
        /**
         * 
         * @param {string} userId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        copyUser(userId: string, options?: any): AxiosPromise<UserEntity> {
            return localVarFp.copyUser(userId, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {UserEntity} userEntity 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createUser(userEntity: UserEntity, options?: any): AxiosPromise<UserEntity> {
            return localVarFp.createUser(userEntity, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {Array<UserEntity>} userEntity 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createUsers(userEntity: Array<UserEntity>, options?: any): AxiosPromise<Array<BulkResponse>> {
            return localVarFp.createUsers(userEntity, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {string} userId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteUser(userId: string, options?: any): AxiosPromise<void> {
            return localVarFp.deleteUser(userId, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {string} userId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getUser(userId: string, options?: any): AxiosPromise<UserEntity> {
            return localVarFp.getUser(userId, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {ApiPaginatedRequest} apiPaginatedRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listUsers(apiPaginatedRequest: ApiPaginatedRequest, options?: any): AxiosPromise<UserResponseModel> {
            return localVarFp.listUsers(apiPaginatedRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {string} userId 
         * @param {UserEntity} userEntity 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateUser(userId: string, userEntity: UserEntity, options?: any): AxiosPromise<UserEntity> {
            return localVarFp.updateUser(userId, userEntity, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * UsersApi - interface
 * @export
 * @interface UsersApi
 */
export interface UsersApiInterface {
    /**
     * 
     * @param {string} userId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UsersApiInterface
     */
    copyUser(userId: string, options?: AxiosRequestConfig): AxiosPromise<UserEntity>;

    /**
     * 
     * @param {UserEntity} userEntity 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UsersApiInterface
     */
    createUser(userEntity: UserEntity, options?: AxiosRequestConfig): AxiosPromise<UserEntity>;

    /**
     * 
     * @param {Array<UserEntity>} userEntity 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UsersApiInterface
     */
    createUsers(userEntity: Array<UserEntity>, options?: AxiosRequestConfig): AxiosPromise<Array<BulkResponse>>;

    /**
     * 
     * @param {string} userId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UsersApiInterface
     */
    deleteUser(userId: string, options?: AxiosRequestConfig): AxiosPromise<void>;

    /**
     * 
     * @param {string} userId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UsersApiInterface
     */
    getUser(userId: string, options?: AxiosRequestConfig): AxiosPromise<UserEntity>;

    /**
     * 
     * @param {ApiPaginatedRequest} apiPaginatedRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UsersApiInterface
     */
    listUsers(apiPaginatedRequest: ApiPaginatedRequest, options?: AxiosRequestConfig): AxiosPromise<UserResponseModel>;

    /**
     * 
     * @param {string} userId 
     * @param {UserEntity} userEntity 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UsersApiInterface
     */
    updateUser(userId: string, userEntity: UserEntity, options?: AxiosRequestConfig): AxiosPromise<UserEntity>;

}

/**
 * UsersApi - object-oriented interface
 * @export
 * @class UsersApi
 * @extends {BaseAPI}
 */
export class UsersApi extends BaseAPI implements UsersApiInterface {
    /**
     * 
     * @param {string} userId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UsersApi
     */
    public copyUser(userId: string, options?: AxiosRequestConfig) {
        return UsersApiFp(this.configuration).copyUser(userId, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {UserEntity} userEntity 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UsersApi
     */
    public createUser(userEntity: UserEntity, options?: AxiosRequestConfig) {
        return UsersApiFp(this.configuration).createUser(userEntity, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {Array<UserEntity>} userEntity 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UsersApi
     */
    public createUsers(userEntity: Array<UserEntity>, options?: AxiosRequestConfig) {
        return UsersApiFp(this.configuration).createUsers(userEntity, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {string} userId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UsersApi
     */
    public deleteUser(userId: string, options?: AxiosRequestConfig) {
        return UsersApiFp(this.configuration).deleteUser(userId, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {string} userId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UsersApi
     */
    public getUser(userId: string, options?: AxiosRequestConfig) {
        return UsersApiFp(this.configuration).getUser(userId, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {ApiPaginatedRequest} apiPaginatedRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UsersApi
     */
    public listUsers(apiPaginatedRequest: ApiPaginatedRequest, options?: AxiosRequestConfig) {
        return UsersApiFp(this.configuration).listUsers(apiPaginatedRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {string} userId 
     * @param {UserEntity} userEntity 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UsersApi
     */
    public updateUser(userId: string, userEntity: UserEntity, options?: AxiosRequestConfig) {
        return UsersApiFp(this.configuration).updateUser(userId, userEntity, options).then((request) => request(this.axios, this.basePath));
    }
}
