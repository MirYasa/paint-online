import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux"
import {AppDispatch, RootStore} from "./index"


export const useAppSelector: TypedUseSelectorHook<RootStore> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()
