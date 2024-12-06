import React, {useState} from 'react';
import {LayoutRectangle, Pressable, Text, View} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {Icon} from '@lfvn-customer/shared/components/common/Icon';

export type ProcessStepStatus = 'checking' | 'passed' | 'error' | 'completed';

export interface ProcessStep {
  title: string;
  description?: string;
}

export interface VerifyProcessProps {
  steps: ProcessStep[];
  orientation?: 'vertical' | 'horizontal';
  currentStep?: number;
  color?: string;
  verticalHeight?: number;
  progressDot?: boolean;
  colorIcon?: string;
}

export const BaseProcess = ({
  steps,
  orientation = 'vertical',
  currentStep = 1,
  color = 'green',
  verticalHeight,
  progressDot = false,
  colorIcon,
}: VerifyProcessProps) => {
  return orientation === 'horizontal' ? (
    <HorizontalProgress
      steps={steps}
      currentStep={currentStep}
      color={color}
      colorIcon={colorIcon}
    />
  ) : (
    <VerticalProgress
      steps={steps}
      currentStep={currentStep}
      color={color}
      verticalHeight={verticalHeight}
      progressDot={progressDot}
      colorIcon={colorIcon}
    />
  );
};

export const VerticalProgress = ({
  steps,
  currentStep = 1,
  color = 'green',
  verticalHeight = 60,
  progressDot,
}: VerifyProcessProps) => {
  const stepIconSize = progressDot ? 4 : 6;
  const defaultHeight = verticalHeight;

  const [leftStep, setLeftStep] = useState(0);
  console.log('leftStep', leftStep);

  const findDimensions = (layout: LayoutRectangle) => {
    const {width} = layout;
    setLeftStep(width / 2);
  };

  const clickStep = (index: number) => {
    console.log('index', index);
  };
  return (
    <View style={tw`items-start justify-center`}>
      <View
        onLayout={event => {
          findDimensions(event.nativeEvent.layout);
        }}
        style={tw`flex-1 items-start`}>
        {steps?.map((step, index) => (
          <View
            key={index}
            style={tw`flex-col h-[${defaultHeight}px] items-center justify-center`}>
            <View style={tw`items-center flex-row z-10`}>
              <Pressable
                style={tw`bg-white rounded-full w-${stepIconSize} h-${stepIconSize} `}
                onPress={() => clickStep(index + 1)}>
                {index + 1 <= currentStep && !progressDot ? (
                  <Icon name="check-circle" size={30} color={'red'} />
                ) : (
                  <View style={tw`py-1 bg-white`}>
                    <View
                      style={[
                        tw`w-${stepIconSize} h-${stepIconSize} rounded-full justify-center items-center bg-gray-300`,
                        index + 1 <= currentStep && tw`bg-${color}-600`,
                      ]}>
                      {!progressDot && (
                        <Text style={tw`text-white font-bold`}>
                          {index + 1}
                        </Text>
                      )}
                    </View>
                  </View>
                )}
              </Pressable>

              <View style={tw`ml-3 items-start mt-1.5 w-screen pr-10 flex-1`}>
                <Text
                  style={[
                    tw`text-left text-base font-medium`,
                    index + 1 < currentStep
                      ? tw`text-${color}-600`
                      : currentStep === index + 1
                        ? tw`text-${color}-600 font-bold`
                        : tw`text-gray-400`,
                  ]}>
                  {step.title}
                </Text>
                <Text
                  style={[
                    tw`absolute top-${
                      stepIconSize / 2
                    } h-[${defaultHeight}px] mt-2 text-xs`,
                    index + 1 <= currentStep
                      ? tw`text-${color}-600`
                      : tw`text-gray-400`,
                  ]}>
                  {step.description}
                </Text>
              </View>
            </View>
            <View style={tw`left-0 absolute z-0`}>
              {index < steps.length - 1 && (
                <View
                  style={[
                    tw`mt-2 top-[${defaultHeight / 2}px] left-${
                      stepIconSize / 2
                    } h-[${defaultHeight}px] w-0.3`,
                    index + 1 < currentStep
                      ? tw`bg-${color}-600`
                      : tw`bg-gray-300`,
                  ]}
                />
              )}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export const HorizontalProgress = ({
  steps,
  currentStep = 1,
}: VerifyProcessProps) => {
  const stepIconSize = 7;

  const [leftStep, setLeftStep] = useState(0);

  const findDimensions = (layout: LayoutRectangle) => {
    const {width} = layout;
    setLeftStep(width / 2);
  };
  const clickStep = (index: number) => {
    console.log('index', index);
  };
  return (
    <View style={tw`flex-row items-start justify-between w-full`}>
      {steps?.map((step, index) => (
        <View
          onLayout={event => {
            findDimensions(event.nativeEvent.layout);
          }}
          key={index}
          style={tw`flex-1 flex-col items-center`}>
          <View style={tw`flex-row items-center justify-center z-10 `}>
            <Pressable
              style={tw`items-center max-w-[${leftStep}px]`}
              onPress={() => clickStep(index)}>
              <View
                style={[
                  tw`w-${stepIconSize} h-${stepIconSize} rounded-full justify-center items-center`,
                  index <= currentStep ? tw`bg-red-600` : tw`bg-gray-300`,
                ]}>
                <Text style={tw`text-white font-bold`}>{index + 1}</Text>
              </View>
              <View style={tw`flex-col`}>
                <Text
                  style={[
                    tw`mt-2 text-center`,
                    index <= currentStep ? tw`text-red-600` : tw`text-gray-400`,
                  ]}>
                  {step.title}
                </Text>
                <Text
                  style={[
                    tw`mt-1 text-xs text-center`,
                    index <= currentStep ? tw`text-red-600` : tw`text-gray-400`,
                  ]}>
                  {step.description}
                </Text>
              </View>
            </Pressable>
          </View>
          <View style={tw`w-full absolute`}>
            {index < steps.length - 1 && (
              <View
                style={[
                  tw`top-${
                    stepIconSize / 2
                  } left-[${leftStep}px] mx-5 h-0.5 z-0`,
                  index < currentStep ? tw`bg-red-600` : tw`bg-gray-300`,
                ]}
              />
            )}
          </View>
        </View>
      ))}
    </View>
  );
};
