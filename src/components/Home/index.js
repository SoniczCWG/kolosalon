import React from 'react'
import { PageContainer } from './homeStyles'


export default function SelectGEN0(popisky) {
  var result="<select>"

  for (let index = 0; index < popisky.length; index++) {
    const element = popisky[index];
    result= result + ("<option>"+element+"</option>");
  }
  return (
    result+"</select>"
  )
}
