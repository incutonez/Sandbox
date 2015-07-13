#include "StdAfx.h"
#include "PlayerPaddle.h"
#include "Game.h"

PlayerPaddle::PlayerPaddle() :
_velocity(0),
_maxVelocity(600.0f) {
	Load("images/paddle.png");
  /* Reason for assert is that you cannot return from a constructor,
   * and if this errors out, you could try dealing with error handling,
   * but if the assert is not true, then it kills the program, which
   * is an easy way of stopping it altogether... because without a paddle, it doesn't make sense */
	assert(IsLoaded());

  GetSprite().setOrigin(GetSprite().getGlobalBounds().width / 2, GetSprite().getGlobalBounds().height / 2);
}

PlayerPaddle::~PlayerPaddle() { }

void PlayerPaddle::Draw(sf::RenderWindow & rw) {
	VisibleGameObject::Draw(rw);
}

float PlayerPaddle::GetVelocity() const {
	return _velocity;
}

void PlayerPaddle::Update(float elapsedTime) {
  if (sf::Keyboard::isKeyPressed(sf::Keyboard::Left)) {
		_velocity -= 3.0f;
	}
	if (sf::Keyboard::isKeyPressed(sf::Keyboard::Right)) {
		_velocity += 3.0f;
	}

	if (sf::Keyboard::isKeyPressed(sf::Keyboard::Down)) {
		_velocity = 0.0f;
	}

	if (_velocity > _maxVelocity) {
		_velocity = _maxVelocity;
  }

	if (_velocity < -_maxVelocity) {
		_velocity = - _maxVelocity;
  }

	sf::Vector2f pos = this->GetPosition();

  if (pos.x < GetSprite().getGlobalBounds().width / 2 ||
      pos.x > (Game::SCREEN_WIDTH - GetSprite().getGlobalBounds().width / 2)) {
    // Bounce by current velocity in opposite direction
		_velocity = - _velocity;
	}
	
	GetSprite().move(_velocity * elapsedTime, 0);
}