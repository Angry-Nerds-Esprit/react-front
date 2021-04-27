import React, { useState, useEffect, useRef, useReducer } from "react";
import ProfileService from "../../services/ProfileService";
import { Link } from "react-router-dom";

import Popup from "react-animated-popup";
import { useParams } from "react-router-dom";
import profileimg from "assets/img/profile.png";
import "./profile.css";

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


    
  
    useEffect(() => {
        const data = ProfileService.get(props.match.params.id)
        .then((response) => {
            setProfile(response.data);
            console.log(response.data);
          })
          .catch((e) => {
            console.log(e);
          });
        
        
    }
            
    );
  
    return (
        <div className="container emp-profile">
            {profile ? (
        <form method="post">
            <div className="row">
                <div className="col-md-4">
                    <div className="profile-img">
                        <img src={profileimg} alt=""/>
                     
                    </div>
                </div>
                <div className="col-md-6">
               
                    <div className="profile-head">
                                <h5>
                                {profile.personal_info.name}
                                </h5>
                                <h6>
                                {profile.personal_info.headline}
                                </h6>
                                <p className="proile-rating">Location : <span>{profile.personal_info.location}</span></p>
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="profile-tab" data-toggle="tab" href="#timeline" role="tab" aria-controls="profile" aria-selected="false">Timeline</a>
                            </li>
                        </ul>
                    </div>
                
         
           
                </div> 
               
                <div className="col-md-2">
                    <input type="submit" className="profile-edit-btn" name="btnAddMore" value="Edit Profile"/>
                </div>
            </div>
                
            <div className="row">
                <div className="col-md-4">
                    <div className="profile-work">
                        <p>WORK LINK</p>
                        {profile.personal_info.websites.map((value) => 
                        <a href={value}>{value}</a>
                        )}
                     
                        <p>SKILLS</p>
                        <a href="">Web Designer</a><br/>
                        <a href="">Web Developer</a><br/>
                        <a href="">WordPress</a><br/>
                        <a href="">WooCommerce</a><br/>
                        <a href="">PHP, .Net</a><br/>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="tab-content profile-tab" id="myTabContent">
                        <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>User Id</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>Kshiti123</p>
                                        </div>
                                    </div>
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
                                            <label>Email</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>kshitighelani@gmail.com</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Phone</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>123 456 7890</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Profession</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>Web Developer and Designer</p>
                                        </div>
                                    </div>
                        </div>
                        <div className="tab-pane fade" id="timeline" role="tabpanel" aria-labelledby="profile-tab">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Experience</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>Expert</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Hourly Rate</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>10$/hr</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Total Projects</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>230</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>English Level</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>Expert</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Availability</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>6 months</p>
                                        </div>
                                    </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <label>Your Bio</label><br/>
                                    <p>Your detail description</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>           
            ) :
            
            <div></div>
            }

            </div>
    );
  };

  export default Profile;