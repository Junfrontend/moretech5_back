import { QueueLoadType, TicketStatus, WorkLoadType } from './../../types/index';
import { NextFunction, Request, Response } from 'express';
import { GetAllOfficesRequestQueryI, PointEnum, ServiceEnum } from './types';
import { officeTickets, officesData } from '../../data/offices';
import { atmsData } from '../../data/atms';
import { AtmsType, OfficeType, TicketType } from '../../types';
import { AverageServiceTime } from '../../data/dataGenerator';
import moment from 'moment';

const officeController = {
  async getAllOffices(
    req: Request<object, object, object, GetAllOfficesRequestQueryI>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const {
        downLimitLatitude,
        upLimitLatitude,
        leftLimitLongitude,
        rightLimitLongitude,
        pointType,
        serviceType,
        hasRamp
      } = req.query;

      let result: OfficeType[] | AtmsType[];
      if (pointType == PointEnum.OFFICE) {
        //фильтрация по расположению на карте
        result = officesData.map((office, index) => ({ id: index, ...office })).filter(
          (office) =>
            office.latitude >= downLimitLatitude &&
            office.latitude <= upLimitLatitude &&
            office.longitude >= rightLimitLongitude &&
            office.longitude <= leftLimitLongitude
        ) as OfficeType[];

        const now = new Date();
        const day = now.getDay()
        //todo сделать учет локального времени
        result = result.filter((office) => {
          const openHours = office.openHours[day - 1]
          if (!openHours) {
            office.isOpen = false;
            return true
          }
          let starTime = openHours.hours.split("-")[0]
          let endTime = openHours.hours.split("-")[1]
          if (!starTime || !endTime) {
            office.isOpen = false;
            return true
          }
          let startOpen = moment();
          let endOpen = moment();
          startOpen.set('hour', Number(starTime.split(":")[0]))
          startOpen.set('minutes', Number(starTime.split(":")[1]))
          endOpen.set('hour', Number(endTime.split(":")[0]))
          endOpen.set('minutes', Number(endTime.split(":")[1]))
          if (moment().diff(startOpen, 'seconds') >= 0 && endOpen.diff(moment(), 'seconds') > 0) {
            office.isOpen = true;
            return true
          }
          office.isOpen = false;
          return true
        })

        result = serviceType ? result.filter((office) => office[serviceType]) : result;
        result = hasRamp ? result.filter((office) => office.hasRamp && office.hasRamp.toLowerCase() === "y") : result;

        const services = Object.values(ServiceEnum);
        //подсчет нагрузки 
        result.forEach((office) => {
          let officeServiceTickets: TicketType[] = []
          const workload = {}
          for (let i = 0; i < services.length; i++) {
            if (!office[services[i]]) {
              continue
            }
            let now = new Date();
            const workloadService: WorkLoadType[] = []
            officeServiceTickets = officeTickets.filter((ticket) => ticket.service === services[i] && ticket.officeId === office.id && ticket.status === TicketStatus.SUCCESS)
            for (let j = 0; j < 7; j++) {
              now.setDate(now.getDate() - 1)
              workloadService.push({ day: now.getDay(), count: officeServiceTickets.filter((ticket) => ticket.createdAt.getDate() === now.getDate()).length })
            }
            workload[services[i]] = workloadService.sort((load1, load2) => load1.day - load2.day)
          }
          office.workload = workload
        })

        //подсчет очереди 
        result.forEach((office) => {
          let officeServiceTickets: TicketType[] = []
          const queueLoad: { [service: string]: QueueLoadType } = {}
          for (let i = 0; i < services.length; i++) {
            if (!office[services[i]]) {
              continue
            }
            officeServiceTickets = officeTickets.filter((ticket) => ticket.service === services[i] && ticket.officeId === office.id && ticket.status === TicketStatus.WAITING)

            queueLoad[services[i]] = { count: officeServiceTickets.length, time: officeServiceTickets.length * AverageServiceTime[services[i]] }
          }
          office.queueLoad = queueLoad
        })
      }



      if (pointType == PointEnum.ATM) {
        //фильтрация по расположению на карте
        result = atmsData.map((atm, index) => ({ id: index, ...atm })).filter(
          (atm) =>
            atm.latitude >= downLimitLatitude &&
            atm.latitude <= upLimitLatitude &&
            atm.longitude >= rightLimitLongitude &&
            atm.longitude <= leftLimitLongitude
        ) as AtmsType[];
      }

      if (result) {
        return res.status(200).send(result);
      }
    } catch (error) {
      console.log(error)
      return next(error);
    }
  },

  async getOffice(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { officeId } = req.params;

      const office = officesData[officeId];
      return res.status(200).send(office);
    } catch (error) {
      console.log(error)
      return next(error);
    }
  },

  async getAtm(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { atmId } = req.params;

      const office = atmsData[atmId];
      return res.status(200).send(office);
    } catch (error) {
      console.log(error)
      return next(error);
    }
  },
};

export default officeController;
