import React from 'react';
import banner from '../assets/leaderboard_banner.png';

interface LeaderboardProps {
    // Define prop types here
}

const Leaderboard: React.FC<LeaderboardProps> = () => {
    // Component logic using props
    return (
        <>
            <div style={{
                position: 'relative',
                width: '100%',
                height: '30vh'
            }}>
                <img src={banner} alt="" style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                }} />
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '7px'
                }}>
                    <span style={{
                        fontSize: 64,
                        fontWeight: 'bold',
                        background: 'linear-gradient(90deg, #F5FFDA 0%, #EFC2FF 100%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontFamily:'Sk-Modernist-Regular'
                    }}>Degens Leaderboard</span>
                    <div style={{ color: '#E4E1D5', fontFamily: 'Sk-Modernist-Regular', fontSize: 20 }}>
                        Earn upto $200k in rewards in this trading competition exclusively for Xade degens
                    </div>
                    <button style={{
                        padding: '10px 25px',
                        border: '1px solid #fff',
                        borderRadius: 90, // Changed to make the button rounded
                        background: 'transparent',
                        color: '#fff',
                        cursor: 'pointer',
                        fontFamily: 'Sk-Modernist-Regular',
                        fontSize:16,
                        marginTop:'1%',
                        marginBottom:'1%'
                    }} onClick={() => window.open('https://cooing-slope-6a6.notion.site/Xade-Degens-Trading-Competition-56c8c7afc55c4f6a92debbf835eb4922', '_blank')}>Learn More</button>
                </div>
            </div>
            <div style={{
                width: '80%',
                backgroundColor: '#0f0f0f',
                margin: '20px auto', // Center the box horizontally
                padding: '20px', // Add some padding inside the box
                color: '#fff', // Ensure text inside the box is visible
                textAlign: 'center', // Center the text inside the box
                fontFamily: 'Sk-Modernist-Regular' // Set font family for the entire box
            }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'Sk-Modernist-Regular' }}>
                    <thead>
                    <tr>
                            <th style={{ padding: '8px', color: '#727272' }}>Rank</th>
                            <th style={{ padding: '8px', color: '#727272' }}>Address</th>
                            <th style={{ padding: '8px', color: '#727272' }}>Xade Shards</th>
                            <th style={{ padding: '8px', color: '#727272' }}>Spot Volume</th>
                            {/* <th style={{ padding: '8px', color: '#727272' }}>Futures Volume</th> */}
                            <th style={{ padding: '8px', color: '#727272' }}>Content Shards</th>
                            <th style={{ padding: '8px', color: '#727272' }}>Referral Shards</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Add table rows here */}
                        <tr>
                            <td style={{ padding: '8px' }}>1</td>
                            <td style={{ padding: '8px' }}>0xdddhjsjshshjdn</td>
                            <td style={{ padding: '8px' }}>1000</td>
                            <td style={{ padding: '8px' }}>$500,000</td>
                            {/* <td style={{ padding: '8px' }}>$1,000,000</td> */}
                            <td style={{ padding: '8px' }}>200</td>
                            <td style={{ padding: '8px' }}>50</td>
                        </tr>
                        {/* Add more rows as needed */}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Leaderboard;
