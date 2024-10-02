import { Button } from "@mui/material"
import { useNavigate, useParams } from "react-router-dom"
import axiosInstance from "../../api/axiosInstance"

import { useTranslation } from "react-i18next"
const DeleteItem=()=>{

    const redirect=useNavigate()
    const {id}=useParams()
    const {t}=useTranslation()


    const handleDeleteButtonClick=async ()=>{
        await axiosInstance.delete(`/api/inventoryItem/${id}`)
        redirect('/dashboard')
    }
    const handleBackBtnClick=()=>{
        redirect('/dashboard')
    }
    return<div>
        <h2> {t("deleteItem")}</h2>
        <h4> {t("deleteQuestion")}</h4>

        <div><Button onClick={handleDeleteButtonClick}>{t("deleteYes")}</Button>

        <Button onClick={handleBackBtnClick}>{t("deleteBack")}</Button>
        </div>
        
        


    </div>
}

export default DeleteItem