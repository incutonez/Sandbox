import { IsNotEmpty, IsNotEmptyObject, IsString } from "class-validator";
import { ViewModel } from "@/models/ViewModel";
import { ZeldaScreen } from "@/models/ZeldaScreen";

interface IOverworldSpawn {
	SceneX: number;
	SceneY: number;
	X?: number;
	Y?: number;
	Name?: string;
}

export class GameOverworld extends ViewModel {
	@IsString()
	@IsNotEmpty()
	Name = "";

	@IsNotEmptyObject()
	Spawn: IOverworldSpawn = {
		SceneX: 112,
		SceneY: 44,
	};

	Children: ZeldaScreen[] = [];

	getConfig() {
		return {
			Name: this.Name,
			Spawn: this.Spawn,
			Children: this.Children.map((child) => child.getConfig()),
		};
	}
}
