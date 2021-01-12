/* tslint:disable */
/* eslint-disable */
//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v13.2.2.0 (NJsonSchema v10.1.4.0 (Newtonsoft.Json v11.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------
// ReSharper disable InconsistentNaming



export interface ChangeAccountPassword {
    currentPassword?: string | undefined;
    newPassword?: string | undefined;
    confirmPassword?: string | undefined;
}

export interface AccountAnonymisationStatus {
    requested?: boolean;
    confirmed?: boolean;
    processed?: boolean;
    dateRequested?: string | undefined;
    dateConfirmed?: string | undefined;
    dateToAction?: string | undefined;
    createdByControlPanel?: boolean;
}

export interface Login {
    username?: string | undefined;
    password?: string | undefined;
}

export interface UserDto {
    id?: string | undefined;
    firstName?: string | undefined;
    lastName?: string | undefined;
    username?: string | undefined;
    token?: string | undefined;
    expiryDate?: string;
    clientId?: string | undefined;
}

export interface ApplicationAnswer {
    applicationAnswerId?: number;
    questionId?: number;
    questionQuestionTypeName?: string | undefined;
    questionName?: string | undefined;
    answerText?: string | undefined;
}

export interface QuestionAnswer {
    questionId?: number;
    answerText?: string | undefined;
}

export interface CriminalConviction {
    hasUnspentConviction?: boolean | undefined;
    details?: string | undefined;
}

export interface ApplicationDocument {
    applicationDocumentTypeName?: string | undefined;
    name?: string | undefined;
    filename?: string | undefined;
    uniqueId?: string | undefined;
    fileExtension?: string | undefined;
    requireSignature?: boolean | undefined;
    requireUpload?: boolean | undefined;
    completedSignature?: boolean | undefined;
    completedUpload?: boolean | undefined;
    delme?: number;
    onboardingTaskId?: string | undefined;
    isComplete?: boolean | undefined;
}

export interface Education {
    applicationId?: number;
    applicationEducationId?: number;
    school?: string | undefined;
    start_Year?: number | undefined;
    end_Year?: number | undefined;
    degree?: string | undefined;
    fieldOfStudy?: string | undefined;
    grade?: string | undefined;
    activitiesAndSocieties?: string | undefined;
    description?: string | undefined;
}

export interface Employer {
    applicationId?: number;
    applicationEmployerId?: number;
    companyName?: string | undefined;
    title?: string | undefined;
    location?: string | undefined;
    description?: string | undefined;
    startDate?: string | undefined;
    endDate?: string | undefined;
    iWorkHere?: boolean | undefined;
}

export interface EqualOp {
    genderId?: number | undefined;
    ethnicOriginId?: number | undefined;
    religionId?: number | undefined;
    religionOther?: string | undefined;
    dateOfBirth?: string | undefined;
    communityBackgroundId?: number | undefined;
}

export interface Disability {
    isRegisteredDisabled?: boolean | undefined;
    disabledDescription?: string | undefined;
}

export interface ApplicationHistory {
    submittedDate?: string | undefined;
    vacancyId?: number | undefined;
    vacancyTitle?: string | undefined;
    locationName?: string | undefined;
    vacancyStatus?: string | undefined;
    applicationStatus?: string | undefined;
    applicationStatusGroupId?: number | undefined;
    vacancyActive?: boolean;
}

export interface ApplicationHistoryDocument {
    filename?: string | undefined;
    uniqueId?: string | undefined;
    fileExtension?: string | undefined;
}

export interface ApplicationHistoryDetail {
    emailHistoryId?: number | undefined;
    created?: string;
    applicationStatusName?: string | undefined;
    applicationDocuments?: ApplicationHistoryDocument[] | undefined;
}

export interface ApplicationHistoryWithDetail {
    applicationHistoryDetails?: ApplicationHistoryDetail[] | undefined;
    submittedDate?: string | undefined;
    vacancyId?: number | undefined;
    vacancyTitle?: string | undefined;
    locationName?: string | undefined;
    vacancyStatus?: string | undefined;
    applicationStatus?: string | undefined;
    applicationStatusGroupId?: number | undefined;
    vacancyActive?: boolean;
}

export interface Reference {
    applicationId?: number;
    applicationReferenceId?: number;
    personName?: string | undefined;
    positionTitle?: string | undefined;
    organizationName?: string | undefined;
    relationship?: string | undefined;
    address?: string | undefined;
}

export interface Application {
    applicationId?: number;
    vacancyId?: number;
    forename?: string | undefined;
    surname?: string | undefined;
    address?: string | undefined;
    postcode?: string | undefined;
    phoneMain?: string | undefined;
    currentJobTitle?: string | undefined;
    currentEmployer?: string | undefined;
    latitude?: number;
    longitude?: number;
    emailAddress?: string | undefined;
    addressHouse?: string | undefined;
    address1?: string | undefined;
    address2?: string | undefined;
    addressTown?: string | undefined;
    addressCounty?: string | undefined;
    addressCountry?: string | undefined;
    isSimple?: boolean | undefined;
}

export interface ApplicationStagesResponse {
    name?: string | undefined;
    value?: string | undefined;
    completed?: boolean;
}

export interface ApplicationUpdate {
    applicationId?: number;
    vacancyId?: number;
    forename?: string | undefined;
    surname?: string | undefined;
    address?: string | undefined;
    postcode?: string | undefined;
    phoneMain?: string | undefined;
    currentJobTitle?: string | undefined;
    currentEmployer?: string | undefined;
    emailAddress?: string | undefined;
    latitude?: number | undefined;
    longitude?: number | undefined;
    addressHouse?: string | undefined;
    address1?: string | undefined;
    address2?: string | undefined;
    addressTown?: string | undefined;
    addressCounty?: string | undefined;
    addressCountry?: string | undefined;
}

