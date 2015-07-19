#include "stdafx.h"
#include "Game.h"
#include "SFML\Graphics.hpp"
#include "PlayerObject.h"

void Game::Start() {
  SetGameState(GameStates::PLAYING);
  GetMainWindow().create(sf::VideoMode(SCREEN_WIDTH, SCREEN_HEIGHT, 32), "Luna");
  PlayerObject *player = new PlayerObject();
  player->SetPosition(SCREEN_WIDTH / 2, 700);
  
  GetWorldObjectManager().Add("Player", player);
  while (!IsExiting()) {
    GameLoop();
  }
}

WorldObjectManager &Game::GetWorldObjectManager() {
  return _worldObjectManager;
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