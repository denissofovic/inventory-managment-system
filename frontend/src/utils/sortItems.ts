import IInventoryItem from "../models/inventoryItem"
import SortConfig from "../models/sortConfig"




const sortItems=(config:SortConfig|null,items:IInventoryItem[]):IInventoryItem[]=>{
    let sortedItems=items.map((item)=>item)

    console.log(config)
    if(config==null){ return sortedItems.sort((a,b)=>a.id>b.id?1:-1)}
    if(config.order==="Asc"){
        sortedItems.sort((a,b)=>
            {
                if(config.key==='warranty'){
                    let date1=new Date(a[config.key])
                    let date2 = new Date(b[config.key])
                    return date1.getTime()-date2.getTime()

                } else {
                    return a[config.key]<b[config.key]?-1:1
                }
                
        })
    } else {
        sortedItems.sort((a,b)=>
            {
                if(config.key==='warranty'){
                    let date1=new Date(a[config.key])
                    let date2 = new Date(b[config.key])
                    return date2.getTime()-date1.getTime()

                } else {
                    return a[config.key]<b[config.key]?1:-1
                }
                
        })
    }


    return sortedItems

}

export default sortItems