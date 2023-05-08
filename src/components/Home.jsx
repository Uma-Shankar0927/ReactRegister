import React,{useEffect} from "react";
import { useNavigate } from "react-router-dom";

const Home = ({ formdata, setFormData }) => {
 const navigate = useNavigate();
  useEffect(() => {
    if (
      formdata.name === "" ||
      formdata.gender === "" ||
      formdata.avatar === "" ||
      formdata.course === "" ||
      formdata.email === "" ||
      formdata.language==="" ||
      formdata.resume ==="" ||
      formdata.terms === false ||
      formdata.password === "" ||
      formdata.BuySell === "" ||
      formdata.image === "" ||
      formdata.category === ""
    )
      navigate("/");
  }, [formdata]);
  return (
    <div className="mainHome">
      <div className="home-content">
        <div className="imageDivH">
          <img className="home-avatar" src={formdata.avatar} alt="" />
          <img className="home-avatar" src={formdata.image} alt="" />
        </div>
        <hr className="hR" />
        <p>
          name: <span>{formdata.name}</span>
        </p>
        <hr className="hR" />
        <p>
          password: <span>{formdata.password}</span>
        </p>
        <hr className="hR" />
        <p>
          Email: <span>{formdata.email}</span>
        </p>
        <hr className="hR" />
        <p>
          Gender: <span>{formdata.gender}</span>
        </p>
        <hr className="hR" />
        <p>
          Course: <span>{formdata.course}</span>
        </p>
        <hr className="hR" />
        <p>
          Language: <span>{formdata.language}</span>
        </p>
        <hr className="hR" />
        <p>
          Resume:{" "}
          <button className="Rbtn" onClick={() => window.open(formdata.resume)}>
            Download
          </button>
        </p>
        <hr className="hR" />
        <p>Terms and Conditions: <span className="terms-span">{formdata.terms === true ? "Agreed" : "Not Agreed"}</span></p>
        <hr className="hR" />
        <p>
          Buyer/Seller: <span>{formdata.BuySell}</span>
        </p>
        <hr className="hR" />
        <p>
          Category: <span>{formdata.category}</span>
        </p>
      </div>
    </div>
  );
};

export default Home;
