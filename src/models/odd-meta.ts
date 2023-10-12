/* tslint:disable */
/* eslint-disable */

/**
 * Bet callback API
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 1.0.0
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
export interface OddMeta {
    /**
     * ID of real end provider
     */
    sportEventInfoProviderId: string;
    /**
     * ID of sport in betting platform
     */
    sportEventInfoSportId: string;
    /**
     * ID of tournament is betting platform
     */
    sportEventInfoTournamentId: string;
    sportEventInfoMarketType: string;
    sportEventInfoState: OddMetaSportEventInfoStateEnum;
}

/**
 * @export
 * @enum {string}
 */
export enum OddMetaSportEventInfoStateEnum {
    Live = 'live',
    PreMatch = 'prematch'
}
