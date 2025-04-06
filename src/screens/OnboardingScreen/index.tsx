import React, { useRef, useState } from 'react'
import {
  IndicatorContainer,
  IndicatorDot,
  styles,
  SlideContainer,
  SlideHeader,
  ActiveIndicatorDot,
  ActiveIndicatorDotWrap,
} from './styles'
import ButtonComponent from '../../components/UI/Button'
import { ButtonsBlock } from '../../components/UI/Container'
import { UnauthenticatedNavigationProps } from '../../navigation/UnauthenticatedNavigation'
import { useNavigation } from '@react-navigation/native'
import { NativeScrollEvent, NativeSyntheticEvent, ScrollView } from 'react-native'
import { Dimensions } from 'react-native'
import { Illustration, IllustrationsNames } from '../../components/UI/Illustration'
import { StoreKeys, setItemInStore } from '../../utils/secureStoreUtils'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'


const { width } = Dimensions.get('window')
type Slide = {
  text: string;
  illustration: IllustrationsNames;
}
const slides: Slide[] = [
  {
    illustration: 'onboarding-1',
    text: 'Collect match stats using your Apple Watch...',
  },
  {
    illustration: 'onboarding-2',
    text: '...or your IPhone',
  },
  {
    illustration: 'onboarding-3',
    text: 'Enjoy the full statistics of your games',
  },
  {
    illustration: 'onboarding-4',
    text: 'Share your game stats with the world',
  },
]

const OnboardingScreen: React.FC = () => {
  const navigation = useNavigation<UnauthenticatedNavigationProps>()
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const scrollViewRef = useRef<ScrollView>(null)
  const { top } = useSafeAreaInsets()

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x
    const newIndex = Math.round(contentOffsetX / width)
    setCurrentIndex(newIndex)
  }

  const handleSkip = () => {
    if (currentIndex < slides.length - 1) {
      const newIndex = currentIndex + 1
      scrollViewRef.current?.scrollTo({ x: newIndex * width, animated: true })
    }
  }

  const handleStart = async () => {
    navigation.navigate('Register', { animation: 'fade_from_bottom' })
    await setItemInStore(StoreKeys.onboardingStatus, 'completed')
  }

  return (
    <SafeAreaView style={styles.onboardingContainer}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {slides.map((slide, index) => (
          <SlideContainer key={index}>
            <Illustration name={slide.illustration} />
            <SlideHeader>{slide.text}</SlideHeader>
          </SlideContainer>
        ))}
      </ScrollView>
      <IndicatorContainer topInset={top}>
        {slides.map((_, index) => {
          if (index === currentIndex) {
            return (
              <ActiveIndicatorDotWrap key={index}>
                <ActiveIndicatorDot />
              </ActiveIndicatorDotWrap>
            )
          } else {
            return <IndicatorDot key={index} skipped={index < currentIndex} />
          }
        })}
      </IndicatorContainer>
      <ButtonsBlock>
        {currentIndex < slides.length - 1 ? (
          <ButtonComponent
            title="Skip"
            type="secondary"
            size="M"
            onPress={handleSkip}
          />
        ) : (
          <ButtonComponent
            title="Let&#x2019;s start"
            size="M"
            onPress={handleStart}
          />
        )}
      </ButtonsBlock>
    </SafeAreaView>
  )
}

export default OnboardingScreen
