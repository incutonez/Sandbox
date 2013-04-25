/*		Christopher L. Dancy II, Thomas Conkling, & Jef Harkay
/		TEAM:	jph5076
/		This has our class implementation of the Tron game.
/		When the program starts, YOU HAVE TO CONTROL PLAYER 1.
*/
#include <iostream>
#include <string>
#include <cstdlib>
#include <time.h>
#include <fstream>
#include <math.h>
#include <conio.h>

#define MAX_X 50
#define MAX_Y 20

const int NUMINPUTNODES = 7;
const int NUMHIDDENNODES = 5;
const int NUMOUTPUTNODES = 3;
const int NUMNODES = NUMINPUTNODES + NUMHIDDENNODES + NUMOUTPUTNODES;
const int ARRAYSIZE = NUMNODES;
const double E = 2.71828;

using namespace std;

struct _playerData
{
	int x;
	int y;
	int playerNum;
};
 
void sleep(unsigned int mseconds)
{
    clock_t goal = mseconds + clock();
    while (goal > clock());
}

// ParseLine function that strips spaces from our text file and will
// load all of the floating point numbers into our 2D weights array.
void parseLine(string line, double temp[ARRAYSIZE][ARRAYSIZE])
{
	static int counter = 0;
	string tempS;
	int r = 0;

	for(int i = 0; i < line.length(); i++)
	{
		if( line[i] == ' ' || i+1 == line.length())
		{
			if(line[i] != ' ')
				tempS += line[i];

			temp[counter][r++] = strtod(tempS.c_str(), NULL);
			tempS.clear();
			continue;
		}
		tempS += line[i];
	}
	counter++;
}

class jph5076
{
	public:
		// Function that will load our weights and thetas from our neural training text file.
		void load_file(double weights[ARRAYSIZE][ARRAYSIZE], double thetas[ARRAYSIZE])
		{
			int counter = 0;
			ifstream myfile;
			string line;
			myfile.open("out.txt");

			getline(myfile, line);
			
			// Keep checking for the T that separates weight from theta values.
			while (line != "T")
			{
				// Loads in the weight values VIA our parseLine function.
				if (line[0] != 0)
					parseLine(line, weights);

				getline(myfile, line);
			}

			// Skips over the "T" value.
			getline(myfile, line);

			// Load in the theta values.
			while (!myfile.eof())
			{
				thetas[counter] = strtod(line.c_str(), NULL);
				counter++;
				getline(myfile, line);
			}
		}

		void Initialize(_playerData *data)
		{		
			printf("I am player %d, starting at %d,%d\n", 
				data->playerNum, data->x, data->y);

			load_file(neuro_weights, neuro_thetas);		// Get our weights and thetas from text file.
		}

		// Get the outputs based on the inputs, taken from the "nn.cpp" file, except we changed the offset.
		void activatenetwork(double weights[ARRAYSIZE][ARRAYSIZE], double values[ARRAYSIZE], double thetas[ARRAYSIZE])
		{
			// for each hidden node
			for (int h = NUMINPUTNODES; h < NUMINPUTNODES+NUMHIDDENNODES; h++)
			{
				double weightedinput = 0.0;
				// add up the weighted input
				for (int i = 0; i < NUMINPUTNODES; i++)
				{
					weightedinput += weights[i][h] * values[i];
				}
				// handle the thetas
				weightedinput += (-1 * thetas[h]);

				values[h] = 1.0 / (1.0 + pow(E, -weightedinput));
			}

			// for each output node
			for (int o = NUMINPUTNODES+NUMHIDDENNODES; o < NUMNODES; o++)
			{
				double weightedinput = 0.0;
				for (int h = NUMINPUTNODES; h < NUMINPUTNODES+NUMHIDDENNODES; h++)
				{
					weightedinput += weights[h][o] * values[h];
				}
				// handle the thetas
				weightedinput += (-1 * thetas[o]);
				values[o] = 1.0 /(1.0 + pow(E, -weightedinput));
			}
		}

