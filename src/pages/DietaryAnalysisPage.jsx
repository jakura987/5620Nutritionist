import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, Table, TableBody, TableCell, TableHead, TableRow, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions } from '@mui/material';

import { db } from '../firebaseConfig';
import { collection, getDocs, updateDoc, doc, orderBy, query } from "firebase/firestore";
import axios from 'axios';

function DietaryAnalysisPage() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [aiResponse, setAiResponse] = useState('');  // add new status variable(AI response)


    useEffect(() => {
        async function fetchData() {
            const userCollection = collection(db, "users");
            const userQuery = query(userCollection, orderBy("displayName"));
            const userSnapshot = await getDocs(userQuery);
            const userList = userSnapshot.docs.map(doc => ({
                ...doc.data(),
                docId: doc.id  // save document ID as docId attribute 
            }));
            setUsers(userList); // get user data from database(firebase)
        }

        fetchData();
    }, []);

    const handleDetailClick = (user) => { //user details
        setSelectedUser(user);
        setAiResponse(user.advice || '');  // if user.advice == null, set it ''
    };


    const handleClose = () => { // close suer detail page
        setSelectedUser(null);
    };


    const handleConfirmClick = async () => { //Nutritiontist (advice provided to user) 
        if (selectedUser) {
            const userDoc = doc(db, "users", selectedUser.docId); //  use selectedUser docId as document ID
            await updateDoc(userDoc, { advice: aiResponse });  // use aiResponse as advice content
            // update local status
            const updatedUsers = users.map(user => {
                if (user.docId === selectedUser.docId) {
                    return { ...user, advice: aiResponse };  // use aiResponse to update advice content
                }
                return user;
            });
            setUsers(updatedUsers);
            handleClose();
        }
    };




    const analysisByAI = async () => { //AI automaticallt analysis
        if (selectedUser) {
            const inputMessage = `"Please provide personalized dietary recommendations and recipes (a brief analysis is fine, about 100 words) based on height: ${selectedUser.height} cm, 
            weight: ${selectedUser.weight} kg, healthStatus: ${selectedUser.healthStatus}, healthDiets: ${selectedUser.dietHabits}, gender: ${selectedUser.gender}, age: ${selectedUser.age}岁。`;
            // console.log(inputMessage)
            // const inputMessage = `repeat gender: ${selectedUser.gender}`
            try {
                const response = await axios.post('https://api.openai.com/v1/chat/completions', {
                    model: "gpt-3.5-turbo",
                    messages: [{
                        role: "user",
                        content: inputMessage
                    }],
                    temperature: 0.7
                }, {
                    headers: {
                        'Authorization': `Bearer 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`, // use your API key
                        'Content-Type': 'application/json',
                    }
                });

                if (response.data && response.data.choices && response.data.choices.length > 0) {
                    let answer = response.data.choices[0].message.content.trim();
                    setAiResponse(answer);  // set data provided by GPT-3 and set the data as the status of aiResponse
                }
            } catch (error) {
                console.error("Error connecting to OpenAI:", error);
            }
        }

    };


    return (
        <Container>
            <Typography variant="h4" align="center" marginBottom={3}>
                Dietary Analysis
            </Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Age</TableCell>
                        <TableCell>Gender</TableCell>
                        <TableCell>Operation</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map(user => (
                        <TableRow key={user.docId}>  {/* use docId as key */}
                            <TableCell>{user.displayName}</TableCell>
                            <TableCell>{user.age}</TableCell>
                            <TableCell>{user.gender}</TableCell>
                            <TableCell>
                                <Button variant="contained" color="primary" onClick={() => handleDetailClick(user)}>
                                    Detail
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* 用户详细信息的弹窗 */}
            <Dialog open={!!selectedUser} onClose={handleClose} fullWidth maxWidth="md">
                <DialogTitle>User Detail</DialogTitle>
                <DialogContent>
                    {selectedUser && (
                        <div>
                            <DialogContentText>Height: {selectedUser.height} cm</DialogContentText>
                            <DialogContentText>Weight: {selectedUser.weight} kg</DialogContentText>
                            <DialogContentText>health Condition: {selectedUser.healthStatus}</DialogContentText>
                            <DialogContentText>dietary habits: {selectedUser.dietHabits}</DialogContentText>
                            <TextField
                                fullWidth
                                label="Dr.Bob's advice"
                                variant="outlined"
                                multiline
                                rows={4}
                                value={aiResponse}
                                onChange={(e) => setAiResponse(e.target.value)}  // update aiResponse status
                                margin="normal"
                            />
                        </div>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={analysisByAI} color="primary">  {/* use analysisByAI method */}
                        Analysis
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmClick} color="primary">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );

}

export default DietaryAnalysisPage;
