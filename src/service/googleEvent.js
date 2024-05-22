const axios = require("axios");

async function getCalendar(accessToken) {
    try {
        console.log("as")
        const calendarResponse = await axios.get('https://www.googleapis.com/calendar/v3/calendars/primary', {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        return calendarResponse.data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            // Handle authentication error
            console.error('Authentication error:', error.response.data);
            // You might want to refresh the access token here or prompt the user to re-authenticate
            throw new Error('Authentication failed. Please refresh your access token.');
        } else {
            // Handle other errors
            console.error('An error occurred:', error.message);
            throw new Error('Failed to fetch calendar data.');
        }
    }
}


async function  createEvent(access_token , title  ,  startDate ,endDate ) {
    try {
        const  calendar =  await getCalendar(access_token) ;
        const body = {
            "sendNotifications": true,
            "summary": title,
            "start": {
              "dateTime": startDate,
              "timeZone": "UTC"
            },
            "end": {
              "dateTime": endDate,
              "timeZone": "UTC"
            }
          } ;

          console.log(body)
        const calendarResponse = await axios.post(`https://www.googleapis.com/calendar/v3/calendars/${calendar.id}/events`, 
        body, {
            headers: { Authorization: `Bearer ${access_token}` },
        });
        return calendarResponse.data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            console.error('Authentication error:', error.response.data);
            throw new Error('Authentication failed. Please refresh your access token.');
        } else {
            console.error('An error occurred:', error.response);
            throw new Error('Failed to fetch calendar data.');
        }
    }
} 

//jn3jt0u33stnkkd4hqccqd6418
async function  deleteEvent(access_token , eventId) {
    try {
        const calender =  await  getCalendar(access_token); 
        axios.delete(`https://www.googleapis.com/calendar/v3/calendars/${calendar.id}/events/${eventId}` , {header : { access_token }})
    }
    catch (error) { 
        console.error("server while  delect event from google" , google)
    }
}

module.exports = { getCalendar  , createEvent , deleteEvent};