/* ------------------------------------------------------------------------- *
 * Copyright 2002-2024, OpenNebula Project, OpenNebula Systems               *
 *                                                                           *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may   *
 * not use this file except in compliance with the License. You may obtain   *
 * a copy of the License at                                                  *
 *                                                                           *
 * http://www.apache.org/licenses/LICENSE-2.0                                *
 *                                                                           *
 * Unless required by applicable law or agreed to in writing, software       *
 * distributed under the License is distributed on an "AS IS" BASIS,         *
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  *
 * See the License for the specific language governing permissions and       *
 * limitations under the License.                                            *
 * ------------------------------------------------------------------------- */
import { useMemo } from 'react'
import PropTypes from 'prop-types'
import { Box } from '@mui/material'

import {
  SCHEMA,
  SECTIONS,
} from '@modules/components/Forms/Vm/AttachNicForm/Steps/NetworkAuto/schema'
import FormWithSchema from '@modules/components/Forms/FormWithSchema'
import { Step } from '@UtilsModule'
import { T, Nic, HYPERVISORS } from '@ConstantsModule'

export const STEP_ID = 'network-auto'

const Content = (props) => {
  const sections = useMemo(() => SECTIONS(props), [])

  return (
    <Box
      display="grid"
      gap="2em"
      sx={{ gridTemplateColumns: { lg: '1fr', md: '1fr' } }}
    >
      {sections.map(({ id, legend, fields }) => (
        <FormWithSchema
          key={id}
          rootProps={{
            sx: (id === 'general' || id === 'guacamole-connections') && {
              gridColumn: '1 / -1',
            },
          }}
          cy={id}
          saveState={true}
          fields={fields}
          legend={legend}
          id={STEP_ID}
        />
      ))}
    </Box>
  )
}

/**
 * Renders network auto options to nic.
 *
 * @param {object} props - Props
 * @param {Nic[]} props.nics - Current nics
 * @param {HYPERVISORS} props.hypervisor - Hypervisor
 * @returns {Step} Advance options step
 */
const NetworkAuto = (props) => ({
  id: STEP_ID,
  label: T.NetworkAuto,
  resolver: () => SCHEMA(props),
  optionsValidate: { abortEarly: false },
  content: () => Content(props),
  defaultDisabled: {
    condition: () =>
      props?.defaultData?.NETWORK_MODE !== 'auto' ||
      !props?.defaultData?.NETWORK_MODE,
  },
})

Content.propTypes = {
  data: PropTypes.any,
  setFormData: PropTypes.func,
  nics: PropTypes.array,
  hypervisor: PropTypes.string,
}

export default NetworkAuto
