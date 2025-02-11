import {
    Box,
    IconButton,
    Stack,
    TextField,
    Typography,
    useMediaQuery,
} from '@mui/material'
import BaseModal from '../modals/BaseModal'
import SaveIcon from '@mui/icons-material/Save'
import EditIcon from '@mui/icons-material/Edit'
import { ActivityDto } from '../../models/activityDto'
import { ChangeEvent, useEffect, useState } from 'react'
import { useAppDispatch } from '../../store/useAppDispatch'
import RegularButton from '../buttons/regularButton'
import DeleteIcon from '@mui/icons-material/Delete'
import { deleteActivity, editActivity } from '../../actions/activities'

interface ActivityInfoModalProps {
    isOpen: boolean
    handleClose: () => void
    currentActivity: ActivityDto
}
export default function ActivityInfoModal({
    isOpen,
    handleClose,
    currentActivity,
}: ActivityInfoModalProps) {
    const dispatch = useAppDispatch()
    const isSmallScreen = useMediaQuery('(max-width:600px)')

    const onDelete = () => {
        if (activity?.id)
            dispatch(deleteActivity(activity?.id)).then(handleClose)
    }

    const [editMode, setEditMode] = useState(false)
    const [editedActivity, setEditedActivity] = useState(currentActivity)

    const [activity, setActivity] = useState(currentActivity)

    useEffect(() => {
        setEditedActivity(activity)
        setActivity(currentActivity)
        setEditMode(false)
    }, [isOpen])

    const onEdit = () => {
        setEditMode(!editMode)
    }

    const handleInputChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = event.target
        setEditedActivity({ ...editedActivity, [name]: value })
    }

    const onSave = () => {
        dispatch(editActivity(editedActivity)).then(() => {
            setActivity(editedActivity)
            setEditMode(false)
        })
    }

    const NormalMode = () => (
        <>
            <Typography
                margin="normal"
                fontSize={40}
                lineHeight={0.7}
                marginBottom={2}
            >
                {activity?.name}
            </Typography>
            <Typography
                margin="normal"
                sx={{ color: 'text.secondary' }}
                lineHeight={1}
            >
                {activity?.description}
            </Typography>
        </>
    )

    const EditMode = () => (
        <>
            <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                defaultValue={editedActivity.name}
                onBlur={handleInputChange}
                sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#5A6CCB',
                    },
                    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline':
                        {
                            borderColor: '#5A6CCB',
                        },
                }}
                error={false}
                helperText={''}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                id="description"
                label="Description"
                name="description"
                defaultValue={editedActivity.description}
                onBlur={handleInputChange}
                sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#5A6CCB',
                    },
                    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline':
                        {
                            borderColor: '#5A6CCB',
                        },
                }}
                error={false}
                helperText={''}
            />
        </>
    )

    return (
        <BaseModal isOpen={isOpen} handleClose={handleClose}>
            <Box position="relative">
                <Stack
                    direction={isSmallScreen ? 'column' : 'row'}
                    spacing={2}
                    alignItems="flex-start"
                >
                    <Box flex={isSmallScreen ? 1 : 2} width="100%">
                        <Stack
                            direction="row"
                            spacing={1}
                            justifyContent="space-between"
                        >
                            <Stack direction="row" spacing={1}>
                                <IconButton
                                    aria-label="delete"
                                    onClick={onDelete}
                                >
                                    <DeleteIcon fontSize="large" />
                                </IconButton>
                                <IconButton aria-label="edit" onClick={onEdit}>
                                    <EditIcon fontSize="large" />
                                </IconButton>
                            </Stack>
                            {editMode && (
                                <IconButton aria-label="save" onClick={onSave}>
                                    <SaveIcon fontSize="large" />
                                </IconButton>
                            )}
                        </Stack>
                        <Box marginTop={2}>
                            {!editMode ? <NormalMode /> : <EditMode />}
                        </Box>
                    </Box>

                    <Box
                        flex={isSmallScreen ? 2 : 1}
                        display="flex"
                        justifyContent="flex-end"
                        alignItems="center"
                    >
                        <img
                            width="100%"
                            height="auto"
                            style={{
                                minWidth: '200px',
                                maxWidth: isSmallScreen ? '100%' : '400px',
                            }}
                            src="https://images.pexels.com/photos/20263436/pexels-photo-20263436/free-photo-of-morze-miasto-znane-miejsce-hotel.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        />
                    </Box>
                </Stack>
            </Box>
        </BaseModal>
    )
}
