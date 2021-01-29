/* Copyright (C) 2020-2021 Greenbone Networks GmbH
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License
 * as published by the Free Software Foundation, either version 3
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

/* eslint-disable react/prop-types */

import React from 'react';

import {
  DEFAULT_RELOAD_INTERVAL_INACTIVE,
  DEFAULT_RELOAD_INTERVAL_ACTIVE,
  DEFAULT_RELOAD_INTERVAL,
} from 'gmp/gmpsettings';

import {parseModelFromObject} from 'gmp/model';

import {rendererWith, screen} from 'web/utils/testing';

import useEntitiesReloadInterval from '../useEntitiesReloadInterval';

const gmp = {
  settings: {
    reloadIntervalInactive: DEFAULT_RELOAD_INTERVAL_INACTIVE,
    reloadIntervalActive: DEFAULT_RELOAD_INTERVAL_ACTIVE,
    reloadInterval: DEFAULT_RELOAD_INTERVAL,
  },
};

const TestComponent = ({isVisible, entities}) => {
  const timeoutFunc = useEntitiesReloadInterval(entities);

  return <span data-testid="reload-interval">{timeoutFunc({isVisible})}</span>;
};

const activeEntity = parseModelFromObject({active: true});
const inactiveEntity = parseModelFromObject({active: false});

const entities = [activeEntity, inactiveEntity];

describe('useEntitiesReloadInterval tests', () => {
  test('Should return correct interval when isVisible is false', () => {
    const {render} = rendererWith({gmp});
    render(<TestComponent isVisible={false} entities={entities} />);

    const reloadInterval = screen.getByTestId('reload-interval');

    expect(reloadInterval).toHaveTextContent(DEFAULT_RELOAD_INTERVAL_INACTIVE);
  });

  test('Should return correct interval when there is an active entity', () => {
    const {render} = rendererWith({gmp});
    render(<TestComponent isVisible={true} entities={entities} />);

    const reloadInterval = screen.getByTestId('reload-interval');

    expect(reloadInterval).toHaveTextContent(DEFAULT_RELOAD_INTERVAL_ACTIVE);
  });
  test('Should return correct interval when there is no active entity', () => {
    const {render} = rendererWith({gmp});
    render(<TestComponent isVisible={true} entities={[inactiveEntity]} />);

    const reloadInterval = screen.getByTestId('reload-interval');

    expect(reloadInterval).toHaveTextContent(DEFAULT_RELOAD_INTERVAL);
  });

  test('Should not crash when entities are undefined', () => {
    // because entities can be undefined before they're loaded
    const {render} = rendererWith({gmp});
    render(<TestComponent isVisible={true} />);

    const reloadInterval = screen.getByTestId('reload-interval');

    expect(reloadInterval).toHaveTextContent(DEFAULT_RELOAD_INTERVAL);
  });

  // isVisible will always be defined per useReload
});
