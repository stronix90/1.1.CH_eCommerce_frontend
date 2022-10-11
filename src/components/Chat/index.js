import { useEffect, useRef, useState } from 'react';
import socketIO from 'socket.io-client';
import useUser from '../../context/userContext';

const socket = socketIO.connect('https://ecommerce-api-bl.glitch.me/');


export default function Chat() {
    const [message, setMessage] = useState([]);
    const { user } = useUser()
    const avatarList = ["abuelita.png", "beach.png", "snowboarder.png", "surfer.png", "traveler.png", "zookeeper.png"]
    const [avatar, setAvatar] = useState(`/avatar/${avatarList[Math.round(Math.random() * (6 - 0) + 0)]}`)

    useEffect(() => {
        socket.emit("getMessages");
        //setAvatar(avatarList[);
    }, []);

    useEffect(() => {
        socket.on("inicioMsg", (data) => {
            setMessage(data)
        });

    }, [socket, message])

    useEffect(() => {
        socket.on("newMessage", (data) => {
            setMessage([...message, data])
        });
    }, [message])

    const handleKeyUp = (e) => {
        if (e.keyCode === 13) {

            const newMessage = {
                author: {
                    email: user.email ?? "Anonimo",
                    name: user.name ?? "Anonimo",
                    alias: user.alias ?? "Anonimo",
                    avatar: avatar,
                },
                text: e.target.value,
            };
            socket.emit("newMessage", newMessage);
        }
    }


    return (
        <section className=''>
            <h2 className="text-3xl font-bold mt-6 mb-3">Chat</h2>

            {/* Chat container */}
            <div className="flex flex-col flex-grow w-full max-w-xl bg-[#FFFFFF80] shadow-xl rounded-lg overflow-hidden m-auto">

                {/* Messages container */}
                <div className="flex flex-col flex-grow h-0 p-4 overflow-auto min-h-[500px]">

                    {message.map((msg, index, message) => {
                        if (msg.author.email === user?.email) {
                            return (
                                <div key={msg._id ?? index} className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">

                                    {msg.author.email !== message[index - 1]?.author.email ? (
                                        // Me. First message
                                        <>
                                            <div>
                                                <div className="bg-indigo-600 text-white px-3 pt-0.5 pb-2 rounded-l-lg rounded-br-lg">
                                                    <span style={{ fontSize: "11px" }} className=" text-amber-300 leading-none font-bold">{msg.author.name}</span>
                                                    <p className="text-sm">{msg.text}</p>
                                                </div>
                                            </div>

                                            <div className="flex-shrink-0 h-10 w-10">
                                                <img src={msg.author.avatar} alt="" />
                                            </div>
                                        </>
                                    ) : (
                                        // Me. Not first message
                                        <>
                                            <div>
                                                <div className="bg-indigo-600 text-white p-3 rounded-lg">
                                                    <p className="text-sm">{msg.text}</p>
                                                </div>
                                            </div>

                                            <div className="flex-shrink-0 h-10 w-10">
                                            </div>
                                        </>
                                    )}
                                </div>
                            )
                        }
                        else {
                            return (
                                <div key={msg._id ?? index} className="flex w-full mt-2 space-x-3 max-w-xs">

                                    {msg.author.email !== message[index - 1]?.author.email ? (
                                        // Other person. First message
                                        <>
                                            <div className="flex-shrink-0 h-10 w-10 rounded-full">
                                                <img src={msg.author.avatar} alt="" />
                                            </div>
                                            <div>
                                                <div className="bg-indigo-300 px-3 pt-0.5 pb-2 rounded-r-lg rounded-bl-lg">
                                                    <span style={{ fontSize: "11px" }} className=" text-rose-900 leading-none font-bold">{msg.author.name}</span>
                                                    <p className="text-sm">{msg.text}</p>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        // Other person. Not first message
                                        <>
                                            <div className="flex-shrink-0 h-10 w-10 rounded-full">
                                            </div>
                                            <div>
                                                <div className="bg-indigo-300 p-3 rounded-lg">
                                                    <p className="text-sm">{msg.text}</p>
                                                </div>
                                            </div>
                                        </>
                                    )}

                                </div>
                            )
                        }
                    })}

                </div>

                {/* Write message */}
                <div className="bg-gray-300 p-4">
                    <input onKeyUp={handleKeyUp} className="flex items-center h-10 w-full rounded px-3 text-sm" type="text" placeholder="Enviá un mensaje..." />
                </div>

            </div>
        </section>
    )
}
