import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { API_PATH } from "@/Request/API_PATH"
import type { Product } from "@/Models/Product"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Error } from "@/components/Error"
import { axiosInstance } from "@/Request/axiosInstance"
export default function DetailProduct() {
  const { id } = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProductById = async () => {
    try {
      setLoading(true)
      const response = await axiosInstance.get<Product>(API_PATH.detailProduct(id!))
      setProduct(response.data)
    } catch (err: any) {
      setError(err.message || "Ürün detayları alınamadı")
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchProductById()
  }, [id])

  if (loading) return <div>Yükleniyor...</div>
  if (error) return <Error message={error} />
  if (!product) return <div>Ürün bulunamadı</div>

  return (
    <div className="mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">{product.name}</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col md:flex-row items-center md:justify-center gap-6">
          {/* Görsel */}
          <div className="flex justify-center md:justify-end w-full md:w-1/2">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="rounded-lg w-full max-w-sm h-auto shadow-lg object-cover"
            />
          </div>

          {/* Bilgiler */}
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="flex flex-col justify-center h-full gap-6 text-lg font-semibold">
              <div>
                <h3 className="text-muted-foreground text-sm">Ürün ID</h3>
                <p className="text-primary text-xl">{product.id}</p>
              </div>
              <div>
                <h3 className="text-muted-foreground text-sm">Ürün İsmi</h3>
                <p className="text-primary text-xl">{product.name}</p>
              </div>
              <div>
                <h3 className="text-muted-foreground text-sm">Fiyat</h3>
                <p className="text-primary text-xl">{product.price} TL</p>
              </div>
              <div>
                <h3 className="text-muted-foreground text-sm">Barkod</h3>
                <p className="text-primary text-xl">{product.barkod}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

  )
}