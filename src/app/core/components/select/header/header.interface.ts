export interface HeaderMenu {
    name?: string;
    url?: string;
    value?: number;
    iconName?: string;
}

export let menuOptions: HeaderMenu[] = [
    {
        name: 'My Details',
        url: '/account/my-details',
        iconName: 'work_outline'
    },
    {
        name: 'My Applications',
        url: '/account/my-applications',
        iconName: 'library_books'
    },
    // {
    //     name: 'Saved Jobs',
    //     url: '/account/saved-jobs',
    //     iconName: 'favorite'
    // },
    // {
    //     name: 'Alerts',
    //     url: 'account/alerts',
    //     iconName: 'feedback'
    // },
    {
        name: 'Settings',
        url: '/account/settings',
        iconName: 'settings_applications'
    },
    {
        name: 'Search Jobs',
        url: '/',
        iconName: 'search'
    },
    {
        name: 'Logout',
        url: '/account/logout',
        iconName: 'exit_to_app'
    }
];