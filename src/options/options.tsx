import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';

import './options.css';

const Options: React.FC<{}> = ({ }) => {
    const [apiKey, setApiKey] = useState('');
    const [model, setModel] = useState('gpt-3.5');
    const [maxTokens, setMaxTokens] = useState(100);
    const [temperature, setTemperature] = useState(0.7);
    const [isKeySaved, setIsKeySaved] = useState(false);

    useEffect(() => {
        chrome.storage.sync.get(['openaiSettings'], function(result) {
            if (result.openaiSettings) {
                const { apiKey, model, maxTokens, temperature } = result.openaiSettings;
                setApiKey(apiKey);
                setModel(model);
                setMaxTokens(maxTokens);
                setTemperature(temperature);
                setIsKeySaved(true);
            }
        });
    }, []);

    const handleSave = () => {
        const settings = { apiKey, model, maxTokens, temperature };
        chrome.storage.sync.set({ openaiSettings: settings }, function() {
            console.log('Settings saved');
            setIsKeySaved(true);
        });
    };

    const handleRevoke = () => {
        chrome.storage.sync.remove('openaiSettings', function() {
            console.log('Settings revoked');
            setApiKey('');
            setIsKeySaved(false);
        });
    };


    return (
        <div className="options">
            <h1>Options</h1>
            <div>
                <label htmlFor="apiKey">OpenAI API Key:</label>
                <input
                    id="apiKey"
                    type="text"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    disabled={isKeySaved}
                />
            </div>
            <div>
                <label htmlFor="model">Model:</label>
                <select
                    id="model"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    disabled={isKeySaved}
                >
                    <option value="gpt-3.5-turbo">gpt-3.5-turbo</option>
                    <option value="gpt-4">GPT-4</option>
                </select>
            </div>
            <div>
                <label htmlFor="maxTokens">Max Tokens:</label>
                <input
                    id="maxTokens"
                    type="number"
                    value={maxTokens}
                    onChange={(e) => setMaxTokens(parseInt(e.target.value))}
                    disabled={isKeySaved}
                />
            </div>
            <div>
                <label htmlFor="temperature">Temperature:</label>
                <input
                    id="temperature"
                    type="number"
                    step="0.1"
                    value={temperature}
                    onChange={(e) => setTemperature(parseFloat(e.target.value))}
                    disabled={isKeySaved}
                />
            </div>
            <button onClick={isKeySaved ? handleRevoke : handleSave}>
                {isKeySaved ? 'Revoke Settings' : 'Save Settings'}
            </button>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);


root.render(<Options />);

