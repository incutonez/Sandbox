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
import { IUserDetail } from "./iuser-detail";

/**
 *
 * @export
 * @interface GetUsers200Response
 */
export interface GetUsers200Response {
	/**
	 *
	 * @type {Array<IUserDetail>}
	 * @memberof GetUsers200Response
	 */
	data: Array<IUserDetail>;
	/**
	 *
	 * @type {number}
	 * @memberof GetUsers200Response
	 */
	total: number;
}
