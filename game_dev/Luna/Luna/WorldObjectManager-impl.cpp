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
template std::map<std::string, PlayerObject *>::iterator WorldObjectManager<PlayerObject>::Remove(std::string);
template std::map<std::string, StaticWorldObject *>::iterator WorldObjectManager<StaticWorldObject>::Remove(std::string);
template std::map<std::string, PlayerObject *>::iterator WorldObjectManager<PlayerObject>::RemoveFromWorld(std::string);
template std::map<std::string, StaticWorldObject *>::iterator WorldObjectManager<StaticWorldObject>::RemoveFromWorld(std::string);
template PlayerObject *WorldObjectManager<PlayerObject>::Get(std::string name);
template StaticWorldObject *WorldObjectManager<StaticWorldObject>::Get(std::string name);
template void WorldObjectManager<PlayerObject>::UpdateAll();
template void WorldObjectManager<StaticWorldObject>::UpdateAll();
template std::map<std::string, PlayerObject *> &WorldObjectManager<PlayerObject>::GetGameObjects();
template std::map<std::string, StaticWorldObject *> &WorldObjectManager<StaticWorldObject>::GetGameObjects();