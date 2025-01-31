import { Box, TextField } from '@mui/material'
import BaseModal from '../modals/BaseModal'
import SaveIcon from '@mui/icons-material/Save'
import apiConnector from '../../api/apiConnector'
import { ActivityDto } from '../../models/activityDto'
import { ChangeEvent, useState } from 'react'
import { useAppDispatch } from '../../store/useAppDispatch'
import { addActivity } from '../../actions/activities'
import RegularButton from '../buttons/regularButton'

interface ActivityFormModalProps {
    isOpen: boolean
    handleClose: () => void
}
export default function ActivityFormModal({
    isOpen,
    handleClose,
}: ActivityFormModalProps) {
    const [activity, setActivity] = useState<ActivityDto>({
        id: undefined,
        name: '',
        description: '',
    })

    const dispatch = useAppDispatch()

    const onSubmit = () => {
        dispatch(addActivity(activity)).then(handleClose)
    }

    const handleInputChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = event.target
        setActivity({ ...activity, [name]: value })
    }

    return (
        <BaseModal isOpen={isOpen} handleClose={handleClose}>
            <Box component="form" noValidate onSubmit={onSubmit}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                    value={activity.name}
                    onChange={handleInputChange}
                    autoFocus
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
                    id="name"
                    label="Description"
                    name="description"
                    value={activity.description}
                    onChange={handleInputChange}
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
                <RegularButton
                    text={'SAVE'}
                    image={<SaveIcon />}
                    onClick={onSubmit}
                />
            </Box>
        </BaseModal>
    )
}
