/* eslint-disable indent */
import React, { useState, useEffect, useContext } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import MainContext from '../../context/mainContext/MainContext';
function Alert(props) 
{
    return <MuiAlert 
        elevation={6} 
        variant="filled" 
        {...props} />;
}
const useStyles = makeStyles(theme => (
    {
        root: {
            width: '100%',
            '& > * + *': {
                marginTop: theme.spacing(2),
            },
        },
    }
));
export const SnackBarMsg = () => 
{
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const mainContext = useContext(MainContext)
    const { setSnackBarMsg, snackBarMsg } = mainContext
    useEffect(() => {
        if (snackBarMsg && !open) 
        {
            setOpen(true);
        }
        if ((!snackBarMsg || snackBarMsg.msg) ==='' && open) 
        {
            setOpen(false);
            setSnackBarMsg(null)
        }
        // eslint-disable-next-line
    }, [open,snackBarMsg, setSnackBarMsg]);
    const handleClose = () => 
    {
        setOpen(false);
        setSnackBarMsg(null);
    };
    return (
        <div className={classes.root}>
            {
                snackBarMsg && 
                <Snackbar 
                    open={open} 
                    autoHideDuration={3000} 
                    onClose={handleClose}>
                    <Alert onClose={handleClose} severity={snackBarMsg && snackBarMsg.type === 0 ? "success" : "error"}>
                        {snackBarMsg && snackBarMsg.msg}
                    </Alert>
                </Snackbar>
            }
        </div>
    );
}
export default SnackBarMsg