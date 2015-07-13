#include "StdAfx.h"
#include "AIPaddle.h"
#include "Game.h"
#include "GameBall.h"

AIPaddle::AIPaddle() :
  _velocity(0),
  _maxVelocity(600.0f) {
	Load("images/paddle.png");
	assert(IsLoaded());

  GetSprite().setOrigin(GetWidth() / 2, GetHeight() / 2);
}

AIPaddle::~AIPaddle() { }

void AIPaddle::Draw(sf::RenderWindow & rw) {
	VisibleGameObject::Draw(rw);
}

float AIPaddle::GetVelocity() const {
	return _velocity;
}

void AIPaddle::Update(float elapsedTime) {
  // TODO: Store gameBall pointer, instead of having to get it each frame
	const GameBall *gameBall = static_cast<GameBall *>(Game::GetGameObjectManager().Get("Ball"));
	sf::Vector2f ballPosition = gameBall->GetPosition();

	if (GetPosition().x -20 < ballPosition.x) {
		_velocity += 15.0f;
  }
	else if (GetPosition().x +20 > ballPosition.x) {
		_velocity -= 10.0f;
  }
	else {
		_velocity = 0.0f;
  }

  if (_velocity > _maxVelocity) {
		_velocity = _maxVelocity;
  }

	if (_velocity < -_maxVelocity) {
		_velocity = -_maxVelocity;
  }
	sf::Vector2f pos = this->GetPosition();

  if (pos.x  <= GetWidth() / 2 ||
      pos.x >= (Game::SCREEN_WIDTH - GetWidth() / 2)) {
		_velocity = -_velocity; // Bounce by current velocity in opposite direction
	}
	
	GetSprite().move(_velocity * elapsedTime, 0);
}