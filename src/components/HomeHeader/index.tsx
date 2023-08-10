/* eslint-disable react-native/no-inline-styles */
import { Header3, TextS } from '../../styles/typography'
import { HomeHeaderContainer, LeftContentBlock, UserInfoWrap } from './styles'
import Avatar from '../../components/UI/Avatar'
import IconBtn from '../../components/UI/Button/IconBtn'
import { useAuth } from '../../context/AuthContext'
import { useSafeAreaInsets } from 'react-native-safe-area-context'


type Props = {
  onOpen: () => void;
}

const HomeHeader: React.FC<Props> = ({ onOpen }) => {
  const { user } = useAuth()
  const { top } = useSafeAreaInsets()

  return (
    <HomeHeaderContainer topInsets={top}>
      <LeftContentBlock>
        <Avatar />
        <UserInfoWrap>
          <TextS additional>Hello,</TextS>
          <Header3>{user?.name}</Header3>
        </UserInfoWrap>
      </LeftContentBlock>
      <IconBtn icon="settings" onPress={onOpen} />
    </HomeHeaderContainer>
  )
}

export default HomeHeader
