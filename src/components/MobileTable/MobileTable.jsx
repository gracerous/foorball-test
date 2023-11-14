import { useState } from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useCategory } from '../../context/CategoryProvider';

function MobileRow({ game }) {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const FLEX_1 = { flex: 1 };
  const SIDEPADDING_5 = { padding: '0 5px' };

  const mobileGameDate = (game) => {
    const timestamp = game.timestamp;
    const date = new Date(timestamp * 1000);
    const formattedDate = `${date.getDate()}.${date.getMonth() + 1}`;
    return formattedDate;
  };

  const mobileGameTime = (game) => {
    const timestamp = game.timestamp;
    const date = new Date(timestamp * 1000);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const formattedDate = `${hours}:${minutes}`;
    return formattedDate;
  };

  return (
    <Paper sx={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      borderRadius: '1.5625rem',
      fontSize: '0.75rem !important',
      // color: theme.palette.text.primary
    }}>
      <Button
        aria-label='expand row'
        onClick={() => setOpen(!open)}
        sx={{ display: 'inline-block', borderRadius: 'inherit', color: theme.palette.text.primary }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            minHeight: '4.375rem',
          }}
        >
          <Box sx={{ ...FLEX_1, ...SIDEPADDING_5, lineHeight: 1 }}>
            <Typography noWrap={false} variant='p'>{game.home_name}</Typography>
          </Box>
          <Box>
            <Box component='img' src={game.home_logo} alt={`Home Logo - ${game.home_name}`} sx={{ width: '36px', height: '36px', borderRadius: '50%', flex: 1 }}></Box>
          </Box>
          <Box sx={{ ...FLEX_1, ...SIDEPADDING_5 }}>
            <Typography variant='h3'>{mobileGameTime(game)}</Typography>
            <Typography sx={{ fontSize: 13 }} variant='p'>{mobileGameDate(game)}</Typography>
          </Box>
          <Box>
            <Box component='img' src={game.away_logo} alt={`Home Logo - ${game.away_name}`} sx={{ width: '36px', height: '36px', borderRadius: '50%', flex: 1 }}></Box>
          </Box>
          <Box sx={{ ...FLEX_1, ...SIDEPADDING_5, lineHeight: 1 }}>
            <Typography noWrap={false} variant='p'>{game.away_name}</Typography>
          </Box>
        </Box>
        <Box>
          <Collapse in={open} timeout="auto" unmountOnExit orientation='vertical'>
            <Typography variant='p'>more info</Typography>
          </Collapse>
        </Box>
      </Button>
    </Paper>
  )
}

export default function MobileTable({ data }) {
  const theme = useTheme();
  const { category } = useCategory();
  return (
    <>
      <Typography sx={{
        fontSize: '20px',
        color: theme.palette.primary.secondary,
        fontWeight: '450'
      }}>{category}</Typography>
      {data.map((game) => (
        <MobileRow game={game} key={game.id} />
      ))}
    </>
  );
}