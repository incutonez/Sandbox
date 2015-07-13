#include "stdafx.h"
#include "Game.h"
#include "MainMenu.h"
#include "SplashScreen.h"
#include "SFMLSoundProvider.h"
#include "ServiceLocator.h"

// TODO: check out design patterns from Gang of Four http://www.dofactory.com/net/design-patterns
void Game::Start(void) {
  if (_gameState != Uninitialized) {
    return;
  }
  
  SFMLSoundProvider soundProvider;
  ServiceLocator::RegisterServiceLocator(&soundProvider);
  ServiceLocator::GetAudio()->PlaySong("audio/Soundtrack.ogg",true);

  _mainWindow.create(sf::VideoMode(SCREEN_WIDTH, SCREEN_HEIGHT, 32), "Pang!");
  PlayerPaddle *player1 = new PlayerPaddle();
  player1->SetPosition(SCREEN_WIDTH / 2, 700);

  PlayerPaddle *player2 = new PlayerPaddle();
  player2->SetPosition(SCREEN_WIDTH / 2, 40);

  GameBall *ball = new GameBall();
	ball->SetPosition((SCREEN_WIDTH / 2), (SCREEN_HEIGHT / 2) - 15);
  
  _gameObjectManager.Add("Paddle1", player1);
  _gameObjectManager.Add("Paddle2", player2);
  _gameObjectManager.Add("GameBall", ball);
  _gameState = Game::ShowingSplash;

  while(!IsExiting()) {
    GameLoop();
  }

  GetWindow().close();
}

bool Game::IsExiting() {
  if (_gameState == Game::Exiting) {
    return true;
  }
  else {
    return false;
  }
}

sf::RenderWindow& Game::GetWindow() {
	return _mainWindow;
}

void Game::GameLoop() {
  sf::Event currentEvent;
  _mainWindow.pollEvent(currentEvent);
  switch(_gameState) {
    case Game::ShowingMenu: {
      ShowMenu();
      break;
    }
    case Game::ShowingSplash: {
      ShowSplashScreen();
      break;
    }
    case Game::Playing: {
      _mainWindow.clear(sf::Color(0, 0, 0));
      _gameObjectManager.UpdateAll();
      _gameObjectManager.DrawAll(_mainWindow);
      _mainWindow.display();
         
      if (currentEvent.type == sf::Event::Closed) {
        _gameState = Game::Exiting;
      }
 
      if (currentEvent.type == sf::Event::KeyPressed) {
        if (currentEvent.key.code == sf::Keyboard::Escape) {
          ShowMenu();
        }
      }
    }
  }
}

void Game::ShowSplashScreen() {
	SplashScreen splashScreen;
	splashScreen.Show(_mainWindow);
	_gameState = Game::ShowingMenu;
}

void Game::ShowMenu() {
	MainMenu mainMenu;
	MainMenu::MenuResult result = mainMenu.Show(_mainWindow);
	switch(result) {
	  case MainMenu::Exit:
			_gameState = Game::Exiting;
			break;
		case MainMenu::Play:
			_gameState = Game::Playing;
			break;
	}
}

const GameObjectManager &Game::GetGameObjectManager() {
  return _gameObjectManager;
}

// Lastly because _player1 is a static member variable, it needs to be instantiated in the global namespace.  ( This is a C++ism, no other languages have this requirement, at least, not that I am aware of ).
Game::GameState Game::_gameState = Uninitialized;
sf::RenderWindow Game::_mainWindow;
GameObjectManager Game::_gameObjectManager;