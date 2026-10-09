import DarkModeRounded from '@mui/icons-material/DarkModeRounded'
import LightModeRounded from '@mui/icons-material/LightModeRounded'
import TaskAltRounded from '@mui/icons-material/TaskAltRounded'
import { Box, CircularProgress, Container, IconButton, Stack, Tooltip, Typography } from '@mui/material'
import dayjs from 'dayjs'
import { greeting } from '../utils/date'

interface Props {
  done: number
  total: number
  mode: 'light' | 'dark'
  onToggleMode: () => void
}

export function HeroHeader({ done, total, mode, onToggleMode }: Props) {
  const percent = total ? Math.round((done / total) * 100) : 0
  const modeLabel = mode === 'dark' ? 'เปลี่ยนเป็นโหมดสว่าง' : 'เปลี่ยนเป็นโหมดมืด'

  return (
    <Box
      component="header"
      sx={{
        color: '#fff',
        background: 'linear-gradient(135deg, #4F46E5 0%, #0EA5E9 100%)',
        borderBottomLeftRadius: { xs: 28, sm: 40 },
        borderBottomRightRadius: { xs: 28, sm: 40 },
        pt: { xs: 3, sm: 4 },
        pb: { xs: 7, sm: 8 },
      }}
    >
      <Container maxWidth="md">
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ minWidth: 0 }}>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
              <TaskAltRounded sx={{ fontSize: { xs: 28, sm: 34 } }} aria-hidden />
              <Typography component="h1" sx={{ fontWeight: 700, fontSize: { xs: 24, sm: 32 } }}>
                Smart Todo System
              </Typography>
            </Stack>
            <Typography sx={{ opacity: 0.9, mt: 0.5, fontSize: { xs: 13, sm: 16 } }}>
              {greeting()} · {dayjs().format('dddd D MMMM YYYY')}
            </Typography>
          </Box>

          <Stack direction="row" spacing={{ xs: 0.5, sm: 2 }} sx={{ alignItems: 'center', flexShrink: 0 }}>
            <Tooltip title={`ความคืบหน้า: เสร็จ ${done} จาก ${total} งาน`}>
              <Box
                sx={{ position: 'relative', display: 'inline-flex' }}
                role="img"
                aria-label={`ความคืบหน้า ${percent} เปอร์เซ็นต์`}
              >
                <CircularProgress
                  variant="determinate"
                  value={100}
                  size={64}
                  thickness={5}
                  sx={{ color: 'rgba(255,255,255,0.25)', position: 'absolute' }}
                />
                <CircularProgress
                  variant="determinate"
                  value={percent}
                  size={64}
                  thickness={5}
                  sx={{ color: '#fff', '& circle': { strokeLinecap: 'round' } }}
                />
                <Box sx={{ inset: 0, position: 'absolute', display: 'grid', placeItems: 'center' }}>
                  <Typography sx={{ fontWeight: 700, fontSize: 15 }}>{percent}%</Typography>
                </Box>
              </Box>
            </Tooltip>
            <Tooltip title={modeLabel}>
              <IconButton onClick={onToggleMode} aria-label={modeLabel} sx={{ color: '#fff' }}>
                {mode === 'dark' ? <LightModeRounded /> : <DarkModeRounded />}
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}
