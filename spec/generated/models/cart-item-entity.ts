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


// May contain unused imports in some cases
// @ts-ignore
import { ProductListEntity } from './product-list-entity';

/**
 * 
 * @export
 * @interface CartItemEntity
 */
export interface CartItemEntity {
    /**
     * 
     * @type {string}
     * @memberof CartItemEntity
     */
    'userId': string;
    /**
     * 
     * @type {string}
     * @memberof CartItemEntity
     */
    'productId': string;
    /**
     * 
     * @type {number}
     * @memberof CartItemEntity
     */
    'count': number;
    /**
     * 
     * @type {number}
     * @memberof CartItemEntity
     */
    'createdDate'?: number;
    /**
     * 
     * @type {ProductListEntity}
     * @memberof CartItemEntity
     */
    'product'?: ProductListEntity;
    /**
     * 
     * @type {number}
     * @memberof CartItemEntity
     */
    'id'?: number;
}

