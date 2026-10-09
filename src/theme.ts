import { createTheme, type PaletteMode } from '@mui/material/styles'

export function getTheme(mode: PaletteMode) {
  const dark = mode === 'dark'
  return createTheme({
    palette: {
      mode,
      primary: { main: dark ? '#818CF8' : '#4F46E5' },
      secondary: { main: '#0EA5E9' },
      background: {
        default: dark ? '#0F172A' : '#F5F7FB',
        paper: dark ? '#1E293B' : '#FFFFFF',
      },
    },
    shape: { borderRadius: 16 },
    typography: {
      fontFamily: '"Prompt", "Segoe UI", sans-serif',
      button: { textTransform: 'none', fontWeight: 600 },
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            boxShadow: dark ? '0 4px 20px rgba(0,0,0,0.35)' : '0 4px 20px rgba(79,70,229,0.08)',
          },
        },
      },
      MuiTooltip: { defaultProps: { arrow: true } },
    },
  })
}
