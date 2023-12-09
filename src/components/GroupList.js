import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText } from '@mui/material';

const GroupList = ({ onSelectGroup }) => {
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/groups/').then(response => {
            setGroups(response.data);
        });
    }, []);

    return (
        <List component="nav">
            {groups.map(group => (
                <ListItem button key={group.id} onClick={() => onSelectGroup(group.id)}>
                    <ListItemText primary={group.name} />
                </ListItem>
            ))}
        </List>
    );
};

export default GroupList;
