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
import { DiffEntityField } from './diff-entity-field';
// May contain unused imports in some cases
// @ts-ignore
import { DiffEntityValue } from './diff-entity-value';
// May contain unused imports in some cases
// @ts-ignore
import { EnumChangeStatus } from './enum-change-status';

/**
 * 
 * @export
 * @interface DiffEntity
 */
export interface DiffEntity {
    /**
     * 
     * @type {DiffEntityField}
     * @memberof DiffEntity
     */
    'field': DiffEntityField;
    /**
     * 
     * @type {DiffEntityValue}
     * @memberof DiffEntity
     */
    'value': DiffEntityValue;
    /**
     * 
     * @type {EnumChangeStatus}
     * @memberof DiffEntity
     */
    'status'?: EnumChangeStatus;
    /**
     * 
     * @type {DiffEntity}
     * @memberof DiffEntity
     */
    'previous'?: DiffEntity;
}



