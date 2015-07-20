#include "stdafx.h"
#include "StaticWorldObject.h"

StaticWorldObject::StaticWorldObject(std::string fileName, bool movable, bool damagable) {
  Load(fileName);
  SetIsMovable(movable);
  SetIsDamagable(damagable);
}

bool StaticWorldObject::SetIsMovable(bool isMovable) {
  return _isMovable = isMovable;
}