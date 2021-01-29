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

/* eslint-disable react/prop-types */
import React from 'react';
import {storiesOf} from '@storybook/react';
import Select from '../web/components/form/select';

class TestSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      disabled: this.props.disabled,
      text: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value, name) {
    this.setState({
      value: value,
      text: value,
    });
  }

  render() {
    const {text} = this.state;
    return (
      <div>
        <Select
          name={this.state.name}
          disabled={this.state.disabled}
          value={this.state.value}
          onChange={this.handleChange}
          items={[
            {label: 'Deutsch', value: 'Guten Morgen!'},
            {label: 'English', value: 'Good Morning!'},
          ]}
        />
        <h3>{text}</h3>
      </div>
    );
  }
}

storiesOf('Select', module)
  .add('default', () => <TestSelect />)
  .add('disabled', () => <TestSelect disabled={true} />);
