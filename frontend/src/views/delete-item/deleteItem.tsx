import { Button } from "@mui/material"
import { useNavigate, useParams } from "react-router-dom"
import axiosInstance from "../../api/axiosInstance"

import { useTranslation } from "react-i18next"
import { useEffect, useState } from "react"
const DeleteItem=()=>{

    const redirect=useNavigate()
    const {id}=useParams()
    const {t}=useTranslation()

    const [itemExists, setItemExists] = useState(true);

    useEffect(() => {
       
        const checkItemExists = async () => {
            try {
                const response = await axiosInstance.get(`/api/InventoryItem/${id}`);
                console.log('response')
                if (response.status !== 200) {
                    setItemExists(false);
                    
                }
            } catch (error) {
                setItemExists(false);
            }
        };

        checkItemExists();
        
    }, [id]);

    const handleDeleteButtonClick = async () => {
        try {
            await axiosInstance.delete(`/api/inventoryItem/${id}`);
            redirect('/dashboard',{replace:true});
        } catch (error:any) {
            console.error("Error deleting the item:", error.response ? error.response.data : error.message);
            alert(t("itemDeleteError"));
            redirect('/dashboard',{replace:true})
        }
    };
    const handleBackBtnClick=()=>{
        redirect('/dashboard')
    }
    return<div>
        <h2> {t("deleteItem")}</h2>
        <h4> {t("deleteQuestion")}</h4>

        <div><Button disabled={!itemExists} variant="contained" onClick={handleDeleteButtonClick}>{t("deleteYes")}</Button>

        <Button variant="contained" sx={{margin:'10px'}} color="secondary" onClick={handleBackBtnClick}>{t("deleteBack")}</Button>
        </div>
        
        


    </div>
}

export default DeleteItem