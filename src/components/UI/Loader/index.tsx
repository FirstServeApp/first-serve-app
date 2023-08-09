import { ActivityIndicator } from 'react-native'
import { LoaderContainer } from './styles'
import COLORS from '../../../styles/colors'


const Loader: React.FC = () => {
  return (
    <LoaderContainer>
      <ActivityIndicator color={COLORS.black} size="large" />
    </LoaderContainer>
  )
}

export default Loader
