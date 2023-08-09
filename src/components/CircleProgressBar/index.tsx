import React, { memo } from 'react'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import { TextS } from '../../styles/typography'
import COLORS from '../../styles/colors'
import { TextInfoWrap, Subtitle } from './styles'
import { Circle } from 'react-native-svg'

type Props = {
  progress: number;
  size: number;
  title: string;
}

const CircleProgressBar: React.FC<Props> = memo(({ progress, size, title }) => {
  return (
    <AnimatedCircularProgress
      size={size}
      width={8}
      fill={progress}
      tintColor={COLORS.primary}
      backgroundColor={COLORS.lightGray}
      arcSweepAngle={360-90}
      lineCap="round"
      rotation={-135}
      children={() => (
        <TextInfoWrap>
          <TextS>{title}</TextS>
          <Subtitle>{progress}%</Subtitle>
        </TextInfoWrap>
      )}
      renderCap={({ center }) => <Circle cx={center.x} cy={center.y} r="3" fill="white" />}
    />
  )
})

export default CircleProgressBar
