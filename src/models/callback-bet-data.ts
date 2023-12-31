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
import { BetType } from './bet-type';
import { Callback } from './callback';
import { MetadataCompetitors } from './metadata-competitors';
import { Odd } from './odd';
import { SystemSizes } from './system-sizes';

export interface CallbackBetData extends Callback {
    betType: BetType;
    /**
     * Bet stake size in player currency
     */
    betStake: string;
    betFreebetId: string;
    betInsuranceId: string;
    betOdds: Array<Odd>;
    betSystemSizes: SystemSizes;
    betCreatedAt: Date;
    competitors: MetadataCompetitors;
}
