#include "StdAfx.h"
#include "PlayerObject.h"
#include "Game.h"

PlayerObject::PlayerObject():
  _MOVEMENT_VALUE(100.0f) {
	Load("images/left.png");
  SetKeyName("Player");
  SetHasSword(false);
  /* Reason for assert is that you cannot return from a constructor,
   * and if this errors out, you could try dealing with error handling,
   * but if the assert is not true, then it kills the program, which
   * is an easy way of stopping it altogether... because without a paddle, it doesn't make sense */
	assert(IsLoaded());
  GetSprite().setOrigin(GetSprite().getGlobalBounds().width / 2, GetSprite().getGlobalBounds().height / 2);
}

PlayerObject::~PlayerObject() { }

void PlayerObject::Draw(sf::RenderWindow &rw) {
	WorldObject::Draw(rw);
}

float PlayerObject::GetMovementValue() {
  return _MOVEMENT_VALUE;
}

PlayerObject::Actions PlayerObject::GetCurrentAction() {
  return _currentAction;
}

PlayerObject::Actions PlayerObject::SetCurrentAction(Actions currentAction) {
  return _currentAction = currentAction;
}

void PlayerObject::SetHasSword(bool hasSword) {
  _hasSword = hasSword;
}

void PlayerObject::AddInventoryItem(StaticWorldObject *item) {
  StaticWorldObject *clone = new StaticWorldObject(item->GetKeyName(), item->GetFileName(), item->IsMovable(), item->IsDamagable());
  std::string keyName = clone->GetKeyName();
  if (keyName == "Sword1") {
    SetHasSword(true);
  }
  GetInventoryItems().insert(std::pair<std::string, StaticWorldObject *>(keyName, clone));
}

std::map<std::string, StaticWorldObject *> &PlayerObject::GetInventoryItems() {
  return _inventoryItems;
}

StaticWorldObject * PlayerObject::GetInventoryItem(std::string itemName) {
  return GetInventoryItems().find(itemName)->second;
}

bool PlayerObject::HasSword() {
  return _hasSword;
}

void PlayerObject::Update(float elapsedTime) {
  float moveByX = 0.0f;
  float moveByY = 0.0f;
  // If fighting, can't move too
  if (GetCurrentAction() != DONE_FIGHTING && GetCurrentAction() != FIGHTING && sf::Keyboard::isKeyPressed(sf::Keyboard::RControl)) {
    SetCurrentAction(FIGHTING);
  }
  else if (GetCurrentAction() != FIGHTING) {
    if (sf::Keyboard::isKeyPressed(sf::Keyboard::Down)) {
      moveByY = GetMovementValue();
    }
    else if (sf::Keyboard::isKeyPressed(sf::Keyboard::Up)) {
      moveByY = -GetMovementValue();
    }

    if (sf::Keyboard::isKeyPressed(sf::Keyboard::Left)) {
      moveByX = -GetMovementValue();
    }
    else if (sf::Keyboard::isKeyPressed(sf::Keyboard::Right)) {
      moveByX = GetMovementValue();
    }

    CollisionDetection(&moveByX, &moveByY, elapsedTime);
    if (moveByX != 0.0f || moveByY != 0.0f) {
      SetCurrentAction(WALKING);
    }
    else if (GetCurrentAction() != DONE_FIGHTING) {
      SetCurrentAction(STANDING);
    }
  }
  if (GetCurrentAction() == FIGHTING) {
    if (HasSword()) {
      StaticWorldObject *inventoryItem = GetInventoryItem("Sword1");
      if (inventoryItem != NULL) {
        if (Game::GetStaticObjectsManager().Get("Sword1") == NULL) {
          Game::GetStaticObjectsManager().Add(inventoryItem);
          inventoryItem->SetObjectRotationAngle(90.0f);
          inventoryItem->SetPosition(GetBoundingRect().left + GetBoundingRect().width + inventoryItem->GetBoundingRect().width / 2, GetBoundingRect().top + 15);
        }
        if (inventoryItem->GetBoundingRect().left < GetBoundingRect().left + GetBoundingRect().width) {
          SetCurrentAction(FIGHTING);
          inventoryItem->MoveObject(40.0f * elapsedTime, 0.0f);
        }
        else {
          SetCurrentAction(DONE_FIGHTING);
          Game::GetStaticObjectsManager().RemoveFromWorld("Sword1");
        }
      }
    }
    else {
      SetCurrentAction(DONE_FIGHTING);
    }
  }
  if (GetCurrentAction() == DONE_FIGHTING && Game::GetCurrentEvent().key.code == sf::Keyboard::RControl) {
    SetCurrentAction(STANDING);
  }
  MoveObject(moveByX * elapsedTime, moveByY * elapsedTime);
}

bool PlayerObject::CollisionDetection(float *moveByX, float *moveByY, float elapsedtime) {
  std::vector<std::string> names;
  bool collided = false;
  /* Check to see if where the player is moving is intersected by the object they hit...
   * so moving away won't have the object "stick" to them */
  sf::Rect<float> rect = GetBoundingRect();
  rect.top += (*moveByY * elapsedtime);
  rect.left += (*moveByX * elapsedtime);
  std::map<std::string, StaticWorldObject *>::const_iterator itr = Game::GetStaticObjectsManager().GetGameObjects().begin();
  while (itr != Game::GetStaticObjectsManager().GetGameObjects().end()) {
    if (itr->second->GetBoundingRect().intersects(rect)) {
      if (itr->second->IsCollectible()) {
        AddInventoryItem(itr->second);
        itr = Game::GetStaticObjectsManager().Remove(itr->first);
      }
      else {
        // if moving down, and we hit the top or moving up and we hit bottom
        if (*moveByY > 0 && HitsTop<StaticWorldObject>(itr) ||
            *moveByY < 0 && HitsBottom<StaticWorldObject>(itr)) {
          collided = true;
          if (!itr->second->IsMovable()) {
            *moveByY = 0.0f;
          }
          // Otherwise, if user is hitting the left or right key as well, don't allow them to move horizontally
          else if (sf::Keyboard::Left || sf::Keyboard::Right) {
            *moveByX = 0.0f;
          }
        }
        // if moving right and we hit the left or moving left and we hit right
        else if (*moveByX > 0 && HitsLeft<StaticWorldObject>(itr) ||
                 *moveByX < 0 && HitsRight<StaticWorldObject>(itr)) {
          collided = true;
          if (!itr->second->IsMovable()) {
            *moveByX = 0.0f;
          }
          // Otherwise, if user is hitting the up or down key as well, don't allow them to move vertically
          else if (sf::Keyboard::Up || sf::Keyboard::Down) {
            *moveByY = 0.0f;
          }
        }
        // Check if moving object collides with another object
        if (itr->second->IsMovable()) {
          if (*moveByX != 0.0f || *moveByY != 0.0f) {
            names.push_back(itr->first);
            itr->second->CollisionDetection(moveByX, moveByY, elapsedtime, names);
          }
          itr->second->SetPosition(itr->second->GetPosition().x + (*moveByX * elapsedtime), itr->second->GetPosition().y + (*moveByY * elapsedtime));
        }
      }
    }
    itr++;
  }
  return collided;
}