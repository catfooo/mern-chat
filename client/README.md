# 

# okay, i rly want to get rid of this in my memory. part from all the bad memories, i want to say that ive learned nothing even i participated last 6 months, idk why. probably ive chosen bad way of learning. dk what is that, but the fact is i did nothing, out of pain. so what is next step? fiind other thing to get the right info. the fact is you couldnt learn last 6 months, and the fact is that you couldnt manage this res rep header or cookie or local storage, but the thing is , idk why but bcs you are used to do this, i want to make this work. so lets shout at void as much as you want, cry, and then, find some way to go through this. but i want to say that i rly hate technigo, as much as i can, at this moment. my 6 month have been go to garbage, the thing is i suffered, and got nothing in return. plus, i got this, continuous pain that i got from technigo, which is super negative to my life. 

# i thought, right after i implemented isLoggedin, i saw logged in page is not undefined. i thought it become undefined after i added this and that. so i tried to go back, but it is still undefined i refresh. i thought it was once has value after i refresh, but might seen a fake vision or something xD i wish myself to pls stop this and go back to video and try again this from the beginning, rather than putting time to solve this at this state. what a meaningless pain!

# isLoggedin

# one suggestion - since the result that the video has different from what you got, try to do things again from the scratch?


# i have this problem, 

jsonwebtoken.js?v=c46e4e6b:14 Module "buffer" has been externalized for browser compatibility. Cannot access "buffer.Buffer" in client code. See https://vitejs.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details.
get @ jsonwebtoken.js?v=c46e4e6b:14
../../node_modules/safe-buffer/index.js @ jsonwebtoken.js?v=c46e4e6b:25
__require @ chunk-P2LSHJDD.js?v=c46e4e6b:4
../../node_modules/jws/lib/sign-stream.js @ jsonwebtoken.js?v=c46e4e6b:581
__require @ chunk-P2LSHJDD.js?v=c46e4e6b:4
../../node_modules/jws/index.js @ jsonwebtoken.js?v=c46e4e6b:761
__require @ chunk-P2LSHJDD.js?v=c46e4e6b:4
../../node_modules/jsonwebtoken/decode.js @ jsonwebtoken.js?v=c46e4e6b:794
__require @ chunk-P2LSHJDD.js?v=c46e4e6b:4
../../node_modules/jsonwebtoken/index.js @ jsonwebtoken.js?v=c46e4e6b:4387
__require @ chunk-P2LSHJDD.js?v=c46e4e6b:4
(anonym) @ jsonwebtoken.js?v=c46e4e6b:4396
Visa 12 ramar till
Visa färre
jsonwebtoken.js?v=c46e4e6b:31 Uncaught TypeError: Cannot read properties of undefined (reading 'from')
    at ../../node_modules/safe-buffer/index.js (jsonwebtoken.js?v=c46e4e6b:31:17)
    at __require (chunk-P2LSHJDD.js?v=c46e4e6b:4:50)
    at ../../node_modules/jws/lib/sign-stream.js (jsonwebtoken.js?v=c46e4e6b:581:19)
    at __require (chunk-P2LSHJDD.js?v=c46e4e6b:4:50)
    at ../../node_modules/jws/index.js (jsonwebtoken.js?v=c46e4e6b:761:22)
    at __require (chunk-P2LSHJDD.js?v=c46e4e6b:4:50)
    at ../../node_modules/jsonwebtoken/decode.js (jsonwebtoken.js?v=c46e4e6b:794:15)
    at __require (chunk-P2LSHJDD.js?v=c46e4e6b:4:50)
    at ../../node_modules/jsonwebtoken/index.js (jsonwebtoken.js?v=c46e4e6b:4387:15)
    at __require (chunk-P2LSHJDD.js?v=c46e4e6b:4:50)



and you said

