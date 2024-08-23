import express from "express"
import { requireAuth } from "../middleware/requireAuth.js";
import { getExpenditure,createExpenditure } from "../controllers/expenditureController.js";
import { getIncome,createIncome } from "../controllers/incomeController.js";
import { getSummary } from "../controllers/summaryController.js";


const route = express.Router()



route.use(requireAuth)
route.get("/income",getIncome)
route.post("/income",createIncome)
route.get("/expenditure",getExpenditure)
route.post("/expenditure",createExpenditure)
route.get("/summary",getSummary)


export {
    route
}