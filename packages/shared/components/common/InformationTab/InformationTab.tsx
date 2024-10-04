import { View, Text, TouchableOpacity, ScrollView, Platform } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import tw from '@lfvn-customer/shared/themes/tailwind';
import { Icon, IconKeys } from '../Icon';
import {
    ekycDataType,
    mapEkycKeyValue,
} from '@lfvn-customer/shared/types/services/verifyCustomerTypes';
import useTranslations from '@lfvn-customer/shared/hooks/useTranslations';
import { InfoDataCard } from '../InfoDataCard';

type InformationProps = {
    tabData: { name: string, icon: IconKeys, data: ekycDataType }[]
}

export const InformationTab: React.FC<InformationProps> = ({ tabData }) => {
    const t = useTranslations();

    const [showTab, setShowTab] = useState(-1)

    const openCloseTab = (id: number) => {
        if (id === showTab) {
            setShowTab(-1)
        } else {
            setShowTab(id)
        }
    }

    return (
        <>
            <View style={tw.style('mx-1')}>
                {tabData.map((item, index) => (
                    <View style={tw.style('border-b border-gray-200 py-3')} key={index}>
                        <TouchableOpacity
                            style={[tw`flex-row justify-between items-center pr-2 pl-1`]}
                            onPress={() => openCloseTab(index)}
                        >
                            <View style={tw.style('flex items-center justify-center flex-row py-2')}>
                                <Icon disabled name={item.icon} />
                                <Text style={tw.style('pl-3 text-base font-medium text-red-600')}>{item.name}</Text>
                            </View>
                            <Icon disabled name="arrow-down" height={15} />
                        </TouchableOpacity>
                        {showTab === index && <InfoDataCard cardRawData={item.data} />}
                    </View>

                ))}

            </View>
        </>)
}