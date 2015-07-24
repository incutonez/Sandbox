#include "stdafx.h"
#include "WorldObject.h"
#include "StaticWorldObject.h"

class PlayerObject: public WorldObject {
  public:
	  PlayerObject();
	  ~PlayerObject();
    void Update(float elapsedTime);
    void Draw(sf::RenderWindow &rw);
    float GetMovementValue();
    enum Actions {
      WALKING, FIGHTING, STANDING
    };
    Actions SetCurrentAction(Actions);
    bool CollisionDetection(float *moveByX, float *moveByY, float elapsedTime);
  private:
    const float _MOVEMENT_VALUE;
    Actions _currentAction;
};