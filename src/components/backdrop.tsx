import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";
import { memo } from "react";

export const renderBackdrop = memo((props: BottomSheetBackdropProps) => (
  <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />
));
