import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';

function AnalysisPage() {
    const inputMessage = "how to cook delicious food";  // Update this based on your need

    const handleClick = async () => {
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
                    'Authorization': `Bearer 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`, // 使用你的API key
                    'Content-Type': 'application/json',
                }
            });

            if (response.data && response.data.choices && response.data.choices.length > 0) {
                let answer = response.data.choices[0].message.content.trim();
                console.log(answer);
            }
        } catch (error) {
            console.error("Error connecting to OpenAI:", error);
        }
    };

    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Container>
                <Typography variant="h4" gutterBottom>
                    ChatGPT 交互示例
                </Typography>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleClick} 
                    sx={{ marginBottom: 2 }}
                >
                    发送到ChatGPT
                </Button>
            </Container>
        </Box>
    );
}

export default AnalysisPage;
