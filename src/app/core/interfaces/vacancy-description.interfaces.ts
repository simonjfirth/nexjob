
export interface PanelType {
    id?: number;
    name: string;
    Id?:number;
}

export interface Description {
    Title: string;
    Description: string;
    SortOrder: number;
    PanelType: PanelType;
}

export interface Knockout {
    QuestionID: number;
    Name: string;
}

export interface VacancyModel {
    id: string;
    isSaved?: boolean;
    clientId: string;
    brandId?: string;
    clientName: string;
    companyName: string;
    vacancyId: number;
    referenceNumber: string;
    liveDate: Date;
    expiryDate: Date;
    url: string;
    applyUrl?: any;
    title: string;
    salary: string;
    workingPattern: string;
    category: string;
    locationName: string;
    street: string;
    town: string;
    city?: any;
    postcode: string;
    latitude: number;
    longitude: number;
    isRegion: string;
    distance?: any;
    descriptions: Description[];
    sjTs?: any;
    logoUrl?: string;
    verbalAndNumeric?: any;
    knockout: Knockout[];
    freetext?: any;
    videoUrl?: any;
    applicationSections?: any;
    qualities?: any;
    isGeniusATS: boolean;
    lastUpdate: Date;
    salaryActual?: string;

}

