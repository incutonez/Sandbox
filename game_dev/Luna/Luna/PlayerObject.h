#include "stdafx.h"
#include "WorldObject.h"

class PlayerObject: public WorldObject {
  public:
	  PlayerObject();
	  ~PlayerObject();
    void Update(float elapsedTime);
    void Draw(sf::RenderWindow &rw);
    float GetMovementValue();
  private:
    const float _MOVEMENT_VALUE;
};