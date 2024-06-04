import React, { useState } from 'react';

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState('positions');

  return (
    <div style={{ width: '100%', border: '1px solid black', padding: '20px',backgroundColor:'blue',alignSelf:'flex-start',height:'30%' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '20px' }}>
        <button onClick={() => setActiveTab('positions')} style={{ marginRight: '10px' }}>
          Positions
        </button>
        <button onClick={() => setActiveTab('orders')} style={{ marginRight: '10px' }}>
          Orders
        </button>
        <button onClick={() => setActiveTab('history')}>
          History
        </button>
      </div>
      <div>
        {activeTab === 'positions' && <div>Positions Content</div>}
        {activeTab === 'orders' && <div>Orders Content</div>}
        {activeTab === 'history' && <div>History Content</div>}
      </div>
    </div>
  );
};

export default Portfolio;
