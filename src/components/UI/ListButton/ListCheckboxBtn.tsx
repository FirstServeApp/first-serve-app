import React from 'react'
import { TouchableOpacityProps } from 'react-native'
import { ListCheckboxButtonWrap, LeftBlock } from './styles'
import { TextL } from '../../../styles/typography'
import RadioBtn from '../Button/RadioBtn'
import Checkbox from '../Button/Checkbox'


interface Props extends TouchableOpacityProps {
  title: string;
  isChecked: boolean;
  type: 'radio' | 'checkbox';
}

const ListCheckboxBtn: React.FC<Props> = ({ title, isChecked, type, ...rest }) => {
  return (
    <ListCheckboxButtonWrap {...rest}>
      <LeftBlock>
        <TextL>{title}</TextL>
      </LeftBlock>
      {type === 'radio' ? (
        <RadioBtn
          disabled
          isChecked={isChecked}
        />
      ) : (
        <Checkbox
          disabled
          isChecked={isChecked}
        />
      )}
    </ListCheckboxButtonWrap>
  )
}

export default ListCheckboxBtn
