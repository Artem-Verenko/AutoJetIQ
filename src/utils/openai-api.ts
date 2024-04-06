const OPENAI_API_URL: string = 'https://api.openai.com/v1/chat/completions'


export async function openaiApiRequest(prompt: string): Promise<string> {
  const settings = await new Promise<any>((resolve) => {
    chrome.storage.sync.get(['openaiSettings'], (result) => resolve(result.openaiSettings || {}));
  });

  const { apiKey, model, maxTokens, temperature } = settings;
  console.log(apiKey, model, maxTokens, temperature)

  if (!apiKey || !model) {
    throw new Error('API settings not configured.');
  }



  const response = await fetch(OPENAI_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: model,
      messages: [{role: 'system', content: prompt}],
      max_tokens: maxTokens,
      temperature: temperature
    })
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json()
  return data.choices[0].message.content
}


