
import React, { useState, useRef } from "react";

import Select from 'react-select'

import { Dropdown, Badge, Button, Form, FormControl } from "react-bootstrap";
import { useSelector  } from "react-redux";
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from "react-country-region-selector";

import sideBarImage1 from "assets/img/sidebar-1.jpg";
import sideBarImage2 from "assets/img/sidebar-2.jpg";
import sideBarImage3 from "assets/img/sidebar-3.jpg";
import sideBarImage4 from "assets/img/sidebar-4.jpg";
import FolderService from "../../services/FolderService";
import Folder from "components/folder/Folder";
import scrappingService from "../../services/Scrapping";
const options = [
  { value: 'java', label: 'java' },
  { value: 'python', label: 'python' },
  { value: 'react', label: 'react' }, 
   { value: 'node', label: 'node' }

]
function FixedPlugin({
  hasload,
  setHasLoad,
  hasImage,
  setHasImage,
  color,
  setColor,
  image,
  setImage,
}) {
  const initialformstate = {
    description: "",
    folderName: "",
    nbp: "",
    country: "",
    region: "",
    skills:{},
    userNameAccount:"",
    passowrdAccount:""
  };
  const buttonRef = useRef();

  const user = useSelector((state) => state.authentication.user);

  const [form, setform] = useState(initialformstate);
  const [showfolderForm, setshowfolderForm] = useState(true);
  const [showAccountForm, setshowAccountForm] = useState(false);



  const selectCountry = (val) => {
    setform({ ...form, country: val });
  };

  const selectRegion = (val) => {
    setform({ ...form, region: val });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setform({ ...form, [name]: value });
  };
  const onchangeSkills =async(value)=>{
    setform({ ...form,  skills: value });

    
  }
  const startscrapping = async () => {
    var skillsvalue = form.skills.map(function(item) {
      return item['value'];
    });
    var data = {
      folderName: form.folderName,
      description: form.description,
      country:form.country,
      region: form.region,
      nubmerofgooglePage: form.nbp / 10,
      userid: user.id,
      skills:skillsvalue,
      userNameAccount: form.userNameAccount,
      passowrdAccount:form.passowrdAccount
      
    }; 
    debugger;
    setHasLoad();
   // buttonRef.current.disabled = true;
    
    const res = await FolderService.create(data);
    
    if(!showAccountForm)
    {

      const myresult =await scrappingService.startScrapping(
        
        data.nubmerofgooglePage,
        res.data._id,
        data.userid,
        data.skills,
        data.region
        );
        
      }else{
        const myresult =await scrappingService.startScrappingChangeAccount(
        
          data.nubmerofgooglePage,
          res.data._id,
          data.userid,
          data.skills,
          data.region,
          data.userNameAccount,
          data.passowrdAccount
          );

      }
      buttonRef.current.disabled = false;
        setHasLoad();
  };
  const toggleform =()=>{
    setshowfolderForm(prev=>!prev)
  };
  const toggleformaccount =()=>{
    setshowAccountForm(prev=>!prev)
  };

  return (
    <div className="fixed-plugin">
      <Dropdown>
        <Dropdown.Toggle
          id="dropdown-fixed-plugin"
          variant=""
          className="text-white border-0 opacity-100"
        >
          <i className="fas fa-cogs fa-2x mt-1"></i>
        </Dropdown.Toggle>
        <Dropdown.Menu>
        <li className="adjustments-line d-flex align-items-center justify-content-between">
            <p>use default linkedin account</p>
            <Form.Check
              type="switch"
              
              id="custom-switch-1-acouunt"
              onChange={toggleformaccount}
            />
            

            
          </li>
          {showAccountForm&& <>



<li className="header-title pro-title text-center">linkedin usernname</li>
<input
  className="form-control"
  value={form.userNameAccount}
  onChange={handleInputChange}
  name="userNameAccount"
></input>


<li className="header-title pro-title text-center">linkedin  passowrd </li>
<input
  className="form-control"
  value={form.passowrdAccount}
  onChange={handleInputChange}
  name="passowrdAccount"
></input>
</>}

          <li className="adjustments-line d-flex align-items-center justify-content-between">
            <p>insert into folder</p>
            <Form.Check
              type="switch"
              id="custom-switch-1"
              defaultChecked={showfolderForm}
              onChange={toggleform}
            />
            
           {/* <Form.Check
              type="switch"
              id="custom-switch-1-image"
              checked={/*hasload**//*}
              onChange={/*setHasLoad*//*}
            />
           */ }
          </li>
         {showfolderForm&& <>



          <li className="header-title pro-title text-center">folder name</li>
          <input
            className="form-control"
            value={form.folderName}
            onChange={handleInputChange}
            name="folderName"
          ></input>

          
          <li className="header-title pro-title text-center">description</li>
          <input
            className="form-control"
            value={form.description}
            onChange={handleInputChange}
            name="description"
          ></input>
         </>}
          <li className="header-title pro-title text-center">country</li>

          <CountryDropdown
            className="form-control"
            value={form.country}
            onChange={selectCountry}
          />
        <li className="header-title pro-title text-center">region</li>

          <RegionDropdown
            className="form-control"
            disableWhenEmpty={true}
            country={form.country}
            value={form.region}
            onChange={selectRegion}
          />

<li className="header-title pro-title text-center">skills</li>

          <Select options={options} isMulti className="basic-multi-select" classNamePrefix="select" name="skills" onChange={onchangeSkills} />

          <li className="header-title pro-title text-center">
            nembre of profiles
          </li>

          <input
            className="form-control"
            type="number"
            step="10"
            min="10"
            max="100"
            value={form.nbp}
            onChange={handleInputChange}
            name="nbp"
          ></input>

          <li className="button-container">
            <div>
              <Button
                block
                className="btn-fill"
                href=""
                rel="noopener noreferrer"
                target="_blank"
                variant="primary"
                ref={buttonRef}
                onClick={startscrapping}
              >
                Start
              </Button>
            </div>
          </li>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default FixedPlugin;
