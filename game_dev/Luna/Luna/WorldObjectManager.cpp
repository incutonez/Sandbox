#include "stdafx.h"
#include "WorldObjectManager.h"

// TODO: look into Smart Pointers http://www.boost.org/doc/libs/1_47_0/libs/smart_ptr/smart_ptr.htm

WorldObjectManager::WorldObjectManager() { }

WorldObjectManager::~WorldObjectManager() {
  // GameObjectDeallocator is a "functor..." basically an object that can be called like a function
	std::for_each(GetGameObjects().begin(), GetGameObjects().end(), GameObjectDeallocator());
}

void WorldObjectManager::Add(WorldObject *gameObject) {
  GetGameObjects().insert(std::pair<std::string, WorldObject *>(gameObject->GetKeyName(), gameObject));
}

void WorldObjectManager::Remove(std::string name) {
	std::map<std::string, WorldObject *>::iterator results = GetGameObjects().find(name);
	if (results != GetGameObjects().end()) {
		delete results->second;
		GetGameObjects().erase(results);
	}
}

WorldObject *WorldObjectManager::Get(std::string name) {
	std::map<std::string, WorldObject *>::const_iterator results = GetGameObjects().find(name);
	if (results == GetGameObjects().end()) {
		return NULL;
  }
	return results->second;
}

int WorldObjectManager::GetObjectCount() {
	return GetGameObjects().size();
}

void WorldObjectManager::DrawAll(sf::RenderWindow &renderWindow) {
	std::map<std::string, WorldObject *>::const_iterator itr = GetGameObjects().begin();
	while (itr != GetGameObjects().end()) {
		itr->second->Draw(renderWindow);
		itr++;
	}
}

void WorldObjectManager::UpdateAll() {
  std::map<std::string, WorldObject *>::const_iterator itr = GetGameObjects().begin();
  float timeDelta = GetElapsedTime();

  while (itr != GetGameObjects().end()) {
    itr->second->Update(timeDelta);
    itr++;
  }
}

std::map<std::string, WorldObject *> &WorldObjectManager::GetGameObjects() {
  return _gameObjects;
}

sf::Clock WorldObjectManager::GetClock() {
  return _clock;
}

float WorldObjectManager::GetElapsedTime() {
  return _clock.restart().asSeconds();
}