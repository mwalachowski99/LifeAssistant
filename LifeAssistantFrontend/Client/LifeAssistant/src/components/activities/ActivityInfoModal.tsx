import {
    Box,
    IconButton,
    Stack,
    Typography,
    useMediaQuery,
} from '@mui/material'
import BaseModal from '../modals/BaseModal'
import SaveIcon from '@mui/icons-material/Save'
import { ActivityDto } from '../../models/activityDto'
import { ChangeEvent, useState } from 'react'
import { useAppDispatch } from '../../store/useAppDispatch'
import RegularButton from '../buttons/regularButton'
import DeleteIcon from '@mui/icons-material/Delete'
import { deleteActivity } from '../../actions/activities'

interface ActivityInfoModalProps {
    isOpen: boolean
    handleClose: () => void
    activity: ActivityDto | undefined
}
export default function ActivityInfoModal({
    isOpen,
    handleClose,
    activity,
}: ActivityInfoModalProps) {
    const dispatch = useAppDispatch()
    const isSmallScreen = useMediaQuery('(max-width:600px)')

    const onDelete = () => {
        if (activity?.id)
            dispatch(deleteActivity(activity?.id)).then(handleClose)
    }

    return (
        <BaseModal isOpen={isOpen} handleClose={handleClose}>
            <Box position="relative">
                <IconButton
                    aria-label="delete"
                    onClick={onDelete}
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                    }}
                >
                    <DeleteIcon fontSize="large" />
                </IconButton>
                <Stack
                    direction={isSmallScreen ? 'column' : 'row'}
                    spacing={2}
                    alignItems="center"
                >
                    <Box flex={isSmallScreen ? 1 : 2} paddingTop="40px">
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
                    </Box>
                    <Box
                        flex={isSmallScreen ? 2 : 1}
                        display="flex"
                        justifyContent="flex-end"
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
