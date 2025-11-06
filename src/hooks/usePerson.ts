// src/hooks/useProducts.ts
import type { Product } from "@/Models/Product";
import type { ServiceResponse, User } from "@/Models/User";
import { API_PATH } from "@/Request/API_PATH";
import { axiosInstance } from "@/Request/axiosInstance";
import axios from "axios";
import { useState } from "react";



export function usePersons() {
  const [persons, setPersons] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  async function getPersons() {
    try {
      const res = await axiosInstance.get(API_PATH.getPerson); // buraya auth koruması sadece admin ise ulasabilecek sekilde ayarlanacak
      console.log(res.data.data)
      if (res.data.success && res.data.data) {
        setPersons(res.data.data);
      }
    } catch (err: any) {
      setError(err.message || "Veri alınamadı");
      setPersons([]);

    } finally {
      setLoading(false);
    }
  }
  return { persons, loading, error, getPersons, setPersons };
}
