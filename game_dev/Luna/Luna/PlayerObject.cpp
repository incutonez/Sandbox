#include "StdAfx.h"
#include "PlayerObject.h"
#include "Game.h"

PlayerObject::PlayerObject():
  _MOVEMENT_VALUE(100.0f) {
	Load("images/left.png");
  SetKeyName("Player");
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

PlayerObject::Actions PlayerObject::SetCurrentAction(Actions currentAction) {
  return _currentAction = currentAction;
}

void PlayerObject::Update(float elapsedTime) {
  float moveByX = 0.0f;
  float moveByY = 0.0f;
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
  else {
    SetCurrentAction(STANDING);
  }
  GetSprite().move(moveByX * elapsedTime, moveByY * elapsedTime);
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
      // if moving down, and we hit the top but not the left or right
      if (*moveByY > 0 && HitsTop(itr)) {
        collided = true;
        if (!itr->second->IsMovable()) {
          *moveByY = 0.0f;
        }
      }
      // if moving up, and we hit the bottom but not the left or right
      else if (*moveByY < 0 && HitsBottom(itr)) {
        collided = true;
        if (!itr->second->IsMovable()) {
          *moveByY = 0.0f;
        }
      }
      // if moving right, and we hit the left but not the top or bottom
      else if (*moveByX > 0 && HitsLeft(itr)) {
        collided = true;
        if (!itr->second->IsMovable()) {
          *moveByX = 0.0f;
        }
      }
      // if moving left, and we hit the right but not the top or bottom
      else if (*moveByX < 0 && HitsRight(itr)) {
        collided = true;
        if (!itr->second->IsMovable()) {
          *moveByX = 0.0f;
        }
      }
      // Check if moving object collides with another object
      if (itr->second->IsMovable()) {
        if (*moveByX != 0.0f || *moveByY != 0.0f) {
          names.push_back(itr->first);
          // TODO: Fix moving diagonally with a nonmovable object that was hit... currently, it makes the nonmovable object movable
          itr->second->CollisionDetection(moveByX, moveByY, elapsedtime, names);
        }
        std::cout << *moveByX << " " << *moveByY << std::endl;
        itr->second->SetPosition(itr->second->GetPosition().x + (*moveByX * elapsedtime), itr->second->GetPosition().y + (*moveByY * elapsedtime));
      }
    }
    itr++;
  }
  return collided;
}

bool PlayerObject::HitsTop(std::map<std::string, StaticWorldObject *>::const_iterator itr) {
  bool collided = false;
  if ((GetBoundingRect().top + GetBoundingRect().height) - itr->second->GetBoundingRect().top < 2.0f) {
    collided = true;
  }
  return collided;
}

bool PlayerObject::HitsBottom(std::map<std::string, StaticWorldObject *>::const_iterator itr) {
  bool collided = false;
  if (itr->second->GetBoundingRect().top + itr->second->GetBoundingRect().height - GetBoundingRect().top < 2.0f) {
    collided = true;
  }
  return collided;
}

bool PlayerObject::HitsLeft(std::map<std::string, StaticWorldObject *>::const_iterator itr) {
  bool collided = false;
  if ((GetBoundingRect().left + GetBoundingRect().width) - itr->second->GetBoundingRect().left < 2.0f) {
    collided = true;
  }
  return collided;
}

bool PlayerObject::HitsRight(std::map<std::string, StaticWorldObject *>::const_iterator itr) {
  bool collided = false;
  if (itr->second->GetBoundingRect().left + itr->second->GetBoundingRect().width - GetBoundingRect().left < 2.0f) {
    collided = true;
  }
  return collided;
}