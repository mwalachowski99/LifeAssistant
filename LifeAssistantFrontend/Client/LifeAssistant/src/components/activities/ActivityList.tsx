import { Box, Paper, Stack } from '@mui/material'
import ActivityListItem from './ActivityListItem'
import { ActivityDto } from '../../models/activityDto'
import { useState, useEffect } from 'react'
import apiConnector from '../../api/apiConnector'
import ContentBox from '../containers/ContentBox'
import AddIcon from '@mui/icons-material/Add'
import ActivityFormModal from './ActivityFormModal'
import { getActivities } from '../../actions/activities'
import { useAppDispatch } from '../../store/useAppDispatch'
import RegularButton from '../buttons/regularButton'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/rootState'

export default function ActivityList() {
    const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false)
    const dispatch = useAppDispatch()
    const { activities } = useSelector((state: RootState) => state.activities)

    useEffect(() => {
        dispatch(getActivities())
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
                    {activities?.length !== 0 &&
                        activities?.map((activity: ActivityDto) => (
                            <ActivityListItem
                                key={activity.id}
                                name={activity.name}
                                description={activity.description}
                            />
                        ))}
                </Stack>
                <Box>
                    <RegularButton
                        text={'NEW ACTIVITY'}
                        image={<AddIcon />}
                        onClick={() => setIsAddModalOpen(true)}
                    />
                </Box>
            </ContentBox>
            <ActivityFormModal
                isOpen={isAddModalOpen}
                handleClose={() => setIsAddModalOpen(false)}
            />
        </>
    )
}
