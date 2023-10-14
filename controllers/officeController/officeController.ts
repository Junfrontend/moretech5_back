import { NextFunction, Request, Response } from 'express';
import { GetAllOfficesRequestQueryI, PointEnum } from './types';
import { officesData } from '../../data/offices';
import { atmsData } from '../../data/atms';
import { AtmsType, OfficeType } from '../../types';

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
        serviceType
      } = req.query;

      let result: OfficeType[] | AtmsType[];
      if (pointType == PointEnum.OFFICE) {
        result = officesData.map((office, index) => ({ id: index, ...office })).filter(
          (office) =>
            office.latitude >= downLimitLatitude &&
            office.latitude <= upLimitLatitude &&
            office.longitude >= rightLimitLongitude &&
            office.longitude <= leftLimitLongitude
        ) as OfficeType[];

        // const now = new Date();
        // const day = now.getDay()
        // //todo сделать учет локального времени
        // result = result.filter((office) => {
        //   const openHours = office.openHours[day]
        //   console.log(office.openHours)
        //   let starTime = openHours.hours.split("-")[0]
        //   let endTime = openHours.hours.split("-")[1]
        //   if (!starTime || !endTime) {
        //     return true
        //   }
        //   let startOpen = new Date();
        //   let endOpen = new Date();
        //   startOpen.setHours(Number(starTime.split(":")[0]), Number(starTime.split(":")[1]), 0)
        //   console.log(openHours.hours)
        //   endOpen.setHours(Number(endTime.split(":")[0]), Number(endTime.split(":")[1]), 0)
        //   return now >= startOpen && now < endOpen
        // })

        result = serviceType ? result.filter((office) => office[serviceType]) : result
      }

      if (pointType == PointEnum.ATM) {
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
