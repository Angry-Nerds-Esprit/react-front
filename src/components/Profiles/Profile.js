import React, { useState, useEffect, useRef, useReducer } from "react";
import ProfileService from "../../services/ProfileService";
import folderDataService from "../../services/FolderService";
import { Link } from "react-router-dom";
import {ButtonToolbar, Dropdown} from 'react-bootstrap';
import {DropdownButton} from 'react-bootstrap';
import Popup from "react-animated-popup";
import { useParams } from "react-router-dom";
import profileimg from "assets/img/profile.png";
import "./profile.css";
import Searchable from 'react-searchable-dropdown';

import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import ProfilesList from "./Profileslist";

const Profile = (props) => {
  const [currentProfile, setCurrentProfile] = useState(null);
  const [profile, setProfile] = useState();
  const [folders, setfolders] = useState([]);

  useEffect(() => {
    retrievefolders();
    const data = ProfileService.get(props.match.params.id)
      .then((response) => {
        setProfile(response.data);
        
      })
      .catch((e) => {
        console.log(e);
      });
  });

  const retrievefolders = () => {
    folderDataService.getAll()
      .then(response => {
        setfolders(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };
 
  const addprofiletofolder = (idfolder) => {
    folderDataService.addtofolder(profile._id , idfolder);
    window.location.reload();
  }
  const delprofilefromfolder = (idfolder) => {
    folderDataService.removefromfolder(profile._id , idfolder);
    window.location.reload();
  }
  return (
    <div className="container emp-profile">
      {profile ? (
        <form method="post">
          <div className="row">
            <div className="col-md-4">
              <div className="profile-img">
                <img src={profileimg} alt="" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="profile-head">
                <h5>{profile.personal_info.name}</h5>
                <h6>{profile.personal_info.headline}</h6>
                <p className="proile-rating">
                  Location : <span>{profile.personal_info.location}</span>
                </p>
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      id="home-tab"
                      data-toggle="tab"
                      href="#home"
                      role="tab"
                      aria-controls="home"
                      aria-selected="true"
                    >
                      About
                    </a>
                  </li>
              
                </ul>
              </div>
            </div>

            <div className="col-md-2">
            <Dropdown>
  <Dropdown.Toggle variant="success" id="dropdown-basic">
   Folder 
  </Dropdown.Toggle>

  <Dropdown.Menu>
    {
      folders.map((folder,index )=><Dropdown.Item key={index}  >{folder.folderName }{profile.idFolder.includes(folder._id)?<Button className="dropbutton" variant="danger" size="sm" onClick={()=>delprofilefromfolder(folder._id)}>remove</Button>:<Button className="dropbutton" size="sm" onClick={()=>addprofiletofolder(folder._id)}>add</Button>}</Dropdown.Item>)
    }
    
  </Dropdown.Menu>
</Dropdown>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <div className="profile-work">
                <p>WORK LINK</p>
                {profile.personal_info.websites.map((value,index) => (
                  <a key={index} href={value}>{value}</a>
                ))}

                <p>SKILLS</p>
                {profile.skills.map((value,index) => (
                  <span key={index}> {value.name} , </span>
                ))}

                <p>INTERESTS</p>
                {profile.interests.map((value,index) => (
                  <span key={index}>
                    {" "}
                    {value} <br />{" "}
                  </span>
                ))}
                <p>LANGUAGES</p>
              
                  <span>
                    {" "}
                    {profile.accomplishments.languages+" "} <br />{" "}
                  </span>
               
              </div>
            </div>
            <div className="col-md-8">
              <div className="tab-content profile-tab" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <div className="row">
                    <div className="col-md-6">
                      <label>Name</label>
                    </div>
                    <div className="col-md-6">
                      <p>{profile.personal_info.name}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Current company link</label>
                    </div>
                    <div className="col-md-6">
                      <a href={profile.personal_info.current_company_link}>
                        {profile.personal_info.current_company_link}
                      </a>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Summary</label>
                    </div>
                    <div className="col-md-6">
                      <p>{profile.personal_info.summary}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Profession</label>
                    </div>
                    <div className="col-md-6">
                      <p>{profile.personal_info.headline}</p>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <label>Education</label>
                    </div>
                    <div className="col-md-6">
                      
                        {profile.experiences.education.map((value ,index) => (
                          <span key={index}>
                            {" "}
                            University : {value.name} , Years :{" "}
                            {value.date_range}{" "}
                          </span>
                        ))}
                     
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Experience </label>
                    </div>
                    <div className="col-lg">
                    <br/>
                      
                        {profile.experiences.jobs.map((value,index) => (
                          
                          <span key={index}>
                            <hr />
                            {" "}
                            <div><span className="txt">Job Title:</span> {value.title}{" "}</div>
                           
                            <div><span className="txt">Company :</span> {value.company} </div>
                            <div><span className="txt"> Years : </span> {value.date_range}{" "}</div>
                            <div><span className="txt">Description : </span>{value.description}{" "}</div>
                            <div><span className="txt">Company link :</span><a href ={value.li_company_url}>{value.li_company_url}{" "}</a></div>
                            <div><span className="txt">Location: </span> {value.location}{" "}</div>
                            <br/>
                          
                          </span>
                        ))}
                     
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Profile;