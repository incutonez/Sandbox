import { Column, Table } from "sequelize-typescript";
import { PrimaryKeyGuid } from "src/db/decorators";
import { BaseModel } from "src/db/models/BaseModel";

@Table({
	tableName: "league_matches",
	timestamps: false,
})
export class LeagueMatch extends BaseModel {
    @PrimaryKeyGuid()
    declare id: string;

    @Column
    match_date: number;

    @Column
    stadium: string;

    @Column
    home_team: string;

    @Column
    away_team: string;

    @Column
    match_played: boolean;

    @Column
    home_team_score: number;

    @Column
    away_team_score: number;

    @Column
    group_id: number;
}
