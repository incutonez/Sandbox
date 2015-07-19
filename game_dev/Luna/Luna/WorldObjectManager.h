#pragma once
#include "stdafx.h"
#include "WorldObject.h"

class WorldObjectManager {
  public:	
	  WorldObjectManager();
	  ~WorldObjectManager();

	  void Add(std::string name, WorldObject *gameObject);
	  void Remove(std::string name);
	  int GetObjectCount();
	  WorldObject *Get(std::string name);
    std::map<std::string, WorldObject *> &GetGameObjects();

	  void DrawAll(sf::RenderWindow& renderWindow);
    void UpdateAll();

  private:
    sf::Clock clock;
	  std::map<std::string, WorldObject *> _gameObjects;
	
	  struct GameObjectDeallocator {
		  void operator() (const std::pair<std::string, WorldObject *> & p) const {
			  delete p.second;
		  }
	  };
};