import { TouchableOpacity } from 'react-native'
import { LinkText } from './styles'

type Props = {
  children: string | string[];
  color?: string;
  onPress: () => void;
}

const Link: React.FC<Props> = ({ children, color, ...rest }) => {
  return (
    <TouchableOpacity {...rest}>
      <LinkText color={color}>{children}</LinkText>
    </TouchableOpacity>
  )
}

export default Link
