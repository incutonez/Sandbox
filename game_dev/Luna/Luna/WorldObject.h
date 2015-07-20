#pragma once
#include "stdafx.h"
#include "SFML\Graphics.hpp"

class WorldObject {
  public:
	  WorldObject();
    WorldObject(std::string);
	  virtual ~WorldObject();
    virtual void Load(std::string filename);
	  virtual void Draw(sf::RenderWindow & window);
    virtual void Update(float elapsedTime);

	  virtual void SetPosition(float x, float y);
    virtual sf::Vector2f GetPosition();
    virtual bool IsLoaded() const;
    virtual float GetWidth();
    virtual float GetHeight();
    virtual sf::Rect<float> GetBoundingRect();

  protected:
    sf::Sprite &GetSprite();

  private:
	  sf::Sprite  _sprite;
	  sf::Texture _image;
	  std::string _filename;
	  bool _isLoaded;
};