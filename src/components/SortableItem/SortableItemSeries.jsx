import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useTheme } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import SeriesTable from '../SeriesTable/SeriesTable';
import SeriesFilter from '../Filters/SeriesFilter/SeriesFilter';
import { useSeriesLimits } from '../../context/SeriesLimitsProvider';

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
    border: '2px solid red',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '400px'
  };

  return (
    <Box sx={style} ref={setNodeRef}>
      <Box
        sx={{
          minWidth: '50px',
          height: '100%',
          borderRadius: '10px',
          color: theme.palette.text.icons
        }}
        {...listeners}
        {...attributes}
      >
        <Box>
          <Typography variant='h4'>{categoryName}</Typography>
        </Box>
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
    </Box>
  );
};

export default SortableItemSeries;