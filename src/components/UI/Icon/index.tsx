import React from 'react'
import { SvgProps } from 'react-native-svg'
import COLORS from '../../../styles/colors'
// Icons
import Settings from '../../../assets/Icons/Settings.svg'
import ArrowDown from '../../../assets/Icons/Arrow-down.svg'
import ArrowUp from '../../../assets/Icons/Arrow-up.svg'
import ArrowLeft from '../../../assets/Icons/Arrow-left.svg'
import ArrowRight from '../../../assets/Icons/Arrow-right.svg'
import Camera from '../../../assets/Icons/Camera.svg'
import Chevron from '../../../assets/Icons/Chevron.svg'
import ChevronRight from '../../../assets/Icons/Chevron-right.svg'
import Filters from '../../../assets/Icons/Filters.svg'
import Logout from '../../../assets/Icons/Logout.svg'
import Mail from '../../../assets/Icons/Mail.svg'
import Trash from '../../../assets/Icons/Trash.svg'
import Watch from '../../../assets/Icons/Watch.svg'
import Crown from '../../../assets/Icons/Crown.svg'
import EyeOpen from '../../../assets/Icons/Eye-open.svg'
import EyeClose from '../../../assets/Icons/Eye-close.svg'
import Done from '../../../assets/Icons/Done.svg'
import Confirm from '../../../assets/Icons/Confirm.svg'
import Share from '../../../assets/Icons/Share.svg'
import Fill from '../../../assets/Icons/Fill.svg'
import Calendar from '../../../assets/Icons/Calendar.svg'
import Cancel from '../../../assets/Icons/Cancel.svg'
import Clear from '../../../assets/Icons/Clear.svg'
import Group from '../../../assets/Icons/Group.svg'
import Logo from '../../../assets/Icons/Logo.svg'
import More from '../../../assets/Icons/More.svg'
import Pause from '../../../assets/Icons/Pause.svg'
import Person from '../../../assets/Icons/Person.svg'
import Play from '../../../assets/Icons/Play.svg'
import Search from '../../../assets/Icons/Search.svg'
import Alert from '../../../assets/Icons/Alert.svg'
import Edit from '../../../assets/Icons/Edit.svg'


export type IconsNames = 'settings' | 'arrow-down' | 'arrow-up' | 'arrow-left' | 'arrow-right' | 'camera'
  | 'chevron' | 'chevron-right' | 'filters' | 'logout' | 'mail' | 'trash' | 'watch' | 'crown' | 'fill'
  | 'eye-open' | 'eye-close' | 'done' | 'confirm' | 'share' | 'calendar' | 'cancel' | 'clear' | 'group'
  | 'logo' | 'more' | 'pause' | 'person' | 'play' | 'search' | 'alert' | 'edit'

interface IconProps extends SvgProps {
  name: IconsNames;
  color?: string;
  size?: number;
}

export const Icon: React.FC<IconProps> = ({
  name,
  color = COLORS.black,
  size = 24,
  ...rest
}) => {
  switch (name) {
    case 'arrow-down':
      return <ArrowDown width={size} height={size} stroke={color} {...rest} />
    case 'arrow-up':
      return <ArrowUp width={size} height={size} stroke={color} {...rest} />
    case 'arrow-left':
      return <ArrowLeft width={size} height={size} stroke={color} {...rest} />
    case 'arrow-right':
      return <ArrowRight width={size} height={size} stroke={color} {...rest} />
    case 'alert':
      return <Alert width={size} height={size} fill={color} {...rest} />
    case 'settings':
      return <Settings width={size} height={size} stroke={color} {...rest} />
    case 'camera':
      return <Camera width={size} height={size} stroke={color} {...rest} />
    case 'chevron':
      return <Chevron width={size} height={size} stroke={color} {...rest} />
    case 'chevron-right':
      return <ChevronRight width={size} height={size} {...rest} />
    case 'filters':
      return <Filters width={size} height={size} stroke={color} {...rest} />
    case 'logout':
      return <Logout width={size} height={size} stroke={color} {...rest} />
    case 'mail':
      return <Mail width={size} height={size} stroke={color} {...rest} />
    case 'trash':
      return (<Trash
        width={size} height={size}
        stroke={color} strokeLinecap="round"
        strokeLinejoin="round" strokeWidth={2}
        {...rest} />)
    case 'watch':
      return <Watch width={size} height={size} stroke={color} {...rest} />
    case 'crown':
      return <Crown width={size} height={size} fill={color} stroke={color} {...rest} />
    case 'eye-open':
      return <EyeOpen width={size} height={size} stroke={color} {...rest} />
    case 'eye-close':
      return <EyeClose width={size} height={size} stroke={color} {...rest} />
    case 'done':
      return <Done width={size} height={size} stroke={color} {...rest} />
    case 'confirm':
      return <Confirm width={size} height={size} stroke={color} {...rest} />
    case 'share':
      return <Share width={size} height={size} stroke={color} {...rest} />
    case 'fill':
      return <Fill width={size} height={size} fill={color} {...rest} />
    case 'calendar':
      return <Calendar width={size} height={size} stroke={color} {...rest} />
    case 'cancel':
      return <Cancel width={size} height={size} stroke={color} {...rest} />
    case 'clear':
      return <Clear width={size} height={size} stroke={color} {...rest} />
    case 'group':
      return <Group width={size} height={size} stroke={color} {...rest} />
    case 'logo':
      return <Logo width={size} height={size} {...rest} />
    case 'more':
      return <More width={size} height={size} stroke={color} {...rest} />
    case 'pause':
      return <Pause width={size} height={size} stroke={color} {...rest} />
    case 'person':
      return <Person width={size} height={size} stroke={color} {...rest} />
    case 'play':
      return <Play width={size} height={size} fill={color} {...rest} />
    case 'search':
      return <Search width={size} height={size} stroke={color} {...rest} />
    case 'edit':
      return <Edit width={size} height={size} stroke={color} strokeWidth={2} {...rest} />
    default:
      return null
  }
}
