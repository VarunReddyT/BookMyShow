import React, { useEffect, useState } from 'react';
import Datepicker from "tailwind-datepicker-react";
import KGF from '../assets/MovieImages/KGF.jpg';
import axios from 'axios';

const options = {
    title: "Date",
    autoHide: true,
    todayBtn: false,
    clearBtn: true,
    clearBtnText: "Clear",
    maxDate: new Date("2030-01-01"),
    minDate: new Date(),
    theme: {
        todayBtn: "",
        clearBtn: "",
        icons: "",
        text: "",
        input: "",
        inputIcon: "",
        selected: "",
    },
    icons: {
        prev: () => <span>Previous</span>,
        next: () => <span>Next</span>,
    },
    datepickerClassNames: "top-12",
    defaultDate: new Date(),
    language: "en",
    disabledDates: [],
    weekDays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
    inputNameProp: "date",
    inputIdProp: "date",
    inputPlaceholderProp: "Select Date",
    inputDateFormatProp: {
        day: "numeric",
        month: "long",
        year: "numeric"
    }
}

export default function ShowTime() {

    const [show, setShow] = useState(false);
    const [theatres, setTheatres] = useState([]);
    const [showtimes, setShowtimes] = useState([]);
    const handleChange = (selectedDate) => {
        console.log(selectedDate);
    }
    const handleClose = (state) => {
        setShow(state);
    }

    const getShowtimes = async() => {
        try{
            const response = await axios.get("http://localhost:4000/theatre/gettheatre/Shakthi");
            console.log(response.data[0]['name']);
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        getShowtimes();
    }  
    , [])

    return (
        <div className="text-white bg-gray-900 min-h-screen">
            <div className='showtimeUp h-96 bg-cover bg-center flex items-end p-6' style={{ backgroundImage: `url(${KGF})` }}>
                <h1 className='text-white text-7xl font-bold'>1 Nenokkadine</h1>
            </div>

            <div className='flex items-center justify-center mt-8'>
                <div className='w-48'>
                    <Datepicker options={options} onChange={handleChange} show={show} setShow={handleClose} />
                </div>
            </div>
            <div className="mt-12 px-6">
                <h2 className="text-3xl font-semibold mb-6">Available Theatres</h2>
                <div className="space-y-6">
                    <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                        <h3 className="text-2xl font-semibold">PVR Cinemas</h3>
                        <div className="flex space-x-4 mt-4">
                            <span className="bg-red-500 py-2 px-4 rounded-lg cursor-pointer">10:00 AM</span>
                            <span className="bg-red-500 py-2 px-4 rounded-lg cursor-pointer">1:00 PM</span>
                            <span className="bg-red-500 py-2 px-4 rounded-lg cursor-pointer">4:00 PM</span>
                            <span className="bg-red-500 py-2 px-4 rounded-lg cursor-pointer">7:00 PM</span>
                        </div>
                    </div>

                    <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                        <h3 className="text-2xl font-semibold">INOX</h3>
                        <div className="flex space-x-4 mt-4">
                            <span className="bg-red-500 py-2 px-4 rounded-lg cursor-pointer">11:00 AM</span>
                            <span className="bg-red-500 py-2 px-4 rounded-lg cursor-pointer">2:00 PM</span>
                            <span className="bg-red-500 py-2 px-4 rounded-lg cursor-pointer">5:00 PM</span>
                            <span className="bg-red-500 py-2 px-4 rounded-lg cursor-pointer">8:00 PM</span>
                        </div>
                    </div>

                    <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                        <h3 className="text-2xl font-semibold">Cinepolis</h3>
                        <div className="flex space-x-4 mt-4">
                            <span className="bg-red-500 py-2 px-4 rounded-lg cursor-pointer">9:00 AM</span>
                            <span className="bg-red-500 py-2 px-4 rounded-lg cursor-pointer">12:00 PM</span>
                            <span className="bg-red-500 py-2 px-4 rounded-lg cursor-pointer">3:00 PM</span>
                            <span className="bg-red-500 py-2 px-4 rounded-lg cursor-pointer">6:00 PM</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
