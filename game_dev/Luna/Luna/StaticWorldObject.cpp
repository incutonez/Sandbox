#include "stdafx.h"
#include "StaticWorldObject.h"
#include "Game.h"

StaticWorldObject::StaticWorldObject(std::string keyName, std::string fileName, bool movable, bool damagable) {
  SetKeyName(keyName);
  Load(fileName);
  SetIsMovable(movable);
  SetIsDamagable(damagable);
}

bool StaticWorldObject::SetIsMovable(bool isMovable) {
  return _isMovable = isMovable;
}

bool StaticWorldObject::IsMovable() {
  return _isMovable;
}

bool StaticWorldObject::CollisionDetection(float *moveByX, float *moveByY, float elapsedTime, std::vector<std::string> names) {
  bool collided = false;
  std::map<std::string, StaticWorldObject *>::const_iterator itr = Game::GetStaticObjectsManager().GetGameObjects().begin();
  while (itr != Game::GetStaticObjectsManager().GetGameObjects().end()) {
    if (std::find(names.begin(), names.end(), itr->first) == names.end() && itr->second->GetBoundingRect().intersects(GetBoundingRect())) {
      // if moving down, and we hit the top but not the left or right
      if (*moveByY > 0 && HitsTop(itr) && !HitsLeft(itr) && !HitsRight(itr)) {
        collided = true;
        if (itr->second->IsMovable()) {
          *moveByY /= 2.0f;
        }
        else {
          *moveByY = 0.0f;
        }
      }
      // if moving up, and we hit the bottom but not the left or right
      else if (*moveByY < 0 && HitsBottom(itr) && !HitsLeft(itr) && !HitsRight(itr)) {
        collided = true;
        if (itr->second->IsMovable()) {
          *moveByY /= 2.0f;
        }
        else {
          *moveByY = 0.0f;
        }
      }
      // if moving right, and we hit the left but not the top or bottom
      else if (*moveByX > 0 && HitsLeft(itr) && !HitsBottom(itr) && !HitsTop(itr)) {
        collided = true;
        if (itr->second->IsMovable()) {
          *moveByX /= 2.0f;
        }
        else {
          *moveByX = 0.0f;
        }
      }
      // if moving left, and we hit the right but not the top or bottom
      else if (*moveByX < 0 && HitsRight(itr) && !HitsBottom(itr) && !HitsTop(itr)) {
        collided = true;
        if (itr->second->IsMovable()) {
          *moveByX /= 2.0f;
        }
        else {
          *moveByX = 0.0f;
        }
      }
      if (collided == true) {
        names.push_back(itr->first);
        itr->second->CollisionDetection(moveByX, moveByY, elapsedTime, names);
        itr->second->SetPosition(itr->second->GetPosition().x + (*moveByX * elapsedTime), itr->second->GetPosition().y + (*moveByY * elapsedTime));
      }
    }
    itr++;
  }
  return collided;
}

bool StaticWorldObject::HitsTop(std::map<std::string, StaticWorldObject *>::const_iterator itr) {
  bool collided = false;
  if ((GetBoundingRect().top + GetBoundingRect().height) - itr->second->GetBoundingRect().top < 1.0f) {
    collided = true;
  }
  return collided;
}

bool StaticWorldObject::HitsBottom(std::map<std::string, StaticWorldObject *>::const_iterator itr) {
  bool collided = false;
  if (itr->second->GetBoundingRect().top + itr->second->GetBoundingRect().height - GetBoundingRect().top < 1.0f) {
    collided = true;
  }
  return collided;
}

bool StaticWorldObject::HitsLeft(std::map<std::string, StaticWorldObject *>::const_iterator itr) {
  bool collided = false;
  if ((GetBoundingRect().left + GetBoundingRect().width) - itr->second->GetBoundingRect().left < 1.0f) {
    collided = true;
  }
  return collided;
}

bool StaticWorldObject::HitsRight(std::map<std::string, StaticWorldObject *>::const_iterator itr) {
  bool collided = false;
  if (itr->second->GetBoundingRect().left + itr->second->GetBoundingRect().width - GetBoundingRect().left < 1.0f) {
    collided = true;
  }
  return collided;
}