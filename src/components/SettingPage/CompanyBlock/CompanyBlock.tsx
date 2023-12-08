import { FC, useState, useEffect } from "react"

import { useAppDispatch, carsMapActions, useAppSelector } from "../../../store";

import { Stack, } from '@mui/material';

import CompName from "./CompName";
import CompBalance from "./CompBalance";
import CompLink from "./CompLink";

import { TCompanyData } from "../types/carsSettingsTypes";
import SimpleBackdrop from "../components/BackDrop";
import useAlert from "../hooks/useAlert";

interface TCompanyBlockProps {
  companyData?: TCompanyData
}

const CompanyBlock: FC<TCompanyBlockProps> = () => {
  console.log("--Render CompanyBlock");
  const { showAlert, alertComponent } = useAlert();
  const dispatch = useAppDispatch()
  const companyId = useAppSelector((store) => store.carsSettings.company.company_id)
  const balance = useAppSelector((store) => store.carsSettings.company.balance)
  // const requestWorks = useAppSelector((store) => store.carsSettings.config.requestWorks)


  return (
    <Stack width={'100%'} display={'flex'}
      flexDirection={'row'} mb={'2rem'}
      justifyContent={'space-between'}
      gap={'1rem'}
      flexWrap={'wrap'}
    >
      {alertComponent}
      {companyId &&
        <>
      {/* Block One */}
      {/* Имя компании */}
        <CompName key={'compBlock-name'}></CompName>

      {/* Block Two */}
      {/* Баланс */}
        <CompBalance key={'compBlock-balance'}></CompBalance>

      {/* Block Three */}
      {/* Короткая Ссылка */}
        <CompLink key={'compBlock-link'}></CompLink>
      </>

      }
      {/* {requestWorks && <SimpleBackdrop />} */}
    </Stack>
  )
}
export default CompanyBlock