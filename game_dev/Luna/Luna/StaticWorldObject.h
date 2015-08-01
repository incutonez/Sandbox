#pragma once
#include "stdafx.h"
#include "WorldObject.h"

class StaticWorldObject: public WorldObject {
  public:
    // Clone constructor
    StaticWorldObject(const StaticWorldObject& rhs) {}
    // Clone assignment operator
    StaticWorldObject& operator=(const StaticWorldObject& rhs) {};
    StaticWorldObject(std::string keyName, std::string fileName, bool movable, bool damagable);
    StaticWorldObject(std::string keyName, std::string fileName, bool movable, bool damagable, bool collectible);
    ~StaticWorldObject();
    bool SetIsMovable(bool isMovable);
    bool IsMovable();
    bool SetIsCollectible(bool isCollectible);
    bool IsCollectible();
    bool CollisionDetection(float *moveByX, float *moveByY, float elapsedTime, std::vector<std::string> names);

  private:
    bool _isMovable;
    bool _isCollectible;
};