import { Grid, makeStyles } from '@material-ui/core';
import { Account } from 'Actions';
import { Button, ButtonText, H5, Input, TAutoComplete } from 'Components';
import { OnInputChange, getInstanceText, getInstanceType, isNumeric } from 'Utils';
import React, { useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { CountryListGCLC } from 'Constants/country.constants';
import { INSTANCES_ID } from 'Constants/instance.config';

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    // margin: '0px',
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
      paddingBottom: theme.spacing(3),
    },
  },
}));

function InstitutionDetailForm({ texts }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.LoginType.userDetails, shallowEqual);
  const directLaunchData = useSelector((state) => state.AppControl.url, shallowEqual);
  const Inst_config = useSelector((state) => state.GetInstConfig.instConfig, shallowEqual);
  const isGlobalClimate = getInstanceType(Inst_config.instance_id, INSTANCES_ID.GLOBAL_CLIMATE_LITERACY_ID);

  //console.log('userDetails:', userDetails);
  const [instituteDetails, setInstituteDetails] = useState({
    instituteName: '',
    country: '',
    instituteCity: '',
    schoolNetwork: '',
    instituteAddress: '',
    heardAboutUs: '',
    principalName: '',
    contact: '',
  });

  const callback = (e, item) => {
    let value = '';
    let t = '';

    // Determine if 'e' is a string or an event object
    if (typeof e === 'string') {
      value = ''; // Handle the case for string event
      t = e;
    } else if (e?.target) {
      // If 'e' is a normal input event
      value = e.target.value;
      t = e.currentTarget.getAttribute('data-tag') || e.target.name;
    } else {
      // In case 'e' is from a custom component like TAutoComplete
      value = item?.name || '';
      t = e.currentTarget?.getAttribute('data-tag') || '';
    }

    // Function to handle trimming spaces and restricting multiple spaces between words
    const handleTrim = (input, eventType) => {
      input = input.trimStart(); // Remove leading spaces immediately

      // Replace multiple spaces between words with a single space
      input = input.replace(/\s+/g, ' ');

      // If on blur or submit, remove all trailing spaces
      if (eventType === 'blur' || t === 'create-account') {
        return input.trimEnd(); // Trim only trailing spaces when losing focus or submitting
      }

      return input;
    };

    switch (t) {
      case 'country':
      case 'instituteCity':
        OnInputChange({ name: t, value: handleTrim(item?.name || value, e.type) }, instituteDetails, setInstituteDetails);
        break;

      case 'schoolNetwork':
      case 'instituteName':
      case 'instituteAddress':
      case 'principalName':
      case 'heardAboutUs':
        e.preventDefault();
        OnInputChange({ name: t, value: handleTrim(e.target.value, e.type) }, instituteDetails, setInstituteDetails);
        break;

      case 'contact':
        if (isNumeric(value)) {
          OnInputChange({ name: t, value: handleTrim(value, e.type) }, instituteDetails, setInstituteDetails);
        }
        break;

      case 'create-account':
        e.preventDefault();
        // Trim all form data before dispatching to the backend
        const trimmedDetails = {};
        for (const key in instituteDetails) {
          if (instituteDetails.hasOwnProperty(key)) {
            trimmedDetails[key] = handleTrim(instituteDetails[key]);
          }
        }
        dispatch(Account.InstitutionalInfo(trimmedDetails, userDetails, texts, directLaunchData));
        break;

      default:
        break;
    }
  };

  return (
    <>
      <Grid container direction="row" spacing={2} className={classes.mainGrid}>
        <Grid item xs={12}>
          <H5 fontWeight="500" fontSize="24px" color="#313644">
            {getInstanceText(texts, 'ENTER_YOUR_DETAILS', Inst_config.instance_id)}
          </H5>
        </Grid>
        <Grid item xs={12}>
          <Input
            required
            label={texts.INSTITUTE_NAME}
            extraLabel={texts.FOR_IB_SCHOOLS}
            placeholder={texts.ENTER_INSTITUTE_NAME}
            tag="instituteName"
            value={instituteDetails.instituteName}
            onChange={callback}
            autoComplete
            isGlobalClimate={isGlobalClimate}
          />
        </Grid>

        <Grid container item spacing={2}>
          {isGlobalClimate ? (
            <>
              <Grid item xs={12} md={6}>
                <Input required label={texts.COUNTRY_TERRITORY} hideInput value={instituteDetails.country} onChange={callback} />
                <TAutoComplete
                  value={instituteDetails.country}
                  label={instituteDetails.country ? '' : texts.SELECT_COUNTRY}
                  list={CountryListGCLC}
                  callback={callback}
                  tag="country"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Input
                  required
                  label={texts.INSTITUTE_CITY}
                  placeholder={texts.ENTER_INSTITUTE_CITY}
                  tag="instituteCity"
                  value={instituteDetails.instituteCity}
                  onChange={callback}
                />
              </Grid>
            </>
          ) : (
            <Grid item xs={12} md={12}>
              <Input
                required
                label={texts.INSTITUTE_CITY}
                placeholder={texts.ENTER_INSTITUTE_CITY}
                hideInput
                value={instituteDetails.instituteCity}
                onChange={callback}
              />
              <TAutoComplete
                value={instituteDetails.instituteCity}
                label={instituteDetails.instituteCity ? '' : texts.ENTER_INSTITUTE_CITY}
                list={Inst_config?.city_list}
                callback={callback}
                tag="instituteCity"
              />
            </Grid>
          )}
        </Grid>

        <Grid container item spacing={2}>
          <Grid item xs={12} md={6}>
            <Input
              label={texts.SCHOOL_NETWORK}
              placeholder={texts.ENTER_SCHOOL_NETWORK}
              tag="schoolNetwork"
              value={instituteDetails.schoolNetwork}
              onChange={callback}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Input
              required
              label={texts.INSTITUTE_ADDRESS}
              placeholder={texts.ENTER_ADDRESS}
              tag="instituteAddress"
              value={instituteDetails.instituteAddress}
              onChange={callback}
            />
          </Grid>
        </Grid>

        <Grid container item spacing={2}>
          <Grid item xs={12} md={6}>
            <Input
              required
              label={texts.PRINCIPAL}
              placeholder={texts.ENTER_PRINCIPAL_NAME}
              tag="principalName"
              value={instituteDetails.principalName}
              onChange={callback}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Input
              required
              label={texts.CONTACT}
              placeholder={getInstanceText(texts, 'CONTACT_NO', Inst_config.instance_id)}
              tag="contact"
              value={instituteDetails.contact}
              onChange={callback}
            />
          </Grid>
        </Grid>
        {isGlobalClimate && (
          <Grid item xs={12}>
            <Input
              // required
              label={texts.HOW_DID_YOU_HEAR}
              placeholder={texts.TYPE_YOUR_ANSWER}
              tag="heardAboutUs"
              value={instituteDetails.heardAboutUs}
              onChange={callback}
            />
          </Grid>
        )}

        <Grid item xs={12}>
          <Button m={0} width="100%" tag="create-account" type="submit" background="#02BBFE" borderRadius={15} onClick={callback}>
            <ButtonText color="#fff" fontSize="18px" fontWeight="600" letterSpacing="0.5px">
              {getInstanceText(texts, 'CREATE_ACCOUNT', Inst_config.instance_id)}
            </ButtonText>
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default InstitutionDetailForm;
