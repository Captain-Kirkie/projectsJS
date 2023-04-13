function authenticate() {
    console.log(process.env.REACT_APP_CLIENT_ID);
    console.log(process.env.REACT_APP_CLIENT_SECRET);
    console.log(process.env.REACT_APP_ACCESS_TOKEN);
    console.log(process.env.REACT_APP_REFRESH_TOkEN);
}

export { authenticate };
