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
    bool CollisionDetection(float, float);
    bool PlayerObject::HitsTop(std::map<std::string, StaticWorldObject *>::const_iterator);
    bool PlayerObject::HitsBottom(std::map<std::string, StaticWorldObject *>::const_iterator);
    bool PlayerObject::HitsLeft(std::map<std::string, StaticWorldObject *>::const_iterator);
    bool PlayerObject::HitsRight(std::map<std::string, StaticWorldObject *>::const_iterator);
  private:
    const float _MOVEMENT_VALUE;
    Actions _currentAction;
};