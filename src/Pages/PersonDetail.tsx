import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"
import { Error } from "@/components/Error"
import { axiosInstance } from "@/Request/axiosInstance"
import { API_PATH } from "@/Request/API_PATH"
import type { User } from "@/Models/User"



export default function PersonDetail() {
  const { id } = useParams()
  const [person, setPerson] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPerson = async () => {// burayı duznel
    try {
      setLoading(true)
      // API çağrısı burada yapılacak
      const res = await axiosInstance.get(API_PATH.getPersonById(String(id)))
      console.log(res.data)
      if (res.data.data) {
        setPerson(res.data.data)
      }
    } catch (err) {
      setError("Kişi bilgileri alınamadı")
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    if (id) {
      fetchPerson()
    }
  }, [id])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size={32} />
      </div>
    )
  }

  if (error) {
    return <Error message={error} />
  }
  if (!person) {
    return <div>Kişi bulunamadı</div>
  }

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">{person.name}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="flex flex-col justify-center md:justify-start w-full md:w-1/2">
            <p className="text-xl">Profil resminiz </p>
            <img
              src={person.profileImg}
              alt={person.name}
              className="rounded-lg w-full max-w-sm h-auto shadow-lg object-cover"
            />
          </div>

          <div className="grid grid-cols-1  gap-6 text-lg font-semibold w-full md:w-1/2">
            <div>
              <h3 className="text-muted-foreground text-sm">İd'niz</h3>
              <p className="text-primary text-xl">{person.id}</p>
            </div>
            <div>
              <h3 className="text-muted-foreground text-sm">İsminiz</h3>
              <p className="text-primary text-xl">{person.name}</p>
            </div>
            <div>
              <h3 className="text-muted-foreground text-sm">SoyAdınız</h3>
              <p className="text-primary text-xl">{person.surname} </p>
            </div>
            <div>
              <h3 className="text-muted-foreground text-sm">yetkili misiniz</h3>
              <p className={`text-xl ${person.isAdmin ? 'text-green-500' : 'text-red-500'}`}
              >{person.isAdmin ? "Yetkiniz vardır" : "Yetkiniz yoktur"}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}