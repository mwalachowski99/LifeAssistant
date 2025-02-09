import {
    Box,
    Card,
    CardContent,
    Typography,
    CardMedia,
    useMediaQuery,
} from '@mui/material'

import { styled } from '@mui/material/styles'
import ButtonBase from '@mui/material/ButtonBase'

interface ActivityListItemProps {
    name: string
    description: string
    openInfoModal: () => void
}
export default function ActivityListItem({
    name,
    description,
    openInfoModal,
}: ActivityListItemProps) {
    const isSmallScreen = useMediaQuery('(max-width:600px)')

    const StyledCard = styled(Card)(({ theme }) => ({
        position: 'relative',
        display: 'flex',
        maxWidth: '520px',
        height: 151,
        width: isSmallScreen ? '90%' : '45%',

        '&:hover': {
            border: '2px solid black',
        },
    }))

    return (
        <StyledCard variant="outlined">
            <ButtonBase
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    textAlign: 'left',
                    width: '100%',
                    height: '100%',
                }}
                onClick={openInfoModal}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '75%',
                    }}
                >
                    <CardContent>
                        <Typography component="div" variant="h5">
                            {name}
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            component="div"
                            sx={{ color: 'text.secondary' }}
                        >
                            {description}
                        </Typography>
                    </CardContent>
                </Box>
                <CardMedia
                    component="img"
                    sx={{ width: 151 }}
                    image="https://images.pexels.com/photos/20263436/pexels-photo-20263436/free-photo-of-morze-miasto-znane-miejsce-hotel.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="Live from space album cover"
                />
            </ButtonBase>
        </StyledCard>
    )
}
