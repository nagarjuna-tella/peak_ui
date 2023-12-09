import React, { useState } from 'react';
import GroupList from './GroupList';
import MessagingInterface from './MessagingInterface';
import SearchBar from './SearchBar'; // Import the SearchBar component
import { Grid, Drawer, Button } from '@mui/material';

const ChatScreen = () => {
    const [selectedGroup, setSelectedGroup] = useState(null);

    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleNewChat = () => {
        setDrawerOpen(true);
    };

    const handleSearch = (searchTerm) => {
        console.log('Search Term:', searchTerm);
        // Implement your search logic here.
        // For example, make an API call to search for users/groups.
    };

    return (
        <Grid style={{ display: 'flex', height: '100vh' }}>
            <Grid style={{ width: '30%' }}>
                <Button variant="contained" color="primary" onClick={handleNewChat}>
                    New Chat
                </Button>
                <GroupList onSelectGroup={setSelectedGroup} />
            </Grid>
            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            >
                <Grid style={{ padding: '20px', width: '250px' }}>
                    <SearchBar onSearch={handleSearch} />
                    {/* Display search results here */}
                </Grid>
            </Drawer>
            <Grid item style={{ width: '70%' }}>
                {selectedGroup ? 
                    <MessagingInterface selectedGroup={selectedGroup} /> :
                    <p>Select a group to start chatting</p>
                }
            </Grid>
        </Grid>
    );
};

export default ChatScreen;
