import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import type { MouseEventHandler } from "react";
interface Gelenler {
  name: string
  onClick: MouseEventHandler<HTMLButtonElement>
  setOpenAlert: Function
  openAlert: boolean
  // setVeri: Function

}
function CustomDeleteAlertDialog({ openAlert, setOpenAlert,name, onClick }: Gelenler) {

  return (
    <AlertDialog open={openAlert} onOpenChange={(state) => {
      setOpenAlert(state)
     // if (!state) setVeri({}) // sheet kapanınca id sıfırla
    }}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Gercekten emin misin silmek istediginden <p className="text-red-600">{name}</p> </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>İptal Et</AlertDialogCancel>
          <AlertDialogAction onClick={onClick}>Sil</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default CustomDeleteAlertDialog