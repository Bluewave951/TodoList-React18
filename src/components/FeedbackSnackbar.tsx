import { Alert, Button, Snackbar } from '@mui/material'

export interface Feedback {
  key: number
  message: string
  severity: 'success' | 'info' | 'warning'
  undo?: () => void
}

interface Props {
  feedback: Feedback | null
  onClose: () => void
}

export function FeedbackSnackbar({ feedback, onClose }: Props) {
  return (
    <Snackbar
      key={feedback?.key}
      open={!!feedback}
      autoHideDuration={feedback?.undo ? 5000 : 2500}
      onClose={(_, reason) => reason !== 'clickaway' && onClose()}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert
        role="alert"
        variant="filled"
        severity={feedback?.severity ?? 'info'}
        onClose={onClose}
        sx={{ width: '100%', borderRadius: 3 }}
        action={
          feedback?.undo ? (
            <Button
              color="inherit"
              size="small"
              onClick={() => {
                feedback.undo?.()
                onClose()
              }}
            >
              เลิกทำ
            </Button>
          ) : undefined
        }
      >
        {feedback?.message}
      </Alert>
    </Snackbar>
  )
}
