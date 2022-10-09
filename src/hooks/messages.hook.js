import { Alert, Backdrop, CircularProgress, Collapse } from "@mui/material"

export const useMessages = () => {
    function ErrorMessage({open, setShowMessage, message}) {
        return (
          <Collapse in={open}>
            <Alert
              severity="error"
              onClose={() => {setShowMessage(false)}}
            >
              {message}
            </Alert>
          </Collapse>
          
        )
    }
      
    function WaitingLoading({ backDrop, setBackDrop }) {
        return (
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={backDrop}
            onClick={() => setBackDrop(false)}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        )
    }
    return {
        ErrorMessage,
        WaitingLoading
    }
}