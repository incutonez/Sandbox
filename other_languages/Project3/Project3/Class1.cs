﻿using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

/*
 * Let's say I want to solve:
 * Rows: [{2}, {4}, {2}, {2}, {2,1}]
 * Cols: [{2}, {1,2}, {1}, {3}, {3,1}]
 * Solution grid:
 * | o | o | o | x | x |
 * | o | x | x | x | x |
 * | o | o | o | x | x |
 * | x | x | o | o | o |
 * | x | x | o | o | x |
 * 
 * 
 * 1st iter:
 * | x | x | o | o | o |
 * | x | x | x | x | o |
 * 
 * 2nd iter:
 * | x | x | o | o | o |
 * | o | x | x | x | x |
 * 
 * 3rd iter:
 * | o | x | x | o | o |
 * | x | x | x | x | x |
 * 
 * 4th iter:
 * | o | x | x | o | o |
 * | o | x | x | x | x |
 * 
 * 5th iter:
 * | o | o | x | x | o |
 * | x | x | x | x | o |
 * 
 * 6th iter:
 * | o | o | x | x | o |
 * | o | x | x | x | x |
 * 
 * 7th iter:
 * | o | o | o | x | x |
 * | x | x | x | x | o |
 * 
 * 8th iter:
 * | o | o | o | x | x |
 * | o | x | x | x | x |
*/

/* row 1 has {1, 1, 1}
 * | x | o | x | o | x | o | o |
 * | x | o | x | o | o | x | o |
 * | x | o | o | x | o | x | o |
 * | o | x | o | x | o | x | o |
 * | o | x | o | x | o | o | x |
 * | o | x | o | o | x | o | x |
 * | o | o | x | o | x | o | x |
 * | x | o | x | o | o | o | x |
 * | x | o | o | x | o | o | x |
 * | x | o | o | o | x | o | x |
*/
/*
 * For the picture part... take in a picture, if it's say 1000x1000 pixels, break it into neighborhoods,
 * so if we wanted a 10x10 nonogram, we would take 100x100 pixels in the original picture, sum em, then check to
 * see if the sum is less than a certain threshold... if it is, it's a 0 (white square), else it's a 1 (black square)
 * 
 * for recursive part... start with top row, and find a permutation that works,
 * and if it does, recursively call to next row and check those conditions... if it works, recursively call, otherwise,
 * go back to initial row and permute
*/
namespace Project3 {
  class Class1 {
    // TODO: look into dynamic arrays
    // jagged arrays
    public int[][] rows, cols;
    // normal 2d array
    public int[,] soln;
    public Dictionary<string, string> permutations = new Dictionary<string, string>();
    public int count = 0;

    public Class1(int[][] r, int[][] c) {
      this.rows = r;
      this.cols = c;
      // create the mxn grid of all 0s
      this.soln = new int[r.GetLength(0), c.GetLength(0)];

      for (int i = 0; i < rows.GetLength(0); i++) {
        int last = 0;
        for (int j = 0; j < rows[i].GetLength(0); j++) {
          for (int k = 0; k < rows[i][j]; k++) {
            this.soln[i, last++] = 1;
          }
          // need at least 1 white space
          last++;
        }
      }
    }

    public void printSoln() {
      for (int i = 0; i < this.soln.GetLength(0); i++) {
        for (int j = 0; j < this.soln.GetLength(1); j++) {
          Console.Write("| " + this.soln[i, j] + " ");
        }
        Console.Write("|\n");
      }
    }

    public void printPerms() {
      var keys = this.permutations.Keys.Cast<String>().OrderByDescending(x => x);
      foreach (var blah in keys) {
        Console.WriteLine(blah);
      }
    }

    public static void recurse(int[] test, int index, Class1 nono) {
      int[] copy = new int[test.Length];
      test.CopyTo(copy, 0);
      for (int i = index; i < copy.Length; i++) {
        if (copy[i] == 0) {
          continue;
        }
        var next = Array.IndexOf(copy, 0, i + 1);
        if (next != -1) { 
          recurse(copy, next, nono);
        }
        // shifting
        var current = i;
        bool canShift = false;
        while (current != -1) {
          var zero = Array.IndexOf(copy, 0, current + 1);
          var nextZero = -1;
          if (zero != -1) {
            nextZero = Array.IndexOf(copy, 0, nextZero + 1);
          }
          if (nextZero - 1 == zero) {
            canShift = true;
          }
          else if (zero + 1 == copy.Length) {
            canShift = true;
          }
          current = zero;
        }

        current = i;
        if (canShift) {
          // while loop
          while (current != -1 && current + 1 < copy.Length) {
            var zero = Array.IndexOf(copy, 0, current + 1);
            copy[current] = 0;
            copy[zero] = 1;
            current = Array.IndexOf(copy, 1, zero + 1);
          }
          String permutation = "";
          for (int idx = 0; idx < copy.Length; idx++) {
            Console.Write(copy[idx] + " ");
            permutation += copy[idx];
          }
          Console.Write("\n");
          nono.permutations[permutation] = permutation;
        }
        else {
          i = copy.Length;
        }
      }
    }

    /*public Boolean isValid(int[,] soln, int[][] cols) {

      return true;
    }*/
    public static void Main() {
      Class1 nono = new Class1(
        new int[][] {
          new[] {2},
          new[] {4},
          new[] {2},
          new[] {2},
          new[] {2, 1}
        },
        new int[][] {
          new[] {2},
          new[] {1, 2},
          new[] {1},
          new[] {3},
          new[] {3, 1}
        }
      );

      //nono.printSoln();
      int[] test = new int[] { 1, 1, 1, 0, 1, 0, 1, 0, 0 };
      String permutation = "";
      for (int idx = 0; idx < test.Length; idx++) {
        Console.Write(test[idx] + " ");
        permutation += test[idx];
      }
      Console.Write("\n");
      nono.permutations[permutation] = permutation;
      // start at beginning, recursively go in with next index, and once you reach
      // the end, move the squares as much as possible
      recurse(test, 0, nono);
      nono.printPerms();
    }
  }
}
