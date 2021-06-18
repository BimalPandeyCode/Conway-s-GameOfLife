import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./App.css";

function App() {
  // const [startGame, setStartGame] = useState(false);
  let startGame = false;
  let length = 45;
  const [gameGrid, setGameGrid] = useState(
    new Array(length).fill(new Array(length).fill(0))
  );
  const ButtonsGrid = () => {
    let output = [];
    for (let i = 0; i < gameGrid.length; i++) {
      let secondaryoutput = [];
      for (let j = 0; j < gameGrid[i].length; j++) {
        let bgColor = "black";
        if (gameGrid[i][j] === 1) {
          bgColor = "white";
        }
        secondaryoutput.push(
          <div key={j + "" + i} style={{ margin: "2px" }}>
            <button
              style={{
                backgroundColor: `${bgColor}`,
                minWidth: "50px",
                minHeight: "50px",
                // border: "none",
              }}
              onClick={() => {
                setGameGrid([
                  ...gameGrid.slice(0, i),
                  [
                    ...gameGrid[i].slice(0, j),
                    gameGrid[i][j] === 0 ? 1 : 0,
                    ...gameGrid[i].slice(j + 1, gameGrid[i].length),
                  ],
                  ...gameGrid.slice(i + 1, gameGrid.length),
                ]);
              }}
            ></button>
          </div>
        );
      }
      output.push(
        <div key={i} className="buttonsGridEachRow">
          {secondaryoutput}
        </div>
      );
    }
    return output;
  };
  const calculateNoOfAliveNeighbour = (i, j) => {
    let output = 0;
    if (i > 0) {
      if (j > 0) {
        if (gameGrid[i - 1][j - 1] === 1) {
          //!left top
          output++;
        }
      }
      if (gameGrid[i - 1][j] === 1) {
        //!top
        output++;
      }
      if (j + 1 < gameGrid[i].length) {
        if (gameGrid[i - 1][j + 1] === 1) {
          //! top right
          output++;
        }
      }
    }
    if (j > 0) {
      if (gameGrid[i][j - 1] === 1) {
        //! left
        output++;
      }
    }
    if (j + 1 < gameGrid[i].length) {
      if (gameGrid[i][j + 1] === 1) {
        //! right
        output++;
      }
    }
    if (i + 1 < gameGrid.length) {
      if (j > 0) {
        if (gameGrid[i + 1][j - 1] === 1) {
          //! bottom left
          output++;
        }
      }
      if (gameGrid[i + 1][j] === 1) {
        // !bottom
        output++;
      }
      if (j + 1 < gameGrid[i].length) {
        if (gameGrid[i + 1][j + 1] === 1) {
          //! bottom right
          output++;
        }
      }
    }
    return output;
  };
  // console.log(calculateNoOfAliveNeighbour(5, 5));
  const EachFrame = () => {
    let output = [];
    // console.log(calculateNoOfAliveNeighbour(4, 1));
    for (let i = 0; i < gameGrid.length; i++) {
      for (let j = 0; j < gameGrid[i].length; j++) {
        let currentNeighBour = calculateNoOfAliveNeighbour(i, j);

        if (gameGrid[i][j] === 1) {
          if (currentNeighBour < 2) {
            // console.log("curr " + currentNeighBour);
            // output.push([0, i, j]);
          } else if (currentNeighBour >= 2 && currentNeighBour <= 3) {
            output.push([1, i, j]);
          } else if (currentNeighBour > 3) {
            // output.push([0, i, j]);
            // console.log(["work dam it", [i, j]]);
          }
        } else {
          if (currentNeighBour === 3) {
            output.push([1, i, j]);
            // console.log("bitch");
          }
        }
      }
    }
    // console.log(output);
    // ReactDOM.unstable_batchedUpdates(() => {
    let newArray = new Array(length).fill(new Array(length).fill(0));
    // console.log(newArray);
    for (let k = 0; k < output.length; k++) {
      let index = output[k][1];
      let jindex = output[k][2];
      // console.log(index, jindex);
      // console.log(newArray[index]);
      let copyArray = JSON.parse(JSON.stringify(newArray[index]));
      copyArray[jindex] = 1;
      newArray[index] = copyArray;
      // console.log(newArray[index]);
      // console.log(newArray);
      //   if (output[k][0] === 1) {
      //     setGameGrid([
      //       ...gameGrid.slice(0, index),
      //       [
      //         ...gameGrid[index].slice(0, jindex),
      //         1,
      //         // gameGrid[index][jindex] === 0 ? 1 : 0,
      //         ...gameGrid[index].slice(jindex + 1, gameGrid[index].length),
      //       ],
      //       ...gameGrid.slice(index + 1, gameGrid.length),
      //     ]);
      //   } else {
      //     setGameGrid([
      //       ...gameGrid.slice(0, index),
      //       [
      //         ...gameGrid[index].slice(0, jindex),
      //         0,
      //         // gameGrid[index][jindex] === 0 ? 1 : 0,
      //         ...gameGrid[index].slice(jindex + 1, gameGrid[index].length),
      //       ],
      //       ...gameGrid.slice(index + 1, gameGrid.length),
      //     ]);
      // }
      // }
    }
    // console.log(newArray);
    setGameGrid(newArray);
    // setTimeout(() => {
    //   EachFrame();
    // }, 3000);
  };
  return (
    <div className="App">
      <div className="button-holder">
        <div style={{ display: "flex", flexDirection: "row" }}>
          <button
            onClick={() => {
              // while (startGame) {
              //   EachFrame();
              // }
              EachFrame();
            }}
            className="startAndStopButtons"
          >
            {"Start >"}
          </button>
          <button
            onClick={() => {
              startGame = false;
              setGameGrid(new Array(length).fill(new Array(length).fill(0)));
            }}
            className="startAndStopButtons"
          >
            {"Stop ||"}
          </button>
        </div>
      </div>
      <div style={{ width: "100%", display: "grid", placeItems: "center" }}>
        <div className="buttonGridsMainDiv">{<ButtonsGrid />}</div>
      </div>
    </div>
  );
}

export default App;
