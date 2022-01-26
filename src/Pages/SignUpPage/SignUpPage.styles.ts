import {styled} from '@mui/material/styles'
import {Paper} from '@mui/material'

export const Wrapper = styled(Paper)(({theme})=>({
width: '100%',
    height: '100%',


    'form':{
    position: 'absolute',
        top: "60%",
        left: "50%",
        transform: 'translate(-50%, -50%)',
    width: '50%',
    height: '80%',
    backgroundColor: theme.palette.background

    }
}))

export const FormContainer = styled(Paper)(({theme})=> ({
    backgroundColor: theme.customBoxBackground.default,
    boxShadow: theme.shadows[20]
}))

