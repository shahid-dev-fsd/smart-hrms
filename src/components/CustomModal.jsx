import React, { useState, useEffect } from "react";
import {
  Modal,
  Grid,
  TextField,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Button,
  Typography,
  RadioGroup,
  Radio,
  FormControl,
  InputLabel,
  Autocomplete,
  IconButton,
  TextareaAutosize,
  FormLabel,
  Switch,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  DatePicker,
  DateTimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { MdOutlineModeEditOutline } from "react-icons/md";

const CustomModal = ({
  open,
  onClose,
  fields,
  onSubmit,
  title,
  submitLabel = "Submit",
  isView = false,
  isScrollable = false,
  isEditButton = false,
  onEditButtonClick,
  isCustomSubmitButtom = false,
  customSubmitButton,
  children,
}) => {
  // Initialize formData with default values from fields
  const [formData, setFormData] = useState({});

  // Reinitialize formData whenever fields change
  useEffect(() => {
    const initialValues = fields?.reduce((acc, field) => {
      acc[field.name] = field.defaultValue ?? "";
      return acc;
    }, {});
    setFormData(initialValues);
  }, [fields]); // Re-run this effect when fields change

  const handleChange = (name) => (event, value) => {
    const newValue = value?.target?.value ?? value;
    if (name.includes(".")) {
      const [parentKey, childKey, index] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parentKey]: prev[parentKey].map((item, i) =>
          i === parseInt(index) ? { ...item, [childKey]: newValue } : item
        ),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: newValue,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData, setFormData);
    // onClose();
  };

  const renderField = (field, index) => {
    const isDisabled =
      typeof field.disabled === "function"
        ? field.disabled(formData)
        : field.disabled;

    const defaultChangeHandler = (event) => {
      setFormData((prev) => ({
        ...prev,
        [field.name]: event.target.value,
      }));
    };

    const changeHandler = field.customEventChangeHandler
      ? (event) => field.customEventChangeHandler(event, formData, setFormData)
      : defaultChangeHandler;

    switch (field.type) {
      case "none":
        return null;
      case "text":
        return (
          <TextField
            sx={{ padding: 0, margin: 0 }}
            key={index}
            label={field.label}
            name={field.name}
            placeholder={field.label}
            value={formData[field.name] || ""}
            onChange={(event) => {
              setFormData((prev) => ({
                ...prev,
                [field.name]: event.target.value,
              }));
            }}
            required={field.required || false}
            disabled={isView || field.disabled}
          />
        );
      case "textarea":
        return (
          <TextareaAutosize
            sx={{ padding: 0, margin: 0 }}
            key={index}
            className="w-full bg-transparent rounded-[0.3rem] border border-gray-400 border-opacity-50 mb-2 px-3 py-4"
            placeholder={field.label}
            value={formData[field.name] || ""}
            onChange={(event) => {
              setFormData((prev) => ({
                ...prev,
                [field.name]: event.target.value,
              }));
            }}
            disabled={isView || field.disabled}
          />
        );
      case "number":
        return (
          <TextField
            sx={{ padding: 0, margin: 0 }}
            key={index}
            label={field.label}
            name={field.name}
            placeholder={field.label}
            value={formData[field.name] || 0}
            onChange={(event) => {
              const value = event.target.value;
              const limit = field.limit !== undefined ? field.limit : 999;
              if (
                value === "" ||
                (Number(value) <= limit && Number(value) >= 0)
              ) {
                setFormData((prev) => ({
                  ...prev,
                  [field.name]: value === "" ? "" : Number(value),
                }));
              }
            }}
            type="number"
            inputProps={{
              min: 0,
              max: field.limit !== undefined ? field.limit : 999,
            }}
            disabled={isView || field.disabled}
          />
        );
      case "autocomplete":
        return (
          <Autocomplete
            sx={{ padding: 0, margin: 0, marginBottom: "-16px" }}
            key={index}
            options={field.options || []}
            value={
              field.options.find(
                (option) => option.value === formData[field.name]
              ) || null
            }
            onChange={(event, value) => {
              setFormData((prev) => ({
                ...prev,
                [field.name]: value ? value.value : "",
              }));
            }}
            getOptionLabel={(option) => option.label}
            disabled={isDisabled}
            renderInput={(params) => (
              <TextField {...params} label={field.label} />
            )}
          />
        );
      case "multipleSelect":
        return (
          <Autocomplete
            sx={{ padding: 0, margin: 0 }}
            key={index}
            multiple
            options={field.options || []}
            getOptionLabel={(option) => option}
            onChange={(event, value) => handleChange(field.name)(null, value)}
            disableCloseOnSelect
            disabled={isView || field.disabled}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label={field.label}
                placeholder={field.label}
              />
            )}
            value={formData[field.name] || []}
          />
        );
      case "select":
        return (
          <FormControl key={index} sx={{ padding: 0, margin: 0 }}>
            <InputLabel>{field.label}</InputLabel>
            <Select
              labelId={`${field.name}-label`}
              label={field.label}
              name={field.name}
              value={formData[field.name] || ""}
              onChange={(event) => {
                setFormData((prev) => ({
                  ...prev,
                  [field.name]: event.target.value,
                }));
              }}
              disabled={isView || field.disabled}
            >
              {field.options?.map((option, idx) => (
                <MenuItem key={idx} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      case "checkbox":
        return (
          <FormControl key={index} sx={{ padding: 0, margin: 0 }}>
            <FormLabel component="legend">{field.title}</FormLabel>
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  placeholder={field.label}
                  checked={formData[field.name] || false}
                  onChange={handleChange(field.name)}
                  disabled={isDisabled}
                />
              }
              label={field.label}
            />
          </FormControl>
        );
      case "switch":
        return (
          <FormControl key={index} sx={{ padding: 0, margin: 0 }}>
            <FormLabel component="legend">{field.title}</FormLabel>
            <FormControlLabel
              control={
                <Switch
                  checked={formData[field.name] || false}
                  onChange={(event) => {
                    setFormData((prev) => ({
                      ...prev,
                      [field.name]: event.target.checked,
                    }));
                  }}
                  disabled={isView || field.disabled}
                />
              }
              label={field.label}
            />
          </FormControl>
        );
      case "radio":
        return (
          <FormControl key={index} sx={{ padding: 0, margin: 0 }}>
            <FormLabel>{field.label}</FormLabel>
            <RadioGroup
              key={index}
              row
              name={field.name}
              value={formData[field.name] || ""}
              onChange={handleChange(field.name)}
            >
              {field.options?.map((option, idx) => (
                <FormControlLabel
                  key={idx}
                  value={option.value}
                  control={<Radio disabled={isView || field.disabled} />}
                  label={option.label}
                />
              ))}
            </RadioGroup>
          </FormControl>
        );
      case "datePicker":
        return (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              sx={{ minWidth: "100%", padding: 0, margin: 0 }}
              key={index}
              label={field.label}
              name={field.name}
              value={dayjs(formData[field.name] || null)}
              onChange={(value) => handleChange(field.name)(null, value)}
              disabled={isView || field.disabled}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        );
      case "dateTimePicker":
        return (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              sx={{ minWidth: "100%", padding: 0, margin: 0 }}
              key={index}
              label={field.label}
              name={field.name}
              value={dayjs(formData[field.name] || null)}
              onChange={(value) => handleChange(field.name)(null, value)}
              disabled={isView || field.disabled}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        );
      default:
        return null;
    }
  };

  // Check if children contain a form element
  const containsForm = React.Children.toArray(children).some(
    (child) => child.type === "form"
  );

  return (
    <Modal open={open} onClose={onClose}>
      <Grid
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "background.default",
          flexDirection: "column",
        }}
        className={`w-3/5 ${
          isScrollable === true ? "h-3/4 overflow-scroll" : ""
        } p-4 flex flex-col gap-3 rounded-lg border border-neutral-700`}
      >
        <div
          className={`flex flex-row ${
            isEditButton === true ? "justify-between" : "justify-start"
          } items-center`}
        >
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
          {isEditButton === true ? (
            <>
              <IconButton onClick={onEditButtonClick}>
                <MdOutlineModeEditOutline />
              </IconButton>
            </>
          ) : (
            <></>
          )}
        </div>

        {containsForm ? (
          children
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {fields?.map((field, index) => (
              <div
                key={index}
                className={`w-full flex flex-col gap-3 ${
                  field.custom ? "p-3 border border-neutral-700 rounded-lg" : ""
                }`}
              >
                {renderField(field, index)}
                {field.custom &&
                  field.custom(
                    formData,
                    setFormData,
                    field,
                    index,
                    handleChange
                  )}
              </div>
            ))}
            {children && <div className="w-full">{children}</div>}
            {isCustomSubmitButtom === true ? (
              customSubmitButton
            ) : (
              <div
                className={`flex flex-row ${
                  isView === true ? "justify-center" : "justify-between"
                } items-center`}
              >
                {!isView && (
                  <Button type="submit" variant="contained">
                    {submitLabel}
                  </Button>
                )}
                <Button type="button" variant="outlined" onClick={onClose}>
                  {isView ? "Close" : "Cancel"}
                </Button>
              </div>
            )}
          </form>
        )}
      </Grid>
    </Modal>
  );
};

export default CustomModal;
