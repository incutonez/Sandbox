#pragma once
#include "stdafx.h"
#include "WorldObjectManager.cpp"
#include "StaticWorldObject.h"
#include "PlayerObject.h"

template WorldObjectManager<PlayerObject>::WorldObjectManager();
template WorldObjectManager<StaticWorldObject>::WorldObjectManager();
template WorldObjectManager<PlayerObject>::~WorldObjectManager();
template WorldObjectManager<StaticWorldObject>::~WorldObjectManager();
template void WorldObjectManager<PlayerObject>::Add(PlayerObject *gameObject);
template void WorldObjectManager<StaticWorldObject>::Add(StaticWorldObject *gameObject);
template PlayerObject *WorldObjectManager<PlayerObject>::Get(std::string name);
template StaticWorldObject *WorldObjectManager<StaticWorldObject>::Get(std::string name);
template void WorldObjectManager<PlayerObject>::UpdateAll();
template void WorldObjectManager<StaticWorldObject>::UpdateAll();