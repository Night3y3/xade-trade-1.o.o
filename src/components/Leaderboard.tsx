import React, { useEffect, useState } from 'react';
import axios from 'axios';
import banner from '../assets/leaderboard_banner.png';

interface LeaderboardProps {
    // Define prop types here
}

const Leaderboard: React.FC<LeaderboardProps> = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://api.zcx.com/trade/v1/info/trades', {
                    params: {
                        limit: 30,
                        offset: 0,
                        dateFrom: '2024-06-11T09:02:04.847Z',
                        dateTo: '2024-07-18T09:02:04.847Z'
                    },
                    headers: {
                        'accept': 'application/json',
                        'Authorization': 'Bearer af0e50ed-6636-414f-afa3-2626db5c6acf'
                    }
                });
                setData(response.data);
                setLoading(false);
            } catch (error) {
                setError(error as Error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message || 'Network Error'}</div>;
    }

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
            <div>
                <h2>API Response:</h2>
                <pre>{JSON.stringify(data, null, 2)}</pre>
            </div>
        </>
    );
};

export default Leaderboard;