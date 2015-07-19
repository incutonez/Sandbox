#include "stdafx.h"
#include "WorldObject.h"

WorldObject::WorldObject()
  // Constructor member initialization list http://www.cprogramming.com/tutorial/initialization-lists-c++.html
  : _isLoaded(false) {
}

WorldObject::~WorldObject() { }

void WorldObject::Load(std::string filename) {
  if (_image.loadFromFile(filename) == false) {
    _filename = "";
    _isLoaded = false;
  }
  else {
    _filename = filename;
    GetSprite().setTexture(_image);
    _isLoaded = true;
  }
}

void WorldObject::Draw(sf::RenderWindow &renderWindow) {
  if (IsLoaded()) {
    renderWindow.draw(GetSprite());
  }
}

void WorldObject::Update(float elapsedTime) {
}

void WorldObject::SetPosition(float x, float y) {
  if (IsLoaded()) {
    GetSprite().setPosition(x, y);
  }
}

sf::Vector2f WorldObject::GetPosition() {
  if (IsLoaded()) {
    return GetSprite().getPosition();
  }
  return sf::Vector2f();
}

sf::Sprite& WorldObject::GetSprite() {
  return _sprite;
}

bool WorldObject::IsLoaded() const {
  return _isLoaded;
}

float WorldObject::GetHeight() {
  return GetBoundingRect().height;
}

float WorldObject::GetWidth() {
  return GetBoundingRect().width;
}

sf::Rect<float> WorldObject::GetBoundingRect() {
  return GetSprite().getGlobalBounds();
}