import axios from "axios";
import { propertyOf } from "lodash";
import { IAutocompliteAddress } from "../types";

export const createApiGetAddresses = () => {
    const api = axios.create({
        baseURL: process.env.GET_ADDRESS_URL,
        headers: {
            Accept: "application/json",
            Authorization: process.env.GET_ADDRESS_TOKEN,
        },
    });

    return api;
};

export const getAddress = async (value: string, amountAddress: number) => {
    const api = createApiGetAddresses();
    const { data } = await api.post("/", {
        query: value,
        count: amountAddress,
        from_bound: { value: "city" },
        to_bound: { value: "settlement" },
    });
    console.log(data)
    return data.suggestions.map((address: IAutocompliteAddress) => ({
        value: address.value,
        lat: propertyOf(address)(["data", "geo_lat"]),
        lon: propertyOf(address)(["data", "geo_lon"]),
    }));
};