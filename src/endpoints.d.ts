// Generated using typescript-generator version 1.25.322 on 2017-07-15 18:57:47.

declare module "endpoints" {

    interface ReservationAddRequest {
        startDatetime: Date;
        hours: number;
    }

    interface ClubsListResponse {
        url: string;
        name: string;
    }

    interface ReservationResponse {
        id: string;
        startDatetime: Date;
        hours: number;
    }

}
