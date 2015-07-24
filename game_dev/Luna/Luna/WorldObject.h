#pragma once
#include "stdafx.h"
#include "SFML\Graphics.hpp"

class WorldObject {
  public:
    WorldObject();
	  WorldObject(std::string keyName);
    WorldObject(std::string keyName, std::string fileName);
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
    bool SetIsDamagable(bool isDamagable);
    std::string GetKeyName();
    std::string SetKeyName(std::string keyName);
    template <class T>
    bool HitsTop(typename std::map<std::string, T *>::const_iterator itr);
    template <class T>
    bool HitsBottom(typename std::map<std::string, T *>::const_iterator itr);
    template <class T>
    bool HitsLeft(typename std::map<std::string, T *>::const_iterator itr);
    template <class T>
    bool HitsRight(typename std::map<std::string, T *>::const_iterator itr);

  protected:
    sf::Sprite &GetSprite();

  private:
	  sf::Sprite  _sprite;
	  sf::Texture _image;
	  std::string _filename;
	  bool _isLoaded;
    bool _isDamagable;
    std::string _keyName;
};

template <class T>
bool WorldObject::HitsTop(typename std::map<std::string, T *>::const_iterator itr) {
  bool collided = false;
  if ((GetBoundingRect().top + GetBoundingRect().height) - itr->second->GetBoundingRect().top < 1.0f) {
    collided = true;
  }
  return collided;
}

template <class T>
bool WorldObject::HitsBottom(typename std::map<std::string, T *>::const_iterator itr) {
  bool collided = false;
  if (itr->second->GetBoundingRect().top + itr->second->GetBoundingRect().height - GetBoundingRect().top < 1.0f) {
    collided = true;
  }
  return collided;
}

template <class T>
bool WorldObject::HitsLeft(typename std::map<std::string, T *>::const_iterator itr) {
  bool collided = false;
  if ((GetBoundingRect().left + GetBoundingRect().width) - itr->second->GetBoundingRect().left < 1.0f) {
    collided = true;
  }
  return collided;
}

template <class T>
bool WorldObject::HitsRight(typename std::map<std::string, T *>::const_iterator itr) {
  bool collided = false;
  if (itr->second->GetBoundingRect().left + itr->second->GetBoundingRect().width - GetBoundingRect().left < 1.0f) {
    collided = true;
  }
  return collided;
}