/**
 * Generic types
 */
declare namespace hc {

    /**
     * Wrapper for v-snackbar
     */
    export interface ISnackbarOptions {
        body: string
        icon?: string
        theme?: string
        timeout?: number
    }

    /**
     * Storing the map position for when we visit a place and go back
     * @param bounds the bounds of the map SW, and NE
     * @param center the center in lat, lng
     * @param zoom number the zoom level
     */
    export interface IMapPosition {
        bounds: hc.IBounds
        center: hc.ILatlng
        zoom: number
    }

    /**
     * Extending googles photo object for SSR
     */
    export interface IGooglePhoto extends google.maps.places.PlacePhoto {
        photo_reference: string
    }

    /**
     * Open a dialog with the following options
     * @param body string the body of the dialog
     * @param cancel string the text of the cancel button
     * @param confirm string the text of the confirm button
     * @param theme string the theme of the dialog, defaults to alert
     * @param title string the top title of the dialog
     */
    export interface IAlertDialogOptions {
        body?: string
        cancel?: string
        confirm?: string
        html?: string
        noTranslate?: boolean
        resolve?(confirm: boolean): void
        reject?(confirm: boolean): void
        theme?: 'alert' | 'error' | 'prompt' | 'warning'
        title?: string
    }

    export interface IForm extends Element[] {
        submit?(): void
        reset?(): void
        validate?(): void
        getValues?(): {}
    }

    /**
     * Component to encapsulate the toolbar so it can be included in any modules
     * Is a superset of vuetify toolbar
     */
    export namespace toolbar {
        /**
         * Set the actions for the toolbar within the component
         * @param actionOne function the action for iconOne
         * @param actionTwo function the action for iconTwo
         * @param actionThree function the action for iconThree
         */
        export interface IActions {
            actionOne?(event: Event): void
            actionTwo?(event: Event): void
            actionThree?(event: Event): void
        }
        /**
         * Set the visuals for the toolbar on the server
         * @param centered boolean whethere or not to center the title
         * @param centerIcon boolean show the center icon, only on web, defaults to true
         * @param classOne string class for first icon
         * @param classTwo string class for second icon
         * @param classThree string class for third icon
         * @param changeLocation boolean for change location dialog
         * @param iconOne string the first icon on the left
         * @param iconTwo string the second from the right icon
         * @param iconThree string the second from the right icon
         * @param title string the translation key for the title of the toolbar
         * @param theme string sets the theme of the toolbar
         */
        export interface IVisuals {
            centered?: boolean
            centerIcon?: boolean
            changeLocation?: boolean
            classOne?: string
            classTwo?: string
            classThree?: string
            hideSignIn?: boolean
            iconOne?: string
            iconTwo?: string
            iconThree?: string
            title?: string
            theme?: string
        }
        export interface IOptions extends IVisuals {
            actionOne?(event: Event): void
            actionTwo?(event: Event): void
            actionThree?(event: Event): void
        }
    }

    export interface IEvent {
        amount_with_taxes: number
        confirmed_goalies: number
        confirmed_players: number
        currency: ICurrencyObject
        description: strin
        event_attendance: IAttendanceObject
        home: boolea
        icetime: IIcetimeObject
        kind: string
        level_string: string
        link: ILinkObject
        max_goalies: number
        max_level: number
        max_players: number
        min_level: number
        opponent: ITeamObject
        organizers: IUserObject[]
        pay_cash: boolean
        pay_online: boolean
        price: number
        secret: boolean
        social_proof: string
        team: ITeamObject
        title: string
        uuid: string
    }

    export interface ILatlng {
        lat: number
        lng: number
    }

    export interface IBounds {
        sw: number[]
        ne: number[]
    }

    export interface ILink {
        full: string
        relative: string
    }

    export interface IPlace {
        address: string
        category: string
        city: string
        country: string
        details: google.maps.places.PlaceResult
        friendly_location: string
        google_place_id: string
        ice_status: string
        latitude: number
        link: ILink
        longitude: number
        name: string
        permalink: string
        phone: string
        photo_ref: string
        provider: string
        province: string
        tags: string[]
        uuid: string
        website: string
    }

    export interface IPhotoObject {
        height: number
        tags: Array<any>
        title: string
        urls: {
            large: string
            medium: string
            thumbnail: string
        }
        uuid: string
        width: number
    }

    export interface IUser {
        admin?: boolean
        assignments: any[]
        avatar: string
        created_at: Date
        currency?: ICurrencyObject
        default_language: string
        default_newsfeed: string
        email_address: IEmailAddress
        female: boolean
        first_name: string
        goalie: boolean
        initials: string
        last_name: string
        leagues: ILeagueObject[]
        level: {
            number: number
            text: string
        }
        link: ILinkObject
        location?: ILocationObject
        locations?: ILocationObject[]
        name: string
        pending_waivers: any[]
        position: string
        profile_picture: IPhotoObject
        sports: string[]
        stripe_account?: any
        teams: ITeamObject[]
        username: string
        uuid: string
        verified: boolean
    }
}
