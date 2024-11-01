"use client"

import { useState } from "react";
import { getRandomCharacter } from "./lib/helpers";



export type WordsHistoryType = {
  player: "A" | "B",
  word: string;
}[]
export const INITIAL_SCORE = 100;

export type GameStateType = {
  isFirstTurn: boolean;
  isFinished: boolean;
  currentPlayerTurn: "A" | "B";
  currentCharacter: string;
  scores: {
    PlayerA: number;
    PlayerB: number;
  };
}


export default function Home() {

  const [playerAInput, setPlayerAInput] = useState("");
  const [playerBInput, setPlayerBInput] = useState("");
  const [wordsHistory, setWordsHistory] = useState<WordsHistoryType>([]);
  const [errorField, setErrorField] = useState({
    playerAError: "",
    playerBError: ""
  });
  // const [placeHolderWord, setPlaceHolderWord] = useState(getRandomCharacter());


  // useEffect(() => {
  //   console.log("Player A >>", playerAInput)
  //   console.log("Player B >>", playerBInput)
  // }, [playerAInput, playerBInput])

  const [gameState, setGameState] = useState<GameStateType>({
    isFirstTurn: true,
    isFinished: false,
    currentPlayerTurn: "A",
    currentCharacter: getRandomCharacter(),
    scores: {
      PlayerA: INITIAL_SCORE,
      PlayerB: INITIAL_SCORE
    }
  })



  const handlePlayerAInput = () => {
    setErrorField({
      playerAError: "",
      playerBError: ""
    })
    console.log("player A", playerAInput);
    if (gameState.currentPlayerTurn === "A") {
      // validate the input length
      if (playerAInput.trim().length < 4) {
        setErrorField((prev) => {
          return {
            ...prev,
            playerAError: "Word must be more than 4 characters!"
          }
        });
        return;
      }
      // check if the word starts with the target word
      if (!playerAInput.toLocaleLowerCase().startsWith(gameState.currentCharacter.toLocaleLowerCase())) {
        setErrorField((prev) => {
          return {
            ...prev,
            playerAError: `Word must the start with "${gameState.currentCharacter}"`
          }
        });

        return;
      }

      //  check if already used or not
      const matchFound = wordsHistory.find((word) => {
        if (word.player === "A" && word.word === playerAInput.toLocaleLowerCase().trim()) {
          return word
        }
      })

      if (matchFound) {
        // setErrorField("Word already used!! Try different word")
        setErrorField((prev) => {
          return {
            ...prev,
            playerAError: "Word already used!! Try different word"
          }
        });
        return;
      }

      // validate the input through API
      const validWord = true
      if (!validWord) {
        setErrorField((prev) => {
          return {
            ...prev,
            playerAError: "Invalid word!! Try different one"
          }
        });

        return;
      }

      // if valid then save the history
      setWordsHistory((prev) => [...prev, {
        player: "A", word: playerAInput
      }])


      // set currentWord for  next player 
      setGameState((prev) => {
        return {
          ...prev,
          isFirstTurn: false,
          currentCharacter: playerAInput.slice(- 1)
        }
      })
      setPlayerAInput("")

    }
    // -------------------------------------
    else {
      // validate the input length
      if (playerBInput.trim().length < 4) {
        setErrorField((prev) => {
          return {
            ...prev,
            playerAError: "Word must be more than 4 characters!"
          }
        });
        return;
      }
      // check if the word starts with the target word
      if (!playerBInput.toLocaleLowerCase().startsWith(gameState.currentCharacter.toLocaleLowerCase())) {
        setErrorField((prev) => {
          return {
            ...prev,
            playerBError: `Word must the start with "${gameState.currentCharacter}"`
          }
        });

        return;
      }

      //  check if already used or not
      const matchFound = wordsHistory.find((word) => {
        if (word.player === "B" && word.word === playerBInput.toLocaleLowerCase().trim()) {
          return word
        }
      })

      if (matchFound) {
        // setErrorField("Word already used!! Try different word")
        setErrorField((prev) => {
          return {
            ...prev,
            playerBError: "Word already used!! Try different word"
          }
        });
        return;
      }

      // validate the input through API
      const validWord = true
      if (!validWord) {
        setErrorField((prev) => {
          return {
            ...prev,
            playerBError: "Invalid word!! Try different one"
          }
        });

        return;
      }

      // if valid then save the history
      setWordsHistory((prev) => [...prev, {
        player: "B", word: playerAInput
      }])


      // set currentWord for  next player and other states
      setGameState((prev) => {
        return {
          ...prev,
          isFirstTurn: false,
          currentPlayerTurn: "A",
          currentCharacter: playerAInput.slice(- 1)
        }
      })
      setPlayerAInput("")

    }
  }

  // const handlePlayerBInput = (e) => {
  //   setPlayerBInput(e.target.value)
  // }

  return (
    <div className="min-h-screen">
      <h1 className="text-2xl text-center mt-10"> Welcome to Shiritori Game </h1>


      {/* players boxes */}
      <div className="mt-5 mx-auto max-w-screen-lg">
        <div className="grid grid-cols-2 justify-center items-center gap-20 mx-auto">
          <div className="border border-black min-h-56 p-3 rounded-lg">
            <div className="flex justify-between items-center border-0 border-b">
              <h4 className="text-2xl font-bold pb-3">Player A</h4>
              <h4 className="text-xl font-semibold">Score: {gameState.scores.PlayerA}</h4>
            </div>
            <br />
            {/* <p className="text-xl font-semibold">Text Starts With : {gameState.currentCharacter.toLocaleUpperCase()}</p> */}
            <p className="text-xl font-semibold">{gameState.currentPlayerTurn === "A" ? gameState.currentCharacter.toLocaleUpperCase() : "__"}</p>
            <input
              type="text"
              name="playerAInput"
              id="player-1"
              placeholder="Enter Word"
              className={`border-[#e5eaf2] border rounded-md outline-none px-4 w-full mt-1 py-3 focus:border-[#3B9DF8] transition-colors duration-300 ${errorField.playerAError ? "border-red-900" : "border-[#e5eaf2]"}`}
              value={playerAInput}
              onChange={(e) => setPlayerAInput(e.target.value)}
            />
            {
              errorField && <p className="text-red-900">{errorField.playerAError}</p>
            }
            <button
              className="px-6 py-1 mt-2 border border-[#3B9DF8] hover:bg-[#3B9DF8] text-[#3B9DF8] 
hover:text-[#ffffff]  transition duration-300 rounded "
              onClick={handlePlayerAInput}
            >
              Enter &gt;&gt;
            </button>
            <div className="bg-slate-300 mt-2 rounded-md border border-black/50 max-h-[320px] h-full overflow-scroll min-h-[200px]">
              {
                wordsHistory.filter((data => data.player === "A")).map((data, index) => (
                  <p className="bg-slate-50 p-2 border-b border-b-slate-600" key={index}>
                    {data.word}
                  </p>
                ))
              }
            </div>
          </div>
          <div className="border border-black min-h-56 p-3 rounded-lg">
            <div className="flex justify-between items-center border-0 border-b">
              <h4 className="text-2xl font-bold pb-3">Player B</h4>
              <h4 className="text-xl font-semibold">Score: {gameState.scores.PlayerB}</h4>
            </div>
            <br />
            <p className="text-xl font-semibold">Text Starts With : {gameState.currentPlayerTurn === "B" ? gameState.currentCharacter.toLocaleUpperCase() : "__"}</p>
            <input
              type="text"
              name="playerAInput"
              id="player-1"
              placeholder="Enter Word"
              className={`border-[#e5eaf2] border rounded-md outline-none px-4 w-full mt-1 py-3 focus:border-[#3B9DF8] transition-colors duration-300 ${errorField.playerBError ? "border-red-900" : "border-[#e5eaf2]"}`}
              value={playerBInput}
              onChange={(e) => setPlayerBInput(e.target.value)}
            />
            {
              errorField && <p className="text-red-900">{errorField.playerBError}</p>
            }
            <button
              className="px-6 py-1 mt-2 border border-[#3B9DF8] hover:bg-[#3B9DF8] text-[#3B9DF8] 
hover:text-[#ffffff]  transition duration-300 rounded "
              onClick={handlePlayerAInput}
            >
              Enter &gt;&gt;
            </button>
            <div className="bg-slate-300 mt-2 rounded-md border border-black/50 max-h-[320px] h-full overflow-scroll min-h-[200px]">
              {
                wordsHistory.filter((data => data.player === "B")).map((data, index) => (
                  <p className="bg-slate-50 p-2 border-b border-b-slate-600" key={index}>
                    {data.word}
                  </p>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}





// export function getRandomCharacter() {
//   const wordStets = "abcdefghijklmnopqrstuvwxyz";

//   return wordStets[Math.round(Math.random() * wordStets.length)];
// }
