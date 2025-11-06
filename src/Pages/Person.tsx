import type { RootState } from "@/app/store"
import CustomDeleteAlertDialog from "@/components/CustomAlertDialog"
import { PersonEditDrawer } from "@/components/PersonEditDrawer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { usePersons } from "@/hooks/usePerson"
import { toastSuccessStyle } from "@/lib/ToastStyles"
import type { User } from "@/Models/User"
import { API_PATH } from "@/Request/API_PATH"
import { axiosInstance } from "@/Request/axiosInstance"
import { Info, Pencil, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

export default function Person() {
  const { persons, loading, error, getPersons } = usePersons()
  const [openDrawer, setOpenDrawer] = useState<boolean>(false) // edit icin 
  const counter = useSelector((state: RootState) => state.auth) //   burada user gelen beriler var

  const [openAlert, setOpenAlert] = useState(false)
  const [person, setPerson] = useState<User>({} as User)


  const navigate = useNavigate();

  useEffect(() => {
    getPersons();
  }, []);
  const handleViewInfo = (id: number) => {
    navigate(`${id}`);
  };
  const handleDelete = (id: number) => {
    console.log("delete id:", id);
    axiosInstance.delete(API_PATH.deletePerson(String(id)))
      .then(res => {
        console.log("silme basarılı:", res.data);
        toast.success("kişi başarıyla silindi.", { style: toastSuccessStyle })
        getPersons(); // veriler guncellensin 
      })
      .catch(err => {
        console.log("silme hatası:", err);
      })
  }
  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Kişiler</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sıra</TableHead>
                <TableHead className="w-[120px] text-center">İşlem</TableHead>
                <TableHead>kişi Adı</TableHead>
                <TableHead>yetkili mi?</TableHead>
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
                {persons?.map((p,index) => {
                  if (p.id != Number(counter.userInfo?.id))
                    return (

                      <TableRow key={p.id}>
                        <TableCell >{index}</TableCell>
                        <TableCell className="flex gap-2 justify-center">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setOpenDrawer(true)
                              setPerson(p)
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
                              setPerson(p)
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
                        <TableCell >{p.name}</TableCell>
                        <TableCell >{p.isAdmin ? "Evet":"Hayır"}</TableCell>
                        <TableCell>
                          <img
                            src={p.profileImg}
                            alt={p.name}
                            className="h-12 w-12 rounded-md object-cover border"
                          />
                        </TableCell>
                      </TableRow>
                    )
                })}
              </TableBody>
            )}
          </Table>
        </CardContent>
      </Card>
      <CustomDeleteAlertDialog
        onClick={() => handleDelete(person.id)}
        setOpenAlert={setOpenAlert}
        openAlert={openAlert}
        name={person.name}
      />

      <PersonEditDrawer getPersons={getPersons} openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} person={person} />
    </div>
  )
}


