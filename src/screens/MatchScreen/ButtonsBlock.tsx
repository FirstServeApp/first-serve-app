/* eslint-disable react-native/no-inline-styles */
import { memo } from 'react'
import ButtonComponent from '../../components/UI/Button'
import { useAuth } from '../../context/AuthContext'
import { useMatch, Player, GameStates } from '../../context/MatchContext'
import { TextL } from '../../styles/typography'
import { ButtonContainer, ButtonRow } from './styles'


type Props = {
  name?: string;
  isRed?: boolean;
}

const DrawingBlock: React.FC<Props> = memo(({ name }) => {
  const { setDrawingWinner, setCurrentState, opponentName } = useMatch()

  return (
    <ButtonContainer>
      <TextL>Who won the drawing?</TextL>
      <ButtonComponent
        title={name || 'Me'} size="M"
        onPress={() => {
          setDrawingWinner(Player.me)
          setCurrentState(GameStates.gameFirstStep)
        }}
      />
      <ButtonComponent
        title={opponentName || 'Opponent'} size="M"
        type="opponent"
        onPress={() => {
          setDrawingWinner(Player.opponent)
          setCurrentState(GameStates.gameFirstStep)
        }}
      />
    </ButtonContainer>
  )
})

const FirstServeBlock: React.FC<Props> = memo(({ name }) => {
  const { opponentName, setCurrentServer, setCurrentState } = useMatch()

  return (
    <ButtonContainer>
      <TextL>Who is serving?</TextL>
      <ButtonComponent
        title={name || 'Me'} size="M"
        onPress={() => {
          setCurrentState(GameStates.drawing)
          setCurrentServer(Player.me)
        }}
      />
      <ButtonComponent
        title={opponentName || 'Opponent'} size="M"
        type="opponent"
        onPress={() => {
          setCurrentState(GameStates.drawing)
          setCurrentServer(Player.opponent)
        }}
      />
    </ButtonContainer>
  )
})

const GameStepOne: React.FC<Props> = memo(({ isRed }) => {
  const { setCurrentState, setDrawingServe } = useMatch()

  return (
    <ButtonContainer>
      <ButtonComponent
        title="1st Serve"
        size="M"
        type={isRed ? 'opponent' : 'primary'}
        onPress={() => {
          setDrawingServe(1)
          setCurrentState(GameStates.gameSecondStep)
        }}
      />
      <ButtonComponent
        title="2nd Serve"
        size="M"
        type={isRed ? 'opponent' : 'primary'}
        onPress={() => {
          setDrawingServe(2)
          setCurrentState(GameStates.gameSecondStep)
        }}
      />
    </ButtonContainer>
  )
})

const ReturnGameStepOne: React.FC<Props> = memo(({ isRed }) => {
  const { setCurrentState, setGameScore, drawingWinner } = useMatch()

  return (
    <ButtonContainer>
      <ButtonRow>
        <ButtonComponent
          title="1st Serve"
          size="M"
          type={isRed ? 'opponent' : 'primary'}
          style={{ width: '48%' }}
          onPress={() => setCurrentState(GameStates.gameSecondStep)}
        />
        <ButtonComponent
          title="2nd Serve"
          size="M"
          type={isRed ? 'opponent' : 'primary'}
          style={{ width: '48%' }}
          onPress={() => setCurrentState(GameStates.gameSecondStep)}
        />
      </ButtonRow>
      <ButtonComponent
        title="Double Fault"
        size="M"
        type={isRed ? 'opponent' : 'primary'}
        onPress={() => setGameScore(drawingWinner, 'Double fault')}
      />
    </ButtonContainer>
  )
})

const GameStepTwo: React.FC<Props> = memo(({ isRed }) => {
  const { setGameScore, drawingWinner } = useMatch()

  return (
    <ButtonContainer>
      <ButtonRow>
        <ButtonComponent
          title="Ace"
          size="M"
          type={isRed ? 'opponent' : 'primary'}
          style={{ width: '48%' }}
          onPress={() => setGameScore(drawingWinner, 'Ace')}
        />
        <ButtonComponent
          title="Winner"
          size="M"
          type={isRed ? 'opponent' : 'primary'}
          style={{ width: '48%' }}
          onPress={() => setGameScore(drawingWinner, 'Winner')}
        />
      </ButtonRow>
      <ButtonRow>
        <ButtonComponent
          title="Forced error"
          size="M"
          type={isRed ? 'opponent' : 'primary'}
          style={{ width: '48%' }}
          onPress={() => setGameScore(drawingWinner, 'Forced error')}
        />
        <ButtonComponent
          title="Unforced error"
          size="M"
          type={isRed ? 'opponent' : 'primary'}
          style={{ width: '48%' }}
          onPress={() => setGameScore(drawingWinner, 'Unforced error')}
        />
      </ButtonRow>
    </ButtonContainer>
  )
})

const ReturnGameStepTwo: React.FC<Props> = memo(({ isRed }) => {
  const { setGameScore, drawingWinner } = useMatch()

  return (
    <ButtonContainer>
      <ButtonComponent
        title="Winner"
        size="M"
        type={isRed ? 'opponent' : 'primary'}
        onPress={() => setGameScore(drawingWinner, 'Winner')}
      />
      <ButtonRow>
        <ButtonComponent
          title="Forced error"
          size="M"
          type={isRed ? 'opponent' : 'primary'}
          style={{ width: '48%' }}
          onPress={() => setGameScore(drawingWinner, 'Forced error')}
        />
        <ButtonComponent
          title="Unforced error"
          size="M"
          type={isRed ? 'opponent' : 'primary'}
          style={{ width: '48%' }}
          onPress={() => setGameScore(drawingWinner, 'Unforced error')}
        />
      </ButtonRow>
    </ButtonContainer>
  )
})

const ButtonsBlock = () => {
  const { user } = useAuth()
  const { currentState, currentServer, drawingWinner } = useMatch()
  const isReturn = currentServer !== drawingWinner
  const isRed = drawingWinner === Player.opponent

  switch (currentState) {
    case GameStates.firstServe:
      return <FirstServeBlock name={user?.name} />
    case GameStates.drawing:
      return <DrawingBlock name={user?.name} />
    case GameStates.gameFirstStep:
      if (isReturn) {
        return <ReturnGameStepOne isRed={isRed} />
      } else {
        return <GameStepOne isRed={isRed} />
      }
    case GameStates.gameSecondStep:
      if (isReturn) {
        return <ReturnGameStepTwo isRed={isRed} />
      } else {
        return <GameStepTwo isRed={isRed} />
      }
    default:
      return null
  }
}

export default ButtonsBlock
