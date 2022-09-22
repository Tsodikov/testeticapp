import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../Title';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid, IconButton, Paper, TableContainer, TablePagination, Typography } from '@mui/material';
import { chaptersSelector, delChapter, fetchChapters, setActiveChapter } from '../../../store/chapterSlice';

const columns = [
    { id: 'section', 
      label: 'Section', 
      minWidth: 160,
      format: (value) => value.toLocaleString('en-US'),
    },
    { id: 'description', 
      label: 'Description', 
      minWidth: 80,
      format: (value) => value.toLocaleString('en-US'),
    },
    { id: 'testqtn', 
      label: "Tests", 
      minWidth: 20,
      format: (value) => value.toLocaleString('en-US'),
    },
    { id: 'created', 
      label: "Created", 
      minWidth: 120,
      format: (value) => value.toLocaleString('en-US'),
    },
    { id: 'creator', 
      label: "Creator", 
      minWidth: 50,
      format: (value) => value.toLocaleString('en-US'),
    },
];

export default function SectionsList({ selectedChapter, setSelectedChapter, editMode, showAddSection, setEditMode, setShowAddSection }) {

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    
    const currentOrganization = useSelector(state => state.organization.currentOrganization);
    const chaptersList = useSelector(chaptersSelector);
    const dispatch = useDispatch();

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const onEdit =(event, chapter) => {
        event.preventDefault();
        setEditMode(true);
        dispatch(setActiveChapter(chapter));
        setShowAddSection(!showAddSection);
    }

    const onSelectChapter = (e, chapter) => {
        e.preventDefault();
        setSelectedChapter(chapter.id);
    }

    const onDeleteChapter = (id) => {
        dispatch(delChapter(id));
    };

    React.useEffect(() => {
        dispatch(fetchChapters(currentOrganization.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Paper
        sx={{ p: 2, width: '100%', overflow: 'hidden' }}
        elevation={6}
        >
        <Grid container spacing={3}>
            <Grid item xs={12} sm={10} lg={10}>
                <Title>Sections list</Title>
            </Grid>
            <Grid item xs={2} sm={2} lg={2}>
                <Button
                    type="button"
                    size="medium"
                    fullWidth={true}
                    onClick={() => {
                        setEditMode(false);
                        setShowAddSection(!showAddSection);
                    }}
                    >
                    Add section
                </Button>
            </Grid>
        </Grid>
        <TableContainer sx={{ maxHeight: 520 }}>
            <Table size="small" stickyHeader aria-label="sticky table">
            <TableHead>
                <TableRow>
                {columns.map(column => (
                    <TableCell 
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                    >
                    {column.label}
                    </TableCell>))}
                </TableRow>
            </TableHead>
            <TableBody>
                {!chaptersList? null :
                chaptersList
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((chapter) => (
                    <TableRow 
                    key={chapter.id}
                    name={chapter.id}
                    hover role="checkbox" 
                    tabIndex={-1}
                    selected={selectedChapter === chapter.id}
                    onClick={(e) => onSelectChapter(e, chapter)}
                    >
                        <TableCell key={columns[0].id} align={columns[0].align}>
                                {chapter.chapterTitle}
                        </TableCell>
                        <TableCell key={columns[1].id} align={columns[1].align}>{`${chapter.chapterDescription}`}</TableCell>
                        <TableCell key={columns[2].id} align={columns[2].align}>{chapter.qtnTests}</TableCell>
                        <TableCell key={columns[3].id} align={columns[3].align}>
                            {chapter.dateOfCreate.slice(0, 10)}</TableCell>
                        <TableCell key={columns[4].id} align={columns[4].align}>{chapter.chapterCreators.name}</TableCell>
                        <TableCell >
                        <IconButton onClick={(e) => onEdit(e, chapter) }>
                            <BorderColorOutlinedIcon fontSize='small'/>
                        </IconButton>
                        </TableCell>
                        <TableCell >
                        <IconButton onClick={(e) => onDeleteChapter(chapter.id) }>
                            <DeleteOutlinedIcon fontSize='small'/>
                        </IconButton>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
        <TablePagination
            rowsPerPageOptions={[5, 10, 25, 100]}
            component="div"
            count={chaptersList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
        </Paper>
    );
}