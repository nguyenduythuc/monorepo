'use client';
import { Appbar, ReviewCustomerEKYCInfo } from '@lfvn-customer/shared';
import tw from '@lfvn-customer/shared/themes/tailwind';
import { View } from 'react-native';

export default function VerifyAccount() {
  const ekycData = {
    fullname: "Trần Văn Thắng",
    idNumber: "038095020131",
    doi: "01/09/2021",
    // dueDate: ekycData?.dueDate,
    dob: "17/10/1995",
    gender: "Nam",
    nationality: "Việt Nam",
    origin: "Thiệu Phú, Thiệu Hóa, Thanh Hóa",
    oldIdNumber: "",
  }

  return (

    <View
      style={tw`flex bg-white min-h-screen pt-10 flex-col items-center justify-between`}
    >
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <View style={tw``}>
          <ReviewCustomerEKYCInfo ekycData={ekycData} />
        </View>
      </div>
    </View>
  );
}
