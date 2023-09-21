/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react'
import BottomSheetPopup from '../UI/BottomSheet'
import { MatchPopupContainer, BtnsListContainer, HeaderWrap } from './styles'
import ListButton from '../UI/ListButton'
import { useMatch } from '../../context/MatchContext'
import { Header3 } from '../../styles/typography'
import IconBtn from '../UI/Button/IconBtn'
import ConfirmPopup from './ConfirmPopup'
import ButtonComponent from '../UI/Button'
import { useAuth } from '../../context/AuthContext'
import { useSafeAreaInsets } from 'react-native-safe-area-context'


const MatchPopup: React.FC = () => {
  const { user } = useAuth()
  const { showMatchPopup, setShowMatchPopup, finishMatch, pauseMatch, cancelMatch } = useMatch()
  const [showPausePopup, setShowPausePopup] = useState(false)
  const [showCancelPopup, setShowCancelPopup] = useState(false)
  const [showFinishPopup, setShowFinishPopup] = useState(false)
  const { bottom } = useSafeAreaInsets()

  const closeAll = () => {
    setShowMatchPopup(false)
    setShowPausePopup(false)
    setShowCancelPopup(false)
    setShowFinishPopup(false)
  }

  const pressHandler = (callback: () => void) => {
    callback()
    setShowMatchPopup(false)
  }

  return (
    <>
      <BottomSheetPopup
        visible={showMatchPopup}
        onClose={() => setShowMatchPopup(false)}
        snapPoints={['30%']}
      >
        <MatchPopupContainer bottomInset={bottom}>
          <HeaderWrap>
            <Header3>Details</Header3>
            <IconBtn icon="cancel" type="light" onPress={() => setShowMatchPopup(false)} />
          </HeaderWrap>
          <BtnsListContainer>
            <ListButton title="Pause" leftIcon="pause" onPress={() => pressHandler(() => setShowPausePopup(true))} />
            <ListButton title="Finish" leftIcon="done" onPress={() => pressHandler(() => setShowFinishPopup(true))} />
            <ListButton
              title="Cancel without saving"
              leftIcon="cancel"
              onPress={() => pressHandler(() => setShowCancelPopup(true))} />
          </BtnsListContainer>
        </MatchPopupContainer>
      </BottomSheetPopup>
      <ConfirmPopup
        title="Pause match"
        subtitle="You can return to the game any time"
        height="32%"
        visible={showPausePopup}
        onClose={() => setShowPausePopup(false)}
      >
        <ButtonComponent title="Cancel" type="secondary" onPress={closeAll} />
        <ButtonComponent title="Pause" onPress={pauseMatch} />
      </ConfirmPopup>
      <ConfirmPopup
        title={'Are you sure you want \nto cancel the match without saving?'}
        height="28%"
        visible={showCancelPopup}
        onClose={() => setShowCancelPopup(false)}
      >
        <ButtonComponent title="Cancel" type="secondary" onPress={closeAll} />
        <ButtonComponent title="Yes" onPress={cancelMatch} />
      </ConfirmPopup>
      <ConfirmPopup
        title="Who retired?"
        height="22%"
        visible={showFinishPopup}
        onClose={() => setShowFinishPopup(false)}
      >
        <ButtonComponent title="Opponent" type="opponent" onPress={() => finishMatch(false)} />
        <ButtonComponent title={user?.name || 'Me'} onPress={() => finishMatch(true)} />
      </ConfirmPopup>
    </>
  )
}

export default MatchPopup
