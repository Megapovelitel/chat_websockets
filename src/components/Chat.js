import React, {useState, useEffect} from 'react'
import queryString from 'query-string';
import io from 'socket.io-client';
import './Chat.css'
import InfoBar from './InfoBar'
import Input from './Input'
import Messages from './Messages'
let socket;

const Chat = ({location}) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const ENDPOINT = 'localhost:5000';
    useEffect(() => {
        const {name, room} = queryString.parse(location.search);
        
        setName(name);
        setRoom(room);
  
        socket = io(ENDPOINT);
        socket.emit('join', {name, room}, () =>{
           
        });
        
        return () => {
            socket.emit('disconnect');

            socket.off();
        }
    }, [ENDPOINT, location.search]);

    useEffect(() => {
        socket.on('message', message => {
                setMessages(msgs=>[...msgs, message]);
        });
        socket.on("roomData", ({ users }) => {
                setUsers(users);
            });
    }, []);

    const sendMessage = (e) => {

        e.preventDefault();
        if(message) {
            socket.emit('sendMessage', message, ()=> setMessage(''));
        }
    }


    return (
         <React.Fragment>
        <div className='outerContainer'>
            <div className='online-container'>
                <div className='online'>
                    <h3 style={{fontSize:'20px', fontWeight: '400'}}>
                users online: {users.map((user, i) => <div key={i}><p>{user.name}</p></div>)} 
                        </h3>
                    </div>
                </div>
                        
                
            <div className='container'>
                <InfoBar users={users} room={room}/>
                <Messages messages={messages} name={name}/>
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
        </div>
        </React.Fragment>
    )
}

export default Chat;