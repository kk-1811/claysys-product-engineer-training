using System;

class Program
{
	static void Main()
	{
		Console.WriteLine("Exception Handling Practice - Division");

		int numerator = ReadIntFromConsole("Enter numerator (int): ");
		int denominator;

		while (true)
		{
			denominator = ReadIntFromConsole("Enter denominator (int): ");
			try
			{
				double result = Divide(numerator, denominator);
				Console.WriteLine($"Result: {numerator} / {denominator} = {result}");
				break;
			}
			catch (DivideByZeroException)
			{
				Console.ForegroundColor = ConsoleColor.Red;
				Console.WriteLine("Error: Division by zero is not allowed. Please enter a non-zero denominator.");
				Console.ResetColor();
			}
		}
	}

	// Takes two integers and returns the result of integer division as double.
	// This intentionally performs integer division to demonstrate DivideByZeroException handling.
	static double Divide(int a, int b)
	{
		try
		{
			return (double)(a / b); // will throw DivideByZeroException if b == 0
		}
		catch (DivideByZeroException)
		{
			// Re-throw so the caller can decide how to handle/user prompt
			throw;
		}
	}

	static int ReadIntFromConsole(string prompt)
	{
		while (true)
		{
			Console.Write(prompt);
			string? input = Console.ReadLine();
			if (int.TryParse(input, out int value))
			{
				return value;
			}
			Console.ForegroundColor = ConsoleColor.Yellow;
			Console.WriteLine("Invalid input. Please enter a valid integer.");
			Console.ResetColor();
		}
	}
}


