import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Divider from '@mui/material/Divider'
import FormLabel from '@mui/material/FormLabel'
import FormControl from '@mui/material/FormControl'
import Link from '@mui/material/Link'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import AccountCard from '../AccountCard'
import { darkGrey } from '../../../styles/colors'
import apiConnector from '../../../api/apiConnector'
import { useAppDispatch } from '../../../store/useAppDispatch'
import { signIn } from '../../../actions/auth'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/rootState'
import { Navigate } from 'react-router-dom'

export default function SignIn(props: { disableCustomTheme?: boolean }) {
    const [emailError, setEmailError] = React.useState(false)
    const [emailErrorMessage, setEmailErrorMessage] = React.useState('')
    const [passwordError, setPasswordError] = React.useState(false)
    const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('')

    const isAuthenticated = useSelector(
        (state: RootState) => state.auth.isAuthenticated
    )

    const dispatch = useAppDispatch()

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        const data = new FormData(event.currentTarget)
        event.preventDefault()
        dispatch(
            signIn(
                data.get('email')?.toString() ?? '',
                data.get('password')?.toString() ?? '',
                true
            )
        )
    }
    if (isAuthenticated) {
        return <Navigate to="/activities" />
    }

    return (
        <Box
            sx={{
                minHeight: '100vh',
                minWidth: '100vw',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundImage:
                    'url("https://img.freepik.com/free-vector/futuristic-background-with-lines_23-2148487905.jpg?t=st=1737629498~exp=1737633098~hmac=50f7ffee135f258307f77e198805b09feb657603bd6c3f44ad23cb7c9dd33998&w=1800")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <AccountCard variant="outlined">
                <Typography
                    component="h1"
                    variant="h4"
                    sx={{
                        width: '100%',
                        fontSize: 'clamp(2rem, 10vw, 2.15rem)',
                    }}
                >
                    Sign in
                </Typography>
                <Box
                    component="form"
                    onSubmit={onSubmit}
                    noValidate
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        gap: 2,
                    }}
                >
                    <FormControl>
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <TextField
                            error={emailError}
                            helperText={emailErrorMessage}
                            id="email"
                            type="email"
                            name="email"
                            placeholder="your@email.com"
                            autoComplete="email"
                            autoFocus
                            required
                            fullWidth
                            variant="outlined"
                            color={emailError ? 'error' : 'primary'}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <TextField
                            error={passwordError}
                            helperText={passwordErrorMessage}
                            name="password"
                            placeholder="••••••"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            autoFocus
                            required
                            fullWidth
                            variant="outlined"
                            color={passwordError ? 'error' : 'primary'}
                        />
                    </FormControl>
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        //onClick={validateInputs}
                    >
                        Sign in
                    </Button>
                    <Link
                        component="button"
                        type="button"
                        //onClick={handleClickOpen}
                        sx={{ alignSelf: 'center', color: darkGrey }}
                    >
                        Forgot your password?
                    </Link>
                </Box>
                <Divider>or</Divider>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                    }}
                >
                    <Typography sx={{ textAlign: 'center' }}>
                        Don&apos;t have an account?{' '}
                        <Link
                            href="/material-ui/getting-started/templates/sign-in/"
                            sx={{ alignSelf: 'center', color: darkGrey }}
                        >
                            Sign up
                        </Link>
                    </Typography>
                </Box>
            </AccountCard>
        </Box>
    )
}
