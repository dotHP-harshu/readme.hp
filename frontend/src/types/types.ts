export type ThemeType =  "dark" | "light"

export type fileTreeElement ={
    path:string,
    url:string,
    sha:string, 
    type:string,
    mode:string,
    size?:number
}