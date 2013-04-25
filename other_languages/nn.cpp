/*		Christopher L. Dancy II, Thomas Conkling, & Jef Harkay
/		TEAM:	jph5076
/		Neural Network Implementation of Tron-based game.
/		For our random double function, we used the code from the daniweb.com link,
/		http://www.daniweb.com/forums/thread98545.html
*/
#include <iostream>
#include <string>
#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include <fstream>
#include <time.h>
#include <dos.h>
#include <vector>
#include "windows.h"

using namespace std;

const int NUMINPUTNODES = 7;
const int NUMHIDDENNODES = 5;
const int NUMOUTPUTNODES = 3;
const int NUMNODES = NUMINPUTNODES + NUMHIDDENNODES + NUMOUTPUTNODES;
const int ARRAYSIZE = NUMNODES+1;			// We just kept the 1 offset and compensated for it where needed.
const double LEARNINGRATE = 0.5;			// This learning rate seemed to produce the best result.
const double E = 2.71828;
const bool printingDetails = false;
const int VALUE = 50000;					// This is the max value for the training loop.

void initialize(double weights[ARRAYSIZE][ARRAYSIZE], double values[ARRAYSIZE], 
		double expectedvalues[ARRAYSIZE], double thetas[ARRAYSIZE]);
void printnetwork(double weights[ARRAYSIZE][ARRAYSIZE], double values[ARRAYSIZE]);
void train(double values[ARRAYSIZE], double expectedvalues[ARRAYSIZE], vector<vector<double>> table);
void activatenetwork(double weights[ARRAYSIZE][ARRAYSIZE], double values[ARRAYSIZE], double thetas[ARRAYSIZE]);
double updateweights(double weights[ARRAYSIZE][ARRAYSIZE], double values[ARRAYSIZE], 
double expectedvalues[ARRAYSIZE], double thetas[ARRAYSIZE]);
double randDouble(double low, double high);
vector<double> parseLine(string line);
void training_values(string filename, vector<vector<double>> &table);

int main()
{
	ofstream out("out.txt");

	double weights[ARRAYSIZE][ARRAYSIZE];
	double values[ARRAYSIZE];
	double expectedvalues[ARRAYSIZE];
	double thetas[ARRAYSIZE];
	vector<vector<double>> table;
	int counter = 0;

	cout << "Neural network example" << endl;
	initialize(weights, values, expectedvalues, thetas);
	training_values("test.txt", table);
	while (true)
	{
		train(values, expectedvalues, table);	
		activatenetwork(weights, values, thetas);
		double sumOfSquaredErrors = updateweights(weights, values, expectedvalues, thetas);
		counter++;
		if (counter == 1 || counter == VALUE)
		{
			printnetwork(weights, values);
			cout << "After " << counter << " iterations, sum of squared errors = " << sumOfSquaredErrors << endl;
			if (counter >= VALUE)
				break;
		}
	}

	// This is where we put our weights into the "out.txt" file.
	for (int i = 1; i < ARRAYSIZE; i++)
	{
		for (int j = 1; j < ARRAYSIZE; j++)
			out << weights[i][j] << " ";
		out << endl << endl;
	}

	// We place a "T" in the text file to separate the weights from the thetas.
	// This "T" will be taken care of in the parser in the actual class.
	out << "T" << endl;

	// This is where we put our thetas into the "out.txt" file.
	for (int i = 1; i < ARRAYSIZE; i++)
		out << thetas[i] << "\n";
	
}

// Parseline function for vector class.
vector<double> parseLine(string line)
{
	vector<double> temp;
	string tempS;
	for(int i = 0; i < line.length(); i++)
	{
		if( line[i] == ' ' || i+1 == line.length())
		{
			if(line[i] != ' ')
				tempS += line[i];
			temp.push_back(strtod(tempS.c_str(), NULL));
			tempS.clear();
			continue;
		}
		tempS += line[i];
	}
	return temp;
}

