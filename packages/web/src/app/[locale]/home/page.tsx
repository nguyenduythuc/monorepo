"use client"
import {add} from '@lfvn-customer/shared';
import {Label} from '@lfvn-customer/shared/components/Text';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment } from "@lfvn-customer/shared/redux/slices/counterSlice";
import { selectCounterValue } from "@lfvn-customer/shared/redux/selectors/counterSelector";
import { useTranslations } from 'next-intl';

export default function Home() {
  const dispatch = useDispatch()
  const data = useSelector(selectCounterValue)

  const t = useTranslations();

  console.log('redux data: ', data)
  useEffect(() => {
    console.log(add(1,2))
    dispatch(increment())
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <Label text={`${t('welcome')} to home page`} />
      </div>   
    </main>
  );
}
