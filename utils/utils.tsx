import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ICONS } from '../components/constans/icons';
import { GlobalStyles } from '../constants/styles';
import { addWater } from '../store/water';
import { addSun } from '../store/sun'
import { RootState } from '../store/store';

export function renderIconsHelper(icon: string, color: string, iterateData: number, size: number) {
  const showSidePlantInfo = [];

  for(let i=1; i<=3; i++) {
    iterateData>=i ? 
    showSidePlantInfo.push(<Ionicons key={i+'inline'} name={icon as any} size={size} color={color}/>) :
    showSidePlantInfo.push(<Ionicons key={i+'outline'} name={icon+"-outline" as any} size={size} color={GlobalStyles.colors.outlineGreyColor}/>)
  }
  return showSidePlantInfo;
}
