import { Children, createContext,useState } from "react";


export const SummaryContext = createContext()

export const SummaryContextProvider = ({children})=>{
    const [summary,setSummary] = useState({income:0,expenditure:0,balance:0})
    

    const displaySummary=(summary)=>
    {
        setSummary(summary)
    }
    const addIncometosummary=(newincome)=>{
        setSummary((prevsummary)=>({
            ...prevsummary,
            income:prevsummary.income+newincome,
            balance:prevsummary.balance+newincome
        }))
    }
    const addExpendituretosummary =(newExpenditure)=>{
        setSummary(
            (prevsummary)=>({
                ...prevsummary,
                expenditure:prevsummary.expenditure+newExpenditure,
                balance:prevsummary.balance - newExpenditure
            })
        )
    }
return(
    <SummaryContext.Provider value={{summary,displaySummary,addExpendituretosummary,addIncometosummary}}>
        {children}
    </SummaryContext.Provider>
)

}

