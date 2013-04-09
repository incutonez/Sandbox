#include <SFML/Graphics.hpp>
#include <SFML/Window.hpp>
#include <windows.h>
#include <sstream>
#include <string>

using namespace std;
using namespace sf;

int main() {
  RenderWindow window(VideoMode(800, 600, 32), "SFML BLAH");
  //OutputDebugString("BLAH");
  Texture texture;
  if (!texture.loadFromFile("cute.jpg"))
    return EXIT_FAILURE;
  Sprite sprite(texture);
  while (window.isOpen()) {
    // Process events
    Event event;
    while (window.pollEvent(event)) {
      // Close window : exit
      if (event.type == Event::Closed || Keyboard::isKeyPressed(Keyboard::Escape))
        window.close();
      else if (Keyboard::isKeyPressed(Keyboard::Left)) {
        char myStr[1000];
        sprintf(myStr,"position: %f", sprite.getPosition().x);
        OutputDebugString(myStr);
      }
    }
 
    // Clear screen
    window.clear();
            
    window.draw(sprite);
 
    // Update the window
    window.display();
  }
  return 0;
}