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
import MultipleTags from '@modules/components/MultipleTags'
import { StatusCircle } from '@modules/components/Status'
import EnhancedTable, {
  createColumns,
} from '@modules/components/Tables/Enhanced'
import WrapperRow from '@modules/components/Tables/Enhanced/WrapperRow'
import ImageColumns from '@modules/components/Tables/Images/columns'
import ImageRow from '@modules/components/Tables/Images/row'
import { RESOURCE_NAMES, T } from '@ConstantsModule'
import { useAuth, useViews, ImageAPI } from '@FeaturesModule'
import {
  getColorFromString,
  getUniqueLabels,
  getImageState,
  getImageType,
} from '@ModelsModule'
import { ReactElement, useMemo } from 'react'

const DEFAULT_DATA_CY = 'images'

/**
 * @param {object} props - Props
 * @returns {ReactElement} Images table
 */
const ImagesTable = (props) => {
  const { rootProps = {}, searchProps = {}, ...rest } = props ?? {}
  rootProps['data-cy'] ??= DEFAULT_DATA_CY
  searchProps['data-cy'] ??= `search-${DEFAULT_DATA_CY}`

  const { view, getResourceView } = useViews()
  const { data = [], isFetching, refetch } = ImageAPI.useGetImagesQuery()

  const columns = useMemo(
    () =>
      createColumns({
        filters: getResourceView(RESOURCE_NAMES.IMAGE)?.filters,
        columns: ImageColumns,
      }),
    [view]
  )

  const listHeader = [
    {
      header: '',
      id: 'status-icon',
      accessor: (vm) => {
        const { color: stateColor, name: stateName } = getImageState(vm)

        return <StatusCircle color={stateColor} tooltip={stateName} />
      },
    },
    { header: T.ID, id: 'id', accessor: 'ID' },
    { header: T.Name, id: 'name', accessor: 'NAME' },
    { header: T.Owner, id: 'owner', accessor: 'UNAME' },
    { header: T.Group, id: 'group', accessor: 'GNAME' },
    { header: T.Datastore, id: 'datastore', accessor: 'DATASTORE' },
    {
      header: T.Type,
      id: 'type',
      accessor: (template) => getImageType(template),
    },
    { header: T.VMs, id: 'vms', accessor: 'RUNNING_VMS' },
    {
      header: T.Labels,
      id: 'labels',
      accessor: (
        _,
        onClickLabel,
        onDeleteLabel,
        { label: LABELS = [] } = {}
      ) => {
        const { labels: userLabels } = useAuth()
        const labels = useMemo(
          () =>
            getUniqueLabels(LABELS).reduce((acc, label) => {
              if (userLabels?.includes(label)) {
                acc.push({
                  text: label,
                  dataCy: `label-${label}`,
                  stateColor: getColorFromString(label),
                })
              }

              return acc
            }, []),
          [LABELS, onDeleteLabel, onClickLabel]
        )

        return <MultipleTags tags={labels} truncateText={10} />
      },
    },
  ]

  const { component, header } = WrapperRow(ImageRow)

  return (
    <EnhancedTable
      columns={columns}
      data={useMemo(() => data, [data])}
      rootProps={rootProps}
      searchProps={searchProps}
      refetch={refetch}
      isLoading={isFetching}
      getRowId={(row) => String(row.ID)}
      RowComponent={component}
      headerList={header && listHeader}
      {...rest}
    />
  )
}

ImagesTable.propTypes = { ...EnhancedTable.propTypes }
ImagesTable.displayName = 'ImagesTable'

export default ImagesTable
