#pragma once
#include "stdafx.h"
#include "WorldObject.h"

template <typename T>
class WorldObjectManager {
  public:	
	  WorldObjectManager();
	  ~WorldObjectManager();
    sf::Clock &GetClock();
    float GetElapsedTime();
	  T *Get(std::string name);
    std::map<std::string, T *> &GetGameObjects();
    void UpdateAll();
	  void Add(T *gameObject);
	  typename std::map<std::string, T *>::iterator Remove(std::string name);
	  virtual void DrawAll(sf::RenderWindow& renderWindow);
  private:
    sf::Clock _clock;
	  std::map<std::string, T *> _gameObjects;
	
	  struct GameObjectDeallocator {
		  void operator() (const std::pair<std::string, T *> & p) const {
			  delete p.second;
		  }
	  };
};