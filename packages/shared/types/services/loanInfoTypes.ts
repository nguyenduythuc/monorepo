import { IconKeys } from "../../components"

export type autoCompleteData = {
    _id: number | string,
    name: string,
    code: string,
    country?: string,
    province?: string,
    description?: string,
    district?: string,
    image?: IconKeys
}