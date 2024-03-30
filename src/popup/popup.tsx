import React from 'react';
import ReactDOM from 'react-dom/client';

import './popup.css';

function Popup() {
  return (
    <div className="popup">
      <h1>Popup</h1>
        <img src='icon.png' alt="icon" />
    </div>
  );
}


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);


root.render(<Popup />);
