import React, {useEffect, useState} from "react";
import './Chat.css';

const Chat = ({selectedChat}) => {
    const url = "http://localhost:3000/api/getmessages/" + selectedChat;

    const [state, setState] = useState({messages: undefined})
    const getData = async () => {
        const response = await fetch(url);
        const data = await response.json();
        setState({messages: data});
        console.log(state.messages);
    }
    useEffect(() => {
        getData()
    }, [])

        if (state.messages === undefined) {
            return (
                <p>Messages Here!</p>
            )
        } else {
            return (
                <div className="chat-window">
                <div className="messages-wrapper">
                    <ul>
                        {state.messages.map(message => {
                            if (message.hasMedia) {
                                message.body = 'Media Message';
                            }
                            if (message.fromMe) {
                                return (
                                    <li key={message.id} className="fromMe">{message.body}</li>
                                )
                            }
                            return (
                                <li key={message.id} className="fromElse">{message.body}</li>
                            )
                        })}
                    </ul>
                </div>
                <div className="send-message-form">
                    <form action="http://localhost:3000/api/sendmessage" method="POST">
                        <input type="text" name="message" value="" placeholder="Write something..."/>
                        <input type="hidden" name="phone" value=""/>
                        <button type="submit">Send</button>
                    </form>
                </div>
                </div>
            )
        }
    }

export default Chat;