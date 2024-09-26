import { IconKeys } from "../../components"

export type AddressListType = {
    _id: number,
    name: string,
    code: string,
    country?: string,
    province?: string,
    description?: string,
    district?: string,
    image?: IconKeys
}

export interface AddressLocalListResponseProps {
    count: number,
    data: AddressListType[],
    errorCode: number,
    errorMsg: string
}

export interface GetLocalListRequestProps {
    queryInput: {
        region?: string,
        country?: string,
        province?: string,
        district?: string
    },
    limit?: number,
    skip?: number,
    sort?: []
}


