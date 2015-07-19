#include "StdAfx.h"
#include "PlayerObject.h"
#include "Game.h"

PlayerObject::PlayerObject():
  _MOVEMENT_VALUE(100.0f) {
	Load("images/left.png");
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
  GetSprite().move(moveByX * elapsedTime, moveByY * elapsedTime);
}