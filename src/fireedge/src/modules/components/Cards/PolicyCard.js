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
import { useMemo, memo } from 'react'
import { useTheme, Card, CardContent, Button, CardActions } from '@mui/material'
import { css } from '@emotion/css'

import PropTypes from 'prop-types'

import FormWithSchema from '@modules/components/Forms/FormWithSchema'
import { Tr } from '@modules/components/HOC'
import { T } from '@ConstantsModule'

const useStyles = () => ({
  root: css({
    height: '100%',
    minHeight: 140,
    display: 'flex',
    flexDirection: 'column',
  }),
  content: css({
    minHeight: 260,
  }),
})

const PolicyCard = memo(({ id, cy, fields, handleRemove, cardProps }) => {
  const theme = useTheme()
  const classes = useMemo(() => useStyles(theme), [theme])

  return (
    <Card variant="outlined" className={classes.root} {...cardProps}>
      <CardContent className={classes.content}>
        <FormWithSchema id={id} cy={cy} fields={fields} />
      </CardContent>
      <CardActions>
        {handleRemove && (
          <Button
            variant="contained"
            size="small"
            onClick={handleRemove}
            disableElevation
          >
            {Tr(T.Remove)}
          </Button>
        )}
      </CardActions>
    </Card>
  )
})

PolicyCard.propTypes = {
  id: PropTypes.string,
  cy: PropTypes.string,
  fields: PropTypes.arrayOf(PropTypes.object),
  handleEdit: PropTypes.func,
  handleClone: PropTypes.func,
  handleRemove: PropTypes.func,
  cardProps: PropTypes.object,
}

PolicyCard.defaultProps = {
  id: undefined,
  cy: undefined,
  fields: undefined,
  handleEdit: undefined,
  handleClone: undefined,
  handleRemove: undefined,
  cardProps: undefined,
}

PolicyCard.displayName = 'PolicyCard'

export default PolicyCard
