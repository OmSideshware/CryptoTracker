import React from "react";
import { BrowserRouter ,Routes,Route} from "react-router-dom";
import Header from "./Components/Header";
import CoinPage from "./Pages/CoinPage";
import HomePage from "./Pages/HomePage";
import "./App.css"



const App=()=>{
  return (

    <BrowserRouter>
    <div>
      <Header></Header>
      <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/coins/:id" element={<CoinPage></CoinPage>} />
        </Routes>

    </div>

    </BrowserRouter>
      
  
  )
}


export default App;

// function App() {
//   return (
//    <>
//     <About></About>
//     <Contact></Contact>
//    </>
//   );
// }


