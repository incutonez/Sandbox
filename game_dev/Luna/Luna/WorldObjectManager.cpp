#include "stdafx.h"
#include "WorldObjectManager.h"
#include "PlayerObject.h"

// TODO: look into Smart Pointers http://www.boost.org/doc/libs/1_47_0/libs/smart_ptr/smart_ptr.htm

template <typename T>
WorldObjectManager<T>::WorldObjectManager() { }

template <typename T>
WorldObjectManager<T>::~WorldObjectManager() {
  // GameObjectDeallocator is a "functor..." basically an object that can be called like a function
	std::for_each(GetGameObjects().begin(), GetGameObjects().end(), GameObjectDeallocator());
}

template <typename T>
void WorldObjectManager<T>::Add(T *gameObject) {
  GetGameObjects().insert(std::pair<std::string, T *>(gameObject->GetKeyName(), gameObject));
}

template <typename T>
typename std::map<std::string, T *>::iterator WorldObjectManager<T>::Remove(std::string name) {
  std::map<std::string, T *> &gameObjects = GetGameObjects();
	std::map<std::string, T *>::iterator results = gameObjects.find(name);
	if (results != gameObjects.end()) {
		delete results->second;
		results = gameObjects.erase(results);
	}
  return results;
}

template <typename T>
T *WorldObjectManager<T>::Get(std::string name) {
  std::map<std::string, T *> gameObjects = GetGameObjects();
	std::map<std::string, T *>::const_iterator results = gameObjects.find(name);
	if (results == gameObjects.end()) {
		return NULL;
  }
	return results->second;
}

template <typename T>
void WorldObjectManager<T>::DrawAll(sf::RenderWindow &renderWindow) {
  std::map<std::string, T *> gameObjects = GetGameObjects();
	std::map<std::string, T *>::const_iterator itr = gameObjects.begin();
	while (itr != gameObjects.end()) {
		itr->second->Draw(renderWindow);
		itr++;
	}
}

template <typename T>
void WorldObjectManager<T>::UpdateAll() {
  std::map<std::string, T *> gameObjects = GetGameObjects();
  std::map<std::string, T *>::const_iterator itr = gameObjects.begin();
  float timeDelta = GetElapsedTime();

  while (itr != gameObjects.end()) {
    itr->second->Update(timeDelta);
    itr++;
  }
}

template <typename T>
std::map<std::string, T *> &WorldObjectManager<T>::GetGameObjects() {
  return _gameObjects;
}

template <typename T>
sf::Clock &WorldObjectManager<T>::GetClock() {
  return _clock;
}

template <typename T>
float WorldObjectManager<T>::GetElapsedTime() {
  return GetClock().restart().asSeconds();
}