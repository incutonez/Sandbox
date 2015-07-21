#pragma once
#include "stdafx.h"
#include "WorldObject.h"

class StaticWorldObject: public WorldObject {
  public:
    StaticWorldObject(std::string keyName, std::string fileName, bool movable, bool damagable);
    bool SetIsMovable(bool isMovable);
    bool IsMovable();
    bool CollisionDetection(float *moveByX, float *moveByY, float elapsedTime);
    bool HitsTop(std::map<std::string, StaticWorldObject *>::const_iterator);
    bool HitsBottom(std::map<std::string, StaticWorldObject *>::const_iterator);
    bool HitsLeft(std::map<std::string, StaticWorldObject *>::const_iterator);
    bool HitsRight(std::map<std::string, StaticWorldObject *>::const_iterator);

  private:
    bool _isMovable;
};