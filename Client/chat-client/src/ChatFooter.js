import React, { Component } from 'react';
import './ChatFooter.css';

class ChatFooter extends Component {

    state = {
        message: "",
        phone: undefined
    }
    

    handleChange = (e) => {
        this.setState({
            message: e.target.value,
            phone: this.props.chatInfo.id._serialized
        });
    }

    onSubmit = (e) => {

        fetch("http://localhost:3000/api/sendmessage", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state)
        }).then((res) => {
            console.log(this.state.phone);
        })

        this.setState({message: ""});

        e.preventDefault();
    }

    render() {
        return (
            <footer className="chat-footer">
                <form onSubmit={this.onSubmit}>
                    <input type="textarea" name="message" value={this.state.message} onChange={this.handleChange} placeholder="Type something..." />
                    <button type="submit" className="send-message">Send</button>
                </form>
            </footer>
        )
    }
}

export default ChatFooter;