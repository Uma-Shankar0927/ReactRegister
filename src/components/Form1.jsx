import React, { useEffect, useState } from "react";
import imageBlank from "../assets/imgBlank.png";
import { useNavigate } from "react-router-dom";
import ProgressBar from "./ProgressBar";

const Form1 = ({ formdata, setFormData}) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState({
    nameError: "",
    avatarError: "",
    checkAllError: "",
  });

  const handleAvatar = (e) => {
    if (e.target.value) {
      const fileName = e.target.files[0].name;
      var indD = fileName.lastIndexOf(".") + 1;
      var fileType = fileName.substr(indD, fileName.length).toLowerCase();
      if (fileType === "jpg" || fileType === "jpeg" || fileType === "png") {
        let value = URL.createObjectURL(e.target.files[0]);
        setFormData({ ...formdata, avatar: value });
        setErrorMessage({ ...errorMessage, avatarError: "" });
      } else {
        setErrorMessage({
          ...errorMessage,
          avatarError: "Only image files supported!",
        });
        setFormData({ ...formdata, avatar: "" });
      }
    }
  };
  const handleName = (e) => {
    if (e.target.value) {
      const nameValid = /^[a-zA-Z ]+$/.test(e.target.value);
      if (nameValid && e.target.value.length >= 2) {
        setFormData({ ...formdata, [e.target.name]: e.target.value });
        setErrorMessage({ ...errorMessage, nameError: "" });
      } else if (e.target.value.length < 2) {
        setErrorMessage({ ...errorMessage, nameError: "name is too short!" });
      } else {
        setErrorMessage({ ...errorMessage, nameError: "Enter valid name!" });
      }
    }
  };
  const check = () => {
    if (
      formdata.name.length !== 0 &&
      formdata.gender.length !== 0 &&
      formdata.avatar.length !== 0 &&
      formdata.course.length !== 0 &&
      !errorMessage.nameError &&
      !errorMessage.avatarError &&
      !errorMessage.checkAllError
    ) {
      navigate("/form");
    } else {
      setErrorMessage({ ...errorMessage, checkAllError: "Fill All details!" });
    }
  };

  useEffect(() => {
    if (
      formdata.name.length !== 0 &&
      formdata.gender.length !== 0 &&
      formdata.avatar.length !== 0 &&
      formdata.course.length !== 0
    ) {
      setErrorMessage({ ...errorMessage, checkAllError: "" });
    }
  }, [formdata]);

  return (
    <div className="main-form1">
      <ProgressBar/>
      <h2>Complete the registration</h2>
      <div className="form1">
        <div className="nameInput">
          <label htmlFor="name">Enter your name</label>
          <input
            placeholder="Enter name"
            type="text"
            name="name"
            id="name"
            // value={''}
            onChange={handleName}
          />
          {errorMessage.nameError && (
            <span className="errorMessage">{errorMessage.nameError}</span>
          )}
        </div>
        <label htmlFor="Gradio">Choose gender</label>
        <div className="radios" id="Gradio">
          <div className="radio">
            <p>Male</p>
            <input
              type="radio"
              name="gender"
              value="Male"
              id="gender"
              onClick={(e) =>
                setFormData({ ...formdata, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="radio">
            <p>Female</p>
            <input
              type="radio"
              name="gender"
              value="Female"
              id="gender"
              onClick={(e) =>
                setFormData({ ...formdata, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="radio">
            <p>Others</p>
            <input
              type="radio"
              name="gender"
              value="Others"
              id="gender"
              onClick={(e) =>
                setFormData({ ...formdata, [e.target.name]: e.target.value })
              }
            />
          </div>
        </div>
        <div className="avatarDiv">
          <label htmlFor="avatar">Choose avatar</label>
          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            name="avatar"
            id="avatar"
            // value={formdata.avatar}
            onChange={handleAvatar}
          />
          {errorMessage.avatarError && (
            <span className="errorMessage">{errorMessage.avatarError}</span>
          )}
          <div className="imageDiv">
            {formdata.avatar.length === 0 ? (
              <img src={imageBlank} className="avatarDemo" alt="" />
            ) : (
              <img src={formdata.avatar} alt="" />
            )}
          </div>
        </div>
        <div className="selectDiv">
          <p>Select the course</p>
          <select
            defaultValue={"DEFAULT"}
            className="select-Form"
            name="course"
            onChange={(e) =>
              setFormData({ ...formdata, [e.target.name]: e.target.value })
            }
          >
            <option value="DEFAULT" disabled>
              Choose courses...
            </option>
            <option value="Data Science">Data Science</option>
            <option value="Web development">Web development</option>
            <option value="Quantum physics">Quantum physics</option>
            <option value="Engineering Mathematics">Engg. Mathematics</option>
            <option value="Machine learning">Machine learning</option>
          </select>
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

export default Form1;
