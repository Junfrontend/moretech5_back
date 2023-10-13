import { NextFunction, Request, Response } from 'express';
import { GetAllOfficesRequestQueryI } from './types';
import { officesData } from '../../offices';
import { OfficeType } from '../../types';

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
      } = req.query;

      const offices: OfficeType[] = officesData.map((officeData) =>
        JSON.parse(JSON.stringify(officeData))
      );

      const filteredOffices = offices.filter(
        (office) =>
          office.latitude >= downLimitLatitude &&
          office.latitude <= upLimitLatitude &&
          office.longitude >= rightLimitLongitude &&
          office.longitude <= leftLimitLongitude
      );

      return res.status(200).send(filteredOffices);
    } catch (error) {
      console.log(error)
      return next(error);
    }
  },
};

export default officeController;
