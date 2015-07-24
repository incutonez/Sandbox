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
  sf::Rect<float> rect = GetBoundingRect();
  rect.top += *moveByY * elapsedTime;
  rect.left += *moveByX * elapsedTime;
  while (itr != Game::GetStaticObjectsManager().GetGameObjects().end()) {
    if (std::find(names.begin(), names.end(), itr->first) == names.end() && itr->second->GetBoundingRect().intersects(rect)) {
      // if moving down, and we hit the top or moving up and we hit bottom
      if (*moveByY > 0 && HitsTop<StaticWorldObject>(itr) ||
          *moveByY < 0 && HitsBottom<StaticWorldObject>(itr)) {
        collided = true;
        if (itr->second->IsMovable()) {
          *moveByY /= 2.0f;
        }
        else {
          *moveByY = 0.0f;
        }
        if (sf::Keyboard::Left || sf::Keyboard::Right) {
          *moveByX = 0.0f;
        }
      }
      // if moving right, and we hit the left or moving left and we hit right
      else if (*moveByX > 0 && HitsLeft<StaticWorldObject>(itr) ||
               *moveByX < 0 && HitsRight<StaticWorldObject>(itr)) {
        collided = true;
        if (itr->second->IsMovable()) {
          *moveByX /= 2.0f;
        }
        else {
          *moveByX = 0.0f;
        }
        if (sf::Keyboard::Up || sf::Keyboard::Down) {
          *moveByY = 0.0f;
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