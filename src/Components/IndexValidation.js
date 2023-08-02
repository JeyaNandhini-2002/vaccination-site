export function  validation(values){
    let error={}
    if(values.email===""||values.password===""){
        error.email="Enter required fileds"
    }
    else{
        error.email=""
    }
    return error;
}