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



/**
 * 
 * @export
 * @enum {string}
 */

export const ChangeStatus = {
    Unchanged: 0,
    Created: 1,
    Updated: 2,
    Deleted: 3
} as const;

export type ChangeStatus = typeof ChangeStatus[keyof typeof ChangeStatus];



