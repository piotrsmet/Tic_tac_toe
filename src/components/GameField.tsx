import { useState } from "react";
import Tile from "./Tile";
import { motion } from "framer-motion";

export default function GameField(){
    const [currentPlayer, setCurrentPlayer] = useState("X")
    const [disabled, setDisabled] = useState(false)
    const [valuesArr, setValue] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0])
    const [reset, setReset] = useState(false);

    

    const click = (player: string, index: number): void => {
        setValue((prev) => {
            const newValues = [...prev]
            newValues[index] = player === "X" ? 1 : 5
            if (newValues[0] + newValues[1] + newValues[2] === 3 || 
                newValues[3] + newValues[4] + newValues[5] === 3 || 
                newValues[6] + newValues[7] + newValues[8] === 3 || 
                newValues[0] + newValues[3] + newValues[6] === 3 || 
                newValues[1] + newValues[4] + newValues[7] === 3 || 
                newValues[2] + newValues[5] + newValues[8] === 3 || 
                newValues[0] + newValues[4] + newValues[8] === 3 || 
                newValues[2] + newValues[4] + newValues[6] === 3) {
                setDisabled(true)
                setCurrentPlayer("X")
            }
            if (newValues[0] + newValues[1] + newValues[2] === 15 || 
                newValues[3] + newValues[4] + newValues[5] === 15 || 
                newValues[6] + newValues[7] + newValues[8] === 15 || 
                newValues[0] + newValues[3] + newValues[6] === 15 || 
                newValues[1] + newValues[4] + newValues[7] === 15 || 
                newValues[2] + newValues[5] + newValues[8] === 15 || 
                newValues[0] + newValues[4] + newValues[8] === 15 || 
                newValues[2] + newValues[4] + newValues[6] === 15) {
                setDisabled(true)
                setCurrentPlayer("O")
            }
            if(newValues.find((el) => el==0) == null){
                console.log(newValues.find((el) => el==0))
                setDisabled(true)
                setCurrentPlayer("none")
            }
            console.log(valuesArr)
            return newValues;
        });
        
    }

    const restart = () => {
        setValue([0, 0, 0, 0, 0, 0, 0, 0, 0]);
        setDisabled(false);
        setCurrentPlayer("X");
        setReset(true);
        setTimeout(() => setReset(false), 50);
    };


    return(
        <>
            <div className="flex flex-col p-15 bg-[#34699A] rounded-2xl justify-center items-center">
                <div className="w-[33vw] max-w-[430px] min-w-[300px] h-[70px] mb-5 relative">
                
                    {currentPlayer === "X" && !disabled && (
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3 }}
                            className="text-4xl absolute left-0 rotate-330 translate-x-[-20px] font-bold underline drop-shadow-blue-700 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] bg-[#FDF5AA] p-1 rounded-lg"
                        >
                            Player X
                        </motion.span>
                        )
                    }
                    {currentPlayer === "O" && !disabled && (
                        <motion.span
                            initial={{ opacity: 0, x: 20}}
                            animate={{ opacity: 1, x: 0}}
                            transition={{ duration: 0.3 }}
                            className="text-4xl absolute right-0 rotate-30 translate-x-[20px] font-bold  underline bg-[#FDF5AA] p-1 rounded-lg"
                        >
                            PLAYER O
                        </motion.span>
                        )
                    }
                    {disabled && (
                        <motion.span 
                            initial={{opacity: 0, y: -20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.3}}
                            className="text-4xl absolute bottom-1 left-1/2 -translate-x-1/2 font-bold  bg-[#FDF5AA] p-3 rounded-lg text-nowrap underline"
                        >
                        {currentPlayer != "none" ? "PLAYER " + currentPlayer + " WINS" : "NO WINNERS"}
                        </motion.span>
                    )}
                    
                </div>
                <div className="grid grid-cols-3 gap-4 p-5 rounded-2xl backdrop-blur-2xl opacity-90">
                    {[...Array(9).keys()].map(k => <Tile key={k} id={k} player={currentPlayer} isDisabled={disabled} changePlayer={setCurrentPlayer} click={click} reset={reset}/>)}
                </div>
                <button onClick={restart} className="bg-[#FDF5AA] p-3 rounded-lg">Restart</button>
            </div>
        </>
    )
}