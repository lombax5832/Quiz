import IProfile from "./IProfile";

export default interface IAuth {
    initialized: boolean
    profile: IProfile
}