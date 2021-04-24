import React, { useState, useEffect } from "react";
import ProfileService from "../../services/ProfileService";
import { Link } from "react-router-dom";
import "./Card.css";
import Popup from "react-animated-popup";

const ProfilesList = () => {
  const [profiles, setProfiles] = useState([]);
  const [currentProfile, setCurrentProfile] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");
  const [visible, setVisible] = useState(false);
  const buttonStyle = {
    backgroundColor: "cadetblue",
    color: "#fff",
    padding: 10,
    cursor: "pointer",
  };

  const containerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
  };

  const pStyle = {
    textAlign: "center",
  };
  useEffect(() => {
    retrieveProfiles();
  }, []);

  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrieveProfiles = () => {
    ProfileService.getAll()
      .then((response) => {
        setProfiles(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveProfiles();
    setCurrentProfile(null);
    setCurrentIndex(-1);
  };

  const setActiveProfile = (profile, index) => {
    setCurrentProfile(profile);
    setCurrentIndex(index);
    setVisible(!visible);
  };

  const removeAllProfiles = () => {
    ProfileService.removeAll()
      .then((response) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  /*const findByTitle = () => {
    ProfileService.findByTitle(searchTitle)
      .then(response => {
        setProfiles(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };*/

  return (
    <section id="team" class="pb-5">

      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append"></div>
        </div>
      </div>

      <div className="row">
        <h4>Profiles List</h4>
        <div className="container">
          <div className="row">
            {profiles &&
              profiles.map((profile, index) => (
                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                  <div class="box-part text-center">
                    <div className="font-icon-detail">
                      <i class="nc-icon nc-single-02" aria-hidden="true"></i>
                    </div>
                    <div className="title">
                      <h4>{profile.personal_info.name}</h4>
                    </div>

                    <div class="text">
                      <span>
                        Lorem ipsum dolor sit amet, id quo eruditi eloquentiam.
                        Assum decore te sed. Elitr scripta ocurreret qui ad.
                      </span>
                    </div>

                    <a 
                      id="a"
                      href="#"
                      className={
                        "title " + (index === currentIndex ? "active" : "")
                      }
                      onClick={() => setActiveProfile(profile, index)}
                    >
                      Learn More
                    </a>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllProfiles}
        >
          Remove All
        </button>
      </div>
      <Popup visible={visible} onClose={() => setVisible(false)}>
      <div className="container">

        <div id="scroll" className="row">
         
          {currentProfile ? (
            <div id="pop" className="row">
            
              <h4>
                <strong>Profile Information</strong>
              </h4>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentProfile.personal_info.name}
              </div>
              <div>
                <label>
                  <strong>Company:</strong>
                </label>{" "}
                {currentProfile.personal_info.company}
              </div>
              <div>
                <label>
                  <strong>Location:</strong>
                </label>{" "}
                {currentProfile.personal_info.location}
              </div>
              <div>
                <label>
                  <strong>Skills :</strong>
                </label>{" "}
                {currentProfile.skills.map((value) => (
                  <span> {value.name} , </span>
                ))}
              </div>
              <div>
                <label>
                  <strong>Experience :</strong>
                </label>{" "}
                <div>
                  <b>Education :</b>
                  <br />

                  {currentProfile.experiences.education.map((value) => (
                    <span>
                      {" "}
                      University : {value.name} , date range :{" "}
                      {value.date_range}{" "}
                    </span>
                  ))}
                </div>
                <div>
                  <b>Jobs :</b>

                  {currentProfile.experiences.jobs.map((value) => (
                    <div>
                      {" "}
                      <strong>Job :</strong> {value.title} ,{" "}
                      <strong>Company :</strong> : {value.company}{" "}
                    </div>
                  ))}
                </div>
              </div>

              <Link
                to={"/profiles/" + currentProfile.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
             
            </div>
          )}
         
        </div>
        
      </div>
      </Popup>
    </section>
  );
};

export default ProfilesList;
