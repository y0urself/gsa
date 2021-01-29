/* Copyright (C) 2019-2021 Greenbone Networks GmbH
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

import React from 'react';

import {rendererWith} from 'web/utils/testing';

import Header from '../header';
import {setUsername} from 'web/store/usersettings/actions';

describe('Header tests', () => {
  test('should render header', () => {
    const isLoggedIn = jest.fn().mockReturnValue(true);
    const gmp = {isLoggedIn, settings: {vendorVersion: ''}};
    const {render, store} = rendererWith({gmp, router: true, store: true});
    store.dispatch(setUsername('username'));

    const {element} = render(<Header />);

    expect(element).toMatchSnapshot();
  });
});
