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
      WALKING, FIGHTING, DONE_FIGHTING, STANDING
    };
    bool HasSword();
    void SetHasSword(bool hasSword);
    Actions SetCurrentAction(Actions);
    Actions GetCurrentAction();
    bool CollisionDetection(float *moveByX, float *moveByY, float elapsedTime);
    std::map<std::string, StaticWorldObject *> &GetInventoryItems();
    void AddInventoryItem(StaticWorldObject *);
    StaticWorldObject * GetInventoryItem(std::string);
  private:
    const float _MOVEMENT_VALUE;
    Actions _currentAction;
    std::map<std::string, StaticWorldObject *> _inventoryItems;
    bool _hasSword;
};