import { BrowserRouter } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import AppRoutes from "./routes/AppRoutes";
import SplashCursor from "./components/effects/SplashCursor";

function App() {
  return (
    <BrowserRouter>
      <DefaultLayout>
        <SplashCursor
          SPLAT_RADIUS={0.07}
          SPLAT_FORCE={1800}
          DENSITY_DISSIPATION={4}
          COLOR_UPDATE_SPEED={5}
        />
        <AppRoutes />
      </DefaultLayout>
    </BrowserRouter>
  );
}

export default App;
