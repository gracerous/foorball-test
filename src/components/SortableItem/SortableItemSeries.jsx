import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useTheme } from '@mui/material/styles';
import { Button } from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import SeriesTable from '../SeriesTable/SeriesTable';

const SortableItemSeries = ({ id, rowData, teams, leagues }) => {
  const theme = useTheme();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || undefined,
    position: 'relative',
    minHeight: '200px',
  };

  const buttonContainerStyle = {
    position: 'absolute',
    top: '0',
    left: '0',
    zIndex: 1,
    height: '41px',
  };

  return (
    <div ref={setNodeRef} style={style}>
      <div style={buttonContainerStyle}>
        <Button
          sx={{
            minWidth: '10px',
            height: '100%',
            borderRadius: '10px',
            color: theme.palette.text.icons
          }}
          {...listeners}
          {...attributes}
        >
          <DragIndicatorIcon />
        </Button>
      </div>
      <SeriesTable
        rowData={rowData}
        teams={teams}
        leagues={leagues}
      />
    </div>
  );
};

export default SortableItemSeries;