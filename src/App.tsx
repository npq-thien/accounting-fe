import "./App.css";
import { Home } from "./pages/Home.tsx";
import { Login } from "./pages/auth/components/Login.tsx";
import { useAuth } from "./shared/hooks/useAuth.ts";

function App() {
    const { user } = useAuth();

    // TODO: remove this after testing
    if (!user) {
        return <Login />;
        // return <Home />;

    }

    return <Home />;
}

export default App;
