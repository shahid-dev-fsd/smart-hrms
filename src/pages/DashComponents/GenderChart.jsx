import React, { useEffect, useState , useCallback } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { PieChart, Pie, Tooltip, Cell } from "recharts";
import axios from "axios";

const GenderChart = ({ items ={ male: 0, female: 0 ,total:0 } }) => {
  const [genderCount, setGenderCount] = useState([]);
  const [status, setStatus] = useState('Active');
  const [total , setTotal] = useState(0);


  const fetchEmploees = useCallback(
    async (search = '') => {
        try {
            const response = await axios.get(
                `/hr/employee?searchBy=firstName&search=${search}&sortBy=order&status=${status}&page=1`
            );
          //  console.log(response.data.employees);
           countGenders(response?.data?.employees);
          
            // const newEmployeeFilter =  response.data.employees.filter(jod => jod.dateOfJoining === Date.now());
            // setNewEmployee(newEmployeeFilter)
            // console.log(Date.now())
        } catch (e) {
            console.log(e);
        }
    },
    [ ]
);




const countGenders = (employees) => {
  const counts = { male: 0, female: 0 };
  employees.forEach(employee => {
    if (employee?.gender === 'Male') {
      counts.male += 1;
    } else if (employee?.gender ===  'Female') {
      counts.female += 1;
    }
  });
  console.log(counts);
  return setTotal(counts);
};


  useEffect(() => {
    // const GenderData =items && items?.map((box) => (
    //   box.assignedTo &&
    //   box.assignedTo?.map((item) => (item.gender))
    // ));

    // const genders = GenderData && GenderData?.flat().map(gender => gender?.toLowerCase());

    // // Count the occurrences of "male" and "female"
    // const count = genders &&  genders.reduce((acc, gender) => {
    //   if (gender === "male") {
    //     acc.male += 1;
    //   } else if (gender === "female") {
    //     acc.female += 1;
    //   }
    //   return acc;
    // }, { male: 0, female: 0 });

    // fetchEmploees();
    // setGenderCount(count);

    setGenderCount([
      { name: "Male", value: items.male   || 0},
      { name: "Female", value: items.female  || 0},
    ])
  }, []);

  // const data = [
  //   { name: "Male", value: total.male   ? total.male : ''},
  //   { name: "Female", value: total.male  ? total.male : ''},
  // ];

  const colors = ["#3b82f6", "#dc2626"];
  // const totalCount = data.reduce((acc, cur) => acc + cur.value, 0);

  return (
    <Box className="  h-full">
      <Grid
        className="rounded-lg pt-4 pr-4 pb-4"
        sx={{
          backgroundColor: "background.view",
        }}
      >
        <div className="flex flex-col gap-4 items-start">
          <div className="border-l-4 border-[#4B47E4] pl-4 w-full md:text-[18px] md:font-[500] md:leading-[32.55px]">
            Employee Gender
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              marginTop: "48px",
            }}
          >
            { genderCount ?
            <PieChart width={300} height={202}>
              <Pie
                data={genderCount}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {genderCount.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
            :
            "Loading..."
}
          </div>
          <div className="flex flex-row gap-2 mt-9 pl-4 items-center">
            <div
              style={{
                width: "14px",
                height: "14px",
                backgroundColor: colors[0],
              }}
            ></div>
            <div className="text-[10px] md:text-[12px] md:font-[400] md:leading-[19.53px]">
              Male
            </div>
            <div
              style={{
                width: "14px",
                height: "14px",
                backgroundColor: colors[1],
              }}
              className="ml-5"
            ></div>
            <div className="text-[10px] md:text-[12px] md:font-[400] md:leading-[19.53px]">
              Female
            </div>
          </div>
          <div className="pl-4 text-[10px] md:text-[13px] md:font-[500] md:leading-[19.53px]">
            Total: {items.total}
          </div>
        </div>
      </Grid>
    </Box>
  );
};

export default GenderChart;
