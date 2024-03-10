![weather-app-details](https://github.com/ahmedsemih/weather-app-vue/assets/102798814/a48239e8-021f-4cb3-8dc5-42d4a66c3f2c)

# Weather App

This app is a simple weather app with a modern user interface and progressive web app functionalities. 
Users can easily access the current weather and forecast for any location. 
Also, if the app can cache API responses, it can display information even when you are offline.

**Live demo: [https://weather-app-ase.vercel.app/](https://weather-app-ase.vercel.app/)**

## :bulb: Features

- Get current weather and 3 day forecasts
- Use current location with Geolocation API for searching 
- Add locations to bookmarks
- Download as PWA and run like native desktop or mobile app

## :hammer_and_wrench: Built With

- [Vue.js](https://vuejs.org/) - JavaScript Framework
- [Pinia](https://pinia.vuejs.org/) - State Management
- [Vue-Query](https://vue-query-next-gen.vercel.app/) - Data Handling
- [Vite-Plugin-PWA](https://vite-pwa-org.netlify.app/) - Vite Plugin for PWA Integration
- [Vitest](https://vitest.dev/) - Testing Framework
- [Vue-Testing-Library](https://testing-library.com/docs/vue-testing-library/intro/) - Testing Utilities

## :camera_flash: Screenshots
![weather-app-details](https://github.com/ahmedsemih/weather-app-vue/assets/102798814/72fff3b0-29d3-476d-ab09-6c05e99a7744)
![weather-app-bookmarks](https://github.com/ahmedsemih/weather-app-vue/assets/102798814/ea74fe85-4d08-4e7b-ab71-c51a623a5adc)

## :triangular_flag_on_post: Getting Started

First of all you need to clone the repository and install the dependencies

```shell

git clone https://github.com/ahmedsemih/Weather-App-Vue.git

cd Weather-App-Vue

npm install

```

After doing this, you must get an api key from https://www.weatherapi.com/ and assign it to following env variable

```shell

VITE_API_KEY

```

And run dev server

```shell

npm run dev

```



