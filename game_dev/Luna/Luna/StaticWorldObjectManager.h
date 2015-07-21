#pragma once
#include "stdafx.h"
#include "WorldObjectManager.h"
#include "StaticWorldObject.h"

class StaticWorldObjectManager: public WorldObjectManager {
  public:
    void Add(StaticWorldObject *gameObject);
	  StaticWorldObject *Get(std::string name);
	  void Remove(std::string name);
    std::map<std::string, StaticWorldObject *> &GetGameObjects();
	  virtual void DrawAll(sf::RenderWindow& renderWindow);
    void UpdateAll();

  private:
	  std::map<std::string, StaticWorldObject *> _gameObjects;
	
	  struct GameObjectDeallocator {
		  void operator() (const std::pair<std::string, StaticWorldObject *> & p) const {
			  delete p.second;
		  }
	  };
};