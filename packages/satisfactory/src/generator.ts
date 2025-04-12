import { copyFileSync, readdirSync, writeFileSync } from "fs";
import camelCase from "just-camel-case";
import path from "path";
import { IInventoryItem, TCategory, TItemKey } from "@/types.ts";
import data from "./satisfactory.json";

export interface ISatisfactoryItem {
	NativeClass: string;
	Classes: ISatisfactoryClass[];
}

export interface ISatisfactoryClass {
	ClassName: string;
	mMeshLength: string;
	mConnections: string;
	mIsOwnedByPlatform: string;
	mTrackGraphId: string;
	mOverlappingTracks: string;
	mVehicles: string;
	mSignalBlockId: string;
	mBlockVisualizationColorDataStartIndex: string;
	mDisplayName: string;
	mDescription: string;
	maxRenderDistance: string;
	mAlternativeMaterialRecipes: string;
	mContainsComponents: string;
	mIsConsideredForBaseWeightValue: string;
	mOnBuildableReturnedToLightweightPool: string;
	bForceLegacyBuildEffect: string;
	bForceBuildEffectSolo: string;
	mBuildEffectSpeed: string;
	mAllowColoring: string;
	mAllowPatterning: string;
	mInteractionRegisterPlayerWithCircuit: string;
	mSkipBuildEffect: string;
	mForceNetUpdateOnRegisterPlayer: string;
	mToggleDormancyOnInteraction: string;
	mIsMultiSpawnedBuildable: string;
	mShouldShowAttachmentPointVisuals: string;
	mCanContainLightweightInstances: string;
	mManagedByLightweightBuildableSubsystem: string;
	mRemoveBuildableFromSubsystemOnDismantle: string;
	mHasBeenRemovedFromSubsystem: string;
	mAffectsOcclusion: string;
	mOcclusionShape: string;
	mScaleCustomOffset: string;
	mCustomScaleType: string;
	mOcclusionBoxInfo: string;
	mAttachmentPoints: string;
	mReplicatedBuiltInsideBlueprintDesigner: string;
	mInteractWidgetSoftClass: string;
	mInteractingPlayers: string;
	mIsUseable: string;
	mClearanceData: string;
	mHideOnBuildEffectStart: string;
	mShouldModifyWorldGrid: string;
	mTimelapseBucketId: string;
	mTimelapseDelay: string;
	mAlienOverClockingZOffset: string;
	mAlienOverClockingAttenuationScalingFactor: string;
	mAlienOverClockingVolumeDbRtpc: string;
	mAlienOverClockingHighpassRtpc: string;
	mAlienOverClockingPitchRtpc: string;
	mBlueprintBuildEffectId: string;
	mResourceSinkPoints: string;
	mHealthGain?: string;
}

const OreRegex = / ore/i;
const Ores = [
	"Coal",
	"Sulfur",
	"Bauxite",
	"SAM",
	"Limestone",
	"Raw Quartz",
	"Uranium",
];
const IngotRegex = / ingot/i;
const items: IInventoryItem[] = [];

function getCategory({ mDisplayName }: ISatisfactoryClass): TCategory | null {
	if (OreRegex.test(mDisplayName) || Ores.includes(mDisplayName)) {
		return "ore";
	}
	else if (IngotRegex.test(mDisplayName)) {
		return "ingot";
	}
	return null;
}

(data as unknown as ISatisfactoryItem[]).forEach((item) => {
	item.Classes.forEach((itemClass) => {
		let { mDisplayName } = itemClass;
		if (mDisplayName && itemClass.mResourceSinkPoints && !itemClass.mHealthGain) {
			mDisplayName = mDisplayName.replace("™", "");
			items.push({
				id: camelCase(mDisplayName) as TItemKey,
				name: mDisplayName,
				category: getCategory(itemClass),
				producing: [],
				consuming: [],
			});
		}
	});
});

