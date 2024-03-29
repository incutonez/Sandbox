/* tslint:disable */
/* eslint-disable */
/**
 * Modeling API Reference
 * API Modeling
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
import { IAddress } from "./iaddress";

/**
 *
 * @export
 * @interface IPerson
 */
export interface IPerson {
	/**
	 *
	 * @type {string}
	 * @memberof IPerson
	 */
	firstName: string;
	/**
	 *
	 * @type {string}
	 * @memberof IPerson
	 */
	lastName: string;
	/**
	 *
	 * @type {IAddress}
	 * @memberof IPerson
	 */
	address: IAddress;
}
