import React, { useState, useEffect } from "react";
import style from "./Notes.module.css";
import "./App.css";

import plusBtn from "../src/assets/plusBtn.png";
import rightImg from "../src/assets/rightImg.png";
import Creategrp from "./Creategrp";
import "remixicon/fonts/remixicon.css";
import encrypt from "../src/assets/encrypt.png";
import backBtn from "../src/assets/back_btn.png";

const Notes = () => {
  const [showCreateGrp, setShowCreateGrp] = useState(false);
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [notes, setNotes] = useState({});
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    const storedGroups = JSON.parse(localStorage.getItem("groups")) || [];
    const storedNotes = JSON.parse(localStorage.getItem("notes")) || {};
    setGroups(storedGroups);
    setNotes(storedNotes);
  }, []);

  useEffect(() => {
    localStorage.setItem("groups", JSON.stringify(groups));
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [groups, notes]);

  const handleCreateGroup = (newGroup) => {
    setGroups((prevGroups) => [...prevGroups, newGroup]);
    setShowCreateGrp(false);
    setNotes((prevNotes) => ({ ...prevNotes, [newGroup.name]: [] }));
  };

  const handleAddNote = () => {
    if (newNote.trim() && selectedGroup) {
      const timestamp = new Date().toLocaleString();
      setNotes((prevNotes) => ({
        ...prevNotes,
        [selectedGroup.name]: [
          ...prevNotes[selectedGroup.name],
          { text: newNote, timestamp },
        ],
      }));
      setNewNote("");
    }
  };

  return (
    <div className={style.mainCont}>
      <div className={style.left}>
        <span className={style.notesTitle}>
          Pocket Notes
          <br />
        </span>
        <br />

        <div className={style.groupCont}>
          {groups.map((group, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
                cursor: "pointer",
                backgroundColor:
                  selectedGroup?.name === group.name
                    ? "#dcdcdc"
                    : "transparent",
                padding: "10px",
                paddingLeft: "47px",
                borderRadius: "10px",
              }}
              onClick={() => setSelectedGroup(group)}
            >
              <div
                style={{
                  width: "47px",
                  height: "47px",
                  borderRadius: "50%",
                  backgroundColor: group.color,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "white",
                  fontWeight: "bold",
                  marginRight: "10px",
                }}
              >
                {group.name
                  .split(" ")
                  .slice(0, 2)
                  .map((word) => word.charAt(0).toUpperCase())
                  .join("")}
              </div>
              <span style={{ fontSize: "16px", fontWeight: "bold" }}>
                {group.name}
              </span>
            </div>
          ))}
        </div>

        <img
          onClick={() => setShowCreateGrp(true)}
          className={style.plusButton}
          src={plusBtn}
          alt="Add Group"
        />
      </div>

      <div className={`${style.right} ${selectedGroup ? style.showRight : ""}`}>
        {selectedGroup ? (
          <div className={style.rightNotesSection}>
            <div className={style.rightNotesHeader}>
              {window.innerWidth <= 768 && (
                <button
                  style={{ fontWeight: "bolder" }}
                  onClick={() => setSelectedGroup(null)}
                  className={style.backButton}
                >
                  <img
                    style={{ paddingRight: "10px", marginRight: "30px" }}
                    src={backBtn}
                    alt="Back"
                  />
                  &nbsp;&nbsp;
                </button>
              )}

              <h2
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  gap: "10px",
                  backgroundColor: selectedGroup.color,
                  padding: "20px",
                  color: "#fff",
                  borderRadius: "10px",
                }}
              >
                <div
                  className="circularDp"
                  style={{
                    width: "47px",
                    height: "47px",
                    borderRadius: "50%",
                    backgroundColor: selectedGroup.color,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                    fontWeight: "bold",
                    border: "1.5px solid #fff",
                  }}
                >
                  {selectedGroup.name
                    .split(" ")
                    .slice(0, 2)
                    .map((word) => word.charAt(0).toUpperCase())
                    .join("")}
                </div>

                {selectedGroup.name}
              </h2>
            </div>

            <div
              style={{
                minHeight: "60vh",
                maxHeight: "60vh",
                overflowY: "auto",
                padding: "10px",
                backgroundColor: "#DAE5F5",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                marginTop: "-120px",
              }}
            >
              {notes[selectedGroup.name]?.map((note, idx) => (
                <div
                  key={idx}
                  style={{
                    background: "#FFFFFF",
                    width: "73vw",
                    padding: "10px",
                    margin: "10px",
                    borderRadius: "8px",
                    marginBottom: "10px",
                  }}
                >
                  <p
                    style={{
                      padding: "1rem",
                      wordWrap: "break-word",
                      whiteSpace: "pre-wrap",
                      overflowWrap: "break-word",
                      display: "block",
                      overflowX: "hidden",
                      overflowY: "visible",
                      justifyContent: "flex-start",
                    }}
                  >
                    {note.text}
                  </p>
                  <small
                    style={{
                      color: "gray",
                      display: "flex",
                      justifyContent: "end",
                      paddingTop: "0.5rem",
                    }}
                  >
                    {note.timestamp}
                  </small>
                </div>
              ))}
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "10px",
              }}
            >
              <div
                className={style.inputBox}
                style={{
                  borderLeft: `29.9px solid ${selectedGroup.color}`,
                  borderRight: `29.9px solid ${selectedGroup.color}`,
                  borderTop: `12.5px solid ${selectedGroup.color}`,
                  borderBottom: `12.5px solid ${selectedGroup.color}`,
                }}
              >
                <textarea
                  placeholder="Type your note here..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  style={{
                    width: "100%",
                    height: "100%",
                    outline: "none",
                    border: "hidden",
                    resize: "none",
                    overflowY: "auto",
                    padding: "10px",
                    fontSize: "1rem",
                  }}
                />

                <button
                  onClick={handleAddNote}
                  style={{
                    marginLeft: "10px",
                    fontSize: "1.7rem",
                    background: "none",
                    color: "black",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  <i
                    className="ri-send-plane-fill"
                    style={{
                      position: "absolute",
                      bottom: "2vh",
                      right: "1.1vw",
                    }}
                  ></i>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ textAlign: "center" }}>
            <img
              className={style.rightImg}
              src={rightImg}
              alt="Right Section"
            />
            <h1 className={style.rightTitle}>Pocket Notes</h1>
            <span>Select a group to start taking notes.</span>

            <p
              style={{
                position: "absolute",
                bottom: "5vh",
                display: "flex",
                textAlign: "center",
                left: "55.9vw",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                style={{ width: "13px", height: "14px" }}
                src={encrypt}
                alt="Encrypt"
              />
              &nbsp;end-to-end encrypted
            </p>
          </div>
        )}
      </div>

      {showCreateGrp && <Creategrp onCreate={handleCreateGroup} />}
    </div>
  );
};

export default Notes;