const sendChatToOpenAI = (apiToken, messages) => {
  const OPENAI_CHAT_ENDPOINT = 'https://api.openai.com/v1/chat/completions';
  return fetch(OPENAI_CHAT_ENDPOINT, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiToken}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: messages
    })
  })
  .then(response => response.json())
  .then(data => {
    if (data.choices && data.choices.length > 0 && data.choices[0].message) {
      return data.choices[0].message.content;
    } else {
      throw new Error('No response from OpenAI.');
    }
  })
  .catch(error => {
    console.error('Error calling OpenAI API:', error);
  });
}