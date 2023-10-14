import { TicketStatus, TicketType } from '../types';
import { generateRandomDate, getRandomInt } from '../utils';
import { ServiceEnum } from './../controllers/officeController/types/index';
import { officeTickets, officesData } from './offices';

const periodGenerate = 7;
const periodQueueGenerate = 1 / 24;
export const AverageServiceTime = {
    [ServiceEnum.CARD_SERVICE]: 10,
    [ServiceEnum.CAR_CREDIT_SERVICE]: 13,
    [ServiceEnum.CREDIT_SERVICE]: 15,
    [ServiceEnum.MORTGAGE_SERVICE]: 20,
    [ServiceEnum.DEPOSIT_SERVICE]: 7,
};
const defaultOpenHours = [
    {
        days: "пн",
        hours: "10:00-20:00"
    },
    {
        days: "вт",
        hours: "10:00-20:00"
    },
    {
        days: "ср",
        hours: "10:00-20:00"
    },
    {
        days: "чт",
        hours: "10:00-20:00"
    },
    {
        days: "пт",
        hours: "10:00-20:00"
    },
    {
        days: "сб",
        hours: "10:00-20:00"
    },
    {
        days: "вс",
        hours: "10:00-20:00"
    }
]

export const generateData = () => {
    officesData.forEach((office, index) => {
        office.cardsService = Math.random() < 0.5;
        office.carCreditService = Math.random() < 0.5;
        office.creditService = Math.random() < 0.5;
        office.mortgageService = Math.random() < 0.5;
        office.depositsService = Math.random() < 0.5;

        let startGenerateDate = new Date();
        let startGenerateQueueDate = new Date();
        const services = Object.values(ServiceEnum);
        startGenerateDate.setDate(startGenerateDate.getDate() - periodGenerate);
        startGenerateQueueDate.setDate(startGenerateDate.getDate() - periodQueueGenerate);

        if (office.openHours.length < 7) {
            office.openHours = defaultOpenHours
        }

        //генерация посещений офисов по задачам
        for (let i = 0; i < services.length; i++) {
            if (!office[services[i]]) {
                continue;
            }
            const amountTicketsByPeriod = getRandomInt(100, 250);
            for (let j = 0; j < amountTicketsByPeriod; j++) {
                const ticket: TicketType = {
                    officeId: index,
                    service: services[i],
                    createdAt: generateRandomDate(startGenerateDate, new Date()),
                    status: TicketStatus.SUCCESS,
                };
                officeTickets.push(ticket)
            }
        }

        //генерация текущих очередей офисов по задачам
        for (let i = 0; i < services.length; i++) {
            if (!office[services[i]]) {
                continue;
            }
            const amountTicketsByPeriod = getRandomInt(0, 4);
            for (let j = 0; j < amountTicketsByPeriod; j++) {
                const ticket: TicketType = {
                    officeId: index,
                    service: services[i],
                    createdAt: generateRandomDate(startGenerateQueueDate, new Date()),
                    status: TicketStatus.WAITING,
                };
                officeTickets.push(ticket)
            }
        }
    });
};
