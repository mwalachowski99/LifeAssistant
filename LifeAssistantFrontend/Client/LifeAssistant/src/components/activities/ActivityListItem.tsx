import { Box, Card, CardContent, Typography, CardMedia, useMediaQuery } from "@mui/material";

interface ActivityListItemProps {
    name: string
    description: string
}
export default function ActivityListItem({ name, description }: ActivityListItemProps) {
    const isSmallScreen = useMediaQuery('(max-width:600px)');
    return (
        <Card variant="outlined" sx={{ display: 'flex', width: isSmallScreen ? "90%" : "45%", maxWidth: "520px", height: 151 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', width: "75%" }}>
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
                    sx={{  width: 151 }}
                    image="https://images.pexels.com/photos/20263436/pexels-photo-20263436/free-photo-of-morze-miasto-znane-miejsce-hotel.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="Live from space album cover"
                />
            </Card>
    )
}