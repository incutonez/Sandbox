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



/**
 * 
 * @export
 * @interface AddressEntity
 */
export interface AddressEntity {
    /**
     * 
     * @type {number}
     * @memberof AddressEntity
     */
    'id'?: number;
    /**
     * 
     * @type {string}
     * @memberof AddressEntity
     */
    'lineOne': string;
    /**
     * 
     * @type {string}
     * @memberof AddressEntity
     */
    'lineTwo'?: string;
    /**
     * 
     * @type {string}
     * @memberof AddressEntity
     */
    'city': string;
    /**
     * 
     * @type {string}
     * @memberof AddressEntity
     */
    'state': string;
    /**
     * 
     * @type {string}
     * @memberof AddressEntity
     */
    'zipCode': string;
}

