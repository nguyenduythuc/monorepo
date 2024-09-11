import React from 'react';
import {IStepTabViewProps} from '@lfvn-customer/shared/types';
import {View} from 'react-native';
import {SceneMap, TabView, TabBar} from 'react-native-tab-view';
import {CustomButton} from '@lfvn-customer/shared/components';
import useTranslations from '@lfvn-customer/shared/hooks/useTranslations';
import {useGetTheme} from '@lfvn-customer/shared/hooks/useGetTheme';

const StepTabView: React.FC<IStepTabViewProps> = ({
  questionComponents,
  onComplete,
  currentStep,
  setCurrentStep,
}) => {
  const t = useTranslations();
  const {colors} = useGetTheme();

  // Create routes for TabView based on questionComponents
  const routes = questionComponents.map((_, idx) => ({
    key: `question${idx}`,
    title: `Câu hỏi ${idx + 1}`,
  }));

  const goToNext = () => {
    if (currentStep === questionComponents.length - 1) {
      onComplete(); // last question -> complete
    } else {
      setCurrentStep(currentStep + 1); // next question
    }
  };

  const renderScene = SceneMap(
    questionComponents.reduce<Record<string, React.ComponentType<any>>>(
      (acc, Question, idx) => {
        acc[`question${idx}`] = () => (
          <View style={{flex: 1}}>
            <Question
              goToNext={() => {
                if (currentStep === questionComponents.length - 1) {
                  onComplete(); // last question -> complete
                } else {
                  setCurrentStep(currentStep + 1); // next question
                }
              }}
            />
          </View>
        );
        return acc;
      },
      {},
    ),
  );

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: colors['danger-500'], height: 6}}
      style={{
        backgroundColor: colors['danger-200'],
        height: 6,
        marginHorizontal: 16,
        marginTop: 16,
        borderRadius: 6,
        overflow: 'hidden',
      }}
      renderLabel={() => null}
    />
  );

  return (
    <>
      <TabView
        navigationState={{index: currentStep, routes}}
        renderScene={renderScene}
        onIndexChange={setCurrentStep}
        renderTabBar={renderTabBar}
        swipeEnabled={false}
      />
      <CustomButton onPress={goToNext} color={'red'} buttonStyle={'m-4'}>
        {t('Step.continue')}
      </CustomButton>
    </>
  );
};

export default StepTabView;
