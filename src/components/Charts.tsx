import { useState } from "react";
import logo from "../assets/logo.svg";
import "../App.css";
import { cn } from "@/lib/utils";

const handleTabClick = (text: string, setSelected: (text: string) => void) => {
    switch (text) {
        case "Docs":
            window.open("https://docs.xade.finance");
            break;
        case "Leaderboard":
            alert("Coming soon");
            break;
        case "Mobile App":
            window.open("https://bit.ly/xadefinance");
            break;
        default:
            setSelected(text);
    }
};

interface TabProps {
    text: string;
    selected: boolean;
    setSelected: (text: string) => void;
    customID?: string;
}

const Tab = ({ text, selected, setSelected }: TabProps) => {
    return (
        <button
            onClick={() => handleTabClick(text, setSelected)}
            className={` ${selected ? "text-white" : " "}
                relative rounded-md px-2 py-3 text-sm font-medium text-gray-500 transition-colors duration-300 focus-within:outline-red-500/50`}
        >
            <span className="relative z-10">{text}</span>
            {selected && (
                <div className="absolute left-0 top-0 flex size-full h-full w-full items-end justify-center">
                    <span className="z-0 h-[2px] w-[80%] rounded-t-full bg-white"></span>
                </div>
            )}
        </button>
    );
};

interface ChartProps {
    center?: boolean
    customID?: string
}

const Chart = ({ center, customID }: ChartProps) => {
    const [selected, setSelected] = useState<string>("Chart")
    return (
        <div
            className={cn(
                'flex flex-wrap items-center gap-2 ',
                center && 'justify-center',
            )}
        >
        </div>
    )
}

export default Chart