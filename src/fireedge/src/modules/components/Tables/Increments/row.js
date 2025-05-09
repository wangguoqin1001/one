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
/* eslint-disable jsdoc/require-jsdoc */
import PropTypes from 'prop-types'
import { Typography, useTheme } from '@mui/material'
import {
  RefreshCircular as FullIcon,
  Refresh as IncrementIcon,
  HardDrive as SizeIcon,
} from 'iconoir-react'
import { StatusChip } from '@modules/components/Status'
import { rowStyles } from '@modules/components/Tables/styles'
import Timer from '@modules/components/Timer'
import { T } from '@ConstantsModule'
import { prettyBytes } from '@UtilsModule'
import { timeFromMilliseconds } from '@ModelsModule'
import { useMemo } from 'react'

const Row = ({
  original,
  value,
  headerList,
  rowDataCy,
  isSelected,
  toggleRowSelected,
  ...props
}) => {
  const theme = useTheme()
  const classes = useMemo(() => rowStyles(theme), [theme])
  const { ID, TYPE, DATE, SIZE, SOURCE } = value

  const labels = [...new Set([TYPE])].filter(Boolean)

  const time = timeFromMilliseconds(+DATE)

  return (
    <div
      {...props}
      data-cy={`increment-${ID}`}
      style={{ marginLeft: TYPE === 'FULL' ? '' : '1.5em' }}
    >
      <div className={classes.main}>
        <div className={classes.title}>
          <span>{TYPE === 'FULL' ? <FullIcon /> : <IncrementIcon />}</span>
          <Typography noWrap component="span" data-cy="name">
            {SOURCE}
          </Typography>
          <span className={classes.labels}>
            {labels.map((label) => (
              <StatusChip key={label} text={label} />
            ))}
          </span>
        </div>
        <div className={classes.caption}>
          <span>{`#${ID}`}</span>
          <span title={time.toFormat('ff')}>
            <Timer translateWord={T.RegisteredAt} initial={time} />
          </span>
          <span title={`${T.BackupSize}: ${prettyBytes(SIZE, 'MB')}`}>
            <SizeIcon />
            <span>{` ${prettyBytes(SIZE, 'MB')}`}</span>
          </span>
        </div>
      </div>
      <div className={classes.secondary}></div>
    </div>
  )
}

Row.propTypes = {
  original: PropTypes.object,
  value: PropTypes.object,
  isSelected: PropTypes.bool,
  handleClick: PropTypes.func,
  headerList: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  rowDataCy: PropTypes.string,
  toggleRowSelected: PropTypes.func,
}

export default Row
