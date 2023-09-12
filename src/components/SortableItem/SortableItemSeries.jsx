import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useTheme } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import SeriesTable from '../SeriesTable/SeriesTable';
import SeriesFilter from '../Filters/SeriesFilter/SeriesFilter';

const SortableItemSeries = ({ id, rowData, teams, leagues, categoryName, seriesLimitChange }) => {
  const theme = useTheme();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id });

  const seriesFilter = (limit) => {
    seriesLimitChange(id, limit)
  }

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
          <SeriesFilter seriesFilter={seriesFilter} />
        </Box>
        <SeriesTable
          rowData={rowData}
          teams={teams}
          leagues={leagues}
        />
      </Box>
    </Box>
  );
};

export default SortableItemSeries;