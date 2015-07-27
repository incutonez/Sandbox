#pragma once
#include "stdafx.h"
#include "WorldObject.h"
#include "StaticWorldObject.h"

class PlayerObject: public WorldObject {
  public:
	  PlayerObject();
	  ~PlayerObject();
    void Update(float elapsedTime);
    void Draw(sf::RenderWindow &rw);
    float GetMovementValue();
    enum Actions {
      WALKING, FIGHTING, STANDING
    };
    Actions SetCurrentAction(Actions);
    bool CollisionDetection(float *moveByX, float *moveByY, float elapsedTime);
    std::map<std::string, StaticWorldObject *> GetInventoryItems();
    void AddInventoryItem(std::string, StaticWorldObject *);
    StaticWorldObject * GetInventoryItem(std::string);
  private:
    const float _MOVEMENT_VALUE;
    Actions _currentAction;
    std::map<std::string, StaticWorldObject *> _inventoryItems;
};