// Didn't change anything in the updateweights function that professor Shaffer provided.
double updateweights(double weights[ARRAYSIZE][ARRAYSIZE], double values[ARRAYSIZE], 
		   double expectedvalues[ARRAYSIZE], double thetas[ARRAYSIZE])
{
	double sumOfSquaredErrors = 0.0;
	
        for (int o = 1+NUMINPUTNODES+NUMHIDDENNODES; o < 1+NUMNODES; o++)
	{
		double absoluteerror = expectedvalues[o] - values[o];
		sumOfSquaredErrors += pow(absoluteerror, 2);
		if (printingDetails) cout << "absolute error for node " << o << " = " << expectedvalues[o] << " - " << values[o] << " = " << absoluteerror << endl;
		double outputGradient = values[o] * (1.0 - values[o]) * absoluteerror;
		if (printingDetails) cout << "error gradient for output node " << o << " = " << outputGradient << endl;
		
		// update each weighting from the hidden layer
		for (int h = 1+NUMINPUTNODES; h < 1+NUMINPUTNODES+NUMHIDDENNODES; h++)
		{
			double delta = LEARNINGRATE * values[h] * outputGradient;
			if (printingDetails) cout << "Delta for " << h << " -> " << o << " = " << delta << endl;
			weights[h][o] += delta;
			if (printingDetails) cout << "weight[" << h << "][" << o << "] now equals " << weights[h][o] << endl;
			double hiddenGradient = values[h] * (1 - values[h]) * outputGradient * weights[h][o];
			if (printingDetails) cout << "hidden gradient [" << h << "] = " << hiddenGradient << endl;
			
			for (int i = 1; i < 1+NUMINPUTNODES; i++)
			{
				double delta = LEARNINGRATE * values[i] * hiddenGradient;
				if (printingDetails) cout << "delta weight " << i << " -> " << h << " = " << delta << endl;
				weights[i][h] += delta;
				if (printingDetails) cout << "*** weights[" << i << "][" << h << "] now equals " << weights[i][h] << endl;
			}

			double thetaDelta = LEARNINGRATE * -1 * hiddenGradient;
			if (printingDetails) cout << "***delta for theta[" << h << "] = " << thetaDelta << endl;
			thetas[h] += thetaDelta;
			if (printingDetails) cout << "***theta for " << h << " now equals " << thetas[h] << endl;
		}

		// update each weighting for the theta
		double delta = LEARNINGRATE * -1 * outputGradient;
		if (printingDetails) cout << "Calculating delta for theta[" << o << "]: " << LEARNINGRATE << " * " << -1 << " * " << outputGradient << endl;
		if (printingDetails) cout << "Delta for theta[" << o << "] = " << delta << endl;
		thetas[o] += delta;
		if (printingDetails) cout << "thetas[" << o << "] now equals " << thetas[o] << endl;
	}

	return sumOfSquaredErrors;
}

// Get the outputs based on the inputs (nothing changed here either).
void activatenetwork(double weights[ARRAYSIZE][ARRAYSIZE], double values[ARRAYSIZE], double thetas[ARRAYSIZE])
{
	// for each hidden node
	for (int h = 1+NUMINPUTNODES; h < 1+NUMINPUTNODES+NUMHIDDENNODES; h++)
	{
		double weightedinput = 0.0;
		// add up the weighted input
		for (int i = 1; i < 1+NUMINPUTNODES; i++)
		{
			weightedinput += weights[i][h] * values[i];
		}
		// handle the thetas
		weightedinput += (-1 * thetas[h]);

		values[h] = 1.0 / (1.0 + pow(E, -weightedinput));
		if (printingDetails) cout << "output for hidden node [" << h << "] = " << values[h] << endl;

	}

	// for each output node
	for (int o = 1+NUMINPUTNODES+NUMHIDDENNODES; o < 1+NUMNODES; o++)
	{
		double weightedinput = 0.0;
		for (int h = 1+NUMINPUTNODES; h < 1+NUMINPUTNODES+NUMHIDDENNODES; h++)
		{
			weightedinput += weights[h][o] * values[h];
		}
		// handle the thetas
		weightedinput += (-1 * thetas[o]);
		values[o] = 1.0 /(1.0 + pow(E, -weightedinput));
		if (printingDetails) cout << "output for output node[" << o << "] = " << values[o] << endl;
	}

}

