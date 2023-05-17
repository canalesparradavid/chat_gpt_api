import MSG from "./MSG.js"

const API_KEY = '';
const MAX_TOKENS = 3000;

class ChatGPTDataSource {
    chat(msgs) {
        var settings = {
            async: false,
          "url": "https://api.openai.com/v1/chat/completions",
          "method": "POST",
          "timeout": 0,
          "headers": {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Bearer " + API_KEY
          },
          "data": JSON.stringify({
            "model": "gpt-3.5-turbo",
            "messages": msgs,
            "temperature": 1,
            "top_p": 1,
            "n": 1,
            "stream": false,
            "max_tokens": MAX_TOKENS,
            "presence_penalty": 0,
            "frequency_penalty": 0
          }),
        };

        var responseMsg = '';

        $.ajax(settings).done(function (response) {
            console.log(response.choices[0].message.content);
          responseMsg = response.choices[0].message.content;
        });

        return responseMsg;
    }
}


// var chat = new ChatGPTDataSource();
//
// var a = chat.chat([
//         {
//             "role": "user",
//             "content": "Who won the world series in 2020?"
//         },
//         {
//             "role": "assistant",
//             "content": "The Los Angeles Dodgers won the World Series in 2020."
//         },
//         {
//             "role": "user",
//             "content": "Where was it played?"
//         }
//     ]);
//
// console.log(a);

export default ChatGPTDataSource
