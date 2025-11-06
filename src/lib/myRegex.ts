export const myRegex = {
  telefon: (val: string) => {
    let clean = val.replace(/\D/g, "");
    if (!clean.startsWith("5")) clean = "5" + clean;
    clean = clean.slice(0, 10);
    return clean;
  }, 
  sifre: (val: string) => {
    let clean = val
    clean = clean.slice(0, 5);
    return clean;
  },
  fiyat: (val: string) => {
    let clean = val.replace(/\D/g, ""); // sadece rakam
    clean = clean.replace(/^0+/, "");   // baştaki sıfırları sil
    clean = clean.slice(0, 6);          // en fazla 6 karakter
    return clean;
  },
};
