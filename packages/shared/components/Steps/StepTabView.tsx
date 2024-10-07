import React from 'react';
import {IStepTabViewProps} from '@lfvn-customer/shared/types';
import {View} from 'react-native';
import {SceneMap, TabView, TabBar} from 'react-native-tab-view';
import {useGetTheme} from '@lfvn-customer/shared/hooks/useGetTheme';
import {UseFormReturn} from 'react-hook-form';

const StepTabView: React.FC<IStepTabViewProps & UseFormReturn> = ({
  questionComponents,
  currentQuestion,
  setCurrentQuestion,
  control,
  watch,
  getValues,
}) => {
  const {colors} = useGetTheme();

  // Create routes for TabView based on questionComponents
  const routes = questionComponents.map((_, idx) => ({
    key: `question${idx}`,
    title: `question${idx}`,
  }));

  const renderScene = SceneMap(
    questionComponents.reduce<Record<string, React.ComponentType<any>>>(
      (acc, Question, idx) => {
        acc[`question${idx}`] = () => (
          <View style={{flex: 1}}>
            <Question
              control={control}
              watch={watch}
              getValues={getValues}
              stepNumber={idx + 1}
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
    <TabView
      navigationState={{index: currentQuestion, routes}}
      renderScene={renderScene}
      onIndexChange={setCurrentQuestion}
      renderTabBar={renderTabBar}
      swipeEnabled={false}
    />
  );
};

export default StepTabView;
