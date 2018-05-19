declare module "*.json" {
    export default value;
    const value: {
        enableToggleLayout?: boolean;
        enableTheamSwitcher?: boolean;
        enableLayoutSwitcher?: boolean;
        enableSearchOnHeader?: boolean;
        enableEMailNotificationOnHeader?: boolean;
        enableBellNotificationOnHeader?: boolean;
        theamName?: string;
        enableAuth? : boolean; 
        app?: {
            firstName?: string;
            lastName?: string;
            title?: string;
        },
        proprietor: {
            name: string,
            social: any[]
        },
        api?: {
            native?: {
                endpoint: string,
                authendpoint: string
            },
        },
    };
}
