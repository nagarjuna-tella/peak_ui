import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, Divider, TextField, Button } from '@mui/material';

const MessagingInterface = ({ selectedGroup }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:8000/api/groups/${selectedGroup}/messages/`).then(response => {
            setMessages(response.data);
        });
    }, [selectedGroup]);

    const sendMessage = () => {
        // Add logic to send message
        console.log(newMessage);
        setNewMessage('');
    };

    return (
        <div>
            <List>
                {messages.map((message, index) => (
                    <React.Fragment key={message.id}>
                        <ListItem alignItems="flex-start">
                            <ListItemText primary={message.author} secondary={message.content} />
                        </ListItem>
                        {index < messages.length - 1 && <Divider variant="inset" component="li" />}
                    </React.Fragment>
                ))}
            </List>
            <div style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
                <TextField 
                    label="New Message" 
                    fullWidth 
                    value={newMessage} 
                    onChange={(e) => setNewMessage(e.target.value)} 
                />
                <Button variant="contained" color="primary" onClick={sendMessage}>
                    Send
                </Button>
            </div>
        </div>
    );
};

export default MessagingInterface;
