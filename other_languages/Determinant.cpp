#include <iostream>
#include <cmath>
#include <time.h>

using namespace std;

int size;
int deter3(int **a);
int recur_deter(int **b, int size);

int main()
{
	int i, j, var, **arr, sign;;
	char answer;
	srand(time(NULL));

	cout << "Please enter a size for the array: ";
	cin >> size;

	arr = new int*[size];
	for (int i = 0; i < size; i++)
		*(arr+i) = new int[size];

	cout << "Create random numbers array? ";
	cin >> answer;
	answer = tolower(answer);

	if (answer == 'n')
	{
		cout << "Enter your numbers (one number at a time): ";
		for (i = 0; i < size; i++)
		{
			for (j = 0; j < size; j++)
			{
				if (i == 0 && size != 3)
				{
					if ((j+2) % 2 == 0)
						sign = 1;
					else
						sign = -1;
				}
				cin >> var;
				if (i == 0)
					arr[i][j] = sign * var;
				else
					arr[i][j] = var;
			}
		}
		cout << endl;
	}
	else
	{
		for (i = 0; i < size; i++)
		{
			for(j = 0; j < size; j++)
			{
				if (i == 0 && size != 3)
				{
					if ((j+2) % 2 == 0)
						sign = 1;
					else
						sign = -1;
					arr[i][j] = sign * (rand() % 50);
				}
				else
					arr[i][j] = rand() % 50;
			}
		}
	}
	
	for (i = 0; i < size; i++)
	{
		for (j = 0; j < size; j++)
		{
			cout << arr[i][j] << " ";
		}
		cout << endl;
	}
	cout << endl << endl;

	cout << "Your determinant is: " << recur_deter(arr, size) << endl;

	return 0;
}

int recur_deter(int **b, int size)
{
	int deter, i, j, k, row, l, sign;
	int new_deter = 0;
	deter = 0;
	int **arr;
	arr = new int*[size-1];
	for(i = 0; i < size-1; i++)
		*(arr+i)=new int[size-1];

	if (size == 3)
	{
		deter =	deter + deter3(b);
	}
	else
	{
		for (i = 0; i < size; i++)
		{
			for (l = 0, row = 1; row < size; row++, l++)
			{
				for (j = 0, k = 0; j < size; j++, k++)
				{
					if (j == i)
						j++;
					if (l == 0 && size-1 != 3)
					{
						if (k % 2 == 0 || k % 2 == 2)
							sign = 1;
						else
							sign = -1;
						arr[l][k] = sign * b[row][j];
					}
					else
						arr[l][k] = b[row][j];
				}
			}
				/* Prints
			for (int r = 0; r < size-1; r++)
			{
				for (j = 0; j < size-1; j++)
				{
					cout << arr[r][j] << " ";
				}
				cout << endl;
			}
			cout << endl; */
			
			new_deter = new_deter + b[0][i] * recur_deter(arr, size-1);
			//cout << "deter, arr[0]["<< i << "]" << new_deter << " " << b[0][i] << endl << endl;
		}
		deter = new_deter;
		//cout << "deter: "<< deter << endl << endl;
	}

	return deter;
}

int deter3(int **a)
{
	int deter, i, first, second;

	for (i = 0; i < 3; i++)
	{
		if (i == 0)
		{
			first = a[1][1] * a[2][2];
			second = a[1][2] * a[2][1];
			deter = a[0][0]*(first - second);
		}
		else if (i == 1)
		{
			first = a[1][0] * a[2][2];
			second = a[2][0] * a[1][2];
			deter = deter - a[0][1]*(first - second);
		}
		else if (i == 2)
		{
			first = a[1][0] * a[2][1];
			second = a[2][0] * a[1][1];
			deter = deter + a[0][2]*(first - second);
		}
	}

	return deter;
}