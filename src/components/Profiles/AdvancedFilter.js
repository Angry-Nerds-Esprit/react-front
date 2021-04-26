import React from "react";
import "./AdvancedFilter.css";

const AdvancedFilter = ({ searchValue, handleChangeValue }) => (
   < div className="d-flex justify-content-left h-100">
   <div className="searchbar">

    <input
      data-testid="filter-input-name"
      type="text"
      name="name"
      value={searchValue.name}
      onChange={(e) => handleChangeValue(e)}
      placeholder="name"
      className="search_input"
      autoFocus
    />
    <a href="#" className="search_icon"><i className="fas fa-search"></i></a>
    <input
      data-testid="filter-input-capital"
      type="text"
      name="location"
      value={searchValue.location}
      onChange={(e) => handleChangeValue(e)}
      placeholder="location"
      className="search_input"
    />
    <input
      data-testid="filter-input-population"
      type="text"
      name="skills"
      className="search_input"
      placeholder="skills"
      value={searchValue.skills}
      onChange={(e) => handleChangeValue(e)}
    />

  </div>
  </ div>
);

export default AdvancedFilter;