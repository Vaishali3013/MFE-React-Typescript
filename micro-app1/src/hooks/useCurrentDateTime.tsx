import { useEffect, useState } from 'react';

export const useCurrentDateTime = (): any => {
    const [currentDateTime, setCurrentDateTime] = useState(new Date());

    useEffect(() => {
        // to set date/time after every second
        const intervalId: any = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000);
        // here we are unmounting the component
        return () => {
            clearInterval(intervalId);
        };
    }, []);
    const dateOptions: any = {
        weekday: 'long', // Display the full weekday name (e.g., "Tuesday").
        day: '2-digit', // Display the day of the month with leading zeros (e.g., "01").
        month: 'short', // Display the abbreviated month name (e.g., "Aug").
        year: 'numeric', // Display the year (e.g., "2023").
    };
    const timeOptions: any = {
        hour: 'numeric', // Display the hour (12-hour clock) with leading zeros (e.g., "10").
        minute: 'numeric', // Display the minute with leading zeros (e.g., "30").
        second: 'numeric', // Display the second with leading zeros (e.g., "45").
    };

    const formattedDate = currentDateTime
        .toLocaleDateString('en-US', dateOptions)
        .toUpperCase();
    const formattedTime = currentDateTime.toLocaleTimeString(
        'en-US',
        timeOptions
    );

    return { formattedDate, formattedTime };
};
