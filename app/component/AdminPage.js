import PropTypes from 'prop-types';
/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Link } from 'react-router';
import connectToStores from 'fluxible-addons-react/connectToStores';
import { getRoutingSettings } from '../store/localStorage';
import SaveRoutingSettingsButton from './SaveRoutingSettingsButton';

export const defaultRoutingSettings = {
  ignoreRealtimeUpdates: false,
  bikeSpeed: 5.0,
  maxPreTransitTime: 1800,
  walkOnStreetReluctance: 1.0,
  waitReluctance: 1.0,
};

const AdminPage = (context) => {
  const merged = {
    ...defaultRoutingSettings,
    ...getRoutingSettings(),
    ...context.location.query,
  };

  const mergedCurrent = {
    ...defaultRoutingSettings,
    ...getRoutingSettings(),
  };

  const replaceParams = newParams =>
  context.router.replace({
    ...context.location,
    query: {
      ...context.location.query,
      ...newParams,
    },
  });

  const toggleRealtimeUpdates = ({ target }) => {
    const ignoreRealtimeUpdates = target.value;
    context.router.replace({
      pathname: context.location.pathname,
      query: {
        ...context.location.query,
        ignoreRealtimeUpdates,
      },
    });
  };

  const updateMaxPreTransitTime = ({ target }) => {
    const maxPreTransitTime = target.value;
    if (maxPreTransitTime < 0) {
      alert('Insert a positive number');
      target.value = mergedCurrent.maxPreTransitTime;
    }
    context.router.replace({
      pathname: context.location.pathname,
      query: {
        ...context.location.query,
        maxPreTransitTime,
      },
    });
  };

  const updateWalkOnStreetReluctance = ({ target }) => {
    const walkOnStreetReluctance = target.value;
    if (walkOnStreetReluctance < 0) {
      alert('Insert a positive number');
      target.value = mergedCurrent.walkOnStreetReluctance;
    }
    context.router.replace({
      pathname: context.location.pathname,
      query: {
        ...context.location.query,
        walkOnStreetReluctance,
      },
    });
  };

  const updateWaitReluctance = ({ target }) => {
    const waitReluctance = target.value;
    if (waitReluctance < 0) {
      alert('Insert a positive number');
      target.value = mergedCurrent.waitReluctance;
    }
    context.router.replace({
      pathname: context.location.pathname,
      query: {
        ...context.location.query,
        waitReluctance,
      },
    });
  };

  const updateBikeSpeed = ({ target }) => {
    const bikeSpeed = target.value;
    if (bikeSpeed < 0) {
      alert('Insert a positive number');
      target.value = mergedCurrent.bikeSpeed;
    }
    context.router.replace({
      pathname: context.location.pathname,
      query: {
        ...context.location.query,
        bikeSpeed,
      },
    });
  };

  return (
    <div className="page-frame fullscreen momentum-scroll">
      <label>
        Ignore realtime updates (default false):
        <select
          value={merged.ignoreRealtimeUpdates}
          onChange={toggleRealtimeUpdates}
        >
          <option value="false">
            False
          </option>
          <option value="true">
            True
          </option>
        </select>
      </label>
      <label>
        Soft limit for maximum time in seconds before car parking (default 1800)
        <input type="number" step="1" min="0" onInput={updateMaxPreTransitTime} onChange={updateMaxPreTransitTime} value={merged.maxPreTransitTime}/>
      </label>
      <label>
        Multiplier for reluctancy to walk on streets where car traffic is allowed. If value is over 1, streets with no cars will be preferred. If under 1, vice versa. (default 1.0)
        <input type="number" step="any" min="0" onInput={updateWalkOnStreetReluctance} onChange={updateWalkOnStreetReluctance} value={merged.walkOnStreetReluctance}/>
      </label>
      <label>
        Multiplier for reluctancy to wait at a transit stop compared to being on transit vehicle. If value is over 1, extra time is rather spent on transit vehicle than on transit stop. If under 1, vice versa. Note, changing this value to be over 1.0 has a side effect where you are guided to walk along the bus line instead of waiting. (default 1.0)
        <input type="number" step="any" min="0" onInput={updateWaitReluctance} onChange={updateWaitReluctance} value={merged.waitReluctance}/>
      </label>
      <label>
        Bike speed m/s (default 5.0)
        <input type="number" step="any" min="0" onInput={updateBikeSpeed} onChange={updateBikeSpeed} value={merged.bikeSpeed}/>
      </label>
      <SaveRoutingSettingsButton />
    </div>
  );
};

AdminPage.propTypes = {
  currentLanguage: PropTypes.string.isRequired,
};

AdminPage.contextTypes = {
  config: PropTypes.object.isRequired,
};

export default connectToStores(AdminPage, ['PreferencesStore'], context => ({
  currentLanguage: context.getStore('PreferencesStore').getLanguage(),
}));
