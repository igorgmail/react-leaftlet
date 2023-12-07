import { FC, useState, useEffect } from "react"

import { useAppDispatch, carsMapActions, useAppSelector } from "../../../store";

import { Stack, } from '@mui/material';

import CompName from "./CompName";
import CompBalance from "./CompBalance";
import CompLink from "./CompLink";

import { TCompanyData } from "../types/carsSettingsTypes";
import SimpleBackdrop from "../components/BackDrop";

interface TCompanyBlockProps {
  companyData?: TCompanyData
}

const CompanyBlock: FC<TCompanyBlockProps> = () => {
  console.log("--Render CompanyBlock");

  const dispatch = useAppDispatch()
  const companyData = useAppSelector((store) => store.carsSettings.company)
// const requestWorks = useAppSelector((store) => store.carsSettings.config.requestWorks)
  console.log("▶ ⇛ companyData:", companyData);


  return (
    <Stack width={'100%'} display={'flex'}
      flexDirection={'row'} mb={'2rem'}
      justifyContent={'space-between'}
      gap={'1rem'}
      flexWrap={'wrap'}
    >

      {companyData?.company_id &&
        <>
      {/* Block One */}
      {/* Имя компании */}
        <CompName key={'compBlock-name'}></CompName>

      {/* Block Two */}
      {/* Баланс */}
        <CompBalance companyId={companyData.company_id} balance={companyData.balance} key={'compBlock-balance'}></CompBalance>

      {/* Block Three */}
      {/* Короткая Ссылка */}
        <CompLink companyId={companyData.company_id} shotLink={companyData.short_link} key={'compBlock-link'}></CompLink>
      </>

      }
      {/* {requestWorks && <SimpleBackdrop />} */}
    </Stack>
  )
}
export default CompanyBlock