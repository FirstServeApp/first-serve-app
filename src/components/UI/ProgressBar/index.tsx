import { ProgressBarContainer, ProgressBarFill } from './styles'


type Props = {
  align: 'flex-start' | 'flex-end';
  type: 'primary' | 'secondary';
  percent: number;
}

const ProgressBar: React.FC<Props> = ({ align, type, percent }) => {
  return (
    <ProgressBarContainer align={align}>
      <ProgressBarFill percent={percent} type={type} />
    </ProgressBarContainer>
  )
}

export default ProgressBar
