import React, { useEffect, useState } from "react";
import imageBlank from "../assets/imgBlank.png";
import { useNavigate } from "react-router-dom";
import ProgressBar from "./ProgressBar";

const Form3 = ({ formdata, setFormData}) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState({
    passError: "",
    imageError: "",
    checkAllError: "",
  });

  useEffect(() => {
    if (
      formdata.name === "" ||
      formdata.gender === "" ||
      formdata.avatar === "" ||
      formdata.course === "" ||
      formdata.email === "" ||
      formdata.language==="" ||
      formdata.resume ==="" ||
      formdata.terms === false
    )
      navigate("/");
  }, [formdata]);

  const handleImage = (e) => {
    if (e.target.value) {
      const fileName = e.target.files[0].name;
      var indD = fileName.lastIndexOf(".") + 1;
      var fileType = fileName.substr(indD, fileName.length).toLowerCase();
      if (fileType === "jpg" || fileType === "jpeg" || fileType === "png") {
        let value = URL.createObjectURL(e.target.files[0]);
        setFormData({ ...formdata, image: value });
        setErrorMessage({ ...formdata, imageError: "" });
      } else {
        setErrorMessage({
          ...errorMessage,
          imageError: "Only image files supported!",
        });
        setFormData({ ...formdata, image: "" });
      }
    }
  };
  const handlePass = (e) => {
    if (e.target.value) {
      const passValid = /^(?=.*?\d)(?=.*?[a-zA-Z])[a-zA-Z\d]+$/.test(
        e.target.value
      );
      if (
        passValid &&
        e.target.value.length >= 6 &&
        e.target.value.length <= 15
      ) {
        setFormData({ ...formdata, [e.target.name]: e.target.value });
        setErrorMessage({ ...errorMessage, passError: "" });
      } else if (e.target.value.length < 6) {
        setErrorMessage({
          ...errorMessage,
          passError: "Password is too short!",
        });
      } else if (e.target.value.length > 15) {
        setErrorMessage({
          ...errorMessage,
          passError: "Password should be atmost of 15 characters!",
        });
      } else {
        setErrorMessage({
          ...errorMessage,
          passError:
            "Password should be alphanumeric and atleast 6 characters long!",
        });
      }
    }
  };
  const check = () => {
    if (
      formdata.password.length !== 0 &&
      formdata.BuySell.length !== 0 &&
      formdata.image.length !== 0 &&
      formdata.category.length !== 0 &&
      !errorMessage.passError &&
      !errorMessage.imageError &&
      !errorMessage.checkAllError
    ) {
      console.log(formdata);
      navigate("/home");
    } else {
      setErrorMessage({ ...errorMessage, checkAllError: "Fill All details!" });
    }
  };

  useEffect(() => {
    if (
      formdata.password?.length !== 0 &&
      formdata.BuySell?.length !== 0 &&
      formdata.image?.length !== 0 &&
      formdata.category?.length !== 0
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
          <label htmlFor="name">Enter Password</label>
          <input
            placeholder="Enter Password"
            type="text"
            name="password"
            id="name"
            // value={''}
            onChange={handlePass}
          />
          {errorMessage.passError && (
            <span className="errorMessage">{errorMessage.passError}</span>
          )}
        </div>
        <label htmlFor="Gradio">Choose Buy Or Sell</label>
        <div className="radios" id="Gradio">
          <div className="radio">
            <p>Buyer</p>
            <input
              type="radio"
              name="BuySell"
              value="Buy"
              id=""
              onClick={(e) =>
                setFormData({ ...formdata, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="radio">
            <p>Seller</p>
            <input
              type="radio"
              name="BuySell"
              value="Sell"
              id=""
              onClick={(e) =>
                setFormData({ ...formdata, [e.target.name]: e.target.value })
              }
            />
          </div>
        </div>
        <div className="avatarDiv">
          <label htmlFor="image">Choose Image</label>
          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            name="image"
            id="image"
            // value={formdata.avatar}
            onChange={handleImage}
          />
          {errorMessage.imageError && (
            <span className="errorMessage">{errorMessage.imageError}</span>
          )}
          <div className="imageDiv">
            {formdata.image === '' ? (
              <img src={imageBlank} className="avatarDemo" alt="" />
            ) : (
              <img src={formdata.image} alt="" />
            )}
          </div>
        </div>
        <div className="selectDiv">
          <p>Select the category</p>
          <select
            defaultValue={"DEFAULT"}
            className="select-Form"
            name="category"
            onChange={(e) =>
              setFormData({ ...formdata, [e.target.name]: e.target.value })
            }
          >
            <option value="DEFAULT" disabled>
              Choose courses...
            </option>
            <option value="Bussiness">Bussiness</option>
            <option value="Engineering">Engineering</option>
            <option value="Banking">Banking</option>
            <option value="Politics">Politics</option>
            <option value="Psychology">Psychology</option>
          </select>
        </div>
        {errorMessage.checkAllError && (
          <span className="errorMessage">{errorMessage.checkAllError}</span>
        )}
        <button className="btn" onClick={check}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Form3;
