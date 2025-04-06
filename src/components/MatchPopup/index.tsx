import React, { useState } from 'react'
import { MatchPopupContainer, BtnsListContainer, HeaderWrap, HeaderBlock } from './styles'
import ListButton from '../UI/ListButton'
import { useMatch } from '../../context/MatchContext'
import { Header3 } from '../../styles/typography'
import IconBtn from '../UI/Button/IconBtn'
import ConfirmPopup from './ConfirmPopup'
import ButtonComponent from '../UI/Button'
import { useAuth } from '../../context/AuthContext'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import BottomSheetPopup2 from '../UI/BottomSheet/BottomSheetPopup'
import { StyleSheet } from 'react-native'


enum MatchPopupNames {
  default = 'DEFAULT',
  pause = 'PAUSE',
  cancel = 'CANCEL',
  finish = 'FINISH'
}

const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    top: 0,
    right: 24,
  },
})

const MatchPopup: React.FC = () => {
  const { user } = useAuth()
  const { showMatchPopup, setShowMatchPopup, finishMatch, pauseMatchV2, cancelMatchV2, opponentName } = useMatch()
  const [currentPopup, setCurrentPopup] = useState(MatchPopupNames.default)
  const { bottom } = useSafeAreaInsets()
  const [loading, setLoading] = useState(false)

  const showPopup = (popup: MatchPopupNames): boolean => {
    return popup === currentPopup && showMatchPopup
  }

  const close = () => {
    setShowMatchPopup(false)
    setCurrentPopup(MatchPopupNames.default)
  }

  return (
    <>
      <BottomSheetPopup2
        visible={showMatchPopup}
        onClose={close}
      >
        <MatchPopupContainer bottomInset={bottom}>
          {showPopup(MatchPopupNames.default) && (
            <>
              <HeaderBlock>
                <HeaderWrap>
                  <Header3>Details</Header3>
                </HeaderWrap>
              </HeaderBlock>
              <IconBtn icon="cancel" type="flat" onPress={close} style={styles.icon} />
              <BtnsListContainer>
                <ListButton
                  title="Pause" leftIcon="pause"
                  onPress={() => setCurrentPopup(MatchPopupNames.pause)}
                />
                <ListButton
                  title="Finish" leftIcon="done"
                  onPress={() => setCurrentPopup(MatchPopupNames.finish)}
                />
                <ListButton
                  title="Cancel without saving"
                  leftIcon="cancel"
                  onPress={() => setCurrentPopup(MatchPopupNames.cancel)}
                />
              </BtnsListContainer>
            </>
          )}
          {showPopup(MatchPopupNames.pause) && (
            <ConfirmPopup
              title="Pause match"
              subtitle="You can return to the game any time"
              onClose={close}
            >
              <ButtonComponent title="Cancel" type="secondary" onPress={close} />
              <ButtonComponent
                title="Pause"
                loading={loading}
                onPress={() => {
                  setLoading(true)
                  pauseMatchV2()
                    .finally(() => setLoading(false))
                }}
              />
            </ConfirmPopup>
          )}
          {showPopup(MatchPopupNames.finish) && (
            <ConfirmPopup
              title="Who retired?"
              onClose={close}
            >
              <ButtonComponent
                title={opponentName || 'Opponent'}
                type="opponent"
                loading={loading}
                onPress={() => {
                  setLoading(true)
                  finishMatch(false)
                  setLoading(false)
                }}
              />
              <ButtonComponent
                title={user?.name || 'Me'}
                loading={loading}
                onPress={() => {
                  setLoading(true)
                  finishMatch(true)
                  setLoading(false)
                }}
              />
            </ConfirmPopup>
          )}
          {showPopup(MatchPopupNames.cancel) && (
            <ConfirmPopup
              title={'Are you sure you want to cancel the match without saving?'}
              onClose={close}
            >
              <ButtonComponent title="Cancel" type="secondary" onPress={close} />
              <ButtonComponent
                title="Yes"
                loading={loading}
                onPress={() => {
                  setLoading(true)
                  cancelMatchV2()
                    .finally(() => setLoading(false))
                }}
              />
            </ConfirmPopup>
          )}
        </MatchPopupContainer>
      </BottomSheetPopup2>
    </>
  )
}

export default MatchPopup