e crypto Module Instead of buffer:
Since you're working in a browser environment, you might want to try using the crypto module instead of buffer. Update your jsonwebtoken library to use the browser version. You can do this by specifying the browser field in your package.json:
json
Copy code
"browser": {
  "jsonwebtoken": "./path/to/browser/jsonwebtoken.js"
}
Make sure to replace "./path/to/browser/jsonwebtoken.js" with the correct path to the browser version of jsonwebtoken. Check the library's documentation or source code for the appropriate file.


this. so I was trying to create jsonwebtoken.js


tell me how to proceed

# There is no need of require while using the Buffer library as it is a global object.
https://vinod827.medium.com/decoding-a-jwt-token-in-nodejs-b8d5d079dea7
https://www.google.com/search?client=safari&rls=en&q=jwt+buffer&ie=UTF-8&oe=UTF-8
'jwt buffer' google search
https://www.google.com/search?client=safari&rls=en&q=jsonwebtoken+browser&ie=UTF-8&oe=UTF-8
'jswebtoken browser' google search

# the false root from chatgpt that i tried to do today

se crypto Module Instead of buffer:
Since you're working in a browser environment, you might want to try using the crypto module instead of buffer. Update your jsonwebtoken library to use the browser version. You can do this by specifying the browser field in your package.json:
json
Copy code
"browser": {
  "jsonwebtoken": "./path/to/browser/jsonwebtoken.js"
}
Make sure to replace "./path/to/browser/jsonwebtoken.js" with the correct path to the browser version of jsonwebtoken. Check the library's documentation or source code for the appropriate file.









# can login, but cant see login page after refresh.

# this might related to cookie. while request header has set cookie, respond header has not that. at profile at network tab. however, login at network tab has it and showing profile page. the browser keeps have cookie at cookie storage at application tab. but when i see this console log console.log('routes:', id,username) from routes tab, it become undefined, and this might make the profile page not showing.

# problem: when user log in, and when they refreshes, they see login page instead of profile page. (sounds familiar haha...)

# wanted to ask about this to chatgpt. which is not loading. idk how would i work without this...

# 1:22:50 "if im refreshed, im still logged in!!" this was bit different from my side. so if i refresh, i was supposed to see the 'profile' from network tab.  this shows 200, which means that i might still logged in. the localstorage holds cookie, so might logged in still. but i see register/login page when i refresh, not like the video. the video is showing 'logged in! test1', which is not like me currently. 

# so like.. when you delete cookie from server, and refresh, and try to relogin(not register, easy to confuse), you can relogin. confused bcs when register with same id , it spits e11000 something err and crashes server. needed to notice that while trial... so.. 'ma..gi..c..a..lly logged in'? idk, anyway, good to go

# still confused. sometimes can log in, and sometimes cant, and it was hard to name the reason. but always including cors error

# so.. finally 'magically logged in', but still not sure why i coudnt, and why i can now. but since respond header has set-cookie now, i think its good to go. 

# setting { sameSite: 'none', secure: true } to /login, as long as /register, seemed to solve this issue.

# Access to XMLHttpRequest at 'http://localhost:4040/login' from origin 'http://localhost:5173' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: The 'Access-Control-Allow-Origin' header has a value 'http://localhost:4040' that is not equal to the supplied origin.
RegisterAndLoginForm.jsx:13 
        
        
       POST http://localhost:4040/login net::ERR_FAILED
