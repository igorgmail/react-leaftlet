import React, { FC, useState } from 'react';
import { IconButton, Menu, Typography, Divider, Stack, Button, Paper } from '@mui/material/';
import { TextField } from '@mui/material/';
import { IconHistory } from './IconComponent/IconHistory';
import { IconCar } from './IconComponent/IconCar';
import { DateTime } from "luxon";
import { useAppDispatch, useAppSelector, carsMapActions } from '../../store';
import carsPageconfig from '../MainCars/lib/config';
import { ICarObject, IDataFromDateForm, TDataAboutCarForHistoryMenu } from '../../types/carsTypes';

interface IHistoryMenuProps {
  car: TDataAboutCarForHistoryMenu
}


const HistoryMenu: FC<IHistoryMenuProps> = ({ car }) => {
  console.log("▶ ⇛HistoryMenu car:", car);
  console.log("---Render HistoryMenu");
  const dispatch = useAppDispatch()
  // const parcId = useAppSelector((store) => store.carsMap.companyName?.company_id)
  // console.log("DateTime.local()", DateTime.local());
  // console.log("DateTime.local().toISO()", DateTime.local().toISO());
  // console.log("DateTime.local().toISO()", DateTime.local().toISO());
  // console.log("DateTime.now().toUnixInteger()", DateTime.now().toUnixInteger());
  // console.log("DateTime.local().toISO().slice", DateTime.local().toISO()?.slice(0, 16));
  // console.log("DateTime.local().toMillis", DateTime.local().toMillis());
  // console.log("DateTime.local().startOf", DateTime.local().startOf('day'));
  // console.log("DateTime.local().startOf().toISO() Midnight", DateTime.local().startOf('day').toISO()?.slice(0, 16));
  // console.log("DateTime.local().startOf().toMillis()", DateTime.local().startOf('day').toMillis());
  // console.log("DateTime.local().offset", DateTime.local().offset);
  // console.log("DateTime.fromISO .toMillis()", DateTime.fromISO('2023-11-12T15:00').toMillis());

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [dateMsForState, setDateMsForState] = useState<string>('')
  const [datMsToState, setDateMsToState] = useState<string>('')

  const [validDateCompare, setValidDateCompare] = useState(true)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    // Получаем время и устанавливаем в state
    // формат '2023-11-12T00:00'
    // const dataMidnight: string = DateTime.local().startOf('day').toISO()?.slice(0, 16) || ''
    // формат '2023-11-12T23:15'
    // const dataTo: string = DateTime.local().toISO()?.slice(0, 16) || ''
    setDateMsForState(car.dataFromIso)
    setDateMsToState(car.dataToIso)

  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Сравнение дат от и до по умолчанию (60 * 1000 - 1 минута)
  const compareDate = (dateOne: string, dateTwo: string) => {
    // '2023-11-12T00:00'
    const dateFor = DateTime.fromISO(dateOne).toMillis()
    const dateTo = DateTime.fromISO(dateTwo).toMillis()
    return (dateTo - dateFor) >= carsPageconfig.dateCompareTime
  }

  const handleChooseDateFor = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()

    const selectedDateFor = event.target.value;

    setDateMsForState((current: any) => current = selectedDateFor)
    setValidDateCompare(compareDate(selectedDateFor, datMsToState))

  }

  const handleChooseDateTo = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    const selectedDateTo = event.target.value;
    setDateMsToState((current: string) => selectedDateTo)
    setValidDateCompare(compareDate(dateMsForState, selectedDateTo))
  }

  const onSubmitHandler = (e: any) => {
    e.preventDefault()
    // Формируем даты по местному времени(которое указали в input)
    // с присвоением часового пояса, в формате ISO
    const dataFromDateForm: TDataAboutCarForHistoryMenu = {
      company_id: e.target.dataset.parcid,
      company_name: e.target.dataset.parcname,
      car_id: e.target.dataset.carid,
      car_name: e.target.dataset.carname,
      dataFromIso: DateTime.fromISO(e.target.dateFrom.value).toISO() || '',
      dataToIso: DateTime.fromISO(e.target.dateTo.value).toISO() || '',
      localOffset: DateTime.local().offset
    }
    console.log("▶ ⇛ dataFromDateForm:!!!", dataFromDateForm);
    dispatch(carsMapActions.setCarsMapVariant({ variant: 'history' }))
    dispatch(carsMapActions.setCarsItemFromHistoryForm(dataFromDateForm))

    handleClose()
  }

  const textField_from = () => {
    return (


      <TextField
        name="dateFrom"
        label="Дата от"
        InputLabelProps={{ shrink: true, required: true }}
        type="datetime-local"
        // defaultValue={dateServices.getTimeForDefaultValueInput(dateServices.getMsMidnight())}
        value={dateMsForState}
        inputProps={{ max: DateTime.local().toISO()?.slice(0, 16) }}
        size="small"
        onChange={handleChooseDateFor}
        error={!validDateCompare}
      />
    )
  }
  const textField_to = () => {
    return (
      <TextField
        name="dateTo"
        label="Дата до"
        InputLabelProps={{ shrink: true, required: true }}
        type="datetime-local"
        // defaultValue={dateServices.getTimeForDefaultValueInput(Date.now())}
        value={datMsToState}
        size="small"
        inputProps={{ max: DateTime.local().toISO()?.slice(0, 16) }}
        onChange={handleChooseDateTo}
        error={!validDateCompare}

      />
    )
  }

  return (

    <div>
      <IconButton
        onClick={handleClick}
        size="small"
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <IconHistory />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        // onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            width: { xs: "90%", sm: "auto", md: "auto" },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Stack display={'flex'} flexDirection={'row'} justifyContent={'start'}>
          <Typography variant="subtitle2" marginLeft={'10px'}>{car.company_name}</Typography>
        </Stack>
        <Divider />

        <Stack
          display={'flex'} flexDirection={'row'} justifyContent={'space-between'}
          sx={{
            margin: '8px 16px'
          }}
        >
          <Typography variant="h6">История</Typography>

          <Stack display={'flex'} flexDirection={'row'} justifyContent={'center'}
            gap={'20px'} alignItems={'center'}>
            <Typography variant="subtitle2">{car.car_name}</Typography>
            <IconCar size='20px'></IconCar>
          </Stack>

        </Stack>

        <Divider />
        <Stack display={'flex'} flexDirection={'column'} gap={'5px'} m={'10px'} >
          <form name={'dateForm'} action='/cars'
            onSubmit={onSubmitHandler}
            data-parcId={car.company_id}
            data-parcName={car.company_name}
            data-carid={car.car_id}
            data-carName={car.car_name}
          >
            <Stack display={'flex'} flexDirection={'row'} gap={'20px'} m={'10px'}
              sx={{
                justifyContent: { xs: 'center', sm: 'space-between' }
              }}
            >
              <Stack display={'flex'} alignItems={'center'} justifyContent={'center'}>
                От
              </Stack>
              {textField_from()}
            </Stack>
            <Stack display={'flex'} flexDirection={'row'} gap={'20px'} m={'10px'}
              sx={{
                justifyContent: { xs: 'center', sm: 'space-between' }
              }}
            >
              <Stack display={'flex'} alignItems={'center'} justifyContent={'center'}>
                До
          </Stack>
              {textField_to()}
            </Stack>
            <Stack>
              <Button disabled={!validDateCompare}
                type="submit" variant="outlined" style={{ width: '60%', margin: 'auto' }}>Показать</Button>
            </Stack>
          </form>
        </Stack>
      </Menu>
    </div>
  );
}

// export default connect(mapStateToProps)(MainCars);



export default HistoryMenu 