// This is the function that loads our values from the "test.txt" file.
void train(double values[ARRAYSIZE], double expectedvalues[ARRAYSIZE], vector<vector<double>> table)
{
	int random = rand() % 27;	// Mod 27 because we have 27 cases in our "test.txt" file.

	// Only goes to 7 because our first 7 numbers on the line are for our directions.
	for (int i = 0; i < 7; i++)
		values[i+1] = table[random][i];

	// The last 3 numbers on the line are for our expected direction to take.
	expectedvalues[13] = table[random][7];
	expectedvalues[14] = table[random][8];
	expectedvalues[15] = table[random][9];
}

// Training values are initialized into a 2D vector here.
void training_values(string filename, vector<vector<double>> &table)
{
	string line;
	ifstream myfile;
	myfile.open(filename.c_str());		// Opening our test cases file.

	while (!myfile.eof())
	{
		getline(myfile, line);
		
		// Makes sure we have no comments or empty lines.
		if (line[0] != '/' && line[0] != 0)
			table.push_back(parseLine(line));		// We parse the line and store it in our 2D vector.
	}

	myfile.close();
}

// Display the network values and weights (nothing changed).
void printnetwork(double weights[ARRAYSIZE][ARRAYSIZE], double values[ARRAYSIZE])
{
	cout << endl << "*******************************************************************************" << endl << endl;
	cout << "Network values: " << endl;
	for (int x = 1; x <= NUMNODES; x++)
	{
		printf("%8.4f |", values[x]);
	}
	
	cout << endl << "===============================================================================" << endl;

	cout << "Network weights: " << endl;
	for (int x = 1; x <= NUMNODES; x++)
	{
		for (int y = 1; y <= NUMNODES; y++)
		{
			printf("%8.4f |", weights[x][y]);
		}
		cout << endl;
	}
        cout << endl << "*******************************************************************************" << endl << endl;
	 
}	

// This is where we initialize our thetas and weights based on the equation:
// (-2.4 / F_i, 2.4 / F_i) where F_i is the number of nodes at the current step.
void initialize(double weights[ARRAYSIZE][ARRAYSIZE], double values[ARRAYSIZE], 
		double expectedvalues[ARRAYSIZE], double thetas[ARRAYSIZE])
{	
	for (int x = 0; x <= NUMNODES; x++)
	{
		values[x] = 0.0;
		expectedvalues[x] = 0.0;
		
		// This IF is for the Input to Hidden Layer nodes.
		// Number of nodes at the current step = 7, so F_i = 7.
		if (x < NUMNODES - NUMOUTPUTNODES)
		{
			thetas[x] = randDouble(-2.4 / 7.0, 2.4 / 7.0);

			for (int y = 0; y <= NUMNODES; y++)
				weights[x][y] = randDouble(-2.4 / 7.0, 2.4 / 7.0);

		}
		// This ELSE is for the Hidden Layer to Output nodes.
		// Number of nodes at the current step = 5, so F_i = 5.
		else
		{
			thetas[x] = randDouble(-2.4 / 5.0, 2.4 / 5.0);

			for (int y = 0; y <= NUMNODES; y++)
				weights[x][y] = randDouble(-2.4 / 5.0, 2.4 / 5.0);

		}
	}	
}

// Random double function.
double randDouble(double low, double high)
{
	double temp;

	// Swap low and high values if we messed them up.
	if (low > high)
	{
		temp = low;
		low = high;
		high = temp;
	}
	
	// Calculate the random number and return it.
	temp = (rand() / (static_cast<double>(RAND_MAX) + 1.0))
		* (high - low) + low;
	return temp;
}