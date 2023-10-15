import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useTheme } from '@mui/material/styles';
import { Box, Paper, Typography, IconButton } from '@mui/material';
import SeriesTable from '../SeriesTable/SeriesTable';
import SeriesFilter from '../Filters/SeriesFilter/SeriesFilter';
import { useSeriesLimits } from '../../context/SeriesLimitsProvider';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

const SortableItemSeries = ({ id, rowData, teams, leagues, categoryName }) => {
  const theme = useTheme();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id });

  const { goalSeriesLimit, yCardsSeriesLimit } = useSeriesLimits();

  const getSeriesLimitForTable = () => {
    if (id === 'goals') {
      return goalSeriesLimit;
    } else if (id === 'yCards') {
      return yCardsSeriesLimit;
    }
  };


  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || undefined,
    position: 'relative',
    borderRadius: '40px',
    padding: '15px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '406px',
  };

  return (
    <Paper sx={style} ref={setNodeRef}>
      <Box
        sx={{
          position: 'absolute',
          color: theme.palette.text.icons
        }}
        {...listeners}
        {...attributes}
      >
        <IconButton><DragIndicatorIcon sx={{ fontSize: '30px' }} /></IconButton>
      </Box>
      <Box>
        <Typography variant='h3'>{categoryName}</Typography>
      </Box>
      <Box>
        <Box sx={{ marginBottom: '10px' }}>
          <SeriesFilter category={id} />
        </Box>
        <SeriesTable
          rowData={rowData}
          teams={teams}
          leagues={leagues}
          tableSeriesLimit={getSeriesLimitForTable()}
        />
      </Box>
    </Paper>
  );
};

export default SortableItemSeries;