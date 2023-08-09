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
    <ListCheckboxButtonWrap>
      <LeftBlock>
        <TextL>{title}</TextL>
      </LeftBlock>
      {type === 'radio' ? (
        <RadioBtn
          {...rest}
          isChecked={isChecked}
        />
      ) : (
        <Checkbox
          {...rest}
          isChecked={isChecked}
        />
      )}
    </ListCheckboxButtonWrap>
  )
}

export default ListCheckboxBtn
