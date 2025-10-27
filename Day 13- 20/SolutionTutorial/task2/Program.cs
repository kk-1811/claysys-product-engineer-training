namespace datatypes // project name
{
    class Program  // class name
    {
        static void Main(string[] args)
        {
            //Basic datatypes
            //Integer

            int age = 20;

            //double

            double cgpa = 5.09;

            //char

            char grade = 'A';

            //string

            string name = "kishore.k";

            //boolean

            bool isStudent = true;


            Console.WriteLine("name:" + name);
            Console.WriteLine("age:" + age);
            Console.WriteLine("cgpa:" + cgpa);
            Console.WriteLine("grade:" + grade);
            Console.WriteLine("isStudent:" + isStudent);

            //Arithmetic Operations

            int a = 10;
            int b = 20;

            Console.WriteLine("a + b = " + (a + b));  // addition
            Console.WriteLine("a - b = " + (a - b));  // subtraction
            Console.WriteLine("a * b = " + (a * b));  // multiplication
            Console.WriteLine("a % b = " + (a % b));  // modulus
            Console.WriteLine("a / b = " + (a / b));  // integer division

            //Comparsion operators

            Console.WriteLine("a > b :" + (a > b));  //Greater than
            Console.WriteLine("a < b :" + (a < b));  //Less than
            Console.WriteLine("a = b :" + (a == b));  //Equal to
            Console.WriteLine("a != b :" + (a != b));  //Not Equal to

            //Logical Operators

            bool result1 = (a > b) && isStudent;
            Console.WriteLine(result1);              // AND

            bool result2 = (a < b) || isStudent;
            Console.WriteLine(result2);              // OR

            bool result3 = !isStudent;
            Console.WriteLine(result3);              // NOT
        }
    }
}