		bool Move(const char board[MAX_Y][MAX_X], int& me_x, int& me_y, int them_x, int them_y)
		{			
			double lookdist = 10.;			// This is our distance threshold to check with.
			static int oldMeX = me_x;		// Player's previous x value.
			static int oldMeY = me_y;		// Player's previous y value.
			int direction_FLAG = 1;			// Directional flag indicating which direction we'll be taking.
			double west, north, south, east, ne, se, sw, nw;	// Directional values used in computations.

			// West direction.
			for(int x = 1; x <= lookdist; x++)
			{
				// Checking to see if we don't have an empty space in west's line of sight.
				if(board[me_y][me_x - x] != ' ')
				{
					west = (x - 1) / lookdist;
					break;
				}

				if(x+1 == lookdist)
					west = 1;
			}

			// North direction.
			for(int x = 1; x <= lookdist; x++)
			{
				// Checking to see if we don't have an empty space in north's line of sight.
				if(board[me_y - x][me_x] != ' ')
				{
					north = (x - 1) / lookdist;
					break;
				}
				if(x+1 == lookdist)
					north = 1;
			}

			// East direction.
			for(int x = 1; x <= lookdist; x++)
			{
				// Checking to see if we don't have an empty space in east's line of sight.
				if(board[me_y][me_x + x] != ' ')
				{
					east = (x - 1) / lookdist;
					break;
				}
				if(x+1 == lookdist)
					east = 1;
			}

			// South direction.
			for(int x = 1; x <= lookdist; x++)
			{
				// Checking to see if we don't have an empty space in south's line of sight.
				if(board[me_y + x][me_x] != ' ')
				{
					south = (x - 1) / lookdist;
					break;
				}
				if(x+1 == lookdist)
					south = 1;
			}
			
			// Northeast direction.
			for(int x = 1; x <= lookdist; x++)
			{
				// Checking to see if we don't have an empty space in northeast's line of sight.
				if(board[me_y - x][me_x + x] != ' ')
				{
					ne = (x - 1) / lookdist;
					break;
				}
				if(x+1 == lookdist)
					ne = 1;
			}
			
			// Southeast direction.
			for(int x = 1; x <= lookdist; x++)
			{
				// Checking to see if we don't have an empty space in southeast's line of sight.
				if(board[me_y + x][me_x + x] != ' ')
				{
					se = (x - 1) / lookdist;
					break;
				}
				if(x+1 == lookdist)
					se = 1;
			}

			// Southwest direction.
			for(int x = 1; x <= lookdist; x++)
			{
				// Checking to see if we don't have an empty space in southwest's line of sight.
				if(board[me_y + x][me_x - x] != ' ')
				{
					sw = (x - 1) / lookdist;
					break;
				}
				if(x+1 == lookdist)
					sw = 1;
			}

			// Northwest direction.
			for(int x = 1; x <= lookdist; x++)
			{
				// Checking to see if we don't have an empty space in northwest's line of sight.
				if(board[me_y - x][me_x - x] != ' ')
				{
					nw = (x - 1) / lookdist;
					break;
				}
				if(x+1 == lookdist)
					nw = 1;
			}

			// Player's orientation is north.
			if(me_x == oldMeX && me_y <= oldMeY)
			{
				neuro_values[0] = sw;
				neuro_values[1] = west;
				neuro_values[2] = nw;
				neuro_values[3] = north;
				neuro_values[4] = ne;
				neuro_values[5] = east;
				neuro_values[6] = se;

				// Sets the direction flag to north.
				direction_FLAG = 1;
			}

			// Player's orientation is south.
			else if(me_x == oldMeX && me_y > oldMeY)
			{
				neuro_values[0] = ne;
				neuro_values[1] = east;
				neuro_values[2] = se;
				neuro_values[3] = south;
				neuro_values[4] = sw;
				neuro_values[5] = west;
				neuro_values[6] = nw;

				// Sets the direction flag to south.
				direction_FLAG = 3;
			}

			// Player's orientation is east.
			else if(me_x > oldMeX && me_y == oldMeY)
			{
				neuro_values[0] = nw;
				neuro_values[1] = north;
				neuro_values[2] = ne;
				neuro_values[3] = east;
				neuro_values[4] = se;
				neuro_values[5] = south;
				neuro_values[6] = sw;

				// Sets the direction flag to east.
				direction_FLAG = 2;
			}

			// Player's orientation is west.
			else
			{
				neuro_values[0] = se;
				neuro_values[1] = south;
				neuro_values[2] = sw;
				neuro_values[3] = west;
				neuro_values[4] = nw;
				neuro_values[5] = north;
				neuro_values[6] = ne;

				// Sets the direction flag to west.
				direction_FLAG = 4;
			}

			// Activate the network with our weights, values, and thetas.
			activatenetwork(neuro_weights, neuro_values, neuro_thetas);

			// Update oldMeX and oldMeY to reflect our current me_x and me_y.
			oldMeX = me_x;
			oldMeY = me_y;

			// Checking which output value is the highest from the 3.
			// First check if the left value is higher than the straight value.
			if( neuro_values[12] > neuro_values[13] )
			{
				// Then check to see if the left value is higher than the right value.
				if( neuro_values[12] > neuro_values[14] )
				{
					// If left is the highest value, check the directional flag.
					switch(direction_FLAG)
					{
						// If directional flag is set to north.
						case 1:
							me_x--;
							break;
						// If directional flag is set to east.
						case 2:
							me_y--;
							break;
						// If directional flag is set to south.
						case 3:
							me_x++;
							break;
						// If directional flag is set to west.
						case 4:
							me_y++;
							break;
					}
				}
				else
				{
					// If right is the highest value, check the directional flag.
					switch(direction_FLAG)
					{
						// If directional flag is set to north.
						case 1:
							me_x++;
							break;
						// If directional flag is set to east.
						case 2:
							me_y++;
							break;
						// If directional flag is set to south.
						case 3:
							me_x--;
							break;
						// If directional flag is set to west.
						case 4:
							me_y--;

					}
				}
			}
			else
			{
				// If straight is higher than the left and right values.
				if( neuro_values[13] > neuro_values[14] )
				{
					switch(direction_FLAG)
					{
						// If directional flag is set to north.
						case 1:
							me_y--;
							break;
						// If directional flag is set to east.
						case 2:
							me_x++;
							break;
						// If directional flag is set to south.
						case 3:
							me_y++;
							break;
						// If directional flag is set to west.
						case 4:
							me_x--;
							break;
					}
				}
				// If right is the highest value, check the directional flag.
				else
				{
					switch(direction_FLAG)
					{
						// If directional flag is set to north.
						case 1:
							me_x++;
							break;
						// If directional flag is set to east.
						case 2:
							me_y++;
							break;
						// If directional flag is set to south.
						case 3:
							me_x--;
							break;
						// If directional flag is set to west.
						case 4:
							me_y--;

					}
				}
			}

			// This means our player has died.
			if(board[me_y][me_x] != ' ')
				return false;

			// This means our player is still alive and kicking.
			return true;
		}
		private:
			double neuro_weights[ARRAYSIZE][ARRAYSIZE];
			double neuro_thetas[ARRAYSIZE];
			double neuro_values[ARRAYSIZE];
};

