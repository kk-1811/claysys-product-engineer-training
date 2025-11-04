using System;

namespace generics
{
    class Program
    {
        static void Main(string[] args)
        {
            // Test with integers
            Stack<int> intStack = new Stack<int>();
            intStack.Push(1);
            intStack.Push(2);
            intStack.Push(3);

            Console.WriteLine("Peek at the top of the integer stack: " + intStack.Peek());
            Console.WriteLine("Popped from the integer stack: " + intStack.Pop());
            Console.WriteLine("Peek again: " + intStack.Peek());

            // Test with strings
            Stack<string> stringStack = new Stack<string>();
            stringStack.Push("User1");
            stringStack.Push("User2");

            Console.WriteLine("\nPeek at the top of the string stack: " + stringStack.Peek());
            Console.WriteLine("Popped from the string stack: " + stringStack.Pop());
            Console.WriteLine("Peek again: " + stringStack.Peek());
        }
    }
}