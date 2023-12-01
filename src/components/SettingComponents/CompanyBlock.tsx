import { FC, useState, useEffect } from "react"

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


type TCompanyBlockProps = {
  company_id: string,
  name: string,
  short_link: string
}
const CompanyBlock: FC<TCompanyBlockProps> = ({ companyData }) => {
  return (
    <div>CompanyBlock</div>
  )
}
export default CompanyBlock