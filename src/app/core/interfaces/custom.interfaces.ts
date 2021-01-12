import { VacancySearch } from './api.interfaces';

export interface KeyValue {
    Key?: number | undefined;
    Value?: string | undefined;
}

export interface IOption {
    Key: number | string;
    Value: string;
    disabled?: boolean;
}

export interface LatLng {
    lat?: number;
    lng?: number;
}

export interface VacancyDtoRead {
    VacancyID?: number | undefined;
    Title?: string | undefined;
    SalaryDescription?: string | undefined;
    ContractTypeName?: string | undefined;
    WorkingPatternName?: string | undefined;
    LocationBrandName?: string | undefined;
    LocationName?: string | undefined;
    LocationTown?: string | undefined;
    LocationStreet?: string | undefined;
    LocationPostcode?: string | undefined;
    LocationLatitude?: number | undefined;
    LocationLongitude?: number | undefined;
    LocationLocationDocuments?: LocationDocumentDtoRead[] | undefined;
    ExternalClosing?: string | undefined;
    InternalClosing?: string | undefined;
    VideoUrl?: string | undefined;
    ExternalOpening?: string | undefined;
    HiringOrganization?: string | undefined;
    ReportsTo?: string | undefined;
    ResponsibleFor?: string | undefined;
    VacancySkills?: VacancySkillDto[] | undefined;
    VacancyDescriptions?: VacancyDescriptionDto[] | undefined;
    SocialBrand?: SocialBrand | undefined;
    RegionDataPolygon?: string | undefined;
    Brands?: BrandDto[] | undefined;
}
export interface LocationDocumentDtoRead {
    LocationDocumentTypeName?: string | undefined;
    Document?: DocumentDtoRead | undefined;
}

export interface VacancySkillDto {
    Title?: string | undefined;
    Descriptor?: string | undefined;
}
export interface VacancyDescriptionDto {
    Title?: string | undefined;
    Description?: string | undefined;
    SortOrder?: number | undefined;
    GroupId?: number | undefined;
    VacancyPanelTypeName?: string | undefined;
}
export interface SocialBrand {
    Url?: string | undefined;
    TwitterUsername?: string | undefined;
    TwitterRelatedUsername?: string | undefined;
    Hashtags?: string | undefined;
    Image?: string | undefined;
    ImageAlt?: string | undefined;
    FacebookAppId?: string | undefined;
}

export interface DocumentDtoRead {
    Name?: string | undefined;
    Filename?: string | undefined;
    UniqueID?: string | undefined;
    FileExtension?: string | undefined;
}

export interface BrandDto {
    BrandID?: number | undefined;
    DisplayName?: string | undefined;
    BackgroundColour?: string | undefined;
    TextColour?: string | undefined;
    UniqueID?: string | undefined;
}

export interface VacancySearchExtended extends VacancySearch {
    isSaved?: boolean;
    referenceNumber?: string;
    id?: string;
    openingDate?: string;
    liveDate?: string;
    expiryDate?: string;
    salary?: string;
    companyName?: string;
    workingPattern?: string;
    salaryDescription?: string;
    logoUrl?: string;
    brandId?: string;
    clientId?: string;
    salaryActual?: number;
}

export interface searchThisArea {
    lat?: number;
    lng?: number;
    canSearch?: boolean;
    
}


export interface Vacancy {
    externalClosing?: string;
    externalOpening?: string;
    internalClosing?: string;
    vacancyId?: number;
    title?: string;
    salaryDescription?: string;
    contractTypeName?: string;
    workingPatternName?: string;
    location?: VacancyLocation;
    descriptions?: VacancyDescriptions[];
}

export interface VacancyLocation {
    name?: string;
    street?: string;
    town?: string;
    postcode?: string;
    latitude?: number;
    longitude?: number;
}

export interface VacancyDescriptions {
    title?: string;
    description?: string;
    sortOrder?: number;
    panelTypeId?: number;
}

export interface JWT {
    token: string;
    clientId: string;
    expires_in: number;
    firstName: string;
    lastLoggedIn: string;
    lastName: string;
    token_type: string;
    userId: string;
    userName: string;
    roles: string;
}



export interface Profile {
    applicationId?: number;
    userId?: string;
    forename?: string;
    surname?: string;
    address?: number;
    postcode?: number;
    phoneMain?: number;
    currentJobTitle?: string;
    currentEmployer?: string;
    emailAddress?: string;
}


export interface ProfileOption {
    title?: string;
    url?: string;
}

export interface IOption {
    Key: number | string;
    Value: string;
    key?: number | string;
    value?: string;
    disabled?: boolean;
}

export interface BulkLookup {
    name: string;
    items: IOption[];
}

export interface IOption {
    Key: number | string;
    Value: string;
    disabled?: boolean;
}



export interface CompletedApplicationSections {
    name?: string;
    completed?: boolean;
    value?: boolean;
}

export interface Appointment {
    appointmentId?: number;
    location?: string;
    startDate?: string;
    endDate?: string;
    timeslots?: any[];
}


export interface HasApp {
    result?: boolean;
}

export interface ResetPassword {
    email?: string;
    password?: string;
    confirmPassword?: string;
    code?: string;
}

export interface ApplicationSetupStart {
    vacancyId?: number,
    email?: string,
    success?: boolean,
    newAccount?: boolean,
    passwordResetToken?: string;
}

export let profileApplications: ProfileOption[] = [
    {
        title: 'Current Applications',
        url: '/account/my-applications/current'
    },
    {
        title: 'Application History',
        url: '/account/my-applications/history'
    }
];
export let profileMenu: ProfileOption[] = [
    {
        title: 'Personal Details',
        url: '/account/my-details/personal-details'
    },
    {
        title: 'Education',
        url: '/account/my-details/education'
    },
    {
        title: 'Employment',
        url: '/account/my-details/employment-history'
    },
    {
        title: 'References',
        url: '/account/my-details/references'
    },
    {
        title: 'Skills',
        url: '/account/my-details/skills'
    },
    {
        title: 'Preferences',
        url: '/account/my-details/preferences'
    },
    {
        title: 'CV',
        url: '/account/my-details/cv'
    }
]

export let settingsOptions: ProfileOption[] = [
    {
        title: 'Change Password',
        url: '/account/settings/change-password'
    },
    {
        title: 'Delete My Account',
        url: '/account/settings/delete-account'
    }
];