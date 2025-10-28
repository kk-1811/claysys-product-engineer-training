using System;
using System.Collections.Generic;

namespace ECommerceApp
{
    class Program
    {
        static void Main(string[] args)
        {
            List<Product> products = new List<Product>
            {
                new Product { Id = 1, Name = "Laptop", Price = 75000m, Quantity = 5 },
                new Product { Id = 2, Name = "Headphones", Price = 1500m, Quantity = 20 },
                new Product { Id = 3, Name = "Mouse", Price = 600m, Quantity = 30 },
                new Product { Id = 4, Name = "Keyboard", Price = 1200m, Quantity = 15 }
            };

            ShoppingCart cart = new ShoppingCart();

            while (true)
            {
                Console.WriteLine();
                Console.WriteLine("===== E-Commerce Menu =====");
                Console.WriteLine("1. View Products");
                Console.WriteLine("2. Add to Cart");
                Console.WriteLine("3. View Cart");
                Console.WriteLine("4. Remove from Cart");
                Console.WriteLine("5. Checkout");
                Console.WriteLine("6. Exit");
                Console.Write("Choose an option (1-6): ");

                string choice = Console.ReadLine();
                Console.WriteLine();

                if (choice == "1")
                {
                    Console.WriteLine("Available Products:");
                    foreach (var p in products)
                    {
                        p.DisplayProduct();
                    }
                }
                else if (choice == "2")
                {
                    int productId = ReadInt("Enter Product Id to add: ");
                    if (!ProductExists(products, productId))
                    {
                        Console.WriteLine("Product not found.");
                        continue;
                    }

                    int qty = ReadInt("Enter quantity: ");
                    if (qty <= 0)
                    {
                        Console.WriteLine("Quantity must be greater than zero.");
                        continue;
                    }

                    Product selected = products.Find(p => p.Id == productId);
                    if (qty > selected.Quantity)
                    {
                        Console.WriteLine("Not enough stock available.");
                        continue;
                    }

                    cart.AddProduct(productId, qty);
                    Console.WriteLine("Product added to cart.");
                }
                else if (choice == "3")
                {
                    cart.DisplayCart(products);
                }
                else if (choice == "4")
                {
                    int productId = ReadInt("Enter Product Id to remove: ");
                    int qty = ReadInt("Enter quantity to remove: ");
                    if (qty <= 0)
                    {
                        Console.WriteLine("Quantity must be greater than zero.");
                        continue;
                    }

                    bool removed = cart.RemoveProduct(productId, qty);
                    if (removed)
                    {
                        Console.WriteLine("Product removed/updated in cart.");
                    }
                    else
                    {
                        Console.WriteLine("Product not found in cart or quantity invalid.");
                    }
                }
                else if (choice == "5")
                {
                    if (cart.IsEmpty())
                    {
                        Console.WriteLine("Your cart is empty.");
                        continue;
                    }

                    cart.DisplayCart(products);
                    decimal total = cart.CalculateTotal(products);
                    Console.WriteLine("Total: " + total.ToString("0.00"));
                    Console.Write("Proceed to checkout? (y/n): ");
                    string confirm = Console.ReadLine()?.Trim().ToLower();

                    if (confirm == "y")
                    {
                        // Deduct stock and clear cart
                        bool ok = cart.TryCheckoutAndUpdateStock(products);
                        if (ok)
                        {
                            Console.WriteLine("Checkout successful. Thank you for your purchase!");
                        }
                        else
                        {
                            Console.WriteLine("Checkout failed due to stock changes. Please review your cart.");
                        }
                    }
                    else
                    {
                        Console.WriteLine("Checkout canceled.");
                    }
                }
                else if (choice == "6")
                {
                    Console.WriteLine("Goodbye!");
                    break;
                }
                else
                {
                    Console.WriteLine("Invalid option. Please enter a number from 1 to 6.");
                }
            }
        }

        static int ReadInt(string prompt)
        {
            while (true)
            {
                Console.Write(prompt);
                string input = Console.ReadLine();

                if (int.TryParse(input, out int value))
                {
                    return value;
                }

                Console.WriteLine("Invalid input. Please enter a valid integer.");
            }
        }

        static bool ProductExists(List<Product> products, int id)
        {
            return products.Exists(p => p.Id == id);
        }
    }
}