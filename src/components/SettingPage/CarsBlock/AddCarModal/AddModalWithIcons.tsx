import React, { FC, ReactNode, useEffect } from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

import IconsCarsBlockNet from '../CarsIconMenu/IconsCarsBlockNet';
import { useAppDispatch, useAppSelector, carsSettingsActions } from '../../../../store';
import { Grid } from '@mui/material';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 1,
};

type TAddModalWithIconsProps = {
  handleIconCarInNetClick: (e: React.MouseEvent) => void,
  modalOpen: boolean,
  children?: ReactNode,
  setModalOpen: (a: boolean) => void
}
const AddModalWithIcons: FC<TAddModalWithIconsProps> = ({ children, handleIconCarInNetClick, modalOpen, setModalOpen }) => {


  const carsIconsArray = useAppSelector((store) => store.carsSettings.icons)


  const handleOpen = (e: React.SyntheticEvent) => {
    const target = e.currentTarget as HTMLButtonElement
    // if (target.dataset.forstore) dispatch(carsSettingsActions.setChooseInputName(target.dataset.forstore))
    // setOpen(modalOpen)
    setModalOpen(true)
  };
  const handleClose = () => {

    // dispatch(carsSettingsActions.setChooseInputName(null))
    setModalOpen(false)
    // setOpen(modalOpen)
  };



  return (
    <>
      <Button
        onClick={(e: React.SyntheticEvent) => handleOpen(e)}
        // data-forstore={`id${iconParentId}-carParentIcon`}
        // data-interactive
        // data-interactive-image
        sx={{ width: '100%', padding: '0' }}
        className='buttom-copy'
      >
        {children}
      </Button>
      <Modal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Grid container sx={{ ...style, width: { xs: '80%', md: '80%' } }} className='cars-popup--wrap'>
          {carsIconsArray && carsIconsArray.map((icon) => (
            <IconsCarsBlockNet
              iconObject={icon}
              handleIconCarInNetClick={handleIconCarInNetClick}
              key={icon.icon_id}
            />
          ))}
        </Grid>

      </Modal>
    </>
  );
}




export default AddModalWithIcons

