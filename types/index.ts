export type OfficeType = {
    salePointName: string,
    address: string,
    openHours: OpenHoursType[],
    rko: string,
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
    myBranch: boolean
}

type OpenHoursType = {
    days: string,
    hours: string,
}