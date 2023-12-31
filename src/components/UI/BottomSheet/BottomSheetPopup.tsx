import React, { useRef, useEffect, useCallback } from 'react'
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdropProps,
  BottomSheetBackdrop,
  BottomSheetProps,
} from '@gorhom/bottom-sheet'
import { bottomSheetStyles } from './styles'


interface Props extends BottomSheetProps {
  children: React.ReactNode;
  visible: boolean;
}

const BottomSheetPopup2: React.FC<Props> = ({ children, visible, onClose, ...rest}) => {
  const sheetRef = useRef<BottomSheetModal>(null)

  useEffect(() => {
    if (visible) {
      sheetRef.current?.present()
    } else {
      sheetRef.current?.dismiss()
    }
  }, [visible])

  const renderBackdrop = useCallback((props: BottomSheetBackdropProps) => (
    <BottomSheetBackdrop
      {...props}
      disappearsOnIndex={-1}
      appearsOnIndex={0}
      opacity={0.8}
    />
  ), [])

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        enableDismissOnClose
        {...rest}
        ref={sheetRef}
        index={0}
        enablePanDownToClose
        onDismiss={onClose}
        backgroundStyle={bottomSheetStyles}
        backdropComponent={renderBackdrop}
      >
        {children}
      </BottomSheetModal>
    </BottomSheetModalProvider>
  )
}

export default BottomSheetPopup2
