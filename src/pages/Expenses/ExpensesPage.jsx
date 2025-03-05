import React, { useCallback, useEffect, useState } from 'react';

import {Box, IconButton, MenuItem} from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PersonIcon from '@mui/icons-material/Person';
import useErrorHandler from '../../hooks/useErrorHandler';
import { useMessage } from '../../components/Header';
import axios from 'axios';
import { Select } from '../../components/Select';


const ExpensesPage = () => {
    
    const userData = [
        {id: 1,  emp:'Emma Stone', title:'Car Fuel', pur:'Total Filling Station', date:'01-11-2023', amount:'$210', paid:'Transfer', profile:'Rejected'},
        {id: 2,  emp:'Darnell Waish', title:'Shipping Services', pur:'FedEx', date:'11-12-2020', amount:'$400', paid:'Cash', profile:'Approved'},
        {id: 3,  emp:'Jason Hack', title:'Cargo Services', pur:'FedEx', date:'02-05-2022', amount:'$700', paid:'Card', profile:'Pending'},
        {id: 4,  emp:'Ted Bobby', title:'Cables', pur:'Doxy Cables', date:'06-02-2021', amount:'$175', paid:'Online Payment', profile:'Pending'},
        {id: 5,  emp:'Amina Hire', title:'SSD Drives', pur:'Amazon', date:'19-04-2020', amount:'$105', paid:'Card', profile:'Rejected'},
        {id: 6,  emp:'Nathan Percy', title:'Mouse Pads', pur:'Amazon', date:'14-08-2019', amount:'$210', paid:'Card', profile:'Approved'},
        {id: 7,  emp:'Ashley Dan', title:'Stationaries', pur:'Stationaries', date:'07-04-2020', amount:'$90', paid:'Online Payment', profile:'Pending'},
        {id: 8,  emp:'Dustin Zack', title:'Transportation', pur:'DHL', date:'17-06-2020', amount:'$925', paid:'Transfer', profile:'Rejected'},
        {id: 9,  emp:'Nathalie Soa', title:'Software Purchase', pur:'Figma', date:'01-09-2020', amount:'$215', paid:'Card', profile:'Approved'},
        {id: 10,  emp:'Vanessa Gad', title:'System Hosting Package', pur:'HostNg', date:'07-03-2020', amount:'$510', paid:'Card', profile:'Rejected'},

        
    ];
    const getColor = (profile) => {
        switch (profile) {
            case 'Approved':
                return { bgColor: 'bg-green-950', textColor: 'text-green-500' };
            case 'Rejected':
                return { bgColor: 'bg-red-950', textColor: 'text-red-500' };
            case 'Pending':
                return { bgColor: 'bg-orange-950', textColor: 'text-orange-400' };
            default:
                return { bgColor: 'bg-gray-900', textColor: 'text-gray-500' };
        }
    };
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);
    const errorHandler = useErrorHandler();
    const { showSuccess } = useMessage();

    const [paginationModel, setPaginationModel] = useState({
        pageSize: 5,
        page: 0,
    });
    const [rowCount, setRowCount] = useState(0);

    const fetchExpenses = useCallback(async () => {
        setLoading(true);

        console.log('fetching....');
        // setRows([]);

        try {
            const response = await axios.get(
                `/hr/expenses/?page=${paginationModel.page + 1 || 1}&pageSize=${
                    paginationModel.pageSize
                }`
            );
            const { expenses, pageData } = response.data;

            const rows = expenses.map((expense, index) => ({
                ...expense,
                id: index,
                amount: expense.price.amount,
                currency: expense.price.currency,
            }));

            setRows(rows);
            setRowCount(pageData.totalData || 0);
        } catch (e) {
            console.warn(e);
        } finally {
            setLoading(false);
        }
    }, [setRows, paginationModel]);

    const changeStatus = useCallback(
        async (id, status) => {
            try {
                const response = await axios.patch(`/hr/expenses/${id}`, { status });

                const { success } = response.data;

                if (success) {
                    showSuccess('Status changed');
                    fetchExpenses();
                }
            } catch (e) {
                errorHandler(e);
            }
        },
        [errorHandler, fetchExpenses, showSuccess]
    );
    useEffect(() => {
        fetchExpenses();
    }, [fetchExpenses]);

    console.log(rows)
    return (
        <Box sx={{backgroundColor: 'background.main',}}>
        <div className='flex flex-col'>
                <div className="flex items-center justify-between md:w-full md:px-4 py-4">
                        <div className="p-2">
                            <h1 className="text-2xl text-neutral-500">Expenses</h1>
                        </div>
                        <div className="flex flex-row items-center justify-center gap-4">
                        <button className='flex items-center text-white font-bold text-xs md:text-base py-1 md:py-1 px-2 md:px-3 rounded bg-sky-500 hover:bg-sky-700'>
                            Add New Item
                        </button>
                            <InfoOutlinedIcon />
                        </div>
                    </div>
               
            <Box sx={{backgroundColor: 'background.view', width :{ xs :'calc(100vw - 30px)'  , sm:'100%' }}}  className="w-full pt-4 rounded-lg mb-4 overflow-x-auto" s>
            <div className='min-w-[38rem]  flex flex justify-between items-center w-full pt-3'>
                            <p className=" mb-4 border-l-4 border-blue-500 pl-4  text-xl" gutterBottom>
                                Expense Summary
                            </p> 
                            <p className='text-sm md:text-[12px]  pr-2 md:pr-5'>Rows per page: 10 <FontAwesomeIcon icon={faCaretDown} className=' text-lg md:text-[12px] text-center ml-2'/></p>
                     </div> 
                <div className='w-[97%] min-w-[38rem]  ml-2 md:ml-4 border border-zinc-500 rounded-sm '>
                    <div className='flex flex-row border-b border-zinc-500'>
                        <div className='w-[25%] md:w-[5%] p-3 border-r border-zinc-500 text-left text-sm md:text-xs font-bold'>
                            ID
                        </div>
                        {/* <div className='w-[50%] md:w-[15%] p-3 border-r border-zinc-500 text-sm md:text-xs font-bold'>
                            Employee
                        </div> */}
                        <div className='w-[25%] md:w-[15%] p-3 border-r border-zinc-500 text-sm md:text-xs font-bold'>
                            Title
                        </div>
                        <div className='w-[25%] md:w-[15%] p-3 border-r border-zinc-500 text-left text-sm md:text-xs font-bold'>
                           Purchased From
                        </div>
                        <div className='w-[50%] md:w-[10%] p-3 border-r border-zinc-500 text-sm md:text-xs font-bold'>
                           Date
                        </div>
                        <div className='w-[25%] md:w-[10%] p-3 border-r border-zinc-500 text-sm md:text-xs font-bold'>
                            Amount($)
                        </div>
                        {/* <div className='w-[25%] md:w-[10%] p-3 border-r border-zinc-500 text-left text-sm md:text-xs font-bold'>
                            Paid By
                        </div> */}
                        <div className='w-[25%] md:w-[8%] p-3 border-r border-zinc-500 text-sm md:text-xs font-bold'>
                            Currency
                        </div>
                        <div className='w-[25%] md:w-[12%] p-3  text-left text-sm md:text-xs font-bold'>
                            Action
                        </div>
                        
                    </div>
                    {rows?.map((user,index) => (
                        <div key={index} className='flex flex-row border-b border-zinc-500'>
                        <div className='w-[25%] md:w-[5%] p-3 border-r border-zinc-500 text-left text-sm md:text-[10px]'>
                            #{index+1}
                        </div>
                        {/* <div className='w-[50%] md:w-[15%] p-1 border-r border-zinc-500 text-sm md:text-[10px] flex flex-row gap-2 flex items-center'>
                            <div className='flex justify-center items-center pl-2'>
                                <PersonIcon style={{ fontSize: '16px' }} className="text-zinc-300"/>
                            </div>
                            <div className=''>
                                {user.emp}
                                
                            </div>
                        </div> */}
                        <div className='w-[25%] md:w-[15%] p-3 border-r border-zinc-500 text-sm md:text-[10px]'>
                            {user.title}
                        </div>
                        <div className='w-[25%] md:w-[15%] p-3 border-r border-zinc-500 text-left text-sm md:text-[10px]'>
                             {user.purchasePlace}
                        </div>
                        <div className='w-[50%] md:w-[10%] p-3 border-r border-zinc-500 text-sm md:text-[10px]'>
                             {`${user.dateOfPurchase.day}/${user.dateOfPurchase.month}/${user.dateOfPurchase.year}`}
                        </div>
                        <div className='w-[25%] md:w-[10%] p-3 border-r border-zinc-500 text-sm md:text-[10px]'>
                             {user.price.amount}
                        </div>
                        <div className='w-[25%] md:w-[10%] p-3 border-r border-zinc-500 text-left text-sm md:text-[10px]'>
                            {user.price.currency}
                        </div>
                        {/* <div className='w-[25%] md:w-[8%] p-3 border-r border-zinc-500'>
                        <div
                                    className={`px-0 py-0 rounded-lg text-sm md:text-[8px] flex justify-center items-center ${
                                        getColor(user.profile).bgColor
                                    } ${getColor(user.profile).textColor}`}
                                >
                                    {user.profile}
                                </div>
                        </div> */}
                        
                            <div className='w-[25%] md:w-[12%] flex flex-row gap-2 justify-center items-center'>
                            <Select
                                value={user.status}
                                size='small'
                                fullWidth
                                onChange={e => changeStatus(user._id, e.target.value)}
                                >
                                <MenuItem value='Approved'>Approved</MenuItem>
                                <MenuItem value='Rejected'>Rejected</MenuItem>
                                <MenuItem value='Pending'>Pending</MenuItem>
                            </Select>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='w-[95%] min-w-[38rem]  ml-2  md:ml-5 mt-5 flex justify-between items-center pb-2 '>
                    <p className='text-sm md:text-[12px]  '>Showing Rows: 1-10 of 20</p>
                    <div className='flex flex-row gap-4'>
                    <KeyboardArrowLeftOutlinedIcon className='text-zinc-400'/>
                    <p className='text-zinc-400'>1</p>
                    <p className='text-zinc-400 bg-blue-500 w-[20px] h-[20px] flex items-center justify-center p-1 rounded-full'>2</p>
                </div>
                </div>
            </Box>
        </div>
        </Box>
    );
};

export default ExpensesPage;
