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
         
        </>
    );
};

export default Leaderboard;
