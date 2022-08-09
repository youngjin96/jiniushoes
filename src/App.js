import Router from "./Environment/Router";
import NavBar from "./Component/NavBar";
import Footer from "./Component/Footer";

function App() {
  return (
    <>
      <NavBar style={{position: "fixed", zindex: 5}} />
      <Router />
      <Footer />
    </>
  );
}

export default App;
