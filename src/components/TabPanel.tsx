import { Box } from '@mui/material'
import type { ReactNode } from 'react'

interface Props {
  index: number
  value: number
  children: ReactNode
}

export function TabPanel({ index, value, children }: Props) {
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      sx={{ pt: 3 }}
    >
      {value === index && children}
    </Box>
  )
}
