import { Grid } from "@mui/material"
import { Container } from "@mui/system"
import React from "react"
import AddSection from "./AddSection"
import SectionsList from "./SectionsList"

export const SectionsWrraper = ({display}) => {

    const [selectedChapter, setSelectedChapter] = React.useState(0);
    const [editMode, setEditMode] = React.useState(false);
    const [showAddSection, setShowAddSection] = React.useState(false);

    if (display === 'none') return null;
    return (
        <React.Fragment>
            {/* <Toolbar /> */}
            <Container maxWidth="lg"  >
                <Grid container spacing={5} display={display}>
                    <Grid item xs={12} md={12} lg={12}>
                        <SectionsList 
                            selectedChapter={selectedChapter}
                            setSelectedChapter={setSelectedChapter}
                            setShowAddSection={setShowAddSection}
                            showAddSection={showAddSection}
                            editMode={editMode}
                            setEditMode={setEditMode}
                        />
                    </Grid>
                    {!showAddSection? null : 
                    <Grid item xs={12} md={12} lg={12}>
                        <AddSection 
                            editMode={editMode}
                            setEditMode={setEditMode}
                            showAddSection={showAddSection}
                            setShowAddSection={setShowAddSection} />
                    </Grid>}
                </Grid>
            </Container>
        </React.Fragment>
    )
}