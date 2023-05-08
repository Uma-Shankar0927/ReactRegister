import React,{useState} from "react";
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Form1, Form2 ,Form3, Home, Navbar, ProgressBar} from './components/index'

const App = () => {
  const [formdata, setFormData] = useState({
    name: "",
    gender: "",
    avatar: "",
    course: "",
    email:"",
    language:"",
    resume: "",
    terms: false,
    password: "",
    BuySell: "",
    image: "",
    category: ""
  });
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar formdata={formdata} setFormData={setFormData}/>
        <Routes>
          <Route path="/" element={<Form1 formdata={formdata} setFormData={setFormData}/>}/>
          <Route path="/form" element={<Form2 formdata={formdata} setFormData={setFormData} />}/>
          <Route path="/form2" element={<Form3 formdata={formdata} setFormData={setFormData} />}/>
          <Route path="/home" element={<Home formdata={formdata} setFormData={setFormData}/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
