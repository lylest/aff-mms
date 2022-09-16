import firebase from "firebase/compat/app"

const config = {
  apiKey:import.meta.env.VITE_API_KEY ,
  authDomain:import.meta.env.VITE_AUTH_DOMAIN ,
  projectId:import.meta.env.VITE_PROJECT_ID ,
  storageBucket:import.meta.env.VITE_STORAGE_BUCKET ,
  messagingSenderId:import.meta.env.VITE_MESSAGE_ID ,
  appId:import.meta.env.VITE_APP_ID ,
  measurementId:import.meta.env.VITE_MEASUREMENT_ID
  };

  const app = firebase.initializeApp(config);
  export default app;

