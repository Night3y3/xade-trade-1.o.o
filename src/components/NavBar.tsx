import { motion } from 'framer-motion'
import { useState } from 'react'
import logo from '../assets/logo.svg';
import WalletConnectButton from './WalletConnectButton';

const tabs = ['Trade', 'Docs', 'Leaderboard', 'Mobile App']

interface TabProps {
    text: string
    selected: boolean
    setSelected: (text: string) => void
    customID?: string
}

const Tab = ({ text, selected, setSelected, customID }: TabProps) => {
    return (
        <button
            onClick={() => setSelected(text)}
            className={` ${selected ? 'text-white' : ' '
                } relative rounded-md  px-2 py-6 text-sm font-medium text-gray-500 transition-colors duration-300 focus-within:outline-red-500/50`}
        >
            <span className="relative z-10">{text}</span>
            {selected && (
                <motion.div
                    className="absolute left-0 top-0 flex size-full h-full w-full items-end justify-center"
                    layoutId={customID + 'linetab'}
                    transition={{ type: 'spring', duration: 0.4, bounce: 0, delay: 0.1 }}
                >
                    <span className="z-0 h-[2px] w-[80%] rounded-t-full bg-white"></span>
                </motion.div>
            )}
        </button>
    )
}

interface NavBarProps {
    center?: boolean
    customID?: string
}

const NavBar = ({ center, customID }: NavBarProps) => {
    const [selected, setSelected] = useState<string>(tabs[0])
    return (
        <div
            className={` ${center ? 'justify-center ' : ''
                } border-gray-500/25 mb-8 flex flex-wrap justify-between border-b px-10`}
        >
            <div className='flex flex-wrap items-center gap-7'>
                <img src={logo} alt="" />
                <div>
                    {tabs.map((tab) => (
                        <Tab
                            text={tab}
                            selected={selected === tab}
                            setSelected={setSelected}
                            key={tab}
                            customID={customID}
                        />
                    ))}
                </div>
            </div>

            <WalletConnectButton />

        </div>
    )
}

export default NavBar