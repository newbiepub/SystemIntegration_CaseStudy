import db from "../db/database";
import {Schema} from "mongoose";

export const BenefitHistory = db.model("benefit_history", new Schema({
    hr_employee_id: {type: String, default: ""},
    pr_employee_id: {type: String, default: ""},
    first_name: {type: String, default: ""},
    last_name: {type: String, default: ""},
    middle_initial: {type: String, default: ""},
    address1: {type: String, default: ""},
    address2: {type: String, default: ""},
    city: {type: String, default: ""},
    state: {type: String, default: ""},
    zip: {type: Number, default: 0},
    email: {
        type: String,
        validate: {
            validator: function (v) {
                return (new RegExp((/^[a-z0-9A-Z]{1,}\@[a-z0-9A-Z]{1,}\.[a-z0-9A-Z]{1,}$/))).test(v);
            },
            message: '{VALUE} is not a valid email !'
        },
        default: ""
    },
    phone_number: {
        type: String,
        validate: {
            validator: (v) => {
                return (new RegExp(/^\+?\d{1,3}?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d$/)).test(v);
            },
            message: "{VALUE} is not a valid phone number"
        }, default: ""
    },
    SSN: {
        type: String
    },
    driver_license: {type: String, default: ""},
    marital_status: {type: String, default: ""},
    gender: {type: Boolean},
    shareholder_status: {type: Boolean},
    benefit_plan: {type: Number},
    Ethnicity: {type: String, default: ""},
    pay_rate: {type: String, default: ""},
    pay_rates_id_pay_rates: {type: Number},
    vacation_days: {type: Number, default: 0},
    paid_to_date: {type: Number, default: 0},
    paid_last_year: {type: Number, default: 0},
    birthday: {type: Date},
    old_plan_name: {type: String},
    changed_plan_name: {type: String},
    createdAt: {type: Date, default: new Date()}
}, {validateBeforeSave:false}), "benefit_history");