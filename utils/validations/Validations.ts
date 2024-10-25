export const validateMaxlength = (str:string,max_length:number) => {
    if(str.length> max_length){
        return {result:false , message:`it should be of max length ${max_length}`};
    }
}