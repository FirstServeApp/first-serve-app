/* eslint-disable react-native/no-inline-styles */
import { memo } from 'react'
import ButtonComponent from '../../components/UI/Button'
import { useAuth } from '../../context/AuthContext'
import { useMatch, Player, GameStates } from '../../context/MatchContext'
import { TextL } from '../../styles/typography'
import { ButtonRow } from './styles'


type Props = {
  name?: string;
  isRed?: boolean;
  disabled?: boolean;
}

const DrawingBlock: React.FC<Props> = memo(({ name, disabled }) => {
  const { setDrawingWinner, setCurrentState, opponentName, addToMatchHistory} = useMatch()

  return (
    <>
      <TextL>Who won the point?</TextL>
      <ButtonComponent
        title={name || 'Me'} size="M"
        disabled={disabled}
        onPress={() => {
          setDrawingWinner(Player.me)
          setCurrentState(GameStates.gameFirstStep)
          addToMatchHistory()
        }}
      />
      <ButtonComponent
        title={opponentName || 'Opponent'} size="M"
        disabled={disabled}
        type="opponent"
        onPress={() => {
          setDrawingWinner(Player.opponent)
          setCurrentState(GameStates.gameFirstStep)
          addToMatchHistory()
        }}
      />
    </>
  )
})

const FirstServeBlock: React.FC<Props> = memo(({ name, disabled }) => {
  const { opponentName, setCurrentServer, setCurrentState, launchMatch, addToMatchHistory } = useMatch()

  return (
    <>
      <TextL>Who is serving?</TextL>
      <ButtonComponent
        title={name || 'Me'} size="M"
        disabled={disabled}
        onPress={() => {
          launchMatch()
          setCurrentState(GameStates.drawing)
          setCurrentServer(Player.me)
          addToMatchHistory()
        }}
      />
      <ButtonComponent
        title={opponentName || 'Opponent'} size="M"
        disabled={disabled}
        type="opponent"
        onPress={() => {
          launchMatch()
          setCurrentState(GameStates.drawing)
          setCurrentServer(Player.opponent)
          addToMatchHistory()
        }}
      />
    </>
  )
})

const GameStepOne: React.FC<Props> = memo(({ isRed, disabled }) => {
  const { setCurrentState, setDrawingServe, addToMatchHistory } = useMatch()

  return (
    <>
      <ButtonComponent
        title="1st Serve"
        size="M"
        type={isRed ? 'opponent' : 'primary'}
        disabled={disabled}
        onPress={() => {
          setDrawingServe(1)
          setCurrentState(GameStates.gameSecondStep)
          addToMatchHistory()
        }}
      />
      <ButtonComponent
        title="2nd Serve"
        size="M"
        type={isRed ? 'opponent' : 'primary'}
        disabled={disabled}
        onPress={() => {
          setDrawingServe(2)
          setCurrentState(GameStates.gameSecondStep)
          addToMatchHistory()
        }}
      />
    </>
  )
})

const ReturnGameStepOne: React.FC<Props> = memo(({ isRed, disabled }) => {
  const { setCurrentState, setGameScore, setDrawingServe, drawingWinner, addToMatchHistory } = useMatch()

  return (
    <>
      <ButtonRow>
        <ButtonComponent
          title="1st Serve"
          size="M"
          type={isRed ? 'opponent' : 'primary'}
          disabled={disabled}
          style={{ width: '48%' }}
          onPress={() => {
            setDrawingServe(1)
            setCurrentState(GameStates.gameSecondStep)
            addToMatchHistory()
          }}
        />
        <ButtonComponent
          title="2nd Serve"
          size="M"
          type={isRed ? 'opponent' : 'primary'}
          disabled={disabled}
          style={{ width: '48%' }}
          onPress={() => {
            setDrawingServe(2)
            setCurrentState(GameStates.gameSecondStep)
            addToMatchHistory()
          }}
        />
      </ButtonRow>
      <ButtonComponent
        title="Double Fault"
        size="M"
        disabled={disabled}
        type={isRed ? 'opponent' : 'primary'}
        onPress={() => {
          setGameScore(drawingWinner, 'Double fault')
          addToMatchHistory()
        }}
      />
    </>
  )
})

