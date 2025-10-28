using System;

namespace ECommerceApp
{
    class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; } 

        public void DisplayProduct()
        {
            Console.WriteLine("Id: " + Id + ", Name: " + Name + ", Price: " + Price.ToString("0.00") + ", Stock: " + Quantity);
        }
    }
}