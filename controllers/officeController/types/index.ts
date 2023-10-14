export interface GetAllOfficesRequestQueryI {
    downLimitLatitude: number,
    upLimitLatitude: number,
    leftLimitLongitude: number,
    rightLimitLongitude: number,
    pointType: PointEnum,
    serviceType?: ServiceEnum,
    hasRamp?: boolean
}

export enum PointEnum {
    OFFICE = "office",
    ATM = "atm"
}

export enum ServiceEnum {
    CARD_SERVICE = "cardsService",
    CREDIT_SERVICE = "creditService",
    MORTGAGE_SERVICE = "mortgageService",
    CAR_CREDIT_SERVICE = "carCreditService",
    DEPOSIT_SERVICE = "depositsService",
}
