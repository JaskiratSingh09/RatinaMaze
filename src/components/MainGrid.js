import React, { useState, useEffect } from "react";
import "./grid.css";
import myImage from "./rat.jpg";
import myImage2 from "./cheeze.jpg";

export default function MainGrid() {
  const gridSize = 4;
  let size = 0;
  const [colors2, setColors2] = useState(
    Array(gridSize * gridSize).fill("blue")
  );
  const [colors, setColors] = useState(Array(gridSize * gridSize).fill("blue"));
  const [answer, setMyArray] = useState(Array(size).fill([]));

  //This is an array which is used to mark obstacle
  const [obs, setObs] = useState([
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
  ]);

  //This is a visited Array
  const [vis, setVis] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);

  //In this function I'am marking Obstacle and change the colour of grid 0 for obstacle
  const handleGridClick = (rowIndex, colIndex) => {
    const updatedObs = [...obs];
    updatedObs[rowIndex][colIndex] =
      updatedObs[rowIndex][colIndex] === 0 ? 1 : 0;

    setColors((prevColors) => {
      const updatedColors = [...prevColors];
      const index = rowIndex * gridSize + colIndex;
      updatedColors[index] = updatedColors[index] === "red" ? "blue" : "red";
      return updatedColors;
    });
  };

  //this is main backtracking function
  function solve(i, j, n, vis, obs, answer) {
    if (i === n - 1 && j === n - 1) {
      const updatedVis = vis.map((row) => [...row]);
      updatedVis[i][j] = 1;
      answer.push(updatedVis);
      return;
    }

    vis[i][j] = 1; // Mark the current position as visited

    // Downwards
    if (i + 1 < n && !vis[i + 1][j] && obs[i + 1][j] === 1) {
      solve(i + 1, j, n, vis, obs, answer);
    }
    // Left
    if (j - 1 >= 0 && !vis[i][j - 1] && obs[i][j - 1] === 1) {
      solve(i, j - 1, n, vis, obs, answer);
    }
    // Right
    if (j + 1 < n && !vis[i][j + 1] && obs[i][j + 1] === 1) {
      solve(i, j + 1, n, vis, obs, answer);
    }
    // Upwards
    if (i - 1 >= 0 && !vis[i - 1][j] && obs[i - 1][j] === 1) {
      solve(i - 1, j, n, vis, obs, answer);
    }

    vis[i][j] = 0;
  }

  //this is a calculate button
  const handleCalculate = () => {
    const newAnswer = [];
    solve(0, 0, gridSize, vis, obs, newAnswer);
    setMyArray(newAnswer);
    size = newAnswer.length;
    console.log(newAnswer);
  };

  // This cell Array is used to store and display the paths
  let cell = [];
  for (let i = 0; answer.length > i; i++) {
    cell.push(
      <div className="container2 mt-5">
        <div className="griditem">
          <img
            style={{ height: "100%", width: "100%" }}
            src={myImage}
            alt="My Image"
          />
        </div>
        <div
          className="griditem"
          style={{ backgroundColor: answer[i][0][1] === 1 ? "red" : "blue" }}
        ></div>
        <div
          className="griditem"
          style={{ backgroundColor: answer[i][0][2] === 1 ? "red" : "blue" }}
        ></div>
        <div
          className="griditem"
          style={{ backgroundColor: answer[i][0][3] === 1 ? "red" : "blue" }}
        ></div>
        <div
          className="griditem"
          style={{ backgroundColor: answer[i][1][0] === 1 ? "red" : "blue" }}
        ></div>
        <div
          className="griditem"
          style={{ backgroundColor: answer[i][1][1] === 1 ? "red" : "blue" }}
        ></div>
        <div
          className="griditem"
          style={{ backgroundColor: answer[i][1][2] === 1 ? "red" : "blue" }}
        ></div>
        <div
          className="griditem"
          style={{ backgroundColor: answer[i][1][3] === 1 ? "red" : "blue" }}
        ></div>
        <div
          className="griditem"
          style={{ backgroundColor: answer[i][2][0] === 1 ? "red" : "blue" }}
        ></div>
        <div
          className="griditem"
          style={{ backgroundColor: answer[i][2][1] === 1 ? "red" : "blue" }}
        ></div>
        <div
          className="griditem"
          style={{ backgroundColor: answer[i][2][2] === 1 ? "red" : "blue" }}
        ></div>
        <div
          className="griditem"
          style={{ backgroundColor: answer[i][2][3] === 1 ? "red" : "blue" }}
        ></div>
        <div
          className="griditem"
          style={{ backgroundColor: answer[i][3][0] === 1 ? "red" : "blue" }}
        ></div>
        <div
          className="griditem"
          style={{ backgroundColor: answer[i][3][1] === 1 ? "red" : "blue" }}
        ></div>
        <div
          className="griditem"
          style={{ backgroundColor: answer[i][3][2] === 1 ? "red" : "blue" }}
        ></div>
        <div className="griditem">
          <img
            style={{ height: "100%", width: "100%" }}
            src={myImage2}
            alt="My Image"
          />
        </div>
      </div>
    );
  }
  return (
    <>
      <button
        type="button"
        onClick={handleCalculate}
        style={{ position: "relative", top: "20px", left: "975px" }}
        className="btn btn-primary"
      >
        Calculate
      </button>
      <div className="d-flex justify-content-center align-items-center">
        <div className="container mt-5">
          {colors.map((color, index) => {
            const rowIndex = Math.floor(index / gridSize);
            const colIndex = index % gridSize;
            if (rowIndex === 0 && colIndex === 0) {
              return (
                <div className="griditem" key={index}>
                  <img
                    style={{ height: "100%", width: "100%" }}
                    src={myImage}
                    alt="My Image"
                  />
                </div>
              );
            }
            if (rowIndex === 3 && colIndex === 3) {
              return (
                <div className="griditem" key={index}>
                  <img
                    style={{ height: "100%", width: "100%" }}
                    src={myImage2}
                    alt="My Image"
                  />
                </div>
              );
            }
            return (
              <div
                key={index}
                className="griditem"
                style={{ backgroundColor: color }}
                onClick={() => handleGridClick(rowIndex, colIndex)}
              ></div>
            );
          })}
        </div>
      </div>
      <div className="row">{cell}</div>
    </>
  );
}
