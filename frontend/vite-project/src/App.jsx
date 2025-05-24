import Container from "./components/Container";
import Footer from "./components/Footer";
import FormContainer from "./components/FormContainer";
import Header from "./components/Header";

function App() {
  return (
    <>
        <Header/>
        <Container/>
        <div className="absolute bottom-0 w-full">
        <Footer/>
        </div> 
    </>
  );
}

export default App;
