export const HR_ENTITY = {
    Personal: [
        "Employee_ID", "First_Name", "Last_Name", "Middle_Initial", "Address1", "Address2", "City", "State", "Zip",
        "Email", "Phone_Number", "Social_Security_Number", "Drivers_License", "Marital_Status", "Gender", "Shareholder_Status",
        "Benefit_Plans", "Ethnicity"
    ],
    Employment: [
        "Employee_ID", "Employment_Status", "Hire_Date", "Workers_Comp_Code", "Termination_Date", "Rehire_Date", "Last_Review_Date"
    ],
    Benefit_Plans: [
        "Benefit_Plan_ID", "Plan_Name", "Deductible", "Percentage_CoPay"
    ],
    Job_History: [
        "ID", "Employee_ID", "Department", "Division", "Start_Date", "End_Date", "Job_Title", "Supervisor", "Job_Category", "Location",
        "Departmen_Code", "Salary_Type", "Pay_Period", "Hours_per_Week", "Hazardous_Training"
    ]
};