export interface AssessmentList {
    assessmentId?: number;
    name?: string | undefined;
    assessmentTypeId?: number;
    assessmentTypeName?: string | undefined;
}

export interface Assessment {
    applicationAssessmentId?: number;
    createdDate?: string;
    completedDate?: string | undefined;
}

export interface ApplicationAssessmentResponseRead {
    responseID?: number;
    text?: string | undefined;
}

export interface ApplicationAssessmentQuestionRead {
    questionText?: string | undefined;
    numberOfChoices?: number;
    responses?: ApplicationAssessmentResponseRead[] | undefined;
}

export interface ApplicationAssessmentQuestionOverview {
    assessmentComplete?: boolean;
    currentQuestionNumber?: number;
    totalNumberOfQuestions?: number;
    questionType?: string | undefined;
    question?: ApplicationAssessmentQuestionRead;
}

export interface ApplicationAssessmentAnswerPost {
    responseIds?: number[] | undefined;
}

export interface Brand {
    brandId?: number;
    displayName?: string | undefined;
    backgroundColour?: string | undefined;
    textColour?: string | undefined;
}

export interface KeyValue {
    key?: number;
    value?: string | undefined;
}

export interface GenericLookupListItem {
    name?: string | undefined;
    items?: KeyValue[] | undefined;
}

export interface BusinessArea {
    businessAreaId?: number;
    parentBusinessAreaId?: number | undefined;
    name?: string | undefined;
}

export interface Profile {
    userId?: string | undefined;
    forename?: string | undefined;
    surname?: string | undefined;
    address?: string | undefined;
    postcode?: string | undefined;
    phoneMain?: string | undefined;
    currentJobTitle?: string | undefined;
    currentEmployer?: string | undefined;
    emailAddress?: string | undefined;
    addressHouse?: string | undefined;
    address1?: string | undefined;
    address2?: string | undefined;
    addressTown?: string | undefined;
    addressCounty?: string | undefined;
    addressCountry?: string | undefined;
}

export interface PostProfileRequest {
    applicationId?: number;
    userId?: string | undefined;
    forename?: string | undefined;
    surname?: string | undefined;
    address?: string | undefined;
    postcode?: string | undefined;
    phoneMain?: string | undefined;
    currentJobTitle?: string | undefined;
    currentEmployer?: string | undefined;
    addressHouse?: string | undefined;
    address1?: string | undefined;
    address2?: string | undefined;
    addressTown?: string | undefined;
    addressCounty?: string | undefined;
    addressCountry?: string | undefined;
}

export interface JobPrefs {
    distanceWillingToTravel?: number | undefined;
    jobAlertsCandidatePreference?: boolean | undefined;
    salaryMin?: number | undefined;
    businessAreaId?: number | undefined;
    contractTypeId?: number | undefined;
    workingPatternId?: number | undefined;
}

export interface Skill {
    skillId?: number;
    keyword?: string | undefined;
}

export interface Timeslot {
    timeslotId?: number;
    appointmentId?: number;
    startTime?: string;
    endTime?: string;
    simultaneousUsers?: number;
    isFree?: boolean;
}

export interface Appointment {
    title?: string | undefined;
    appointmentId?: number;
    inviteeStatusId?: number;
    timeslots?: Timeslot[] | undefined;
}

export interface SimilarVacancies {
    overallScore?: number;
    vacancyId?: number;
    title?: string | undefined;
    latitude?: number;
    longitude?: number;
    businessAreaName?: string | undefined;
    closingDate?: string;
    contractType?: string | undefined;
    brand?: string | undefined;
    distance?: number;
    locationName?: string | undefined;
}

export interface VacanciesByParentBusinessArea {
    name?: string | undefined;
    friendlyName?: string | undefined;
    businessAreaID?: number;
    vacancies?: number;
}

export interface HasQuestions {
    result?: boolean;
}

export interface VacancySearch {
    vacancyID?: number;
    title?: string | undefined;
    locationName?: string | undefined;
    latitude?: number;
    longitude?: number;
    closingDate?: string;
    contractType?: string | undefined;
    brand?: string | undefined;
    distance?: number;
}

export interface Location {
    name?: string | undefined;
    street?: string | undefined;
    town?: string | undefined;
    postcode?: string | undefined;
    latitude?: number | undefined;
    longitude?: number | undefined;
}

export interface VacancyDescriptions {
    title?: string | undefined;
    description?: string | undefined;
    sortOrder?: number;
    panelTypeId?: number;
}

export interface Skills {
    title?: string | undefined;
    descriptor?: string | undefined;
}

export interface Quality {
    name?: string | undefined;
    icon?: string | undefined;
    score?: number;
}

export interface ApplicationSection {
    id?: number;
    name?: string | undefined;
}

export interface Details {
    externalClosing?: string | undefined;
    externalOpening?: string | undefined;
    internalClosing?: string | undefined;
    vacancyId?: number;
    title?: string | undefined;
    salaryDescription?: string | undefined;
    contractTypeName?: string | undefined;
    workingPatternName?: string | undefined;
    location?: Location;
    descriptions?: VacancyDescriptions[] | undefined;
    skills?: Skills[] | undefined;
    qualities?: Quality[] | undefined;
    applicationSections?: ApplicationSection[] | undefined;
}

export interface Question {
    questionID?: number;
    name?: string | undefined;
    sortOrder?: number;
}