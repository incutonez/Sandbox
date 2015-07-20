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
  GetWorldObjectManager().Add("Player", player);
  
  StaticWorldObject *rock1 = new StaticWorldObject("images/rock.png", false, false);
  rock1->SetPosition(SCREEN_WIDTH / 4, 100);
  StaticWorldObject *rock2 = new StaticWorldObject("images/rock.png", false, false);
  rock2->SetPosition(SCREEN_WIDTH / 2, 100);
  StaticWorldObject *rock3 = new StaticWorldObject("images/rock.png", false, false);
  rock3->SetPosition(SCREEN_WIDTH / 4, 500);
  StaticWorldObject *rock4 = new StaticWorldObject("images/rock.png", true, false);
  rock4->SetPosition(SCREEN_WIDTH / 2, 500);
  StaticWorldObject *rock5 = new StaticWorldObject("images/rock.png", false, false);
  rock5->SetPosition(SCREEN_WIDTH / 2, 530);
  StaticWorldObject *rock6 = new StaticWorldObject("images/rock.png", false, false);
  rock6->SetPosition(SCREEN_WIDTH / 2 + 30, 130);
  StaticWorldObject *wall1 = new StaticWorldObject("images/big_rock.png", false, false);
  wall1->SetPosition(0, 0);
  GetStaticObjectsManager().Add("Rock1", rock1);
  GetStaticObjectsManager().Add("Rock2", rock2);
  GetStaticObjectsManager().Add("Rock3", rock3);
  GetStaticObjectsManager().Add("Rock4", rock4);
  GetStaticObjectsManager().Add("Rock5", rock5);
  GetStaticObjectsManager().Add("Rock6", rock6);
  GetStaticObjectsManager().Add("Wall1", wall1);
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