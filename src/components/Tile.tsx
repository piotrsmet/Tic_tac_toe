import { useState, useEffect } from "react"

interface TileProps{
    id: number,
    player: string,
    isDisabled: boolean,
    changePlayer: React.Dispatch<React.SetStateAction<string>>,
    click: (arg1: string, id: number) => void,
    reset: boolean
}

export default function Tile({id, player, isDisabled, changePlayer, click, reset}: TileProps){
    const [sign, setSign] = useState("")
    const [disabled, setDisabled] = useState(false)
    const [style, setStyle] = useState("w-[100%] aspect-square bg-[#FDF5AA] font-bold ")

    useEffect(() => {
        if (reset) {
            setSign("");
            setDisabled(false);
            setStyle("w-[100%] aspect-square bg-[#FDF5AA] font-bold ")
        }
    }, [reset]);

    const changeColor = (player: string) => {
        if(player == "X")
            setStyle((prev) => {return prev + "text-green-500"})
        else
            setStyle((prev) => {return prev + "text-red-500"})
    }

    return(
        <>
            <div className="aspect-square w-[10vw] max-w-[130px] min-w-[90px] flex justify-center align-middle items-center text-3xl">
                <button onClick={() => {setSign(player); setDisabled(true); click(player, id); changePlayer(player === "X" ? "O" : "X"); changeColor(player)}}
                 className={style} disabled={isDisabled || disabled}>
                    {sign}
                </button>
            </div>

        </>
    )

}