import { createContext,useState } from "react";

export const ExpenditureContext = createContext()


export const ExpenditureContextProvider =({children})=>{
const [Expenditures,setExpenditures]=useState([])


const displayExpenditure=(ExpenditureData)=>{
    // Expenditure after fetching from an api
    setExpenditures(ExpenditureData)
}

const addExpenditure = (newExpenditure)=>{
    setExpenditures(prevExpenditure=> [newExpenditure,...prevExpenditure])
}
const deleteExpenditure = (ExpenditureId)=>{
    setExpenditures(prevExpenditure=> prevExpenditure.filter(Expenditure=> Expenditure.id !== ExpenditureId))
}



return (
      <ExpenditureContext.Provider  value={{Expenditures,displayExpenditure,addExpenditure,deleteExpenditure}}>
        {children}
      </ExpenditureContext.Provider>
)
}