class Player1
{
	public:
		bool RandomWalk(const char board[MAX_Y][MAX_X], int& me_x, int& me_y, int them_x, int them_y)
		{
			static int counter = 0;
			static int choice = 0;

			if (counter++ > 7)
			{
				counter = 0;
				choice = rand() % 4;
			}

			switch(choice)
			{
				case 0:
					if (board[me_y][me_x+1] == ' ')
					{
						me_x++;
						return true;
					}
				case 1:
					if (board[me_y+1][me_x] == ' ')
					{
						me_y++;
						return true;
					}
				case 2:
					if (board[me_y][me_x-1] == ' ')
					{
						me_x--;
						return true;
					}
				case 3:
					if (board[me_y-1][me_x] == ' ')
					{
						me_y--;
						return true;
					}
			};

			return false;
		}

		void Initialize(_playerData *data)
		{
			printf("I am player %d, starting at %d,%d\n", 
				data->playerNum, data->x, data->y);
		}


		bool Move(const char board[MAX_Y][MAX_X], int& me_x, int& me_y, int them_x, int them_y)
		{
			while (1)
			{
				if(kbhit())
				{
					int key = _getch();
					
					if (key == 224)
						continue;
					else if (key == 72)
						me_y--;
					else if (key == 77)
						me_x++;
					else if (key == 75)
						me_x--;
					else if (key == 80)
						me_y++;
					break;
				}
				else
					continue;
			}

			return true;
		}
};

