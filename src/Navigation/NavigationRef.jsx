import { createNavigationContainerRef } from "@react-navigation/native";


export const NavigationRef=createNavigationContainerRef()


export function navigate(name,param){
if(NavigationRef.isReady()){
    NavigationRef.navigate(name,param)
}
}
