using System;

namespace guessnumber
{
    class program
    {
        static void Main(string[] args)
        {
            Random random = new Random();
            int targetNumber = random.Next(1, 101);
            int guess = 0;
            int attempts = 0;

            Console.WriteLine("Welcome to the Number Guessing Game!");
            Console.WriteLine("I have chosen a number between 1 and 100. Try to guess it!");

            while (guess != targetNumber)
            {
                Console.Write("Enter your guess: ");
                string input = Console.ReadLine();

                if (int.TryParse(input, out guess))
                {
                    attempts++;
                    if (guess < targetNumber)
                    {
                        Console.WriteLine("The number is higher.");
                    }
                    else if (guess > targetNumber)
                    {
                        Console.WriteLine("The number is lower.");
                    }
                    else
                    {
                        Console.WriteLine($"Congratulations! You guessed the number {targetNumber} in {attempts} attempts.");
                    }
                }
                else
                {
                    Console.WriteLine("Please enter a valid number.");
                }
            }
        }
    }

}