const GameStepTwo: React.FC<Props> = memo(({ isRed, disabled }) => {
  const { setGameScore, drawingWinner, addToMatchHistory } = useMatch()

  return (
    <>
      <ButtonRow>
        <ButtonComponent
          title="Ace"
          size="M"
          type={isRed ? 'opponent' : 'primary'}
          disabled={disabled}
          style={{ width: '48%' }}
          onPress={() => {
            setGameScore(drawingWinner, 'Ace')
            addToMatchHistory()
          }}
        />
        <ButtonComponent
          title="Winner"
          size="M"
          type={isRed ? 'opponent' : 'primary'}
          disabled={disabled}
          style={{ width: '48%' }}
          onPress={() => {
            setGameScore(drawingWinner, 'Winner')
            addToMatchHistory()
          }}
        />
      </ButtonRow>
      <ButtonRow>
        <ButtonComponent
          title="Forced error"
          size="M"
          type={isRed ? 'opponent' : 'primary'}
          disabled={disabled}
          style={{ width: '48%' }}
          onPress={() => {
            setGameScore(drawingWinner, 'Forced error')
            addToMatchHistory()
          }}
        />
        <ButtonComponent
          title="Unforced error"
          size="M"
          type={isRed ? 'opponent' : 'primary'}
          disabled={disabled}
          style={{ width: '48%' }}
          onPress={() => {
            setGameScore(drawingWinner, 'Unforced error')
            addToMatchHistory()
          }}
        />
      </ButtonRow>
    </>
  )
})

const ReturnGameStepTwo: React.FC<Props> = memo(({ isRed }) => {
  const { setGameScore, drawingWinner, addToMatchHistory } = useMatch()

  return (
    <>
      <ButtonComponent
        title="Winner"
        size="M"
        type={isRed ? 'opponent' : 'primary'}
        onPress={() => {
          setGameScore(drawingWinner, 'Winner')
          addToMatchHistory()
        }}
      />
      <ButtonRow>
        <ButtonComponent
          title="Forced error"
          size="M"
          type={isRed ? 'opponent' : 'primary'}
          style={{ width: '48%' }}
          onPress={() => {
            setGameScore(drawingWinner, 'Forced error')
            addToMatchHistory()
          }}
        />
        <ButtonComponent
          title="Unforced error"
          size="M"
          type={isRed ? 'opponent' : 'primary'}
          style={{ width: '48%' }}
          onPress={() => {
            setGameScore(drawingWinner, 'Unforced error')
            addToMatchHistory()
          }}
        />
      </ButtonRow>
    </>
  )
})

const ButtonsBlock = () => {
  const { user } = useAuth()
  const { currentState, currentServer, drawingWinner, testMatchFinish } = useMatch()
  const isReturn = currentServer !== drawingWinner
  const isRed = drawingWinner === Player.opponent

  switch (currentState) {
    case GameStates.firstServe:
      return <FirstServeBlock name={user?.name} disabled={testMatchFinish} />
    case GameStates.drawing:
      return <DrawingBlock name={user?.name} disabled={testMatchFinish} />
    case GameStates.gameFirstStep:
      if (isReturn) {
        return <ReturnGameStepOne isRed={isRed} disabled={testMatchFinish} />
      } else {
        return <GameStepOne isRed={isRed} disabled={testMatchFinish} />
      }
    case GameStates.gameSecondStep:
      if (isReturn) {
        return <ReturnGameStepTwo isRed={isRed} disabled={testMatchFinish} />
      } else {
        return <GameStepTwo isRed={isRed} disabled={testMatchFinish} />
      }
    default:
      return null
  }
}

export default ButtonsBlock
