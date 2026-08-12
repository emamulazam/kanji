// ======================================================
// Local Storage Manager
// ======================================================


const Storage = {


    set(key,value){

        localStorage.setItem(
            key,
            JSON.stringify(value)
        );

    },


    get(key,defaultValue=null){

        let data =
        localStorage.getItem(key);


        if(data===null){

            return defaultValue;

        }


        try{

            return JSON.parse(data);

        }

        catch{

            return defaultValue;

        }

    }


};