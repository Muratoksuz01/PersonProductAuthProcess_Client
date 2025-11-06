import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// shadcn/ui components (assumes your project has these exports)
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function NoAuth() {
  const [sec, setSec] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    if (sec <= 0) {
      navigate("/login");
      return;
    }

    const t = setTimeout(() => setSec((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [sec, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-red-600 text-center">Yetkisiz erişim veya geçersiz sayfa</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col items-center gap-4 py-6">
          <p className="text-xl font-semibold text-red-600">{sec} saniye sonra /login sayfasına yönlendiriliyorsunuz.</p>

          <div className="flex gap-3">
            <Button variant="ghost" onClick={() => navigate(-1)}>
              Geri
            </Button>
            <Button onClick={() => navigate("/login")}>Hemen git</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
