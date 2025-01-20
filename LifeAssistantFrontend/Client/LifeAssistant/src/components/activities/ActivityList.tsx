import { Box, Paper, Stack } from "@mui/material";
import ActivityListItem from "./ActivityListItem";
import { ActivityDto } from "../../models/activityDto";
import { useState, useEffect } from "react";
import apiConnector from "../../api/apiConnector";
import ContentBox from "../containers/ContentBox";
import RegularButton from "../buttons/regularButton";
import AddIcon from '@mui/icons-material/Add';
import ActivityFormModal from "./ActivityFormModal";

export default function ActivityList() {

    const [activities, setActivities] = useState<ActivityDto[]>([])
    const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false)

    useEffect(() => {
        const fetchData = async () => {
            const fetchedActivities = await apiConnector.getActivities();
            setActivities(fetchedActivities);
        }
      
        fetchData();
    }, [])

    return (
        <>
        <ContentBox>
            <Stack
                spacing={{ xs: 1, sm: 3 }}
                direction="row"
                useFlexGap
                sx={{ flexWrap: 'wrap' }}
                padding="2%"
                justifyContent="center"
            >
                {activities.length !==0 &&
                    activities.map((activity) => (
                        <ActivityListItem name={activity.name} description={activity.description} />
                    ))
                }             
            </Stack>
            <Box >
                <RegularButton text={"NEW ACTIVITY"} image={<AddIcon />} onClick={() => setIsAddModalOpen(true)} />    
            </Box>
            </ContentBox>
            <ActivityFormModal isOpen={isAddModalOpen} handleClose={() => setIsAddModalOpen(false)} />
        </>
    )
}