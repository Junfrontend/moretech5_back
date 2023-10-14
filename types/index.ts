import { ServiceEnum } from "../controllers/officeController/types"

export type OfficeType = {
    id?: number,
    salePointName: string,
    address: string,
    status: string,
    salePointCode?: string,
    openHours: OpenHoursType[],
    rko: string,
    network?: null,
    openHoursIndividual: OpenHoursType[],
    officeType: string,
    salePointFormat: string,
    suoAvailability: null | string,
    hasRamp: null | string,
    latitude: number,
    longitude: number,
    metroStation: null | string,
    distance: number,
    kep: null | boolean,
    myBranch: boolean,
    cardsService?: boolean,
    creditService?: boolean,
    mortgageService?: boolean,
    carCreditService?: boolean,
    depositsService?: boolean,
    isOpen?: boolean,
    workload?: { [service: string]: WorkLoadType[] },
    queueLoad?: { [service: string]: QueueLoadType }

}

export type WorkLoadType = { day: number, count: number }
export type QueueLoadType = { time: number, count: number }

type OpenHoursType = {
    days: string,
    hours: string,
}

export type AtmsType = {
    address: string,
    latitude: number,
    longitude: number,
    allDay: boolean,
    services: ServicesType
}

type ServicesType = {
    wheelchair: ServiceParameterType,
    blind: ServiceParameterType,
    nfcForBankCards: ServiceParameterType,
    qrRead: ServiceParameterType,
    supportsUsd: ServiceParameterType,
    supportsChargeRub: ServiceParameterType,
    supportsEur: ServiceParameterType,
    supportsRub: ServiceParameterType
}

type ServiceParameterType = {
    serviceCapability: string,
    serviceActivity: string,
}

export type TicketType = {
    officeId: number,
    createdAt: Date,
    service: ServiceEnum,
    status: TicketStatus
}

export enum TicketStatus {
    WAITING = "waiting",
    SUCCESS = "success"
}


// type ServiceCapability = "SUPPORTED" | "UNSUPPORTED" | "UNKNOWN"

// type ServiceAvailability = "AVAILABLE" | "UNAVAILABLE" | "UNKNOWN"