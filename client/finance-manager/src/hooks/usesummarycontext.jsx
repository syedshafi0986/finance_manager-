import { SummaryContext } from "../context/summaryContext";
import { useContext } from "react";

export const useSummarycontext = ()=>{
    const context = useContext(SummaryContext)

    if(!context){
        throw Error ('useSummaryContext must be used in summarycontext provider')
    }

    return context;
}
