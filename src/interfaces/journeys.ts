export interface IRouteParam {
  path: string
  elementId: string
  label: string
  requireUser?: boolean
  children?: Array<IRouteParam>
}

export interface IJourney {
  rootJourney: Array<IRouteParam>
}
