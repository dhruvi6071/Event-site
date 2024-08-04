import { redirect } from "react-router-dom";

export function getTokenDuration() {
    const storedExpirationDate = localStorage.getItem('expiration');
    const expiratioDate = new Date(storedExpirationDate);
    const now = new Date();

    //If time is left then it will be positive or else negative.
    const duration = expiratioDate.getTime() - now.getTime();
}
export function getAuthToken(){
    const token = localStorage.getItem('token');

    const tokenDuration = getTokenDuration();

    if(tokenDuration < 0){
        return 'EXPIRED';
    }
    return token;
}

export function tokenLoader() {
    return getAuthToken();
}

export function checkAuthLoader(){
    const token = getAuthToken();

    if(!token) {
        return redirect('/auth');
    }
}