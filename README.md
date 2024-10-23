weather-app/
│
├── public/
│   └── index.html
│
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── WeatherCard.jsx
│   │   ├── DailySummary.jsx
│   │   └── Alert.jsx
│   │
│   ├── App.js
│   ├── index.js
│   └── styles.css
│
weather-backend/
├── .env
├── server.js
├── models/
│   └── WeatherSummary.js
└── routes/
    └── weather.js
├── package.json
└── README.md

The above is the given structure of the file. 
Steps to install the deoendencies and essentials : 

$ cd app2
$ npm i
$ npm install react-axios


to run the frontend :
$ cd app2
$ npm start

to see the data stored in backend : 
$ cd app2
$ cd weather-backend
$ node server.js

![Screenshot 2024-10-23 191005](https://github.com/user-attachments/assets/4c17eb2a-f01d-4448-a50c-9471f44d907e)

now ctrl + click on http://localhost:5000
on the url, edit the "http://localhost:5000" to "http://localhost:5000/api/get-weather"

![Screenshot 2024-10-23 191544](https://github.com/user-attachments/assets/f1af2e4a-fd2b-468e-9727-2faff6645587)

you will see the backend data stored.
