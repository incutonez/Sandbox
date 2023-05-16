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
import { ChangeStatus } from './change-status';
// May contain unused imports in some cases
// @ts-ignore
import { DiffModelField } from './diff-model-field';
// May contain unused imports in some cases
// @ts-ignore
import { DiffModelPrevious } from './diff-model-previous';
// May contain unused imports in some cases
// @ts-ignore
import { DiffModelValue } from './diff-model-value';

/**
 * 
 * @export
 * @interface DiffModel
 */
export interface DiffModel {
    /**
     * 
     * @type {DiffModelField}
     * @memberof DiffModel
     */
    'field'?: DiffModelField;
    /**
     * 
     * @type {DiffModelValue}
     * @memberof DiffModel
     */
    'value'?: DiffModelValue;
    /**
     * 
     * @type {DiffModelPrevious}
     * @memberof DiffModel
     */
    'previous'?: DiffModelPrevious;
    /**
     * 
     * @type {ChangeStatus}
     * @memberof DiffModel
     */
    'status'?: ChangeStatus;
}



