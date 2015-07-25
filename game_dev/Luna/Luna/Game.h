#include "stdafx.h"
#include "SFML\Graphics.hpp"
#include "WorldObjectManager.h"
#include "StaticWorldObject.h"
#include "PlayerObject.h"

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
    static WorldObjectManager<PlayerObject> &GetWorldObjectManager();
    static WorldObjectManager<StaticWorldObject> &GetStaticObjectsManager();
  private:
    static GameStates _currentGameState;
    static sf::RenderWindow _mainWindow;
    static WorldObjectManager<PlayerObject> _worldObjectManager;
    static WorldObjectManager<StaticWorldObject> _staticObjectsManager;
};