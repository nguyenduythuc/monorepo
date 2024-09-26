import { useEffect, useState } from 'react';
import { useGetDistrictListMutation, useGetProvinceListMutation, useGetWardListMutation, useRequestPendingByUserMutation } from '../redux/slices/apiSlices';
import { useLazyGetPlaceAutoCompleteQuery } from '../redux/slices/apiSlices';
import { autoCompleteData } from '../types/services/loanInfoTypes';

const useAddAddress = () => {
    const [getListAutoComplete, { error: getListAutoCompleteError }] = useLazyGetPlaceAutoCompleteQuery()

    const [provinceList, { isLoading: provinceListLoading, error: provinceListError }] = useGetProvinceListMutation()
    const [districtList, { isLoading: districtListLoading, error: districtListError }] = useGetDistrictListMutation()
    const [wardList, { isLoading: wardListLoading, error: wardListError }] = useGetWardListMutation()

    const [listCityData, setListCityData] = useState<autoCompleteData[] | []>([])

    const [listDistrictData, setListDistrictData] = useState<autoCompleteData[] | []>([])

    const [listWardData, setListWardData] = useState<autoCompleteData[] | []>([])

    const [autoAddressList, setAutoAddressList] = useState<autoCompleteData[] | []>([])

    const onSelectGetData = (code: string, step: number) => {
        if (step === 1) {
            getDistrictList(code)
        } if (step === 2) {
            getWardList(code)
        }
    }

    const getNewResultList = async (searchText: string) => {
        console.log('searchText', searchText)
        const listAddress: autoCompleteData[] = []
        const result = await getListAutoComplete({ searchText: searchText })
        if (result.data) {
            result.data.predictions.map((item) => {
                listAddress.push({ _id: item.place_id, code: item.place_id, name: item.description })
            })
            setAutoAddressList(listAddress)
        } else {
            console.log('error', result.error)
        }
    }

    const getProvinceList = async (country: string) => {
        const result = await provinceList({ queryInput: { country: country } })
        if (result.data) {
            setListCityData(result.data.data)
        } else {
            console.log('error', result.error)
        }
    }

    const getDistrictList = async (country: string) => {
        const result = await districtList({ queryInput: { province: country } })
        if (result.data) {
            setListDistrictData(result.data.data)
        } else {
            console.log('error', result.error)
        }
    }

    const getWardList = async (country: string) => {
        const result = await wardList({ queryInput: { district: country } })
        if (result.data) {
            setListWardData(result.data.data)
        } else {
            console.log('error', result.error)
        }
    }

    useEffect(() => {
        console.log('provinceList')
        getProvinceList('VN')
    }, [])

    return {
        getNewResultList,
        onSelectGetData,
        listCityData,
        listDistrictData,
        listWardData,
        autoAddressList
    }
}
export default useAddAddress