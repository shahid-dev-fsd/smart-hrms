import React, { useCallback, useEffect, useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    Grid,
    IconButton,
    InputBase,
    InputAdornment,
    Modal,
    Tooltip,
    Typography,
    Stack,
    Pagination,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import SearchIcon from '@mui/icons-material/Search';
import DepartmentImg from '../../assets/initalScreen/departements.svg';
import DeparmentModal from '../../components/DeparmentModal';
import useModal from '../../hooks/useModal';
import { useMessage } from '../../components/Header';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';

const DeptPage = () => {
    const [id, setId] = useState(null);
    const [open, setOpen] = useState(false);
    const [departments, setDepartments] = useState([]);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const location = useLocation();

    const itemsPerPage = 10;

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const { showSuccess, showError } = useMessage();
    const { modalState: deleteState, openModal: openDelete, closeModal: closeDelete } = useModal();
    const [selectedDepartment, setSelectedDepartment] = useState(null);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const fetchDepartment = useCallback(async () => {
        try {
            const response = await axios.get(`/hr/department?searchBy=name&search=${search}&sortBy=order`);
            setDepartments(response.data.departments || []);
        } catch (error) {
            showError('Failed to fetch departments');
        }
    }, [search, showError]);

    const deleteDepartment = async (id) => {
        try {
            const res = await axios.delete(`/hr/department/${id}`);
            const { success, message } = res.data;
            if (success) {
                showSuccess('Department deleted');
                fetchDepartment();
            } else {
                showError(message);
            }
        } catch (error) {
            showError('Failed to delete department');
        } finally {
            closeDelete();
        }
    };

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
        setCurrentPage(1); // Reset to first page on new search
    };

    const filteredDepartments = departments.filter((dept) =>
        dept.name.toLowerCase().includes(search.toLowerCase())
    );

    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage);
    };

    const paginatedDepartments = filteredDepartments.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    useEffect(() => {
        fetchDepartment();
    }, [fetchDepartment]);

    useEffect(() => {
   
        if (location.state?.openModal) {
            setId(null); // Reset ID to indicate "Add" mode
            handleOpen();
        }
    }, [location.state]);

    return (
        <div className="container mx-auto py-2 px-4">
            <div className="flex justify-between items-center pb-4">
                <Typography variant="h4" color="textSecondary">
                    Department
                </Typography>
                <Grid item display="flex" gap={2}>
                    <Button variant="contained" onClick={() => { setId(null); handleOpen(); }}>
                        Add Department
                    </Button>
                    <Tooltip title="Info">
                        <InfoOutlinedIcon />
                    </Tooltip>
                </Grid>
            </div>
            {paginatedDepartments.length > 0 ? (
                <Box className="w-full  p-4 rounded-lg" sx={{ backgroundColor: 'background.view' }}>
                    <p className=" border-l-4 border-blue-500 pl-4 text-xl" gutterBottom>
                        Department Summary
                    </p>
                    <div className="w-full pl-5 p-4 flex justify-between mb-[-20px]">
                        <p className="text-sm md:text-base text-zinc-400 pl-2 md:pl-1">
                            Rows per page: {itemsPerPage} <FontAwesomeIcon icon={faCaretDown} className="text-zinc-500 text-lg md:text-2xl text-center ml-2" />
                        </p>
                        <InputBase
                            type="search"
                            placeholder="Search branches"
                            value={search}
                            onChange={handleSearchChange}
                            fullWidth
                            sx={{
                                backgroundColor: 'background.view',
                                padding: '8px 16px',
                                height: '40px',
                                width: '250px',
                                borderRadius: '8px',
                                border: '1px solid #555',
                                fontSize: '16px',
                                color: '#aaa',
                                '& .MuiInputBase-input': {
                                    padding: '8px 0',
                                },
                                '&::placeholder': {
                                    color: '#888',
                                    opacity: 1,
                                },
                            }}
                            endAdornment={
                                <InputAdornment position="end">
                                    <SearchIcon sx={{ color: '#888' }} />
                                </InputAdornment>
                            }
                        />
                    </div>
                    {/* Table Section */}
                    <div className="w-[97.2%] ml-2 md:ml-4 mt-4 overflow-x-auto border border-zinc-500 rounded-sm">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="border-b border-zinc-500">
                                    <th className="w-[25%] md:w-[5%] p-2 text-left text-sm md:text-lg font-bold border-r border-zinc-500">#ID</th>
                                    <th className="w-[50%] md:w-[80%] p-2 text-left text-sm md:text-lg font-bold border-r border-zinc-500">Department Name</th>
                                    <th className="w-[35%] md:w-[20%] p-2 text-left text-sm md:text-lg font-bold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
    {paginatedDepartments.map((dept, index) => (
        <tr key={dept._id} className="border-b border-zinc-500">
            <td className="w-[25%] md:w-[5%] p-2 md:p-4 text-left text-sm md:text-[16px] border-r border-zinc-500">
                #{(currentPage - 1) * itemsPerPage + index + 1}
            </td>
            <td className="w-[50%] md:w-[80%] p-2 md:p-4 text-left text-sm md:text-[18px] border-r border-zinc-500">
                {dept.name}
            </td>
            <td className="w-[35%] md:w-[20%] p-2 text-left">
                <div className="flex flex-row items-center">
                    <IconButton
                        onClick={() => { setId(dept._id); handleOpen(); }}
                        style={{ backgroundColor: 'yourColor', borderRadius: '5px', width: '30px', height: '30px', padding: '4px' }}
                    >
                        <EditOutlinedIcon fontSize="medium" className="p-1" />
                    </IconButton>
                    <IconButton
                        onClick={() => { setSelectedDepartment(dept); openDelete(); }}
                        style={{ backgroundColor: 'yourColor', borderRadius: '5px', width: '30px', height: '30px', padding: '4px', margin: '2px' }}
                    >
                        <DeleteOutlineOutlinedIcon fontSize="medium" className="p-1" sx={{ color: 'blue' }} />
                    </IconButton>
                </div>
            </td>
        </tr>
    ))}
</tbody>
                        </table>
                    </div>
                    <div className="w-[95%] ml-2  md:ml-9 mt-2 flex justify-between items-center pb-2 mb-20 md:mb-0">
                        <p className="text-sm md:text-base text-zinc-400">Showing Rows: {currentPage * itemsPerPage - itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, filteredDepartments.length)} of {filteredDepartments.length}</p>
                        <Stack spacing="" mt={2} alignItems="center">
                            <Pagination
                                count={Math.ceil(filteredDepartments.length / itemsPerPage)}
                                page={currentPage}
                                onChange={handlePageChange}
                                color="primary"
                            />
                        </Stack>
                    </div>
                </Box>
            ) : (
                <div className="flex flex-col items-center text-center">
                    <img src={DepartmentImg} alt="No Record" style={{ maxWidth: '70%' }} />
                    <Typography variant="h5">No departments available</Typography>
                    <Typography variant="body1">
                        Start building your organization by setting up departments.
                    </Typography>
                </div>
            )}
            <Modal open={open} onClose={handleClose}>
                <DeparmentModal fetchDepartment={fetchDepartment} handleClose={handleClose} id={id} />
            </Modal>
            <Modal
    open={deleteState}
    onClose={closeDelete}
    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
>
    <Card sx={{ maxWidth: '548px', width: '100%' }}>
        <CardContent>
            <Typography variant="h5" fontWeight={500}>
                Delete {selectedDepartment?.name}
            </Typography>
            <Divider sx={{ my: 1.5 }} />
            <Typography variant="subtitle1">
                Do you really want to delete {selectedDepartment?.name}?
            </Typography>
        </CardContent>
        <CardActions sx={{ mt: 3, justifyContent: 'flex-end', p: 2 }}>
            <Button variant="outlined" onClick={closeDelete}>
                Cancel
            </Button>
            <Button
                variant="contained"
                color="warning"
                onClick={() => deleteDepartment(selectedDepartment._id)}
            >
                Delete
            </Button>
        </CardActions>
    </Card>
</Modal>

        </div>
    );
};

export default DeptPage;
