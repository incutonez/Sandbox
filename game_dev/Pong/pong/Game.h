#pragma once
#include "PlayerPaddle.h"
#include "SFML/Window.hpp"
#include "SFML/Graphics.hpp"
#include "GameBall.h"
#include "GameObjectManager.h"

class Game {
  public:
    static void Start();
    static sf::RenderWindow & GetWindow();
    const static int SCREEN_WIDTH = 1024;
    const static int SCREEN_HEIGHT = 768;
	  const static GameObjectManager& GetGameObjectManager();

  private:
    static bool IsExiting();
    static void GameLoop();
    static void ShowSplashScreen();
    static void ShowMenu();

    enum GameState {
      Uninitialized,
      ShowingSplash,
      Paused,
      ShowingMenu,
      Playing,
      Exiting
    };
  
    static GameState _gameState;
    static sf::RenderWindow _mainWindow;
    static GameObjectManager _gameObjectManager;
};