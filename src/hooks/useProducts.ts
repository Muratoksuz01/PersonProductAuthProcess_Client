// src/hooks/useProducts.ts
import type { Product } from "@/Models/Product";
import { API_PATH } from "@/Request/API_PATH";
import { axiosInstance } from "@/Request/axiosInstance";
import { useState } from "react";



export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  async function getProducts() {
    try {
      const res = await axiosInstance.get<Product[]>(API_PATH.getProduct);
      const data = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data)
          ? res.data
          : []

      setProducts(data)
    } catch (err: any) {
      console.log(err)
      setError("custom:"+err.message || "Veri alınamadı");
      setProducts([]);

    } finally {
      setLoading(false);
    }
  }

  
  return { products, loading, error, getProducts, setProducts};
}
