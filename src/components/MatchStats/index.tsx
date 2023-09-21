import { useState } from 'react'
import MatchButtonGroup, { ButtonGroupNames } from '../MatchButtonGroup'
import {
  MatchStatsCard,
  MatchStatSmallCard,
  StatsBlock,
  MatchStatsCardRow,
  LegendBlock,
  LegendText,
  ProgressBlock,
  ProgressBlockWrap,
  ImportantStatBlock,
  MatchStatSmallCardText,
} from './styles'
import { TextS } from '../../styles/typography'
import ProgressBar from '../UI/ProgressBar'
import { MatchDetails } from '../../services/matchService'
import { getStatInfo } from '../../utils/statUtils'
import COLORS from '../../styles/colors'
import CircleProgressBar from '../CircleProgressBar'


type Props = {
  data: MatchDetails;
}

const MatchStats: React.FC<Props> = ({ data }) => {
  const [selectedBtn, setSelectedBtn] = useState<ButtonGroupNames>(ButtonGroupNames.All)
  const totalWon = getStatInfo(data, 'totalWon', selectedBtn)
  const totalServiceWon = getStatInfo(data, 'totalServiceWon', selectedBtn)
  const totalReturnWon = getStatInfo(data, 'totalReturnWon', selectedBtn)

  return (
    <>
      {data.aces.bySet.length > 1 && (
        <MatchButtonGroup selectedBtn={selectedBtn} setSelectedBtn={setSelectedBtn} />
      )}
      <ImportantStatBlock>
        <MatchStatSmallCard>
          <MatchStatSmallCardText>Total points wons</MatchStatSmallCardText>
          <CircleProgressBar
            size={80}
            progress={+(totalWon?.myPercent || 0)}
            title={totalWon.myText.toString()}
          />
        </MatchStatSmallCard>
        <MatchStatSmallCard>
          <MatchStatSmallCardText>Total service wons</MatchStatSmallCardText>
          <CircleProgressBar
            size={80}
            progress={+(totalServiceWon?.myPercent || 0)}
            title={totalServiceWon.myText.toString()}
          />
        </MatchStatSmallCard>
        <MatchStatSmallCard>
          <MatchStatSmallCardText>Total return wons</MatchStatSmallCardText>
          <CircleProgressBar
            size={80}
            progress={+(totalReturnWon?.myPercent || 0)}
            title={totalReturnWon.myText.toString()}
          />
        </MatchStatSmallCard>
      </ImportantStatBlock>
      <MatchStatsCard>
        <StatsBlock>
          {Object.keys(data).map((item, index, arr) => {
            const stats = getStatInfo(data, item, selectedBtn)
            if (item === 'totalWon' || item === 'totalServiceWon' || item === 'totalReturnWon') {
              return null
            }

            return (
              <MatchStatsCardRow key={item} last={arr.length === index + 1}>
                <LegendBlock>
                  <LegendText>
                    {stats.myText}
                    {!!stats.myPercent && <TextS color={COLORS.darkGrey}> ({stats.myPercent}%)</TextS>}
                  </LegendText>
                  <LegendText alignCenter main>{stats.title}</LegendText>
                  <LegendText alignRight>
                    {stats.opponentText}
                    {!!stats.opponentPercent && <TextS color={COLORS.darkGrey}> ({stats.opponentPercent}%)</TextS>}
                  </LegendText>
                </LegendBlock>
                {stats.title !== 'Aggressive margin' && (<ProgressBlockWrap>
                  <ProgressBlock>
                    <ProgressBar
                      align="flex-end"
                      type="primary"
                      percent={stats.myPercent || 0}
                    />
                  </ProgressBlock>
                  <ProgressBlock>
                    <ProgressBar
                      align="flex-start"
                      type="secondary"
                      percent={stats.opponentPercent || 0}
                    />
                  </ProgressBlock>
                </ProgressBlockWrap>)}
              </MatchStatsCardRow>
            )
          })}
        </StatsBlock>
      </MatchStatsCard>
    </>
  )
}

export default MatchStats
