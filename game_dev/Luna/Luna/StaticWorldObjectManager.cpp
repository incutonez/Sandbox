#include "stdafx.h"
#include "StaticWorldObjectManager.h"

void StaticWorldObjectManager::Add(std::string name, StaticWorldObject *gameObject) {
	GetGameObjects().insert(std::pair<std::string, StaticWorldObject *>(name, gameObject));
}

void StaticWorldObjectManager::Remove(std::string name) {
	std::map<std::string, StaticWorldObject *>::iterator results = GetGameObjects().find(name);
	if (results != GetGameObjects().end()) {
		delete results->second;
		GetGameObjects().erase(results);
	}
}

StaticWorldObject *StaticWorldObjectManager::Get(std::string name) {
	std::map<std::string, StaticWorldObject *>::const_iterator results = GetGameObjects().find(name);
	if (results == GetGameObjects().end()) {
		return NULL;
  }
	return results->second;
}

void StaticWorldObjectManager::DrawAll(sf::RenderWindow &renderWindow) {
	std::map<std::string, StaticWorldObject *>::const_iterator itr = GetGameObjects().begin();
	while (itr != GetGameObjects().end()) {
		itr->second->Draw(renderWindow);
		itr++;
	}
}


void StaticWorldObjectManager::UpdateAll() {
  std::map<std::string, StaticWorldObject *>::const_iterator itr = GetGameObjects().begin();
  float timeDelta = GetElapsedTime();

  while (itr != GetGameObjects().end()) {
    itr->second->Update(timeDelta);
    itr++;
  }
}

std::map<std::string, StaticWorldObject *> &StaticWorldObjectManager::GetGameObjects() {
  return _gameObjects;
}