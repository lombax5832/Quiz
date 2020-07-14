export enum AppBarAction {
  SET_APPBAR_TITLE = 'SET_APPBAR_TITLE',
  CLEAR_APPBAR_TITLE = 'CLEAR_APPBAR_TITLE'
}

export function CreateAppBarTitle(title: string){
  return {
    type: AppBarAction.SET_APPBAR_TITLE,
    payload: title
  }
}

export function ClearAppBarTitle(){
  return {
    type: AppBarAction.CLEAR_APPBAR_TITLE
  }
}
