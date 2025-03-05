import React, { useEffect, useState } from "react";
import {
  Button,
  IconButton,
  Modal,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
  TextField,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  FormControlLabel,
  Menu,
  FormGroup,
  Checkbox,
} from "@mui/material";
import { IoFilter } from "react-icons/io5";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { HiDotsHorizontal } from "react-icons/hi";
import { CiExport, CiImport } from "react-icons/ci";
import { LiaTrashAlt } from "react-icons/lia";
import CustomTable from "../../../components/CustomTable";
import Pagination from "../../../components/Pagination";
import dayjs from "dayjs";
import CustomModal from "../../../components/CustomModal";

export default function Clients() {
  const [filterModal, setFilterModal] = useState(false);
  const [addClientModal, setAddClientModal] = useState(false);
  const [editClientModal, setEditClientModal] = useState(false);
  const [viewClientModal, setViewClientModal] = useState(false);

  const fields = [
    { label: "Client Name", field: "clientName" },
    { label: "Currency", field: "currency" },
    { label: "Billing Method", field: "billingMethod" },
    { label: "Email ID", field: "emailId" },
    { label: "First Name", field: "firstName" },
    { label: "Last Name", field: "lastName" },
    { label: "Phone", field: "phone" },
    { label: "Mobile", field: "mobile" },
    { label: "Fax", field: "fax" },
    { label: "Street Address", field: "streetAddress" },
    { label: "City", field: "city" },
    { label: "State/Province", field: "stateOrProvince" },
    { label: "ZIP/PIN Code", field: "zipOrPinCode" },
    { label: "Country", field: "country" },
    { label: "Industry", field: "industry" },
    { label: "Company Size", field: "companySize" },
    { label: "Description", field: "description" },
    { label: "Added By", field: "addedBy" },
    { label: "Added Time", field: "addedTime" },
    { label: "Modified By", field: "modifiedBy" },
    { label: "Modified Time", field: "modifiedTime" },
  ];

  const [filterFormValues, setFilterFormValues] = useState({
    search: "",
    filterFields: [],
  });
  const handleFilterFormChange = (name, value) => {
    setFilterFormValues((prev) => ({ ...prev, [name]: value }));
  };
  const handleFilterValueChange = (field, condition, value) => {
    setFilterFormValues((prev) => ({
      ...prev,
      filterFields: prev.filterFields.map((item) =>
        item.field === field ? { ...item, condition, value } : item
      ),
    }));
  };
  const handleCheckboxChange = (field) => (event) => {
    const checkedFields = filterFormValues.filterFields;
    if (event.target.checked) {
      setFilterFormValues((prev) => ({
        ...prev,
        filterFields: [...checkedFields, { field, condition: "is", value: "" }],
      }));
    } else {
      setFilterFormValues((prev) => ({
        ...prev,
        filterFields: checkedFields.filter((item) => item.field !== field),
      }));
    }
  };
  const handleFilterFormSubmit = (e) => {
    e.preventDefault();
    console.log("Filter Data :- ", filterFormValues);
    setFilterModal(false);
  };

  const [menuAnchor, setMenuAnchor] = useState(null);
  const isMenuopen = Boolean(menuAnchor);

  const columns = [
    { label: "Client Name", field: "clientName", sortable: true },
    { label: "Currency", field: "currency", sortable: true },
    { label: "Billing Method", field: "billingMethod", sortable: true },
    { label: "Email ID", field: "emailId", sortable: true },
    { label: "First Name", field: "firstName", sortable: true },
    { label: "Last Name", field: "lastName", sortable: true },
    { label: "Phone", field: "phone", sortable: true },
    { label: "Mobile", field: "mobile", sortable: true },
    { label: "Fax", field: "fax", sortable: true },
    { label: "Street Address", field: "streetAddress", sortable: true },
    { label: "City", field: "city", sortable: true },
    { label: "State/Province", field: "stateOrProvince", sortable: true },
    { label: "ZIP/PIN Code", field: "zipOrPinCode", sortable: true },
    { label: "Country", field: "country", sortable: true },
    { label: "Industry", field: "industry", sortable: true },
    { label: "Company Size", field: "companySize", sortable: true },
    { label: "Description", field: "description", sortable: true },
    { label: "Added By", field: "addedBy", sortable: true },
    { label: "Added Time", field: "addedTime", sortable: true },
    { label: "Modified By", field: "modifiedBy", sortable: true },
    { label: "Modified Time", field: "modifiedTime", sortable: true },
    { label: "Actions", field: "actions", sortable: true },
  ];

  const [data, setData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const handleRowClick = (row) => {
    setViewClientModal(true);
  };
  const renderActions = (row) => (
    <IconButton>
      <LiaTrashAlt />
    </IconButton>
  );
  const handleSort = (column, direction) => {
    fetchData(column, direction);
  };
  const fetchData = async (sortBy = "", sortOrder = "") => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://reqres.in/api/users?page=${currentPage}&per_page=${limit}&${sortBy}=${sortOrder}`
      );
      const result = await response.json();
      if (result && result.data && result.total) {
        setData(result.data);
        setTotalItems(result.total);
      }
    } catch (error) {
      setError("Error Fetching Data.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [currentPage, limit]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
    setCurrentPage(1);
  };
  const totalPages = Math.ceil(totalItems / limit);

  const addClientModalFields = [
    {
      type: "text",
      name: "clientName",
      label: "Client Name",
      defaultValue: "",
    },
    {
      type: "autocomplete",
      name: "currency",
      label: "Currency",
      options: ["USD", "EUR", "INR", "JPY"],
      defaultValue: "",
    },
    {
      type: "select",
      name: "billingMethod",
      label: "Billing Method",
      options: [
        { label: "Select", value: "select" },
        { label: "Hourly Job Rate", value: "hourlyJobRate" },
        { label: "Hourly User Rate", value: "hourlyUserRate" },
        { label: "Hourly User Rate - Jobs", value: "hourlyUserRate-Jobs" },
        {
          label: "Hourly User Rate - Projects",
          value: "hourlyUserRate-Projects",
        },
      ],
      defaultValue: "select",
    },
    {
      type: "text",
      name: "emailId",
      label: "Email ID",
      defaultValue: "",
    },
    {
      type: "text",
      name: "firstName",
      label: "First Name",
      defaultValue: "",
    },
    {
      type: "text",
      name: "lastName",
      label: "Last Name",
      defaultValue: "",
    },
    {
      type: "text",
      name: "phone",
      label: "Phone",
      defaultValue: "",
    },
    {
      type: "text",
      name: "mobile",
      label: "Mobile",
      defaultValue: "",
    },
    {
      type: "text",
      name: "fax",
      label: "Fax",
      defaultValue: "",
    },
    {
      type: "text",
      name: "streetAddress",
      label: "Street Address",
      defaultValue: "",
    },
    {
      type: "text",
      name: "city",
      label: "City",
      defaultValue: "",
    },
    {
      type: "text",
      name: "stateOrProvince",
      label: "State/Province",
      defaultValue: "",
    },
    {
      type: "text",
      name: "zipOrPinCode",
      label: "ZIP/PIN Code",
      defaultValue: "",
    },
    {
      type: "autocomplete",
      name: "country",
      label: "Country",
      options: [
        "Afghanistan",
        "Albania",
        "Algeria",
        "Andorra",
        "Angola",
        "Antigua and Barbuda",
        "Argentina",
        "Armenia",
        "Australia",
        "Austria",
        "Azerbaijan",
        "Bahamas",
        "Bahrain",
        "Bangladesh",
        "Barbados",
        "Belarus",
        "Belgium",
        "Belize",
        "Benin",
        "Bhutan",
        "Bolivia",
        "Bosnia and Herzegovina",
        "Botswana",
        "Brazil",
        "Brunei",
        "Bulgaria",
        "Burkina Faso",
        "Burundi",
        "Cabo Verde",
        "Cambodia",
        "Cameroon",
        "Canada",
        "Central African Republic",
        "Chad",
        "Chile",
        "China",
        "Colombia",
        "Comoros",
        "Congo (Congo-Brazzaville)",
        "Costa Rica",
        "Croatia",
        "Cuba",
        "Cyprus",
        "Czech Republic",
        "Denmark",
        "Djibouti",
        "Dominica",
        "Dominican Republic",
        "Ecuador",
        "Egypt",
        "El Salvador",
        "Equatorial Guinea",
        "Eritrea",
        "Estonia",
        "Eswatini (fmr. Swaziland)",
        "Ethiopia",
        "Fiji",
        "Finland",
        "France",
        "Gabon",
        "Gambia",
        "Georgia",
        "Germany",
        "Ghana",
        "Greece",
        "Grenada",
        "Guatemala",
        "Guinea",
        "Guinea-Bissau",
        "Guyana",
        "Haiti",
        "Holy See",
        "Honduras",
        "Hungary",
        "Iceland",
        "India",
        "Indonesia",
        "Iran",
        "Iraq",
        "Ireland",
        "Israel",
        "Italy",
        "Jamaica",
        "Japan",
        "Jordan",
        "Kazakhstan",
        "Kenya",
        "Kiribati",
        "Kuwait",
        "Kyrgyzstan",
        "Laos",
        "Latvia",
        "Lebanon",
        "Lesotho",
        "Liberia",
        "Libya",
        "Liechtenstein",
        "Lithuania",
        "Luxembourg",
        "Madagascar",
        "Malawi",
        "Malaysia",
        "Maldives",
        "Mali",
        "Malta",
        "Marshall Islands",
        "Mauritania",
        "Mauritius",
        "Mexico",
        "Micronesia",
        "Moldova",
        "Monaco",
        "Mongolia",
        "Montenegro",
        "Morocco",
        "Mozambique",
        "Myanmar (formerly Burma)",
        "Namibia",
        "Nauru",
        "Nepal",
        "Netherlands",
        "New Zealand",
        "Nicaragua",
        "Niger",
        "Nigeria",
        "North Korea",
        "North Macedonia",
        "Norway",
        "Oman",
        "Pakistan",
        "Palau",
        "Palestine State",
        "Panama",
        "Papua New Guinea",
        "Paraguay",
        "Peru",
        "Philippines",
        "Poland",
        "Portugal",
        "Qatar",
        "Romania",
        "Russia",
        "Rwanda",
        "Saint Kitts and Nevis",
        "Saint Lucia",
        "Saint Vincent and the Grenadines",
        "Samoa",
        "San Marino",
        "Sao Tome and Principe",
        "Saudi Arabia",
        "Senegal",
        "Serbia",
        "Seychelles",
        "Sierra Leone",
        "Singapore",
        "Slovakia",
        "Slovenia",
        "Solomon Islands",
        "Somalia",
        "South Africa",
        "South Korea",
        "South Sudan",
        "Spain",
        "Sri Lanka",
        "Sudan",
        "Suriname",
        "Sweden",
        "Switzerland",
        "Syria",
        "Tajikistan",
        "Tanzania",
        "Thailand",
        "Timor-Leste",
        "Togo",
        "Tonga",
        "Trinidad and Tobago",
        "Tunisia",
        "Turkey",
        "Turkmenistan",
        "Tuvalu",
        "Uganda",
        "Ukraine",
        "United Arab Emirates",
        "United Kingdom",
        "United States of America",
        "Uruguay",
        "Uzbekistan",
        "Vanuatu",
        "Venezuela",
        "Vietnam",
        "Yemen",
        "Zambia",
        "Zimbabwe",
      ],
      defaultValue: "",
    },
    {
      type: "text",
      name: "industry",
      label: "Industry",
      defaultValue: "",
    },
    {
      type: "text",
      name: "companySize",
      label: "Company Size",
      defaultValue: "0",
    },
    {
      type: "text",
      name: "description",
      label: "Description",
      defaultValue: "",
    },
  ];
  const handleAddClientFormSubmit = (data) => {
    console.log("Add Form :- ", data);
  };

  const editClientModalFields = [
    {
      type: "text",
      name: "clientName",
      label: "Client Name",
      defaultValue: "asas",
    },
    {
      type: "autocomplete",
      name: "currency",
      label: "Currency",
      options: ["USD", "EUR", "INR", "JPY"],
      defaultValue: "USD",
    },
    {
      type: "select",
      name: "billingMethod",
      label: "Billing Method",
      options: [
        { label: "Select", value: "select" },
        { label: "Hourly Job Rate", value: "hourlyJobRate" },
        { label: "Hourly User Rate", value: "hourlyUserRate" },
        { label: "Hourly User Rate - Jobs", value: "hourlyUserRate-Jobs" },
        {
          label: "Hourly User Rate - Projects",
          value: "hourlyUserRate-Projects",
        },
      ],
      defaultValue: "hourlyJobRate",
    },
    {
      type: "text",
      name: "emailId",
      label: "Email ID",
      defaultValue: "sadff@gmail.com",
    },
    {
      type: "text",
      name: "firstName",
      label: "First Name",
      defaultValue: "dgssd",
    },
    {
      type: "text",
      name: "lastName",
      label: "Last Name",
      defaultValue: "dsgsg",
    },
    {
      type: "text",
      name: "phone",
      label: "Phone",
      defaultValue: "4646636634634",
    },
    {
      type: "text",
      name: "mobile",
      label: "Mobile",
      defaultValue: "434636556",
    },
    {
      type: "text",
      name: "fax",
      label: "Fax",
      defaultValue: "sdgd",
    },
    {
      type: "text",
      name: "streetAddress",
      label: "Street Address",
      defaultValue: "data",
    },
    {
      type: "text",
      name: "city",
      label: "City",
      defaultValue: "data",
    },
    {
      type: "text",
      name: "stateOrProvince",
      label: "State/Province",
      defaultValue: "data",
    },
    {
      type: "text",
      name: "zipOrPinCode",
      label: "ZIP/PIN Code",
      defaultValue: "454545",
    },
    {
      type: "autocomplete",
      name: "country",
      label: "Country",
      options: [
        "Afghanistan",
        "Albania",
        "Algeria",
        "Andorra",
        "Angola",
        "Antigua and Barbuda",
        "Argentina",
        "Armenia",
        "Australia",
        "Austria",
        "Azerbaijan",
        "Bahamas",
        "Bahrain",
        "Bangladesh",
        "Barbados",
        "Belarus",
        "Belgium",
        "Belize",
        "Benin",
        "Bhutan",
        "Bolivia",
        "Bosnia and Herzegovina",
        "Botswana",
        "Brazil",
        "Brunei",
        "Bulgaria",
        "Burkina Faso",
        "Burundi",
        "Cabo Verde",
        "Cambodia",
        "Cameroon",
        "Canada",
        "Central African Republic",
        "Chad",
        "Chile",
        "China",
        "Colombia",
        "Comoros",
        "Congo (Congo-Brazzaville)",
        "Costa Rica",
        "Croatia",
        "Cuba",
        "Cyprus",
        "Czech Republic",
        "Denmark",
        "Djibouti",
        "Dominica",
        "Dominican Republic",
        "Ecuador",
        "Egypt",
        "El Salvador",
        "Equatorial Guinea",
        "Eritrea",
        "Estonia",
        "Eswatini (fmr. Swaziland)",
        "Ethiopia",
        "Fiji",
        "Finland",
        "France",
        "Gabon",
        "Gambia",
        "Georgia",
        "Germany",
        "Ghana",
        "Greece",
        "Grenada",
        "Guatemala",
        "Guinea",
        "Guinea-Bissau",
        "Guyana",
        "Haiti",
        "Holy See",
        "Honduras",
        "Hungary",
        "Iceland",
        "India",
        "Indonesia",
        "Iran",
        "Iraq",
        "Ireland",
        "Israel",
        "Italy",
        "Jamaica",
        "Japan",
        "Jordan",
        "Kazakhstan",
        "Kenya",
        "Kiribati",
        "Kuwait",
        "Kyrgyzstan",
        "Laos",
        "Latvia",
        "Lebanon",
        "Lesotho",
        "Liberia",
        "Libya",
        "Liechtenstein",
        "Lithuania",
        "Luxembourg",
        "Madagascar",
        "Malawi",
        "Malaysia",
        "Maldives",
        "Mali",
        "Malta",
        "Marshall Islands",
        "Mauritania",
        "Mauritius",
        "Mexico",
        "Micronesia",
        "Moldova",
        "Monaco",
        "Mongolia",
        "Montenegro",
        "Morocco",
        "Mozambique",
        "Myanmar (formerly Burma)",
        "Namibia",
        "Nauru",
        "Nepal",
        "Netherlands",
        "New Zealand",
        "Nicaragua",
        "Niger",
        "Nigeria",
        "North Korea",
        "North Macedonia",
        "Norway",
        "Oman",
        "Pakistan",
        "Palau",
        "Palestine State",
        "Panama",
        "Papua New Guinea",
        "Paraguay",
        "Peru",
        "Philippines",
        "Poland",
        "Portugal",
        "Qatar",
        "Romania",
        "Russia",
        "Rwanda",
        "Saint Kitts and Nevis",
        "Saint Lucia",
        "Saint Vincent and the Grenadines",
        "Samoa",
        "San Marino",
        "Sao Tome and Principe",
        "Saudi Arabia",
        "Senegal",
        "Serbia",
        "Seychelles",
        "Sierra Leone",
        "Singapore",
        "Slovakia",
        "Slovenia",
        "Solomon Islands",
        "Somalia",
        "South Africa",
        "South Korea",
        "South Sudan",
        "Spain",
        "Sri Lanka",
        "Sudan",
        "Suriname",
        "Sweden",
        "Switzerland",
        "Syria",
        "Tajikistan",
        "Tanzania",
        "Thailand",
        "Timor-Leste",
        "Togo",
        "Tonga",
        "Trinidad and Tobago",
        "Tunisia",
        "Turkey",
        "Turkmenistan",
        "Tuvalu",
        "Uganda",
        "Ukraine",
        "United Arab Emirates",
        "United Kingdom",
        "United States of America",
        "Uruguay",
        "Uzbekistan",
        "Vanuatu",
        "Venezuela",
        "Vietnam",
        "Yemen",
        "Zambia",
        "Zimbabwe",
      ],
      defaultValue: "Afghanistan",
    },
    {
      type: "text",
      name: "industry",
      label: "Industry",
      defaultValue: "",
    },
    {
      type: "text",
      name: "companySize",
      label: "Company Size",
      defaultValue: "0",
    },
    {
      type: "text",
      name: "description",
      label: "Description",
      defaultValue: "data",
    },
  ];
  const handleEditClientFormSubmit = (data) => {
    console.log("Edit Form :- ", data);
  };

  const viewClientModalFields = [
    {
      type: "text",
      name: "clientName",
      label: "Client Name",
      defaultValue: "asas",
    },
    {
      type: "autocomplete",
      name: "currency",
      label: "Currency",
      options: ["USD", "EUR", "INR", "JPY"],
      defaultValue: "USD",
    },
    {
      type: "select",
      name: "billingMethod",
      label: "Billing Method",
      options: [
        { label: "Select", value: "select" },
        { label: "Hourly Job Rate", value: "hourlyJobRate" },
        { label: "Hourly User Rate", value: "hourlyUserRate" },
        { label: "Hourly User Rate - Jobs", value: "hourlyUserRate-Jobs" },
        {
          label: "Hourly User Rate - Projects",
          value: "hourlyUserRate-Projects",
        },
      ],
      defaultValue: "hourlyJobRate",
    },
    {
      type: "text",
      name: "emailId",
      label: "Email ID",
      defaultValue: "sadff@gmail.com",
    },
    {
      type: "text",
      name: "firstName",
      label: "First Name",
      defaultValue: "dgssd",
    },
    {
      type: "text",
      name: "lastName",
      label: "Last Name",
      defaultValue: "dsgsg",
    },
    {
      type: "text",
      name: "phone",
      label: "Phone",
      defaultValue: "4646636634634",
    },
    {
      type: "text",
      name: "mobile",
      label: "Mobile",
      defaultValue: "434636556",
    },
    {
      type: "text",
      name: "fax",
      label: "Fax",
      defaultValue: "sdgd",
    },
    {
      type: "text",
      name: "streetAddress",
      label: "Street Address",
      defaultValue: "data",
    },
    {
      type: "text",
      name: "city",
      label: "City",
      defaultValue: "data",
    },
    {
      type: "text",
      name: "stateOrProvince",
      label: "State/Province",
      defaultValue: "data",
    },
    {
      type: "text",
      name: "zipOrPinCode",
      label: "ZIP/PIN Code",
      defaultValue: "454545",
    },
    {
      type: "autocomplete",
      name: "country",
      label: "Country",
      options: [
        "Afghanistan",
        "Albania",
        "Algeria",
        "Andorra",
        "Angola",
        "Antigua and Barbuda",
        "Argentina",
        "Armenia",
        "Australia",
        "Austria",
        "Azerbaijan",
        "Bahamas",
        "Bahrain",
        "Bangladesh",
        "Barbados",
        "Belarus",
        "Belgium",
        "Belize",
        "Benin",
        "Bhutan",
        "Bolivia",
        "Bosnia and Herzegovina",
        "Botswana",
        "Brazil",
        "Brunei",
        "Bulgaria",
        "Burkina Faso",
        "Burundi",
        "Cabo Verde",
        "Cambodia",
        "Cameroon",
        "Canada",
        "Central African Republic",
        "Chad",
        "Chile",
        "China",
        "Colombia",
        "Comoros",
        "Congo (Congo-Brazzaville)",
        "Costa Rica",
        "Croatia",
        "Cuba",
        "Cyprus",
        "Czech Republic",
        "Denmark",
        "Djibouti",
        "Dominica",
        "Dominican Republic",
        "Ecuador",
        "Egypt",
        "El Salvador",
        "Equatorial Guinea",
        "Eritrea",
        "Estonia",
        "Eswatini (fmr. Swaziland)",
        "Ethiopia",
        "Fiji",
        "Finland",
        "France",
        "Gabon",
        "Gambia",
        "Georgia",
        "Germany",
        "Ghana",
        "Greece",
        "Grenada",
        "Guatemala",
        "Guinea",
        "Guinea-Bissau",
        "Guyana",
        "Haiti",
        "Holy See",
        "Honduras",
        "Hungary",
        "Iceland",
        "India",
        "Indonesia",
        "Iran",
        "Iraq",
        "Ireland",
        "Israel",
        "Italy",
        "Jamaica",
        "Japan",
        "Jordan",
        "Kazakhstan",
        "Kenya",
        "Kiribati",
        "Kuwait",
        "Kyrgyzstan",
        "Laos",
        "Latvia",
        "Lebanon",
        "Lesotho",
        "Liberia",
        "Libya",
        "Liechtenstein",
        "Lithuania",
        "Luxembourg",
        "Madagascar",
        "Malawi",
        "Malaysia",
        "Maldives",
        "Mali",
        "Malta",
        "Marshall Islands",
        "Mauritania",
        "Mauritius",
        "Mexico",
        "Micronesia",
        "Moldova",
        "Monaco",
        "Mongolia",
        "Montenegro",
        "Morocco",
        "Mozambique",
        "Myanmar (formerly Burma)",
        "Namibia",
        "Nauru",
        "Nepal",
        "Netherlands",
        "New Zealand",
        "Nicaragua",
        "Niger",
        "Nigeria",
        "North Korea",
        "North Macedonia",
        "Norway",
        "Oman",
        "Pakistan",
        "Palau",
        "Palestine State",
        "Panama",
        "Papua New Guinea",
        "Paraguay",
        "Peru",
        "Philippines",
        "Poland",
        "Portugal",
        "Qatar",
        "Romania",
        "Russia",
        "Rwanda",
        "Saint Kitts and Nevis",
        "Saint Lucia",
        "Saint Vincent and the Grenadines",
        "Samoa",
        "San Marino",
        "Sao Tome and Principe",
        "Saudi Arabia",
        "Senegal",
        "Serbia",
        "Seychelles",
        "Sierra Leone",
        "Singapore",
        "Slovakia",
        "Slovenia",
        "Solomon Islands",
        "Somalia",
        "South Africa",
        "South Korea",
        "South Sudan",
        "Spain",
        "Sri Lanka",
        "Sudan",
        "Suriname",
        "Sweden",
        "Switzerland",
        "Syria",
        "Tajikistan",
        "Tanzania",
        "Thailand",
        "Timor-Leste",
        "Togo",
        "Tonga",
        "Trinidad and Tobago",
        "Tunisia",
        "Turkey",
        "Turkmenistan",
        "Tuvalu",
        "Uganda",
        "Ukraine",
        "United Arab Emirates",
        "United Kingdom",
        "United States of America",
        "Uruguay",
        "Uzbekistan",
        "Vanuatu",
        "Venezuela",
        "Vietnam",
        "Yemen",
        "Zambia",
        "Zimbabwe",
      ],
      defaultValue: "Afghanistan",
    },
    {
      type: "text",
      name: "industry",
      label: "Industry",
      defaultValue: "",
    },
    {
      type: "text",
      name: "companySize",
      label: "Company Size",
      defaultValue: "0",
    },
    {
      type: "text",
      name: "description",
      label: "Description",
      defaultValue: "data",
    },
  ];
  return (
    <div className="w-full min-h-80 flex flex-col">
      <div className="flex flex-row gap-3 justify-between items-center">
        <div className="flex flex-row gap-3 justify-center items-center">
          <div>
            <FormControl sx={{ width: "200px" }}>
              <InputLabel id="table-view">Table View</InputLabel>
              <Select labelId="table-view" id="table-view" label="Table View">
                <MenuItem value={"one"}>One</MenuItem>
                <MenuItem value={"two"}>Two</MenuItem>
                <div className="w-full ">
                  <Button
                    sx={{ width: "100%" }}
                    onClick={() => {
                      // setCreateTableViewModal(true);
                    }}
                    variant="outlined"
                  >
                    Create Table View
                  </Button>
                </div>
              </Select>
            </FormControl>
          </div>
          <div>
            <Button variant="outlined">Edit</Button>
          </div>
          <div className="h-9 w-[0.15rem] rounded-lg bg-neutral-500" />
          <div>
            <Button variant="outlined" color="error">
              Delete
            </Button>
          </div>
        </div>
        <div className="flex flex-row gap-3 justify-center items-center">
          <FormControl sx={{ width: "200px" }}>
            <InputLabel id="data">Data</InputLabel>
            <Select labelId="data" id="data" label="Data">
              <MenuItem value={"allData"}>All Data</MenuItem>
              <MenuItem value={"reporteesPlusMyData"}>
                Reportees + My Data
              </MenuItem>
              <MenuItem value={"reporteesData"}>Reportees Data</MenuItem>
              <MenuItem value={"directReporteesData"}>
                Direct Reportees Data
              </MenuItem>
              <MenuItem value={"myData"}>My Data</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            onClick={() => {
              setAddClientModal(true);
            }}
          >
            Add Client
          </Button>
          <IconButton
            onClick={() => {
              setFilterModal(true);
            }}
            title="Filter"
          >
            <IoFilter />
          </IconButton>
          <div>
            <IconButton
              id="basic-button"
              aria-controls={isMenuopen ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={isMenuopen ? "true" : undefined}
              onClick={(event) => {
                setMenuAnchor(event.currentTarget);
              }}
            >
              <HiDotsHorizontal className="text-2xl" />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={menuAnchor}
              open={isMenuopen}
              onClose={() => {
                setMenuAnchor(null);
              }}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem>
                <div className="flex flex-row gap-3 justify-between items-center">
                  <CiImport className="text-2xl" />
                  <h1>Import</h1>
                </div>
              </MenuItem>
              <MenuItem>
                <div className="flex flex-row gap-3 justify-between items-center">
                  <CiExport className="text-2xl" />
                  <h1>Export</h1>
                </div>
              </MenuItem>
            </Menu>
          </div>
        </div>
      </div>
      <div>
        <div className="h-[35.1rem] mt-1 overflow-scroll">
          <CustomTable
            columns={columns}
            onRowClick={handleRowClick}
            renderActions={renderActions}
            data={data}
            loading={loading}
            error={error}
            onSort={handleSort}
          />
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          limit={limit}
          onLimitChange={handleLimitChange}
        />
      </div>
      <CustomModal
        title="Add Client"
        fields={addClientModalFields}
        open={addClientModal}
        onClose={() => {
          setAddClientModal(false);
        }}
        onSubmit={handleAddClientFormSubmit}
        isScrollable={true}
        isCustomSubmitButtom={true}
        customSubmitButton={
          <div className="w-full flex flex-row justify-between items-center">
            <Button variant="contained" type="submit">
              Submit
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                setAddClientModal(false);
              }}
            >
              Cancel
            </Button>
          </div>
        }
      />
      <CustomModal
        title="Edit Client"
        fields={editClientModalFields}
        open={editClientModal}
        onClose={() => setEditClientModal(false)}
        onSubmit={handleEditClientFormSubmit}
        isScrollable={true}
      />
      <CustomModal
        title="View Client"
        fields={viewClientModalFields}
        open={viewClientModal}
        onClose={() => setViewClientModal(false)}
        isView={true}
        isScrollable={true}
        isEditButton={true}
        onEditButtonClick={() => {
          setViewClientModal(false);
          setEditClientModal(true);
        }}
      />

      <CustomModal
        title="Filter"
        open={filterModal}
        onClose={() => setFilterModal(false)}
        // onSubmit={handleFilterFormSubmit}
        isScrollable={true}
      >
        <form onSubmit={handleFilterFormSubmit} className="flex flex-col gap-3">
          <div>
            <Accordion defaultExpanded>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="systemFilters"
                id="systemFilters"
              >
                <Typography component="span">Search</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <TextField
                  sx={{ width: "100%" }}
                  variant="outlined"
                  label="Search"
                  placeholder="Search"
                  value={filterFormValues.search}
                  onChange={(e) =>
                    handleFilterFormChange("search", e.target.value)
                  }
                />
              </AccordionDetails>
            </Accordion>
          </div>

          <div>
            <Accordion defaultExpanded>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography component="span">Field</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="flex flex-col gap-3">
                  {fields.map((field, index) => (
                    <div key={index}>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              onChange={handleCheckboxChange(field.field)}
                              checked={filterFormValues.filterFields.some(
                                (item) => item.field === field.field
                              )}
                            />
                          }
                          label={field.label}
                        />
                      </FormGroup>

                      {filterFormValues.filterFields
                        .filter((item) => item.field === field.field)
                        .map((filter, idx) => (
                          <div className="flex flex-col gap-3" key={idx}>
                            <FormControl sx={{ width: "100%" }}>
                              <InputLabel id={`filter-${index}`}>
                                Condition
                              </InputLabel>
                              <Select
                                labelId={`filter-${index}`}
                                id={`filter-${index}`}
                                label="Condition"
                                value={filter.condition}
                                onChange={(e) =>
                                  handleFilterValueChange(
                                    field.field,
                                    e.target.value,
                                    filter.value
                                  )
                                }
                              >
                                <MenuItem value={"is"}>Is</MenuItem>
                                <MenuItem value={"isNot"}>Is Not</MenuItem>
                                <MenuItem value={"startWith"}>
                                  Start With
                                </MenuItem>
                                <MenuItem value={"endWith"}>End With</MenuItem>
                                <MenuItem value={"contains"}>Contains</MenuItem>
                                <MenuItem value={"notContains"}>
                                  Not Contains
                                </MenuItem>
                                <MenuItem value={"Like"}>Like</MenuItem>
                                <MenuItem value={"isEmpty"}>Is Empty</MenuItem>
                                <MenuItem value={"isNotEmpty"}>
                                  Is Not Empty
                                </MenuItem>
                              </Select>
                            </FormControl>
                            <TextField
                              sx={{ width: "100%" }}
                              variant="outlined"
                              label="Value"
                              placeholder="Value"
                              value={filter.value}
                              onChange={(e) =>
                                handleFilterValueChange(
                                  field.field,
                                  filter.condition,
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        ))}
                    </div>
                  ))}
                </div>
              </AccordionDetails>
            </Accordion>
          </div>

          <div className="w-full flex gap-2 flex-row justify-between items-center">
            <Button type="submit" variant="contained">
              Apply
            </Button>
            <Button
              onClick={() => {
                setFilterModal(false);
              }}
              variant="outlined"
            >
              Reset
            </Button>
          </div>
        </form>
      </CustomModal>
    </div>
  );
}
