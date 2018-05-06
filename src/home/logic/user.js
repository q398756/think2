'use strict';
/**
 * logic
 * @param  {} []
 * @return {}     []
 */
export default class extends think.logic.base {
    /**
     * index action logic
     * @return {} []
     */
    reigstercheckAction(){
        console.log("here is logic")
        this.allMethods = "post";
    }

    logincheckAction(){
        console.log("here is logic")
        this.allMethods = "post";
    }
}