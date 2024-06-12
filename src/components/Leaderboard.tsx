import React from 'react';
import banner from '../assets/leaderboard_banner.png';
import BorderGlowButton from './ui/BorderGlowButton';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"

interface LeaderboardProps {
    // Define prop types here
}

const Leaderboard: React.FC<LeaderboardProps> = () => {
    // Component logic using props
    return (
        <>
            <div className="relative w-full h-[30vh]">
                <img src={banner} alt="" className="absolute w-full h-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center flex-col gap-7">
                    <span className="text-5xl font-bold" style={{
                        background: 'var(--linear, linear-gradient(90deg, #F5FFDA 0%, #EFC2FF 100%))',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>Leaderboard</span>
                    <div className=' text-white'>Join the ranks of the experts of trading</div>
                    <BorderGlowButton text='Learn More' />
                </div>
            </div>
            <div className="border rounded-lg w-full">
                <div className="relative w-full overflow-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Rank</TableHead>
                                <TableHead>Trader</TableHead>
                                <TableHead>Weekly volume</TableHead>
                                <TableHead>Weekly P&L</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-medium">John Doe</TableCell>
                                <TableCell>john.doe@example.com</TableCell>
                                <TableCell>+1 (555) 123-4567</TableCell>
                                <TableCell>Acme Inc.</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">Jane Smith</TableCell>
                                <TableCell>jane.smith@example.com</TableCell>
                                <TableCell>+1 (555) 987-6543</TableCell>
                                <TableCell>Globex Corporation</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">Bob Johnson</TableCell>
                                <TableCell>bob.johnson@example.com</TableCell>
                                <TableCell>+1 (555) 456-7890</TableCell>
                                <TableCell>Stark Industries</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">Alice Williams</TableCell>
                                <TableCell>alice.williams@example.com</TableCell>
                                <TableCell>+1 (555) 321-0987</TableCell>
                                <TableCell>Wayne Enterprises</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">Tom Davis</TableCell>
                                <TableCell>tom.davis@example.com</TableCell>
                                <TableCell>+1 (555) 654-3210</TableCell>
                                <TableCell>Stark Industries</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>
        </>
    );
};

export default Leaderboard;