#pragma once
#include "stdafx.h"
#include "WorldObject.h"

class StaticWorldObject: public WorldObject {
  public:
    StaticWorldObject(std::string keyName, std::string fileName, bool movable, bool damagable);
    bool SetIsMovable(bool isMovable);
    bool IsMovable();
    bool CollisionDetection(float *moveByX, float *moveByY, float elapsedTime, std::vector<std::string> names);

  private:
    bool _isMovable;
};