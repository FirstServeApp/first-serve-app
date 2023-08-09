import React, { useRef, useMemo, useEffect, useCallback } from 'react'
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
  snapPoints: string[];
}

const BottomSheetPopup: React.FC<Props> = ({ children, visible, onClose, snapPoints }) => {
  const sheetRef = useRef<BottomSheetModal>(null)
  const snapPointsValues = useMemo(() => snapPoints, [])

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
        ref={sheetRef}
        index={0}
        snapPoints={snapPointsValues}
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

export default BottomSheetPopup
