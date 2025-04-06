import { Controller, useFormContext } from 'react-hook-form'
import Input from '../UI/Input'
import { TextInputProps } from 'react-native'


interface Props extends TextInputProps {
  name: string;
  secure?: boolean;
}

const OneFieldForm: React.FC<Props> = ({ name, secure, ...rest }) => {
  const { control, formState: { errors } } = useFormContext()

  return (
    <>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            maxLength={128}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoFocus
            error={errors[name]?.message?.toString()}
            secure={secure}
            {...rest}
          />
        )}
        name={name}
      />
    </>
  )
}

export default OneFieldForm