dispatchXhrRequest @ axios.js?v=118c87ff:1516
xhr @ axios.js?v=118c87ff:1376
dispatchRequest @ axios.js?v=118c87ff:1593
request @ axios.js?v=118c87ff:1858
httpMethod @ axios.js?v=118c87ff:1887
wrap @ axios.js?v=118c87ff:8
handleSubmit @ RegisterAndLoginForm.jsx:13
callCallback2 @ react-dom_client.js?v=118c87ff:3674
invokeGuardedCallbackDev @ react-dom_client.js?v=118c87ff:3699
invokeGuardedCallback @ react-dom_client.js?v=118c87ff:3733
invokeGuardedCallbackAndCatchFirstError @ react-dom_client.js?v=118c87ff:3736
executeDispatch @ react-dom_client.js?v=118c87ff:7016
processDispatchQueueItemsInOrder @ react-dom_client.js?v=118c87ff:7036
processDispatchQueue @ react-dom_client.js?v=118c87ff:7045
dispatchEventsForPlugins @ react-dom_client.js?v=118c87ff:7053
(anonym) @ react-dom_client.js?v=118c87ff:7177
batchedUpdates$1 @ react-dom_client.js?v=118c87ff:18909
batchedUpdates @ react-dom_client.js?v=118c87ff:3579
dispatchEventForPluginEventSystem @ react-dom_client.js?v=118c87ff:7176
dispatchEventWithEnableCapturePhaseSelectiveHydrationWithoutDiscreteEventReplay @ react-dom_client.js?v=118c87ff:5478
dispatchEvent @ react-dom_client.js?v=118c87ff:5472
dispatchDiscreteEvent @ react-dom_client.js?v=118c87ff:5449
Visa 21 ramar till
Visa färre
axios.js?v=118c87ff:1453 Uncaught (in promise) AxiosError {message: 'Network Error', name: 'AxiosError', code: 'ERR_NETWORK', config: {…}, request: XMLHttpRequest, …}

# 1:21:58 coudnt 'magically log in' btw, my chrome console is not showing 'method' at network tab, and was not experiencing exact same like the video right before this moment. while the video having 'failed' err, i was having cors err. so due to cors err, i couldnt log in. but could register. sounds familiar. when i was following mern app tutorial from traversymedia, i had to stop, bcs i could register, but couldnt log in. omg, no i cant register now. this is happening after i erase cookie from server, http://localhost:4040/test, just like the video did. 

Access to XMLHttpRequest at 'http://localhost:4040/register' from origin 'http://localhost:5173' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: The 'Access-Control-Allow-Origin' header has a value 'http://localhost:4040' that is not equal to the supplied origin.
RegisterAndLoginForm.jsx:13 
        
        
       POST http://localhost:4040/register net::ERR_FAILED
dispatchXhrRequest @ axios.js?v=118c87ff:1516
xhr @ axios.js?v=118c87ff:1376
dispatchRequest @ axios.js?v=118c87ff:1593
request @ axios.js?v=118c87ff:1858
httpMethod @ axios.js?v=118c87ff:1887
wrap @ axios.js?v=118c87ff:8
handleSubmit @ RegisterAndLoginForm.jsx:13
callCallback2 @ react-dom_client.js?v=118c87ff:3674
invokeGuardedCallbackDev @ react-dom_client.js?v=118c87ff:3699
invokeGuardedCallback @ react-dom_client.js?v=118c87ff:3733
invokeGuardedCallbackAndCatchFirstError @ react-dom_client.js?v=118c87ff:3736
executeDispatch @ react-dom_client.js?v=118c87ff:7016
processDispatchQueueItemsInOrder @ react-dom_client.js?v=118c87ff:7036
processDispatchQueue @ react-dom_client.js?v=118c87ff:7045
dispatchEventsForPlugins @ react-dom_client.js?v=118c87ff:7053
(anonym) @ react-dom_client.js?v=118c87ff:7177
batchedUpdates$1 @ react-dom_client.js?v=118c87ff:18909
batchedUpdates @ react-dom_client.js?v=118c87ff:3579
dispatchEventForPluginEventSystem @ react-dom_client.js?v=118c87ff:7176
dispatchEventWithEnableCapturePhaseSelectiveHydrationWithoutDiscreteEventReplay @ react-dom_client.js?v=118c87ff:5478
dispatchEvent @ react-dom_client.js?v=118c87ff:5472
dispatchDiscreteEvent @ react-dom_client.js?v=118c87ff:5449
Visa 21 ramar till
Visa färre
axios.js?v=118c87ff:1453 Uncaught (in promise) AxiosError {message: 'Network Error', name: 'AxiosError', code: 'ERR_NETWORK', config: {…}, request: XMLHttpRequest, …}

# https://www.youtube.com/watch?v=mYy-d6BtqmU
1:18:56

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
