import React, { useState } from "react";
import {
    Container,
    Typography,
    Paper,
    Chip,
    TextField,
    Button,
    Box,
    Grid,
} from "@mui/material";

const SettingsContent = () => {
    // Predefined list of interests
    const initialInterests = [
        "Dating",
        "Open Relationship",
        "Friendship",
        "Long-term Relationship",
        "Short-term Relationship",
        "Travel Partner",
        "Coffee Date",
        "Date Night",
        "Flirting",
        "Decent Talk Only",
    ];

    // State to manage the list of interests
    const [interests, setInterests] = useState(initialInterests);
    // State to manage the input field for new interests
    const [newInterest, setNewInterest] = useState("");

    // Function to handle adding a new interest
    const handleAddInterest = () => {
        if (newInterest.trim() !== "") {
            setInterests([...interests, newInterest.trim()]);
            setNewInterest(""); // Clear the input field
        }
    };

    return (
        <Container sx={{ mt: 4, p: 3 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", mb: 3 }}>
                My Interests
            </Typography>

            {/* Display the list of interests as chips */}
            <Paper elevation={3} sx={{ p: 3, borderRadius: 2, mb: 3 }}>
                <Grid container spacing={2}>
                    {interests.map((interest, index) => (
                        <Grid item key={index}>
                            <Chip
                                label={interest}
                                sx={{
                                    backgroundColor: "#e0e7ff",
                                    color: "#1e40af",
                                    fontWeight: "bold",
                                    "&:hover": { backgroundColor: "#d1d5db" },
                                }}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Paper>

            {/* Add new interest section */}
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Add a new interest"
                    value={newInterest}
                    onChange={(e) => setNewInterest(e.target.value)}
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                        },
                    }}
                />
                <Button
                    variant="contained"
                    onClick={handleAddInterest}
                    sx={{
                        backgroundColor: "#3b82f6",
                        color: "#fff",
                        borderRadius: 2,
                        px: 3,
                        py: 1.5,
                        "&:hover": { backgroundColor: "#2563eb" },
                    }}
                >
                    Add
                </Button>
            </Box>
        </Container>
    );
};

export default SettingsContent;