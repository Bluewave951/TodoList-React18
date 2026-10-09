import DeleteForeverRounded from '@mui/icons-material/DeleteForeverRounded'
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from '@mui/material'
import type { Todo } from '../types/todo'

interface Props {
  todo: Todo | null
  onCancel: () => void
  onConfirm: (id: string) => void
}

export function ConfirmDeleteDialog({ todo, onCancel, onConfirm }: Props) {
  return (
    <Dialog
      open={!!todo}
      onClose={onCancel}
      aria-labelledby="confirm-delete-title"
      aria-describedby="confirm-delete-desc"
      fullWidth
      maxWidth="xs"
      slotProps={{ paper: { sx: { borderRadius: 4, m: 2 } } }}
    >
      <DialogTitle id="confirm-delete-title" sx={{ pb: 1 }}>
        <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
          <Avatar sx={{ bgcolor: 'error.main', width: 40, height: 40 }}>
            <DeleteForeverRounded />
          </Avatar>
          <Typography component="span" variant="h6" sx={{ fontWeight: 700 }}>
            ยืนยันการลบงาน?
          </Typography>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <Typography id="confirm-delete-desc" sx={{ color: 'text.secondary', wordBreak: 'break-word' }}>
          ต้องการลบ “<b>{todo?.title}</b>” ใช่หรือไม่
        </Typography>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
        <Button onClick={onCancel} autoFocus aria-label="ยกเลิกการลบ" sx={{ borderRadius: 999 }}>
          ยกเลิก
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => todo && onConfirm(todo.id)}
          aria-label="ยืนยันลบงาน"
          sx={{ borderRadius: 999, px: 3 }}
        >
          ลบเลย
        </Button>
      </DialogActions>
    </Dialog>
  )
}
