#include "stdafx.h"
#include "Game.h"
#include "SFML\Graphics.hpp"
#include "PlayerObject.h"

void Game::Start() {
  SetGameState(GameStates::PLAYING);
  GetMainWindow().create(sf::VideoMode(SCREEN_WIDTH, SCREEN_HEIGHT, 32), "Luna");
  PlayerObject *player = new PlayerObject();
  player->SetPosition(SCREEN_WIDTH / 2, 600);
  GetWorldObjectManager().Add("Player", player);
  
  WorldObject *rock1 = new WorldObject("images/rock.png");
  rock1->SetPosition(SCREEN_WIDTH / 4, 100);
  WorldObject *rock2 = new WorldObject("images/rock.png");
  rock2->SetPosition(SCREEN_WIDTH / 2, 100);
  WorldObject *rock3 = new WorldObject("images/rock.png");
  rock3->SetPosition(SCREEN_WIDTH / 4, 500);
  WorldObject *rock4 = new WorldObject("images/rock.png");
  rock4->SetPosition(SCREEN_WIDTH / 2, 500);
  GetStaticObjectsManager().Add("Rock1", rock1);
  GetStaticObjectsManager().Add("Rock2", rock2);
  GetStaticObjectsManager().Add("Rock3", rock3);
  GetStaticObjectsManager().Add("Rock4", rock4);
  while (!IsExiting()) {
    GameLoop();
  }
}

WorldObjectManager &Game::GetWorldObjectManager() {
  return _worldObjectManager;
}

WorldObjectManager &Game::GetStaticObjectsManager() {
  return _staticObjectsManager;
}

bool Game::IsExiting() {
  if (GetGameState() == GameStates::EXITING) {
    return true;
  }
  return false;
}

sf::RenderWindow &Game::GetMainWindow() {
  return _mainWindow;
}

Game::GameStates Game::SetGameState(Game::GameStates gameState) {
  return _currentGameState = gameState;
}

Game::GameStates Game::GetGameState() {
  return _currentGameState;
}

void Game::GameLoop() {
  sf::Event currentEvent;
  GetMainWindow().pollEvent(currentEvent);
  switch(GetGameState()) {
    case Game::STARTING: {
      if (currentEvent.type == sf::Event::KeyPressed) {
        if (currentEvent.key.code == sf::Keyboard::Escape) {
          SetGameState(Game::EXITING);
        }
      }
    }
    case Game::PLAYING: {
      GetMainWindow().clear(sf::Color(0, 0, 0));
      GetWorldObjectManager().UpdateAll();
      GetWorldObjectManager().DrawAll(_mainWindow);
      GetStaticObjectsManager().UpdateAll();
      GetStaticObjectsManager().DrawAll(_mainWindow);
      GetMainWindow().display();
         
      if (currentEvent.type == sf::Event::Closed) {
        SetGameState(Game::EXITING);
      }
 
      if (currentEvent.type == sf::Event::KeyPressed) {
        if (currentEvent.key.code == sf::Keyboard::Escape) {
          SetGameState(Game::EXITING);
        }
      }
    }
  }
}

sf::RenderWindow Game::_mainWindow;
Game::GameStates Game::_currentGameState = Game::GameStates::STARTING;
WorldObjectManager Game::_worldObjectManager;
WorldObjectManager Game::_staticObjectsManager;