import "./App.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import AuthProvider from "./provider/AuthProvider";
import RouteMap from "./routes/Routes";

function App() {
  return (
    <AuthProvider>
      <RouteMap />
    </AuthProvider>
  );
}

export default App;
