import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useProducts } from "@/hooks/useProducts"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { Error } from "@/components/Error"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { Pencil, Trash2, Info } from "lucide-react"
import { axiosInstance } from "@/Request/axiosInstance"
import { API_PATH } from "@/Request/API_PATH"
import { toast } from "sonner"
import { toastSuccessStyle } from "@/lib/ToastStyles"
import CustomDeleteAlertDialog from "@/components/CustomAlertDialog"
import type { Product } from "@/Models/Product"
import { ProductEditDrawer } from "@/components/ProductEditDrawer"
import { DrawerCreateDialog } from "@/components/CreateDrawer"

function DashBoard() {
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product>({} as Product)
  const { products, loading, error, getProducts } = useProducts()
  const [openDrawer, setOpenDrawer] = useState<boolean>(false) // edit icin 
  const [openCreateDrawer, setOpenCreateDrawer] = useState(false)// create icin
  const [openAlert, setOpenAlert] = useState(false) // delete icin

  useEffect(() => {
    getProducts();
  }, []);

  const handleViewInfo = (id: number) => {
    navigate(`product/${id}`);
  };
  const handleDelete = (id: number) => {
    console.log("delete id:", id);
    axiosInstance.delete(API_PATH.deleteProduct(String(id)))
      .then(res => {
        console.log("silme basarılı:", res.data);
        toast.success("Ürün başarıyla silindi.", { style: toastSuccessStyle })
        getProducts(); // veriler guncellensin 
      })
      .catch(err => {
        console.log("silme hatası:", err);
      })
  }

  return (
    <div className="p-6">
      <Error message={error} />
      <Card className="shadow-sm">
        <CardContent>
          <div className="flex justify-end">
            <Button className=" mr-10  bg-green-700 " 
            onClick={()=>{
              setOpenCreateDrawer(true)}}
            >Yeni</Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[120px] text-center hidden md:block">İşlem</TableHead>
                <TableHead>Ürün Adı</TableHead>
                <TableHead>Fiyat</TableHead>
                <TableHead className="hidden md:block">Barkod</TableHead>
                <TableHead>Resim</TableHead>
              </TableRow>
            </TableHeader>
            {loading ? (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    <Spinner size={32} />
                  </TableCell>
                </TableRow>
              </TableBody>
            ) : (
              <TableBody>
                {products?.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell className=" gap-2 justify-center hidden md:flex">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setOpenDrawer(true)
                          setProduct(p)
                        }}
                      >
                        <Pencil size={16} />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          console.log("tıkandı")
                          setOpenAlert(true);
                          setProduct(p)
                        }}
                      >
                        <Trash2 size={16} />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewInfo(p.id)}
                      >
                        <Info size={16} />
                      </Button>
                    </TableCell>
                    <TableCell  className="max-w-2 truncate">{p.name}</TableCell>
                    <TableCell>{p.price}</TableCell>
                    <TableCell className="hidden md:block">{p.barkod}</TableCell>
                    <TableCell>
                      <img
                        src={p.imageUrl}
                        alt={p.name}
                        className="h-12 w-12 rounded-md object-cover border"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </CardContent>
      </Card>
      <CustomDeleteAlertDialog 
      onClick={() => handleDelete(product.id)}
         setOpenAlert={setOpenAlert}
        openAlert={openAlert} 
        name={product.name}
        />

      <ProductEditDrawer getProducts={getProducts} product={product} openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
      <DrawerCreateDialog getProducts={getProducts} openCreateDrawer={openCreateDrawer} setOpenCreateDrawer={setOpenCreateDrawer} />
    </div>
  )
}

export default DashBoard
