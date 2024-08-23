import { createContext,useState } from "react";

export const IncomeContext = createContext()


export const IncomeContextProvider =({children})=>{
const [incomes,setincomes]=useState([])


const displayIncome=(incomeData)=>{
    // income after fetching from an api
    setincomes(incomeData)
}

const addIncome = (newIncome)=>{
    setincomes(prevIncome=> [newIncome,...prevIncome])
}
const deleteIncome = (IncomeId)=>{
    setincomes(prevIncome=> prevIncome.filter(income=> income.id !== IncomeId))
}



return (
      <IncomeContext.Provider  value={{incomes,displayIncome,addIncome,deleteIncome}}>
        {children}
      </IncomeContext.Provider>
)
}