export interface LocationIQ {
    class?: string;
    display_name?: string;
    lat?: string;
    lon?: string;
    place_id?: string;
    address?: IQAddress;
}
export interface IQAddress {
    road?: string;
    suburb?: string;
    city?: string;
    state_district?: string;
    state?: string;
    postcode?: string;
    country?: string;
    county?: string;
    
    country_code?: string;
    house_number?: string;
    neighbourhood?: string;
}
