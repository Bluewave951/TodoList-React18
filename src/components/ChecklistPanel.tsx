import ExpandMoreRounded from '@mui/icons-material/ExpandMoreRounded'
import VerifiedRounded from '@mui/icons-material/VerifiedRounded'
import { Accordion, AccordionDetails, AccordionSummary, Box, Chip, Stack, Typography } from '@mui/material'

const CHECKS = [
  {
    title: 'Prop Validation',
    tag: 'PropTypes',
    items: [
      'TodoItem มี TypeScript interface + PropTypes ครบ (title, priority, dueDate, completed, callbacks)',
      'ทุก prop สำคัญเป็น .isRequired และ priority ใช้ PropTypes.oneOf',
      'ขาด prop แล้ว Console (dev) แสดงคำเตือน "Failed prop type"',
    ],
  },
  {
    title: 'Responsive Layout',
    tag: 'MUI Breakpoints',
    items: [
      'Stack เปลี่ยน direction ตาม xs / sm / md',
      'กว้าง 360px ไม่มี horizontal scroll, ชื่องานยาวตัดบรรทัดได้',
      'ปุ่มจัดการแสดงตลอดบนมือถือ และเด่นขึ้นเมื่อ hover บน Desktop',
    ],
  },
  {
    title: 'Edit / View Mode',
    tag: 'isEditing',
    items: [
      'กดแก้ไข → Edit mode, บันทึก (Enter) → onEdit แล้วกลับ View mode',
      'ยกเลิก (Esc) → คืนค่าเดิม',
      'บันทึกไม่ได้ถ้าชื่องานว่าง (แสดง error)',
    ],
  },
  {
    title: 'Accessibility & UX',
    tag: 'A11y & Tooltip',
    items: [
      'Tooltip + aria-label ครบทุกปุ่ม (Toggle, แก้ไข, ลบ, บันทึก, ยกเลิก, Dark mode)',
      'Tab / TabPanel จับคู่ id, aria-controls, aria-labelledby',
      'Feedback: ขีดฆ่า + จางลง + Progress Ring + Snackbar (มีปุ่มเลิกทำ)',
    ],
  },
  {
    title: 'State Lifting & Performance',
    tag: 'State Lifting',
    items: [
      'todos อยู่ใน App.tsx ที่เดียว ส่ง onToggle / onDelete / onEdit ลงไปถึง TodoItem',
      'callbacks ใช้ useCallback, รายการกรอง/เรียงใช้ useMemo, TodoItem ใช้ React.memo',
      'อัปเดต state แบบ immutable และใช้ key={todo.id}',
    ],
  },
]

export function ChecklistPanel() {
  return (
    <Stack spacing={1.5}>
      {CHECKS.map((c, i) => (
        <Accordion key={c.title} defaultExpanded={i === 0} disableGutters sx={{ borderRadius: '16px !important', '&::before': { display: 'none' } }}>
          <AccordionSummary expandIcon={<ExpandMoreRounded />} aria-controls={`check-${i}`} id={`check-${i}-header`}>
            <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', minWidth: 0, flexWrap: 'wrap', rowGap: 0.5 }}>
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  display: 'grid',
                  placeItems: 'center',
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                {i + 1}
              </Box>
              <Typography sx={{ fontWeight: 600 }}>{c.title}</Typography>
              <Chip size="small" label={c.tag} variant="outlined" color="secondary" />
            </Stack>
          </AccordionSummary>
          <AccordionDetails id={`check-${i}`}>
            <Stack component="ul" spacing={1} sx={{ p: 0, m: 0 }}>
              {c.items.map((item) => (
                <Stack component="li" key={item} direction="row" spacing={1} sx={{ listStyle: 'none' }}>
                  <VerifiedRounded color="success" fontSize="small" aria-label="ผ่าน" />
                  <Typography variant="body2">{item}</Typography>
                </Stack>
              ))}
            </Stack>
          </AccordionDetails>
        </Accordion>
      ))}
    </Stack>
  )
}
