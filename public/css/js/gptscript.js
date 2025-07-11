const chatinput=document.querySelector(".chat-input textarea");
const sendChatbtn=document.querySelector(".chat-input span");
const chatbox=document.querySelector(".chatbox");
let usermessage;
//your key
const API_KEY="sk-xSdDZ1740rET0ixdZBZvT3BIbkFJzuyHg4PoVPGDUoS5TbNd";
const inputinitheight=chatinput.scrollHeight;

const generateResponse=(incomingchatli)=>{
    //openai.reference.docs
    //apireferences
    //left=chat
    const API_URL="https://api.openai.com/v1/chat/completions";
    const messageElement=incomingchatli.querySelector("p");
    const requestOption={
        method:"POST",
        Headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer${API_KEY}`
        },
        body:JSON.stringify({
            model: "gpt-3.5-turbo",
            message:[{role:"user",content:usermessage}]
        })
    }

    fetch(API_URL,requestOption).then(res=>res.json()).then(data=>{
        console.log(data);
        messageElement.textContent=data.choices[0].message.content;
    }).catch((error)=>{
        messageElement.textContent="Oops! Something went wrong. Please try again.";
    }).finally(()=>chatbox.scrollTo(0,chatbox.scrollHeight));
}

const createChatli=(message,className)=>{
    const chatli=document.createElement("li");
    chatli.classList.add("chat",className);
    let chatContent=className==="outgoing"?`<p></p>`:`<span><img class="robo" src="/static/css/checkstyle/img/robo.png" alt="img"></span><p></p>`;
    chatli.innerHTML=chatContent;
    chatli.querySelector("p").textContent=message;
    return chatli;
}
const handlechat=()=>{
    usermessage=chatinput.value.trim();
    if(!usermessage) return;
    chatinput.value="";

    chatbox.appendChild(createChatli(usermessage,"outgoing"));
    chatbox.scrollTo(0,chatbox.scrollHeight);
    setTimeout(()=>{
        const incomingchatli=createChatli("Thinking...","incoming");
        chatbox.appendChild(incomingchatli);
        chatbox.scrollTo(0,chatbox.scrollHeight);
        generateResponse(incomingchatli);
    },600);

};

  
chatinput.addEventListener("input",()=>{
    chatinput.style.height=`${inputinitheight}px`;
    chatinput.style.height=`${chatinput.scrollHeight}px`;
})
sendChatbtn.addEventListener("click",handlechat);