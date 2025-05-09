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
import FormWithSchema from '@modules/components/Forms/FormWithSchema'

import {
  SCHEMA,
  FIELDS,
} from '@modules/components/Forms/Image/CreateForm/Steps/AdvancedOptions/schema'
import { T } from '@ConstantsModule'

export const STEP_ID = 'advanced'

const Content = (oneConfig, adminGroup) => (
  <FormWithSchema
    id={STEP_ID}
    fields={FIELDS((oneConfig, adminGroup))}
    cy={`${STEP_ID}`}
  />
)

/**
 * Advanced options create image.
 *
 * @param {object} props - Step properties
 * @param {object} props.oneConfig - Open Nebula configuration
 * @param {boolean} props.adminGroup - If the user belongs to oneadmin group
 * @returns {object} Advanced options configuration step
 */
const AdvancedOptions = ({ oneConfig, adminGroup }) => ({
  id: STEP_ID,
  label: T.AdvancedOptions,
  resolver: SCHEMA(oneConfig, adminGroup),
  optionsValidate: { abortEarly: false },
  content: () => Content(oneConfig, adminGroup),
})

export default AdvancedOptions
