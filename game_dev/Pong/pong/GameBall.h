#pragma once
#include "visiblegameobject.h"


class GameBall : public VisibleGameObject {
  public:
    GameBall();
    virtual ~GameBall();
    void Update(float);
    float GameBall::BounceBall(std::string paddleName, float moveByX, float moveByY);

  private:
    float _velocity;
    float _angle;
    float _elapsedTimeSinceStart;

    float LinearVelocityX(float angle);
    float LinearVelocityY(float angle);
    float GetRandomNumber();
};