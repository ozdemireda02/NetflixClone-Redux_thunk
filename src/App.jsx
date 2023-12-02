import { BrowserRouter, Route, Routes } from "react-router-dom"
import MainPage from "./pages/MainPage"
import DetailPage from "./pages/DetailPage"
import Header from "./components/Header"
import OtherPage from "./pages/OtherPage"

const App = () => {
  return (
  <BrowserRouter>
  <Header/>
  <Routes>
    <Route path="/" element={<MainPage/>}  />
    <Route path="/detay/:id"  element={<DetailPage/>}  />
    <Route path="/other/:id"  element={<OtherPage/>}  />
    <Route path="*" element={<h1>Sonuç BUlunamadı ...</h1>} />
  </Routes>
  </BrowserRouter>
  )
}

export default App
