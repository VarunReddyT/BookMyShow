import React, { useEffect, useState } from 'react';
import Datepicker from "tailwind-datepicker-react";
import KGF from '../assets/MovieImages/KGF.jpg';
import axios from 'axios';

const options = {
    title: "Date",
    autoHide: true,
    todayBtn: false,
    clearBtn: false,
    clearBtnText: "Clear",
    maxDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
    minDate: new Date(),
    theme: {
        todayBtn: "",
        clearBtn: "",
        icons: "",
        text: "",
        input: "",
        inputIcon: "",
        selected: " bg-red-500",
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
};

export default function ShowTime() {

    const [show, setShow] = useState(false);
    const [theatres, setTheatres] = useState([]);

    const handleChange = (selectedDate) => {
        console.log(selectedDate);
    };
    const handleClose = (state) => {
        setShow(state);
    };

    const getShowtimes = async () => {
        try {
            const response = await axios.get("http://localhost:4000/showtime/66cc97fc1dc842c18f4a9f62/theatres");
            console.log(response.data);
            setTheatres(response.data['theatres']);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getShowtimes();
    }, []);

    return (
        <div className="text-white bg-gray-900 min-h-screen flex">
            <div className='showtimeUp w-1/3 h-screen bg-cover bg-center flex items-end p-6 sticky top-0' style={{ backgroundImage: `url(${KGF})` }}>
                <h1 className='text-white text-5xl font-bold'>1 Nenokkadine</h1>
            </div>

            <div className="w-2/3 p-6">
                <div className='flex items-center justify-center'>
                    <div className='w-48'>
                        <Datepicker options={options} onChange={handleChange} show={show} setShow={handleClose} />
                    </div>
                </div>
<<<<<<< HEAD
=======

>>>>>>> f1b8e3d186ecb4dcf7c10b72371250aa9422de9e
                <div className="mt-6">
                    <h2 className="text-3xl font-semibold mb-6">Available Theatres</h2>
                    <div className="space-y-6">
                        {theatres.map((theatre, index) => (
                            <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-lg">
                                <h3 className="text-2xl font-semibold">{theatre.theatre.name}</h3>
                                <p className="text-lg">{theatre.theatre.city}</p>
                                <div className="flex space-x-4 mt-4">
                                    {theatre.showtimes.map((showtime, showtimeIndex) => (
                                        <span key={showtimeIndex} className="bg-red-500 py-2 px-4 rounded-lg cursor-pointer">
                                            {showtime.showTime}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
<<<<<<< HEAD
                    </div>
=======
>>>>>>> f1b8e3d186ecb4dcf7c10b72371250aa9422de9e
                </div>
            </div>
        </div>
    );
}
