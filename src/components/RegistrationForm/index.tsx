import { Controller, useFormContext } from 'react-hook-form'
import Input from '../UI/Input'

type Props = {
  loading: boolean;
}

const RegistrationForm: React.FC<Props> = ({ loading }) => {
  const { control, formState: { errors } } = useFormContext()

  return (
    <>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder="Name"
            autoComplete="name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            maxLength={64}
            autoFocus
            autoCapitalize="words"
            error={errors.name?.message?.toString()}
            editable={!loading}
          />
        )}
        name="name"
      />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder="Email"
            autoCapitalize="none"
            autoComplete="email"
            inputMode="email"
            keyboardType="email-address"
            maxLength={128}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={errors.email?.message?.toString()}
            editable={!loading}
          />
        )}
        name="email"
      />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder="Password"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            maxLength={16}
            error={errors.password?.message?.toString()}
            editable={!loading}
            secure
          />
        )}
        name="password"
      />
    </>
  )
}

export default RegistrationForm
