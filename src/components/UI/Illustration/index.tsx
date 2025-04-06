import React from 'react'
import { SvgProps } from 'react-native-svg'
// Icons
import NoMatches from '../../../assets/illustrations/no-matches.svg'
import PasswordRestored from '../../../assets/illustrations/password-restore.svg'
import Onboarding1 from '../../../assets/illustrations/onboarding-1.svg'
import Onboarding2 from '../../../assets/illustrations/onboarding-2.svg'
import Onboarding3 from '../../../assets/illustrations/onboarding-3.svg'
import Onboarding4 from '../../../assets/illustrations/onboarding-4.svg'
import Winner from '../../../assets/illustrations/winner.svg'
import Loser from '../../../assets/illustrations/loser.svg'
import EmptyHistory from '../../../assets/illustrations/empty-history.svg'


export type IllustrationsNames = 'no-matches' | 'password-restored' | 'onboarding-1' | 'onboarding-2'
  | 'onboarding-3' | 'onboarding-4' | 'loser' | 'winner' | 'empty-history'

interface IllustrationProps extends SvgProps {
  name: IllustrationsNames;
}

export const Illustration: React.FC<IllustrationProps> = ({ name }) => {
  switch (name) {
    case 'no-matches':
      return <NoMatches />
    case 'password-restored':
      return <PasswordRestored />
    case 'onboarding-1':
      return <Onboarding1 />
    case 'onboarding-2':
      return <Onboarding2 />
    case 'onboarding-3':
      return <Onboarding3 />
    case 'onboarding-4':
      return <Onboarding4 />
    case 'winner':
      return <Winner />
    case 'loser':
      return <Loser />
    case 'empty-history':
      return <EmptyHistory />
    default:
      return null
  }
}
