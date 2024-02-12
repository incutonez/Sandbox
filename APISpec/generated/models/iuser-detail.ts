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

// May contain unused imports in some cases
// @ts-ignore
import { IUserDetailAddress } from "./iuser-detail-address";

/**
 *
 * @export
 * @interface IUserDetail
 */
export interface IUserDetail {
	/**
	 *
	 * @type {number}
	 * @memberof IUserDetail
	 */
	id?: number;
	/**
	 *
	 * @type {string}
	 * @memberof IUserDetail
	 */
	firstName?: string;
	/**
	 *
	 * @type {string}
	 * @memberof IUserDetail
	 */
	lastName?: string;
	/**
	 *
	 * @type {string}
	 * @memberof IUserDetail
	 */
	phone?: string;
	/**
	 *
	 * @type {string}
	 * @memberof IUserDetail
	 */
	email?: string;
	/**
	 *
	 * @type {string}
	 * @memberof IUserDetail
	 */
	gender?: string;
	/**
	 *
	 * @type {number}
	 * @memberof IUserDetail
	 */
	birthDate?: number;
	/**
	 *
	 * @type {IUserDetailAddress}
	 * @memberof IUserDetail
	 */
	address?: IUserDetailAddress;
}
