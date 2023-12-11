import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, Drawer, TextField } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Autocomplete from '@mui/material/Autocomplete';

const Home = () => {
    const [tasks, setTasks] = useState([]);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [applications, setApplications] = useState([]);
    const [users, setUsers] = useState([]);
    const [newTask, setNewTask] = useState({ name: '', taskDescription: '', status: 'Pipeline', application: '', deadline: null });
    const statusOptions = ["Pipeline", "In Progress", "On Hold", "Completed"];


    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/tasks/')
            .then(response => {
                setTasks(response.data);
            })
            .catch(error => {
                console.error('Error fetching tasks:', error);
            });
        axios.get('http://127.0.0.1:8000/api/users/').then(response => setUsers(response.data));
        axios.get('http://127.0.0.1:8000/api/applications/').then(response => setApplications(response.data));
    }, []);

    const handleInputChange = (e) => {
        setNewTask({ ...newTask, [e.target.name]: e.target.value });
    };

    const handleDateChange = (newValue) => {
        setNewTask({ ...newTask, deadline: newValue });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log('Submitting new task:', newTask);

        const isNameValid = Number.isInteger(newTask.name); // Check if name is a valid number (user ID)
        const isTaskDescriptionValid = newTask.taskDescription && newTask.taskDescription.trim() !== '';
        const isApplicationValid = Number.isInteger(newTask.application); // Assuming application is also a number (ID)
        const isDeadlineValid = newTask.deadline instanceof Date && !isNaN(newTask.deadline);

        if (!isNameValid || !isTaskDescriptionValid || !isApplicationValid || !isDeadlineValid) {
            console.error('Validation failed. Please check all fields.');
            return;
        }

        const payload = {
            user: newTask.name, // User ID
            name: newTask.taskDescription, // Adjusted key to snake_case
            status: newTask.status,
            application: newTask.application, // Assuming application holds the application ID
            deadline: newTask.deadline ? newTask.deadline.toISOString().split('T')[0] : null // Formatting the date
        };
    
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/tasks/', payload);
            setTasks([...tasks, response.data]);
            setNewTask({ name: '', taskDescription: '', status: 'Pipeline', application: '', deadline: null });
            setDrawerOpen(false);
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pipeline': return '#2DCCFF';
            case 'In Progress': return '#FFFF00';
            case 'On Hold': return '#BA3F38';
            case 'Completed': return '#006400';
            default: return 'inherit';
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box bgcolor="background.default" style={{ padding: 20 }} height={'83vh'}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography color="#F8C662" variant="h4" gutterBottom>Task List</Typography>
                    <Button variant="contained" color="primary" onClick={() => setDrawerOpen(true)}>
                        New Task
                    </Button>
                </Box>

                <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                    <Box display="flex" flexDirection="column" justifyContent="space-between" p={2} height="100%">
                        <Box p={2} width="500px">
                            <Typography variant="h6" gutterBottom>Task Details</Typography>
                            <form onSubmit={handleSubmit}>
                                <Autocomplete
                                    options={users}
                                    isOptionEqualToValue={(option, value) => option.id === value.id}
                                    getOptionLabel={(option) => option.username} // Adjust based on your user object
                                    renderInput={(params) => <TextField {...params} label="Name" />}
                                    fullWidth
                                    margin="normal"
                                    onChange={(event, newValue) => {
                                        console.log('new Value', newValue)
                                        setNewTask({ ...newTask, name: newValue ? newValue.id : '' });
                                    }}
                                />
                                <TextField label="Task" name="taskDescription" fullWidth margin="normal" onChange={handleInputChange} value={newTask.taskDescription} />
                                <Autocomplete
                                    options={applications}
                                    isOptionEqualToValue={(option, value) => option.id === value.id}
                                    getOptionLabel={(option) => option.name} // Adjust based on your application object
                                    renderInput={(params) => <TextField {...params} label="Application" />}
                                    fullWidth
                                    margin="normal"
                                    onChange={(event, newValue) => {
                                        setNewTask({ ...newTask, application: newValue ? newValue.id : '' });
                                    }}
                                />

                                <TextField 
                                    label="Status" 
                                    name="status" 
                                    select 
                                    SelectProps={{ native: true }} 
                                    fullWidth 
                                    margin="normal" 
                                    onChange={handleInputChange} 
                                    value={newTask.status}
                                >
                                    {statusOptions.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </TextField>

                                <Box mt={2} flexGrow={1}>
                                    <DesktopDatePicker
                                        label="Deadline"
                                        inputFormat="yyyy-MM-dd"
                                        value={newTask.deadline}
                                        onChange={handleDateChange}
                                        renderInput={(params) => <TextField {...params} fullWidth />}
                                    />
                                </Box>
                                
                                <Box mt={2} flexGrow={1}>
                                    <Button type="submit" color="primary" variant="contained">Submit</Button>
                                </Box>
                            </form>
                        </Box>
                    </Box>
                </Drawer>

                <TableContainer component={Paper} style={{ marginTop: 20 }}>
                    <Table aria-label="simple table">
                        <TableHead style={{ backgroundColor: '#7fb3d5' }}>
                            <TableRow>
                                <TableCell><strong>Name</strong></TableCell>
                                <TableCell><strong>Task</strong></TableCell>
                                <TableCell><strong>Application</strong></TableCell>
                                <TableCell><strong>Status</strong></TableCell>
                                <TableCell><strong>Deadline</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tasks.map((task, index) => (
                                <TableRow key={index} style={{ backgroundColor: index % 2 === 0 ? 'lightgrey' : 'white' }}>
                                    <TableCell>{task.user}</TableCell>
                                    <TableCell>{task.name}</TableCell>
                                    <TableCell>{task.application_id}</TableCell>
                                    <TableCell><strong style={{ color: getStatusColor(task.status) }}>{task.status}</strong></TableCell>
                                    <TableCell>{task.deadline}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </LocalizationProvider>
    );
};

export default Home;
