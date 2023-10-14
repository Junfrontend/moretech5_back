import { officesData } from "./offices"

export const generateData = () => {
    officesData.forEach((office) => {
        office.cardsService = Math.random() < 0.5
        office.carCreditService = Math.random() < 0.5
        office.creditService = Math.random() < 0.5
        office.mortgageService = Math.random() < 0.5
        office.depositsService = Math.random() < 0.5
    })
}