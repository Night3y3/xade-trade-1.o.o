import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { change24hour, change24hourPercent, parseString } from '@/utils/helper';
import { useAppDispatch } from '@/redux/hooks';
import { setVolume24h, setIndexPrice, setChange24hPercent } from '@/redux/slices/marketSlice';
import { Row, Data } from '@/types';
import '../App.css';
interface SelectingMarketProps {
    // Define prop types here
}

const fetcher = (...arg) => {
    return fetch(...arg).then(res => res.json())
}

const SelectingMarket: React.FC<SelectingMarketProps> = () => {

    const { data, error } = useSWR('https://api-evm.orderly.network/v1/public/futures', fetcher, { refreshInterval: 1000 })
    const [market, setMarket] = useState("BTC");
    const [isSelectorOpen, setIsSelectorOpen] = useState(false);
    const dispatch = useAppDispatch();

    function handleSelect(symbol: string) {
        setMarket(symbol);
        setIsSelectorOpen(false);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            const selectedMarket = data.data.rows.find((row: Row) => parseString(row.symbol) === market);
            if (selectedMarket) {
                dispatch(setIndexPrice(selectedMarket.index_price));
                dispatch(setChange24hPercent(change24hourPercent(selectedMarket['24h_open'], selectedMarket['24h_close'])));
                dispatch(setVolume24h(selectedMarket['24h_volume']));
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [data, market]);

    return (
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', paddingLeft: '20px', fontFamily: 'Sk-Modernist-Regular, sans-serif' }}>
            <div className="select">
                <div className="select-trigger" style={{ border: 'none', display: 'flex', gap: '8px', cursor: 'pointer' ,color:'white'}} onClick={() => setIsSelectorOpen(!isSelectorOpen)}>
                    <img src={`https://oss.orderly.network/static/symbol_logo/${market}.png`} alt="" style={{ width: '32px' }} />
                    <span style={{ fontWeight: '500', fontSize: '1.25rem' }}>{market}</span>
                </div>
                {isSelectorOpen && (
                    <div className="select-content" style={{ position: 'absolute', backgroundColor: 'BLACK',  borderRadius: '4px', zIndex: 1000, height: '30%', overflowX: 'auto',marginTop:'2%',color:'white' }}>
                        <table style={{ fontFamily: 'Sk-Modernist-Regular' }}>
                        <thead>
                                <tr style={{ border: 'none',textAlign:'left', fontFamily: 'Sk-Modernist-Regular'}}>
                                    <th style={{ padding: '4px ' ,textAlign:'left',fontFamily: 'Sk-Modernist-Regular'}}>Symbol</th>
                                    <th style={{ padding: '4px ' ,textAlign:'left',fontFamily: 'Sk-Modernist-Regular'}}>Price</th>
                                    <th style={{ padding: '4px ' ,textAlign:'left',fontFamily: 'Sk-Modernist-Regular'}}>24h Chg</th>
                                    <th style={{ padding: '4px ' ,textAlign:'left',fontFamily: 'Sk-Modernist-Regular'}}>24hr Chg(%)</th>
                                    <th style={{ padding: '4px ' ,textAlign:'left',fontFamily: 'Sk-Modernist-Regular'}}>8h Fund.(%)</th>
                                    <th style={{ padding: '4px  ',textAlign:'left' ,fontFamily: 'Sk-Modernist-Regular'}}>Volume</th>
                                    <th style={{ padding: '4px ',textAlign:'left' ,fontFamily: 'Sk-Modernist-Regular'}}>Open Interest</th>
                                </tr>
                            </thead>
                                   
                            <tbody>
                                {data?.data.rows.map((item: Row) => (
                                    <tr key={item.symbol} style={{ border: 'none', cursor: 'pointer' }} onClick={() => handleSelect(parseString(item.symbol))}>
                                        <td style={{ display: 'flex', alignItems: 'center', gap: '16px', fontFamily: 'Sk-Modernist-Regular', fontSize: '1rem' }}>
                                            <img src={`https://oss.orderly.network/static/symbol_logo/${parseString(item.symbol)}.png`} alt="" style={{ width: '32px' }} />
                                            {parseString(item.symbol)}
                                        </td>
                                        <td>${item.mark_price}</td>
                                        <td style={{ color: change24hour(item['24h_open'], item['24h_close']) > 0 ? '#40F388' : '#F46140' }}>
                                            ${change24hour(item['24h_open'], item['24h_close'])}
                                        </td>
                                        <td style={{ color: change24hourPercent(item['24h_open'], item['24h_close']) > 0 ? '#40F388' : '#F46140' }}>
                                            {change24hourPercent(item['24h_open'], item['24h_close'])}%
                                        </td>
                                        <td>{item.est_funding_rate}</td>
                                        <td>${item['24h_volume']}</td>
                                        <td>${item.open_interest}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SelectingMarket;

