import React, { useEffect, useState } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'
import '../App.css'
import {  RiSendPlaneFill } from 'react-icons/ri';

const Chat = ({ socket, name, roomId }) => {
    const [msg, setMsg] = useState("")
    const [chatList, setChatList] = useState([])
    const [id, setId] = useState(0)
    const sendMessage = async () => {
        setId((prev) => prev + 1)
        if (msg !== "") {
            const payload = {
                id: id,
                name: name,
                roomId: roomId,
                message: msg,
                time: `${new Date(Date.now()).getHours()} : ${new Date(Date.now()).getMinutes()}`
            }
            await socket.emit('send_message', payload)
            setChatList((list) => [...list, payload])
            setMsg("")
        }
    }
    useEffect(() => {
        socket.on('receive_message', (data) => {
            setChatList((list) => [...list, data])
        })
    }, [socket])
    return (
        <div className='chat-window'>
            <div className="header">
                <p>{name}</p>
            </div>
            <div className="body">
                <ScrollToBottom className='message-container'  elementDomId="layoutContentContainer">
                    {
                        chatList.map((res) => {
                            return (
                                <div className="message" key={res.socketId} id={name === res.name ? 'me' : 'you'} >
                                    <div>
                                        <div className="message-content">
                                            <p>{res.message}</p>
                                        </div>
                                        <div className="message-meta">
                                            <p id='time'>{res.time}</p>
                                            <p id='name' >{res.name}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </ScrollToBottom>
            </div>
            <div className="chatting-div">
                <input type="text" placeholder='Type here...' value={msg} onChange={(e) => { setMsg(e.target.value) }} onKeyDown={(e) => { e.key === "Enter" && sendMessage() }} />
                <p></p>
                <button onClick={sendMessage} > <RiSendPlaneFill color='#ffffff' /> </button>
            </div>
        </div>
    )
}

export default Chat