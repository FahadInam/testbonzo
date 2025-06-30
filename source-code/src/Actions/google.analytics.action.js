import { config } from 'Constants/config.constants';
import ReactGA from 'react-ga4';

const Update = (location) => {
  if (process.env.NODE_ENV === 'production') {
    ReactGA.set({ page: location.pathname });
    ReactGA.send({ hitType: 'pageview', page: location.pathname });
  }
};

const Init = (location, Inst_config) => {
  const Instance_ga_id = Inst_config.instance_id === 8 ? config.gaId_Shupavu : config.gaId_bonzo;
  //console.log('Instance_ga_id', Instance_ga_id);

  if (process.env.NODE_ENV === 'production') {
    ReactGA.initialize(Instance_ga_id);
    Update(location);
  }
};

const Analytics = {
  Init,
  Update,
};

export default Analytics;
