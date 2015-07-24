#pragma once
#include "stdafx.h"
#include "WorldObject.h"

class WorldObjectManager {
  public:	
	  WorldObjectManager();
	  ~WorldObjectManager();
    
    template <typename T>
	  void Add(T *gameObject);
	  void Remove(std::string name);
	  int GetObjectCount();
	  WorldObject *Get(std::string name);
    std::map<std::string, WorldObject *> &GetGameObjects();
    sf::Clock GetClock();
    float GetElapsedTime();

	  virtual void DrawAll(sf::RenderWindow& renderWindow);
    void UpdateAll();

  private:
    sf::Clock _clock;
	  std::map<std::string, WorldObject *> _gameObjects;
	
	  struct GameObjectDeallocator {
		  void operator() (const std::pair<std::string, WorldObject *> & p) const {
			  delete p.second;
		  }
	  };
};