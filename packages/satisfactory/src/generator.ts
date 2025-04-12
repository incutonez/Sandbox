import { writeFileSync } from "fs";
import camelCase from "just-camel-case";
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
		const { mDisplayName } = itemClass;
		if (mDisplayName && itemClass.mResourceSinkPoints && !itemClass.mHealthGain) {
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

writeFileSync("./src/api/inventory.json", JSON.stringify(items));
