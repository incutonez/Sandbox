#include "stdafx.h"
#include "GameObjectManager.h"

// TODO: look into Smart Pointers http://www.boost.org/doc/libs/1_47_0/libs/smart_ptr/smart_ptr.htm

GameObjectManager::GameObjectManager() { }

GameObjectManager::~GameObjectManager() {
  // GameObjectDeallocator is a "functor..." basically an object that can be called like a function
	std::for_each(_gameObjects.begin(), _gameObjects.end(), GameObjectDeallocator());
}

void GameObjectManager::Add(std::string name, VisibleGameObject* gameObject) {
	_gameObjects.insert(std::pair<std::string,VisibleGameObject*>(name, gameObject));
}

void GameObjectManager::Remove(std::string name) {
	std::map<std::string, VisibleGameObject*>::iterator results = _gameObjects.find(name);
	if (results != _gameObjects.end()) {
		delete results->second;
		_gameObjects.erase(results);
	}
}

VisibleGameObject* GameObjectManager::Get(std::string name) const {
	std::map<std::string, VisibleGameObject*>::const_iterator results = _gameObjects.find(name);
	if (results == _gameObjects.end()) {
		return NULL;
  }
	return results->second;
}

int GameObjectManager::GetObjectCount() const {
	return _gameObjects.size();
}


void GameObjectManager::DrawAll(sf::RenderWindow& renderWindow) {
	std::map<std::string, VisibleGameObject *>::const_iterator itr = _gameObjects.begin();
	while (itr != _gameObjects.end()) {
		itr->second->Draw(renderWindow);
		itr++;
	}
}

void GameObjectManager::UpdateAll() {
  std::map<std::string, VisibleGameObject *>::const_iterator itr = _gameObjects.begin();
  float timeDelta = clock.restart().asSeconds();

  while (itr != _gameObjects.end()) {
    itr->second->Update(timeDelta);
    itr++;
  }
}