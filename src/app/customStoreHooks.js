import { useSelector, useDispatch } from "react-redux";

// Will be use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch();
export const useAppSelector = () => useSelector();