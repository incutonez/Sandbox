#include "stdafx.h"
#include "Game.h"
#include "SFML\Graphics.hpp"
#include "PlayerObject.h"
#include "StaticWorldObject.h"

void Game::Start() {
  SetGameState(GameStates::PLAYING);
  GetMainWindow().create(sf::VideoMode(SCREEN_WIDTH, SCREEN_HEIGHT, 32), "Luna");
  PlayerObject *player = new PlayerObject();
  player->SetPosition(SCREEN_WIDTH / 2, 600);
  GetWorldObjectManager().Add(player);
  
  StaticWorldObject *rock1 = new StaticWorldObject("Rock1", "images/rock.png", false, false);
  rock1->SetPosition(SCREEN_WIDTH / 4, 100);
  StaticWorldObject *rock2 = new StaticWorldObject("Rock2", "images/rock.png", false, false);
  rock2->SetPosition(SCREEN_WIDTH / 2, 100);
  StaticWorldObject *rock3 = new StaticWorldObject("Rock3", "images/rock.png", true, false);
  rock3->SetPosition(SCREEN_WIDTH / 4, 500);
  StaticWorldObject *rock4 = new StaticWorldObject("Rock4", "images/rock.png", true, false);
  rock4->SetPosition(SCREEN_WIDTH / 3, 500);
  StaticWorldObject *rock5 = new StaticWorldObject("Rock5", "images/rock.png", false, false);
  rock5->SetPosition(SCREEN_WIDTH / 2, 530);
  StaticWorldObject *rock6 = new StaticWorldObject("Rock6", "images/rock.png", false, false);
  rock6->SetPosition(SCREEN_WIDTH / 2 + 30, 130);
  StaticWorldObject *wall1 = new StaticWorldObject("Wall1", "images/big_rock.png", false, false);
  wall1->SetPosition(0, 0);
  GetStaticObjectsManager().Add(rock1);
  GetStaticObjectsManager().Add(rock2);
  GetStaticObjectsManager().Add(rock3);
  GetStaticObjectsManager().Add(rock4);
  GetStaticObjectsManager().Add(rock5);
  GetStaticObjectsManager().Add(rock6);
  GetStaticObjectsManager().Add(wall1);
  while (!IsExiting()) {
    GameLoop();
  }
}

WorldObjectManager &Game::GetWorldObjectManager() {
  return _worldObjectManager;
}

StaticWorldObjectManager &Game::GetStaticObjectsManager() {
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
StaticWorldObjectManager Game::_staticObjectsManager;