import { useState } from "react"

interface TileProps{
    id: number,
    player: string,
    isDisabled: boolean,
    changePlayer: React.Dispatch<React.SetStateAction<string>>,
    click: (arg1: string, id: number) => void
}

export default function Tile({id, player, isDisabled, changePlayer, click}: TileProps){
    const [sign, setSign] = useState("")
    const [disabled, setDisabled] = useState(false)
    return(
        <>
            <div className="aspect-square w-[10vw] max-w-[130px] min-w-[90px] flex justify-center align-middle items-center text-3xl">
                <button onClick={() => {setSign(player); setDisabled(true); click(player, id); changePlayer(player === "X" ? "O" : "X")}}
                 className="w-[100%] aspect-square bg-[#91C8E4] font-bold" disabled={isDisabled || disabled}>
                    {sign}
                </button>
            </div>

        </>
    )

}