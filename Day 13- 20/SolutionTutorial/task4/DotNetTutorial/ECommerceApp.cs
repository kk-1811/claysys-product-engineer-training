using System;
using System.Collections.Generic;

namespace ECommerceApp
{
    class ShoppingCart
    {
        private readonly Dictionary<int, int> productIdToQuantity = new Dictionary<int, int>();

        public void AddProduct(int productId, int quantity)
        {
            if (productIdToQuantity.ContainsKey(productId))
            {
                productIdToQuantity[productId] = productIdToQuantity[productId] + quantity;
            }
            else
            {
                productIdToQuantity[productId] = quantity;
            }
        }

        public bool RemoveProduct(int productId, int quantity)
        {
            if (!productIdToQuantity.ContainsKey(productId))
            {
                return false;
            }

            int current = productIdToQuantity[productId];
            if (quantity >= current)
            {
                productIdToQuantity.Remove(productId);
                return true;
            }

            if (quantity > 0)
            {
                productIdToQuantity[productId] = current - quantity;
                return true;
            }

            return false;
        }

        public void DisplayCart(List<Product> products)
        {
            if (IsEmpty())
            {
                Console.WriteLine("Cart is empty.");
                return;
            }

            Console.WriteLine("Your Cart:");
            decimal total = 0m;

            foreach (var kv in productIdToQuantity)
            {
                int id = kv.Key;
                int qty = kv.Value;
                Product p = products.Find(prod => prod.Id == id);
                if (p == null)
                {
                    continue;
                }

                decimal line = p.Price * qty;
                total += line;

                Console.WriteLine("Id: " + p.Id + ", Name: " + p.Name + ", Qty: " + qty + ", Unit: " + p.Price.ToString("0.00") + ", Line Total: " + line.ToString("0.00"));
            }

            Console.WriteLine("Cart Total: " + total.ToString("0.00"));
        }

        public decimal CalculateTotal(List<Product> products)
        {
            decimal total = 0m;

            foreach (var kv in productIdToQuantity)
            {
                int id = kv.Key;
                int qty = kv.Value;
                Product p = products.Find(prod => prod.Id == id);
                if (p == null)
                {
                    continue;
                }

                total += p.Price * qty;
            }

            return total;
        }

        public bool TryCheckoutAndUpdateStock(List<Product> products)
        {
            // Verify the stock again
            foreach (var kv in productIdToQuantity)
            {
                int id = kv.Key;
                int qty = kv.Value;
                Product p = products.Find(prod => prod.Id == id);
                if (p == null || qty > p.Quantity)
                {
                    return false;
                }
            }

            // Deduct the stock
            foreach (var kv in productIdToQuantity)
            {
                int id = kv.Key;
                int qty = kv.Value;
                Product p = products.Find(prod => prod.Id == id);
                if (p != null)
                {
                    p.Quantity = p.Quantity - qty;
                }
            }

            productIdToQuantity.Clear();
            return true;
        }

        public bool IsEmpty()
        {
            return productIdToQuantity.Count == 0;
        }
    }
}