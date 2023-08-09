import COLORS from '../../../styles/colors'
import { TextS } from '../../../styles/typography'
import { Icon } from '../Icon'
import { BadgeWrap } from './styles'

type Props = {
  title: string;
}

const Badge: React.FC<Props> = ({ title }) => (
  <BadgeWrap>
    <TextS additional color={COLORS.orange}>{title}</TextS>
    <Icon name="play" size={16} color={COLORS.orange} />
  </BadgeWrap>
)

export default Badge
