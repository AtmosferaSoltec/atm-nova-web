import { useEffect, useState, type ReactElement } from "react";
import { Login } from "./features/auth";
import { Workspace } from "./features/dentistry";
import { PlatformPage } from "./pages/platform-page";
import { defaultBrand } from "./config/brand";
import type { Brand, DemoUser } from "./types/app.types";
function App(): ReactElement {
  const [user, setUser] = useState<DemoUser | null>(null);
  const [brand, setBrand] = useState<Brand>(defaultBrand);
  useEffect(() => {
    document.title = `${brand.name} · ${brand.tagline}`;
  }, [brand.name, brand.tagline]);
  return (
    <div className={`theme-${brand.theme}`}>
      {!user ? (
        <Login brand={brand} onLogin={setUser} />
      ) : user.role === "superadmin" ? (
        <PlatformPage user={user} onLogout={() => setUser(null)} />
      ) : (
        <Workspace
          user={user}
          brand={brand}
          onBrandChange={setBrand}
          onLogout={() => setUser(null)}
        />
      )}
    </div>
  );
}
export default App;
