import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';

import './popup.css';
import {openaiApiRequest} from "../utils/openai-api";

const Popup: React.FC<{}> = ({  }) => {
    const [prompt, setPrompt] = useState(''); // State to hold the prompt input by the user
    const [response, setResponse] = useState<string | null>(null); // State to hold the response from the API
    const [settingsLoaded, setSettingsLoaded] = useState(false); // Indicates if settings are loaded

    useEffect(() => {
        // Attempt to load settings to see if they're configured
        chrome.storage.sync.get(['openaiSettings'], function(result) {
            if (result.openaiSettings && result.openaiSettings.apiKey) {
                setSettingsLoaded(true);
            }
        });
    }, []);

    const handleSendClick = () => {
        // Send the prompt to the API
        openaiApiRequest(prompt)
            .then((data: string) => {
                setResponse(data); // Update the state with the API response
            })
            .catch((error) => console.log(error));
    };

    const openOptionsPage = () => {
        if (chrome.runtime.openOptionsPage) {
            chrome.runtime.openOptionsPage();
        } else {
            window.open(chrome.runtime.getURL('options.html'));
        }
    };

  return (
    <div className="popup">
        <div className="settings-indicator" onClick={openOptionsPage}>
            <img src={settingsLoaded ? "green-bulb.png" : "red-bulb.png"} alt="Settings Status"/>
            <img src="gear-icon.png" alt="Open Settings" />
        </div>
        <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt"
        />
        <button onClick={handleSendClick}>Send</button>
        <div>
            <h2>Response:</h2>
            <p>{response}</p>
        </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(<Popup />);
