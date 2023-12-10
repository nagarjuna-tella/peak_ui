import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, Drawer, TextField } from '@mui/material';

const Home = () => {
    const [tasks, setTasks] = useState([]);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [newTask, setNewTask] = useState({ name: '', taskDescription: '', status: '', deadline: '' });

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/tasks/')
            .then(response => {
                setTasks(response.data);
            })
            .catch(error => {
                console.error('Error fetching tasks:', error);
            });
    }, []);

    const handleInputChange = (e) => {
        setNewTask({ ...newTask, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/tasks/', newTask);
            setTasks([...tasks, response.data]);
            setNewTask({ name: '', taskDescription: '', status: '', deadline: '' });
            setDrawerOpen(false);
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pipeline': return '#2DCCFF';
            case 'In Progress': return '#FCE83A';
            case 'On Hold': return '#A4ABB6';
            case 'Completed': return '#56F000';
            default: return 'inherit';
        }
    };

    return (
        <Box style={{ padding: 20 }} height={'80vh'}>
            <Typography variant="h4" gutterBottom>Task List</Typography>
            <Button variant="contained" color="primary" onClick={() => setDrawerOpen(true)}>
                Add New Task
            </Button>

            <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <Box p={2} width="250px">
                    <Typography variant="h6" gutterBottom>
                        Add New Task
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField label="Name" name="name" fullWidth margin="normal" onChange={handleInputChange} value={newTask.name} />
                        <TextField label="Task Description" name="taskDescription" fullWidth margin="normal" onChange={handleInputChange} value={newTask.taskDescription} />
                        <TextField label="Status" name="status" fullWidth margin="normal" onChange={handleInputChange} value={newTask.status} />
                        <TextField label="Deadline" name="deadline" type="date" fullWidth margin="normal" InputLabelProps={{ shrink: true }} onChange={handleInputChange} value={newTask.deadline} />
                        <Button type="submit" color="primary" variant="contained">Submit</Button>
                    </form>
                </Box>
            </Drawer>

            <TableContainer component={Paper} style={{ marginTop: 20 }}>
                <Table aria-label="simple table">
                    <TableHead style={{ backgroundColor: '#f5f5f5' }}>
                        <TableRow>
                            <TableCell><strong>Name</strong></TableCell>
                            <TableCell><strong>Task</strong></TableCell>
                            <TableCell><strong>Status</strong></TableCell>
                            <TableCell><strong>Deadline</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tasks.map((task, index) => (
                            <TableRow key={index}>
                                <TableCell>{task.user.username}</TableCell>
                                <TableCell>{task.name}</TableCell>
                                <TableCell style={{ color: getStatusColor(task.status) }}>{task.status}</TableCell>
                                <TableCell>{task.deadline}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default Home;
