import ChecklistRounded from '@mui/icons-material/ChecklistRounded'
import ListAltRounded from '@mui/icons-material/ListAltRounded'
import { Badge, Paper, Tab, Tabs } from '@mui/material'

interface Props {
  value: number
  activeCount: number
  onChange: (value: number) => void
}

const tabA11y = (i: number) => ({ id: `nav-tab-${i}`, 'aria-controls': `nav-tabpanel-${i}` })

export function NavTabs({ value, activeCount, onChange }: Props) {
  return (
    <Paper sx={{ p: 0.75, borderRadius: 999, mt: -5, position: 'relative' }}>
      <Tabs
        value={value}
        onChange={(_, v: number) => onChange(v)}
        variant="fullWidth"
        aria-label="เมนูหลัก"
        sx={{
          minHeight: 0,
          '& .MuiTabs-indicator': { display: 'none' },
          '& .MuiTab-root': {
            minHeight: 44,
            borderRadius: 999,
            fontSize: { xs: 13, sm: 15 },
            transition: 'background-color .2s, color .2s',
          },
          '& .MuiTab-root.Mui-selected': { bgcolor: 'primary.main', color: 'primary.contrastText' },
        }}
      >
        <Tab
          {...tabA11y(0)}
          iconPosition="start"
          icon={<ListAltRounded fontSize="small" />}
          label={
            <Badge
              badgeContent={activeCount}
              color="secondary"
              sx={{ '& .MuiBadge-badge': { right: -16, top: 2 } }}
            >
              งานของฉัน
            </Badge>
          }
        />
        <Tab
          {...tabA11y(1)}
          iconPosition="start"
          icon={<ChecklistRounded fontSize="small" />}
          label="Checklist ตรวจสอบ"
        />
      </Tabs>
    </Paper>
  )
}