void displayBoard(char board[MAX_Y][MAX_X])
{
	system("cls");
	for (int y = 0; y < MAX_Y; y++)
	{
		for (int x = 0; x < MAX_X; x++)
		{
			putchar(board[y][x]);
		}
		putchar('\n');
	}
}

void initBoard(char board[MAX_Y][MAX_X], int p1_x, int p1_y, int p2_x, int p2_y)
{
	for (int y = 0; y < MAX_Y; y++)
		for (int x = 0; x < MAX_X; x++)
			board[y][x] = ' ';
	for (int y = 0; y < MAX_Y; y++)
		board[y][0] = '|';
	for (int y = 0; y < MAX_Y; y++)
		board[y][MAX_X-1] = '|';
	for (int x = 0; x < MAX_X; x++)
		board[0][x] = '-';
	for (int x = 0; x < MAX_X; x++)
		board[MAX_Y-1][x] = '-';
	board[p1_y][p1_x] = '1';
	board[p2_y][p2_x] = '2';

}

void Pause()
{
	//char scs[5]; 
	//gets(scs);
	sleep(300);
}

int main()
{
	Player1 P1;
	jph5076 P2;
	char board[MAX_Y][MAX_X];

	_playerData data1, data2;
	data1.playerNum = 1;
	data1.x = 5;
	data1.y = 5;
	data2.playerNum = 2;
	data2.x = 40;
	data2.y = 15;
	P1.Initialize(&data1);
	P2.Initialize(&data2);

	srand((unsigned int)(time(NULL)));
	initBoard(board, data1.x, data1.y, data2.x, data2.y);
	displayBoard(board);

	bool goOn = true;
	while (goOn)
	{
		bool p1 = P1.Move(board, data1.x, data1.y, data2.x, data2.y);
		bool p2 = P2.Move(board, data2.x, data2.y, data1.x, data1.y);
		goOn = false; // assume
		if ((data2.x == data1.x)&&(data2.y == data1.y))
		{
			board[data1.y][data1.x] = '*';
			board[data2.y][data2.x] = '*';
			displayBoard(board);
			printf("\n\a COLLISION!\n");
		}
		else if ((!p1) && (!p2))
		{
			board[data1.y][data1.x] = '*';
			board[data2.y][data2.x] = '*';
			displayBoard(board);
			printf("\n\a ENDS IN A TIE\n");
		}
		else if (!p1)
		{
			board[data1.y][data1.x] = '*';
			displayBoard(board);
			printf("\n\a P2 wins\n");
		}
		else if (!p2)
		{
			board[data2.y][data2.x] = '*';
			displayBoard(board);
			printf("\n\a P1 wins\n");
		}
		else
		{
			board[data1.y][data1.x] = '1';
			board[data2.y][data2.x] = '2';
			displayBoard(board);
			goOn = true;
		}
		//Pause();
	}
}

