#pragma once
#include "stdafx.h"
#include "WorldObject.h"

class StaticWorldObject: public WorldObject {
  public:
    StaticWorldObject(std::string fileName, bool movable, bool damagable);
    bool SetIsMovable(bool isMovable);

  private:
    bool _isMovable;
};