const removeItems: IInventoryItem[] = [];
const ImageDir = path.join("/Users", "incut", "workspace", "SatisfactoryTools", "www", "assets", "images", "items");
const images = readdirSync(ImageDir);
items.forEach((item) => {
	let nameLC;
	switch (item.id) {
		case "uraniumFuelRod":
			nameLC = "nuclearfuelrod";
			break;
		case "alienPowerMatrix":
			nameLC = "alienpowerfuel";
			break;
		case "hatcherRemains":
		case "stingerRemains":
		case "spitterRemains":
		case "hogRemains":
			nameLC = item.id.replace("Remains", "parts");
			break;
		case "packagedAluminaSolution":
		case "packagedLiquidBiofuel":
			nameLC = item.id.replace("packaged", "");
			break;
		case "solidBiofuel":
			nameLC = "biofuel";
			break;
		case "crudeOil":
			nameLC = "liquidoil";
			break;
		case "limestone":
			nameLC = "stone";
			break;
		case "copperOre":
			nameLC = "orecopper";
			break;
		case "cateriumOre":
			nameLC = "caterium-0";
			break;
		case "ironOre":
			nameLC = "oreiron";
			break;
		case "turboRifleAmmo":
			nameLC = "rifleammoturbo";
			break;
		case "homingRifleAmmo":
			nameLC = "rifleammohoming";
			break;
		case "rifleAmmo":
			nameLC = "advancedammopack";
			break;
		case "shatterRebar":
			nameLC = "rebarshatter";
			break;
		case "ironRebar":
			nameLC = "spikedrebar";
			break;
		case "stunRebar":
			nameLC = "rebarstun";
			break;
		case "explosiveRebar":
			nameLC = "rebarexplosive";
			break;
		case "nobelisk":
			nameLC = "nobeliskexplosive";
			break;
		case "pulseNobelisk":
			nameLC = "nobeliskpulse";
			break;
		case "nukeNobelisk":
			nameLC = "nobelisknuke";
			break;
		case "gasNobelisk":
			nameLC = "nobeliskgas";
			break;
		case "clusterNobelisk":
			nameLC = "nobeliskcluster";
			break;
		case "encasedUraniumCell":
			nameLC = "uraniumcell";
			break;
		case "encasedPlutoniumCell":
			nameLC = "plutoniumcell";
			break;
		case "uraniumWaste":
			nameLC = "nuclearwaste";
			break;
		case "nonFissileUranium":
			nameLC = "nonfissibleuranium";
			break;
		case "packagedHeavyOilResidue":
			nameLC = "packagedOilResidue";
			break;
		case "alcladAluminumSheet":
			nameLC = "alcladSheet";
			break;
		case "diamonds":
			nameLC = "diamond";
			break;
		case "excitedPhotonicMatter":
			nameLC = "quantumenergy";
			break;
		case "reanimatedSam":
			nameLC = "samingot";
			break;
		case "darkMatterResidue":
			nameLC = "darkenergy";
			break;
		case "darkMatterCrystal":
			nameLC = "darkmatter";
			break;
		case "screws":
			nameLC = "ironscrew";
			break;
		case "gasFilter":
			nameLC = "filter";
			break;
		case "iodineInfusedFilter":
			nameLC = "hazmatfilter";
			break;
		case "versatileFramework":
			nameLC = "spaceelevatorpart-2";
			break;
		case "automatedWiring":
			nameLC = "spaceelevatorpart-3";
			break;
		case "modularEngine":
			nameLC = "spaceelevatorpart-4";
			break;
		case "adaptiveControlUnit":
			nameLC = "spaceelevatorpart-5";
			break;
		case "magneticFieldGenerator":
			nameLC = "spaceelevatorpart-6";
			break;
		case "assemblyDirectorSystem":
			nameLC = "spaceelevatorpart-7";
			break;
		case "thermalPropulsionRocket":
			nameLC = "spaceelevatorpart-8";
			break;
		case "nuclearPasta":
			nameLC = "spaceelevatorpart-9";
			break;
		case "biochemicalSculptor":
			nameLC = "spaceelevatorpart-10";
			break;
		case "ballisticWarpDrive":
			nameLC = "spaceelevatorpart-11";
			break;
		case "aiExpansionServer":
			nameLC = "spaceelevatorpart-12";
			break;
		case "candyCane":
			nameLC = "_removethis_";
			break;
	}
	nameLC ??= item.id;
	nameLC = nameLC.toLowerCase() + "-c_256";
	const found = images.find((image) => image.includes(nameLC));
	if (found) {
		const imageName = `${item.id}.png`;
		copyFileSync(path.join(ImageDir, found), path.join("./src", "assets", imageName));
		item.image = imageName;
	}
	else {
		removeItems.push(item);
	}
});
removeItems.forEach((removeItem) => items.splice(items.indexOf(removeItem), 1));
writeFileSync("./src/api/inventory.json", JSON.stringify(items));
