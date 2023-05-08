import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import docImg from '../assets/docImg.png'
import docxImg from '../assets/docxImg.png'
import pdfImg from '../assets/pdfImg.png'
import ProgressBar from "./ProgressBar";

const Form2 = ({ formdata, setFormData}) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState({
    emailError: "",
    resumeError: "",
    checkAllError:"",
  });
  const [fiLeType, setFiLeType] = useState("");
  const [fiLeName,setFiLeName] = useState("");

  const handleResume = (e) => {
    if (e.target.value) {
      const fileName = e.target.files[0].name;
      setFiLeName(fileName);
      var indD = fileName.lastIndexOf(".") + 1;
      var fileType = fileName.substr(indD, fileName.length).toLowerCase();
      if (fileType === "pdf" || fileType === "doc" || fileType === "docx") {
        let value = URL.createObjectURL(e.target.files[0]);
        setFormData({ ...formdata, [e.target.name]: value });
        setErrorMessage({ ...formdata, resumeError: "" });
        setFiLeType(fileType);
      } else {
        setErrorMessage({
          ...errorMessage,
          resumeError: "Only suggested files supported!",
        });
        setFormData({ ...formdata, resume: "" });
      }
    }
  };
  const handleEmail = (e) => {
    if (e.target.value) {
      const emailValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
        e.target.value
      );
      if (emailValid) {
        setFormData({ ...formdata, [e.target.name]: e.target.value });
        setErrorMessage({ ...errorMessage, emailError: "" });
      } else {
        setErrorMessage({ ...errorMessage, emailError: "Enter valid Email!" });
      }
    }
  };

  useEffect(() => {
    if (
      formdata.email.length !== 0 &&
      formdata.language.length !== 0 &&
      formdata.resume.length !== 0 && 
      formdata.terms === true
    ) {
      setErrorMessage({ ...errorMessage, checkAllError: "" });
    }
  }, [formdata]);

  const handleTerms = () => {
    if(formdata.terms === false){
      setFormData({...formdata,terms:true});
    }else{
      setFormData({...formdata,terms:false});
    }
  }
  const check = () => {
    if (
      formdata.email !== "" &&
      formdata.language !== "" &&
      formdata.resume !== "" &&
      formdata.terms === true &&
      !errorMessage.emailError &&
      !errorMessage.resumeError
    ) {
      navigate("/form2");
    } else {
      setErrorMessage({ ...errorMessage, checkAllError: "Fill All details!" });
    }
  };

  useEffect(()=>{
    if(formdata.name==="" || formdata.gender==="" || formdata.avatar==="" || formdata.course==="") navigate("/");
  },[formdata])


  return (
    <div className="main-form1">
      <ProgressBar/>
      <h2>Complete the registration</h2>
      <div className="form1">
        <div className="nameInput">
          <label htmlFor="name">Enter your Email</label>
          <input
            placeholder="Enter email"
            type="text"
            name="email"
            id="email"
            // value={''}
            onChange={handleEmail}
          />
          {errorMessage.emailError && (
            <span className="errorMessage">{errorMessage.emailError}</span>
          )}
        </div>
        <label htmlFor="Gradio">Choose Language</label>
        <div className="radios" id="Gradio">
          <div className="radio">
            <p>Hindi</p>
            <input
              type="radio"
              name="language"
              value="Hindi"
              id="language"
              onClick={(e) =>
                setFormData({ ...formdata, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="radio">
            <p>English</p>
            <input
              type="radio"
              name="language"
              value="English"
              id="language"
              onClick={(e) =>
                setFormData({ ...formdata, [e.target.name]: e.target.value })
              }
            />
          </div>
        </div>
        <div className="avatarDiv">
          <label htmlFor="resume">Upload Your Resume: (pdf,docx,doc)</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            name="resume"
            id="resume"
            // value={formdata.avatar}
            onChange={handleResume}
          />
          {errorMessage.resumeError && (
            <span className="errorMessage">{errorMessage.resumeError}</span>
          )}
          {formdata.resume.length!==0 && fiLeType==="pdf" && (
            <div className="pdfDiv">
              <img src={pdfImg} alt="" />
              <p>{fiLeName.length > 20 ? fiLeName.slice(0,20)+"..." : fiLeName}</p>
            </div>
          )}
          {formdata.resume.length!==0 && fiLeType==="docx" && (
            <div className="pdfDiv">
              <img src={docxImg} alt="" />
              <p>{fiLeName.length > 20 ? fiLeName.slice(0,20)+"..." : fiLeName}</p>
            </div>
          )}
          {formdata.resume.length!==0 && fiLeType==="doc" && (
            <div className="pdfDiv">
              <img src={docImg} alt="" />
              <p>{fiLeName.length > 20 ? fiLeName.slice(0,20)+"..." : fiLeName}</p>
            </div>
          )}
        </div>
        <div className="termsAndC">
          <input type="checkbox" name="" id="" onClick={handleTerms} />
          <p>Agree to <span className="termsC">Terms and Conditions</span></p>
        </div>
        {errorMessage.checkAllError && (
          <span className="errorMessage">{errorMessage.checkAllError}</span>
        )}
        <button className="btn" onClick={check}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Form2;
