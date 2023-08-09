import COLORS from '../../styles/colors'
import { TextS } from '../../styles/typography'
import { Icon } from '../UI/Icon'
import { HeaderPlayerTitleContainer } from './styles'


type Props = {
  player: 'me' | 'opponent';
}

const HeaderPlayerTitle: React.FC<Props> = () => {
  return (
    <HeaderPlayerTitleContainer>
      <Icon name="fill" color={COLORS.red} />
      <TextS>Opponent</TextS>
    </HeaderPlayerTitleContainer>
  )
}

export default HeaderPlayerTitle
