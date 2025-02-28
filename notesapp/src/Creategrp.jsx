import React, { useState } from "react";
import "./Creategrp.css";

const Creategrp = ({ onCreate }) => {
  const [groupName, setGroupName] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const handleCreate = () => {
    if (groupName.trim() && selectedColor) {
      onCreate({ name: groupName, color: selectedColor });
      setGroupName("");
      setSelectedColor("");
    }
  };

  return (
    <div className="createGrpBox">
      <div className="createGrpBoxInner">
        <h3>Create New Group</h3>

        <div className="groupInputContainer">
          <label className="grpNameLabel">Group Name</label>
          <input
            className="grpNameInput"
            type="text"
            placeholder="Enter group name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </div>

        <div className="colorPickerContainer">
          <span className='chooseSpan'>Choose Color &nbsp;</span>
          <div className="colorRow">
            {[
              "#a98aff",
              "#ff80ff",
              "#5ce6e6",
              "#f9a27a",
              "#005bff",
              "#8293ff",
            ].map((color, index) => (
              <label key={index} className="colorLabel">
                <input
                  type="radio"
                  name="color"
                  className="colorInput"
                  onChange={() => setSelectedColor(color)}
                />
                <span
                  className={`colorCircle ${
                    selectedColor === color ? "selected" : ""
                  }`}
                  style={{ backgroundColor: color }}
                ></span>
              </label>
            ))}
          </div>
        </div>

        <div className="createBtnContainer">
          <button className="createBtn" onClick={handleCreate}>
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default Creategrp;
