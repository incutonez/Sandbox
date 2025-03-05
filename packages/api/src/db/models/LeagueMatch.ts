import { Column, Model, Table } from "sequelize-typescript";
import { PrimaryKeyGuid } from "src/db/decorators";

@Table({
	tableName: "league_matches",
	timestamps: false,
})
export class LeagueMatch extends Model {
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
