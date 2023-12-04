import { FC, useState, useEffect } from "react"

import * as React from 'react';
import { Stack, Box, Button, Typography } from '@mui/material';
import { TextField, Input } from '@mui/material';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// Icons
import CreateIcon from '@mui/icons-material/Create';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import ClearIcon from '@mui/icons-material/Clear';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';


import { TCompanyData } from "../types/carsSettingsTypes";


import { StackedBarChart } from "@mui/icons-material";

import CompName from "./CompName";
import CompBalance from "./CompBalance";
import CompLink from "./CompLink";

interface TCompanyBlockProps {
  companyData: TCompanyData
}

const CompanyBlock: FC<TCompanyBlockProps> = ({ companyData }) => {
  console.log("▶ ⇛ companyData:", companyData);



  return (
    <Stack width={'100%'} display={'flex'}
      flexDirection={'row'} mb={'2rem'}
      justifyContent={'space-between'}
      gap={'1rem'}
      flexWrap={'wrap'}
    >

      {/* Block One */}
      {/* Имя компании */}
      <CompName companyId={companyData.company_id} companyName={companyData.name}></CompName>

      {/* Block Two */}
      {/* Баланс */}
      <CompBalance companyId={companyData.company_id} balance={companyData.balance} ></CompBalance>

      {/* Block Three */}
      {/* Короткая Ссылка */}
      <CompLink companyId={companyData.company_id} shotLink={companyData.short_link} ></CompLink>

    </Stack>
  )
}
export default CompanyBlock