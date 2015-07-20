#include "stdafx.h"
#include "SFML\Graphics.hpp"
#include "WorldObjectManager.h"

class Game {
  public:
    static void Start();
    static void GameLoop();
    static bool IsExiting();
    static sf::RenderWindow &GetMainWindow();
    enum GameStates {
      STARTING, TITLE, PAUSED, PLAYING, EXITING
    };
    static const int SCREEN_WIDTH = 1024;
    static const int SCREEN_HEIGHT = 768;
    static GameStates SetGameState(GameStates);
    static GameStates GetGameState();
	  static WorldObjectManager &GetWorldObjectManager();
	  static WorldObjectManager &GetStaticObjectsManager();
  private:
    static GameStates _currentGameState;
    static sf::RenderWindow _mainWindow;
    static WorldObjectManager _worldObjectManager;
    static WorldObjectManager _staticObjectsManager;
};