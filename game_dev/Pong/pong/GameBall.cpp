#include "StdAfx.h"
#include "GameBall.h"
#include "Game.h"
#include "ServiceLocator.h"

GameBall::GameBall() :
	_velocity(230.0f),
	_elapsedTimeSinceStart(0.0f) {
	Load("images/ball.png");
	assert(IsLoaded());

	GetSprite().setOrigin(15, 15);
	_angle = GetRandomNumber();
}

float GameBall::GetRandomNumber() {
  return (float) (std::rand() % 360 + 1);
}

GameBall::~GameBall() { }

// Parameter is the time since last frame in seconds. VERY small number.
void GameBall::Update(float elapsedTime) {
	_elapsedTimeSinceStart += elapsedTime;

	// Delay game from starting until 3 seconds have passed
	if (_elapsedTimeSinceStart < 5.0f) {
		return;
  }

	float moveAmount = _velocity  * elapsedTime;
	float moveByX = LinearVelocityX(_angle) * moveAmount;
	float moveByY = LinearVelocityY(_angle) * moveAmount;

	// collide with the side of the screen
	if (GetPosition().x + moveByX <= 0 + GetWidth() / 2 || GetPosition().x + GetHeight() / 2 + moveByX >= Game::SCREEN_WIDTH) {
		//Ricochet!
		_angle = 360.0f - _angle;
		if (_angle > 260.0f && _angle < 280.0f) {
      _angle += 20.0f;
    }
		if (_angle > 80.0f && _angle < 100.0f) {
      _angle += 20.0f;
    }
		moveByX = -moveByX;
	}
	
	moveByY = BounceBall("Paddle1", moveByX, moveByY);
  moveByY = BounceBall("Paddle2", moveByX, moveByY);
	GetSprite().move(moveByX, moveByY);
}

float GameBall::BounceBall(std::string paddleName, float moveByX, float moveByY) {
  PlayerPaddle *player = dynamic_cast<PlayerPaddle *>(Game::GetGameObjectManager().Get(paddleName));
  if (player != NULL) {
		sf::Rect<float> p1BB = player->GetBoundingRect();
	
		if (p1BB.intersects(GetBoundingRect())) {
			_angle =  360.0f - (_angle - 180.0f);
			if (_angle > 360.0f) {
        _angle -= 360.0f;
      }
		
			moveByY = -moveByY;
			// TODO: Figure out how to check if the ball hit on the side of the paddle
      if (paddleName == "Paddle2") {
        SetPosition(GetPosition().x, player->GetBoundingRect().top + player->GetBoundingRect().height + GetHeight() / 2);
      }
      else {
        SetPosition(GetPosition().x, player->GetBoundingRect().top - GetHeight() / 2 - 1 );
      }
		
			// Now add "English" based on the players velocity.  
			float playerVelocity = player->GetVelocity();
			if (playerVelocity < 0) {
				// moving left
				_angle -= 20.0f;
				if (_angle < 0 ) {
          _angle = 360.0f - _angle;
        }
			}
			else if (playerVelocity > 0) {
				_angle += 20.0f;
				if (_angle > 360.0f) {
          _angle -= 360.0f;
        }
			}
      
      ServiceLocator::GetAudio()->PlaySound("audio/kaboom.wav");
			_velocity += 5.0f;
		}

    if (GetPosition().y + GetHeight() / 2 + moveByY <= 0 || (GetPosition().y + GetHeight() / 2 + moveByY >= Game::SCREEN_HEIGHT)) {
			// move to middle of the screen for now and randomize angle
			GetSprite().setPosition(Game::SCREEN_WIDTH / 2, Game::SCREEN_HEIGHT / 2);
      _angle = GetRandomNumber();
			_velocity = 230.0f;
			_elapsedTimeSinceStart = 0.0f;
		}
	}
  return moveByY;
}

float GameBall::LinearVelocityX(float angle) {
	angle -= 90;
  if (angle < 0) {
    angle += 360;
  }
	return (float) std::cos(angle * (3.1415926 / 180.0f));
}

float GameBall::LinearVelocityY(float angle) {
	angle -= 90;
  if (angle < 0) {
    angle += 360;
  }
	return (float) std::sin(angle * (3.1415926 / 180.0f));
}
