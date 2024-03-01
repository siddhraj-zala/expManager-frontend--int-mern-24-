import { redirect } from "react-router-dom";

export const CheckLogin = () => {

    console.log("check login");

    const id = sessionStorage.getItem("id");

    if(id === null){
        redirect("/");
    }
    
    return true;
}