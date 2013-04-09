#include <SFML/Graphics.hpp>
#include <SFML/Window.hpp>
#include <windows.h>
#include <sstream>
#include <string>
#include <Box2D\Box2D.h>

using namespace std;
using namespace sf;

const float SCALE = 30.f;

int main() {
  RenderWindow window(VideoMode(800, 600, 32), "SFML BLAH");
  window.setFramerateLimit(60);

  /** Prepare the world */
  b2Vec2 Gravity(0.f, 0.f);
  b2World World(Gravity);

  // this is the ground
  b2BodyDef ground;
  // In Box2D, 1.f is 1 meter (or, 30 pixels... hence the scale of 30), so you do need to scale the position
  ground.position = b2Vec2(400.f, 550.f);
  ground.type = b2_staticBody;
  b2Body* Body = World.CreateBody(&ground);
  Body->SetUserData("ground");
  b2PolygonShape Shape;
  // Don't need to scale the shape...
  // setasbox takes double of what your input is, so half it, also, need to give it an origin
  Shape.SetAsBox(300.f, 50.f); // Creates a box shape. Divide your desired width and height by 2.
  b2FixtureDef FixtureDef;
  FixtureDef.density = 100.f;  // Sets the density of the body
  FixtureDef.shape = &Shape; // Sets the shape
  Body->CreateFixture(&FixtureDef); // Apply the fixture definition

  b2BodyDef user;
  user.position = b2Vec2(200.f, 0.f);
  user.type = b2_dynamicBody;
  b2Body *User = World.CreateBody(&user);
  User->SetUserData("player");
  b2PolygonShape UserShape;
  UserShape.SetAsBox(35.f / 2, 31.f / 2);
  b2FixtureDef UserFixture;
  UserFixture.density = 1.f;
  UserFixture.shape = &UserShape;
  User->CreateFixture(&UserFixture);

  b2BodyDef user2;
  user2.position = b2Vec2(300.f, 0.f);
  user2.type = b2_dynamicBody;
  b2Body *User2 = World.CreateBody(&user2);
  User2->SetUserData("player2");
  b2PolygonShape UserShape2;
  UserShape2.SetAsBox(32.f / 2, 32.f / 2);
  b2FixtureDef UserFixture2;
  UserFixture2.density = 1.f;
  UserFixture2.shape = &UserShape2;
  User2->CreateFixture(&UserFixture2);

  //OutputDebugString("BLAH");
  Texture texture;
  Texture GroundTexture;
  Texture box;
  if (!texture.loadFromFile("cute.jpg"))
    return EXIT_FAILURE;
  if (!GroundTexture.loadFromFile("ground.png"))
    return EXIT_FAILURE;
  if (!box.loadFromFile("box.png"))
    return EXIT_FAILURE;
  while (window.isOpen()) {
    // Process events
    Event event;

    /** Simulate the world */
    World.Step(1/60.f, 8, 3);
    b2Vec2 vel;
    while (window.pollEvent(event)) {
      if (event.type == Event::Closed || Keyboard::isKeyPressed(Keyboard::Escape))
        window.close();
      else if (Keyboard::isKeyPressed(Keyboard::Right) && Keyboard::isKeyPressed(Keyboard::Down)) {
        vel.x = 100;
        vel.y = 100;
      }
      else if (Keyboard::isKeyPressed(Keyboard::Right) && Keyboard::isKeyPressed(Keyboard::Up)) {
        vel.x = 100;
        vel.y = -100;
      }
      else if (Keyboard::isKeyPressed(Keyboard::Left) && Keyboard::isKeyPressed(Keyboard::Down)) {
        vel.x = -100;
        vel.y = 100;
      }
      else if (Keyboard::isKeyPressed(Keyboard::Left) && Keyboard::isKeyPressed(Keyboard::Up)) {
        vel.x = -100;
        vel.y = -100;
      }
      else if (Keyboard::isKeyPressed(Keyboard::Down)) {
        vel.x = 0;
        vel.y = 100;
      }
      else if (Keyboard::isKeyPressed(Keyboard::Up)) {
        vel.x = 0;
        vel.y = -100;
      }
      else if (Keyboard::isKeyPressed(Keyboard::Right)) {
        vel.x = 100;
        vel.y = 0;
      }
      else if (Keyboard::isKeyPressed(Keyboard::Left)) {
        vel.x = -100;
        vel.y = 0;
      }
      else {
        vel.x = 0;
        vel.y = 0;
      }
    }
    // Clear screen
    window.clear(sf::Color::White);sf::Sprite GroundSprite;

    for (b2Body* BodyIterator = World.GetBodyList(); BodyIterator != 0; BodyIterator = BodyIterator->GetNext()) {
      if (BodyIterator->GetUserData() == "ground") {
        sf::Sprite GroundSprite;
        GroundSprite.setTexture(GroundTexture);
        GroundSprite.setOrigin(300.f, 50.f);
        GroundSprite.setPosition(BodyIterator->GetPosition().x, BodyIterator->GetPosition().y);
        window.draw(GroundSprite);
      }
      else if (BodyIterator->GetUserData() == "player") {
        BodyIterator->SetLinearVelocity(vel);
        sf::Sprite player;
        player.setTexture(texture);
        player.setOrigin(35.f / 2, 31.f / 2);
        //GroundSprite.setOrigin(200.f, 50.f);
        player.setPosition(BodyIterator->GetPosition().x, BodyIterator->GetPosition().y);
        window.draw(player);
      }
      else if (BodyIterator->GetUserData() == "player2") {
        sf::Sprite player;
        player.setTexture(box);
        player.setOrigin(32.f / 2, 32.f / 2);
        //GroundSprite.setOrigin(200.f, 50.f);
        player.setPosition(BodyIterator->GetPosition().x, BodyIterator->GetPosition().y);
        window.draw(player);
      }
    } 
    // Update the window
    window.display();
  }
  return 0;
}