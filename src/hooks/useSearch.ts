import { useMemo } from "react";

export const useSearch = (array: any[], value: string, field: string ) => {
    return useMemo(() =>{
        if(value){
            return array.filter(user => user[field].toLocaleLowerCase().includes(value.toLocaleLowerCase()));
        }
        return array;
    }, [array, value, field])
}