export type IDivider = 'divider'

export interface IRouteParam {
  path: string
  elementId: string
  label?: string
  icon?: string
  divider?: boolean
  requireUser?: boolean
  children?: Array<IRouteParamOrDivider>
}

export type IRouteParamOrDivider = IRouteParam | IDivider

export interface IJourney {
  rootJourney: Array<IRouteParamOrDivider>
}
